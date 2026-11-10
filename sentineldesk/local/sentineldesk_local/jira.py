"""Jira Service Management client and configuration.

Endpoints used (Cloud uses REST v3, Data Center uses v2; Service Desk API is the same on both):
    GET  /rest/api/3/search/jql            Cloud enhanced JQL search (nextPageToken paging)
    GET  /rest/api/2/search                Data Center JQL search (startAt paging)
    GET  /rest/api/{v}/issue/{key}         one issue (fields: summary, description, reporter, ...)
    GET  /rest/api/{v}/myself              credential check
    GET  /rest/servicedeskapi/request/{key}            reporter email when the platform API hides it
    GET  /rest/servicedeskapi/request/{key}/comment    existing comments (idempotency check)
    POST /rest/servicedeskapi/request/{key}/comment    {"body": ..., "public": false} = INTERNAL comment

Jira is the customer's own system: this is the only network destination besides the local model.
Unlike the Ollama client, this one honours HTTPS_PROXY, because corporate networks often require it.
"""

from __future__ import annotations

import base64
import re
from dataclasses import dataclass, field
from datetime import date
from typing import Any, Literal

import requests

from .config import LocalOnlyError

ISSUE_KEY = re.compile(r"^[A-Z][A-Z0-9_]{0,49}-[1-9][0-9]{0,9}$")
MARKER = "[SentinelDesk AI triage]"
_FIELDS = ("summary", "description", "reporter", "created", "status", "priority")


class JiraError(RuntimeError):
    def __init__(self, message: str, status: int | None = None, retryable: bool = False, retry_after_s: int | None = None):
        super().__init__(message)
        self.status = status
        self.retryable = retryable
        self.retry_after_s = retry_after_s


# ---------------------------------------------------------------- configuration


@dataclass(frozen=True)
class JiraConfig:
    base_url: str
    deployment: Literal["cloud", "datacenter"] = "cloud"
    jql: str = ""
    poll_interval_s: int = 60
    mode: Literal["shadow", "read-only"] = "shadow"
    start_from: date | None = None  # None = "now"
    max_per_poll: int = 25
    outcome_after_hours: float = 24
    priority_map: dict[str, str] = field(default_factory=dict)
    team_field: str | None = None
    team_map: dict[str, str] = field(default_factory=dict)

    @property
    def api_version(self) -> str:
        return "3" if self.deployment == "cloud" else "2"

    @staticmethod
    def from_dict(d: dict, team_names: tuple[str, ...] = ()) -> "JiraConfig | None":
        """Parse the [jira] table. Returns None when it is absent or `enabled = false`."""
        if not d or not d.get("enabled", False):
            return None
        base = str(d.get("base_url", "")).strip().rstrip("/")
        m = re.match(r"^(https?)://([^/]+)", base)
        if not m:
            raise ValueError("[jira] base_url must look like https://yourcompany.atlassian.net")
        host = m.group(2).split(":")[0]
        if m.group(1) != "https" and host not in ("localhost", "127.0.0.1"):
            raise ValueError("[jira] base_url must use https (credentials are sent with every request).")
        deployment = d.get("deployment", "cloud")
        if deployment not in ("cloud", "datacenter"):
            raise ValueError('[jira] deployment must be "cloud" or "datacenter".')
        jql = str(d.get("jql", "")).strip()
        if not jql:
            raise ValueError('[jira] jql is required, e.g. jql = \'project = "IT"\'')
        if re.search(r"\border\s+by\b", jql, re.I):
            raise ValueError("[jira] jql must not contain ORDER BY; SentinelDesk adds its own ordering.")
        mode = d.get("mode", "shadow")
        if mode not in ("shadow", "read-only"):
            raise ValueError('[jira] mode must be "shadow" or "read-only".')
        start_raw = str(d.get("start_from", "now")).strip()
        try:
            start = None if start_raw == "now" else date.fromisoformat(start_raw)
        except ValueError as exc:
            raise ValueError('[jira] start_from must be "now" or a date like "2026-10-01".') from exc
        pmap = {str(k): str(v) for k, v in (d.get("priority_map") or {}).items()}
        bad = [v for v in pmap.values() if v not in ("P1", "P2", "P3", "P4")]
        if bad:
            raise ValueError(f"[jira.priority_map] values must be P1-P4, got {bad}.")
        tmap = {str(k): str(v) for k, v in (d.get("team_map") or {}).items()}
        unknown = [v for v in tmap.values() if team_names and v not in team_names]
        if unknown:
            raise ValueError(f"[jira.team_map] maps to unknown teams: {unknown}.")
        poll = int(d.get("poll_interval_s", 60))
        if poll < 15:
            raise ValueError("[jira] poll_interval_s must be at least 15.")
        return JiraConfig(
            base_url=base, deployment=deployment, jql=jql, poll_interval_s=poll, mode=mode, start_from=start,
            max_per_poll=max(1, min(int(d.get("max_per_poll", 25)), 100)), outcome_after_hours=float(d.get("outcome_after_hours", 24)),
            priority_map=pmap, team_field=(str(d["team_field"]).strip() or None) if d.get("team_field") else None, team_map=tmap,
        )


@dataclass(frozen=True)
class JiraCredentials:
    email: str | None = None
    api_token: str | None = None
    pat: str | None = None

    @staticmethod
    def from_env(env: dict[str, str]) -> "JiraCredentials":
        return JiraCredentials(email=env.get("JIRA_EMAIL") or None, api_token=env.get("JIRA_API_TOKEN") or None, pat=env.get("JIRA_PAT") or None)

    def header(self, deployment: str) -> str:
        if deployment == "cloud":
            if not (self.email and self.api_token):
                raise LocalOnlyError("Jira Cloud needs the account's email and an API token (enter them in Settings, or set JIRA_EMAIL and JIRA_API_TOKEN).")
            return "Basic " + base64.b64encode(f"{self.email}:{self.api_token}".encode()).decode()
        if not self.pat:
            raise LocalOnlyError("Jira Data Center needs a personal access token (enter it in Settings, or set JIRA_PAT).")
        return f"Bearer {self.pat}"


# ---------------------------------------------------------------- Atlassian Document Format -> text


def adf_to_text(node: Any) -> str:
    """Flatten ADF (Cloud rich text) to plain text. Link targets are kept next to their label,
    because phishing hides malicious URLs behind friendly link text."""
    if node is None:
        return ""
    if isinstance(node, str):
        return node
    if isinstance(node, list):
        return "".join(adf_to_text(n) for n in node)
    t = node.get("type")
    attrs = node.get("attrs") or {}
    if t == "text":
        text = node.get("text", "")
        for mark in node.get("marks") or []:
            href = (mark.get("attrs") or {}).get("href") if mark.get("type") == "link" else None
            if href and href not in text:
                text = f"{text} ({href})"
        return text
    if t == "hardBreak":
        return "\n"
    if t in ("mention", "emoji"):
        return attrs.get("text") or attrs.get("shortName") or ""
    if t in ("inlineCard", "blockCard", "embedCard"):
        return attrs.get("url", "")
    if t in ("media", "mediaSingle", "mediaGroup"):
        inner = adf_to_text(node.get("content"))
        return inner or "[attachment]"
    inner = adf_to_text(node.get("content"))
    if t == "listItem":
        return "- " + inner.strip() + "\n"
    if t in ("paragraph", "heading", "codeBlock", "blockquote", "rule", "tableRow", "panel"):
        return inner + "\n"
    if t == "tableCell" or t == "tableHeader":
        return inner.strip() + " | "
    return inner


# ---------------------------------------------------------------- client


@dataclass
class JiraRequest:
    key: str
    summary: str
    description: str
    reporter_email: str | None
    reporter_name: str
    created: str
    status_category: str
    priority_name: str | None
    team_value: str | None
    url: str

    @property
    def requester(self) -> str:
        """An address for the sender check. Hidden emails become an unverifiable external sender."""
        if self.reporter_email:
            return self.reporter_email
        slug = re.sub(r"[^a-z0-9]+", ".", self.reporter_name.lower()).strip(".") or "unknown"
        return f"{slug}@hidden-email.invalid"


def _field_value(v: Any) -> str | None:
    """Custom fields come back as strings, {value}, {name}, or lists of those."""
    if v is None:
        return None
    if isinstance(v, str):
        return v
    if isinstance(v, dict):
        return v.get("value") or v.get("name") or v.get("title")
    if isinstance(v, list) and v:
        return _field_value(v[0])
    return None


class JiraClient:
    def __init__(self, cfg: JiraConfig, creds: JiraCredentials, session: requests.Session | None = None, timeout_s: int = 20):
        self.cfg = cfg
        self.session = session or requests.Session()
        self.session.headers.update({"Authorization": creds.header(cfg.deployment), "Accept": "application/json"})
        self.timeout_s = timeout_s
        self.fields = ",".join([*_FIELDS, *([cfg.team_field] if cfg.team_field else [])])

    def _req(self, method: str, path: str, **kw) -> Any:
        try:
            res = self.session.request(method, self.cfg.base_url + path, timeout=self.timeout_s, **kw)
        except requests.RequestException as exc:
            raise JiraError(f"Jira {method} {path.split('?')[0]} failed: {exc.__class__.__name__}.", retryable=True) from exc
        if res.status_code in (200, 201):
            return res.json() if res.content else {}
        retry_after = res.headers.get("Retry-After")
        hint = {401: " (check the Jira credentials)", 403: " (the account needs agent access to this project)",
                404: " (not found, or not a Jira Service Management request)"}.get(res.status_code, "")
        raise JiraError(
            f"Jira {method} {path.split('?')[0]} returned HTTP {res.status_code}{hint}.",
            status=res.status_code,
            retryable=res.status_code == 429 or res.status_code >= 500,
            retry_after_s=int(retry_after) if retry_after and retry_after.isdigit() else None,
        )

    @staticmethod
    def _check_key(key: str) -> str:
        if not ISSUE_KEY.match(key):
            raise JiraError(f"Invalid issue key {key!r}.", status=400)
        return key

    def myself(self) -> dict:
        return self._req("GET", f"/rest/api/{self.cfg.api_version}/myself")

    def _to_request(self, issue: dict) -> JiraRequest:
        f = issue.get("fields") or {}
        desc = f.get("description")
        description = adf_to_text(desc).strip() if isinstance(desc, (dict, list)) else (desc or "")
        reporter = f.get("reporter") or {}
        status = f.get("status") or {}
        return JiraRequest(
            key=issue["key"],
            summary=(f.get("summary") or "").strip(),
            description=re.sub(r"\n{3,}", "\n\n", description),
            reporter_email=(reporter.get("emailAddress") or None),
            reporter_name=reporter.get("displayName") or "unknown",
            created=f.get("created") or "",
            status_category=((status.get("statusCategory") or {}).get("key") or "").lower(),
            priority_name=(f.get("priority") or {}).get("name"),
            team_value=_field_value(f.get(self.cfg.team_field)) if self.cfg.team_field else None,
            url=f"{self.cfg.base_url}/browse/{issue['key']}",
        )

    def search(self, jql: str, limit: int, page_size: int = 50) -> list[JiraRequest]:
        """Up to `limit` issues for `jql`, following pagination."""
        out: list[JiraRequest] = []
        page = max(1, min(page_size, limit))
        if self.cfg.deployment == "cloud":
            token: str | None = None
            while len(out) < limit:
                params = {"jql": jql, "fields": self.fields, "maxResults": page, **({"nextPageToken": token} if token else {})}
                data = self._req("GET", "/rest/api/3/search/jql", params=params)
                out.extend(self._to_request(i) for i in data.get("issues", []))
                token = data.get("nextPageToken")
                if data.get("isLast", token is None) or not token:
                    break
        else:
            start = 0
            while len(out) < limit:
                data = self._req("GET", "/rest/api/2/search", params={"jql": jql, "fields": self.fields, "maxResults": page, "startAt": start})
                issues = data.get("issues", [])
                out.extend(self._to_request(i) for i in issues)
                start += len(issues)
                if not issues or start >= int(data.get("total", 0)):
                    break
        return out[:limit]

    def get_request(self, key: str) -> JiraRequest:
        req = self._to_request(self._req("GET", f"/rest/api/{self.cfg.api_version}/issue/{self._check_key(key)}", params={"fields": self.fields}))
        if not req.reporter_email:
            # Cloud may hide the email on the platform API; the Service Desk API shows it to agents.
            try:
                sd = self._req("GET", f"/rest/servicedeskapi/request/{key}")
                req.reporter_email = (sd.get("reporter") or {}).get("emailAddress") or None
            except JiraError as exc:
                if exc.retryable:
                    raise
        return req

    def comment_bodies(self, key: str) -> list[str]:
        bodies: list[str] = []
        start = 0
        while True:
            data = self._req("GET", f"/rest/servicedeskapi/request/{self._check_key(key)}/comment", params={"start": start, "limit": 100})
            values = data.get("values", [])
            bodies.extend(str(v.get("body", "")) for v in values)
            if data.get("isLastPage", True) or not values:
                return bodies
            start += len(values)

    # ---------------------------------------------------------------- discovery (setup wizard)

    def service_desks(self) -> list[dict]:
        """Service Management projects this account can see: [{"key", "name"}]."""
        desks: list[dict] = []
        start = 0
        while True:
            data = self._req("GET", "/rest/servicedeskapi/servicedesk", params={"start": start, "limit": 100})
            values = data.get("values", [])
            desks.extend({"key": v.get("projectKey"), "name": v.get("projectName")} for v in values if v.get("projectKey"))
            if data.get("isLastPage", True) or not values:
                return desks
            start += len(values)

    def priorities(self) -> list[str]:
        """Priority names, most urgent first (the order Jira returns them in)."""
        data = self._req("GET", f"/rest/api/{self.cfg.api_version}/priority")
        items = data if isinstance(data, list) else data.get("values", [])
        return [p["name"] for p in items if p.get("name")]

    def has_triage_comment(self, key: str) -> bool:
        return any(MARKER in b for b in self.comment_bodies(key))

    def add_internal_comment(self, key: str, body: str) -> None:
        self._req("POST", f"/rest/servicedeskapi/request/{self._check_key(key)}/comment", json={"body": body, "public": False})


def suggest_priority_map(names: list[str]) -> dict[str, str]:
    """Map Jira's priorities (most urgent first) in order onto P1-P4; extras become P4.
    Highest/High/Medium/Low/Lowest -> P1/P2/P3/P4/P4, High/Medium/Low -> P1/P2/P3. A desk with a
    single priority gets P3 (neutral). Admins can adjust the result in Settings."""
    if len(names) == 1:
        return {names[0]: "P3"}
    return {name: f"P{min(4, i + 1)}" for i, name in enumerate(names)}


def deployment_for(base_url: str) -> str:
    """Atlassian Cloud sites live on atlassian.net; anything else is Data Center / Server."""
    host = re.sub(r"^https?://", "", base_url).split("/")[0].split(":")[0].lower()
    return "cloud" if host.endswith(".atlassian.net") or host.endswith(".jira.com") else "datacenter"


def format_comment(final: dict, mode: str, model: str, profile_name: str) -> str:
    engine = f"AI council ({model})" if mode == "council" else "offline rules engine"
    lines = [
        f"{MARKER} {'SECURITY INCIDENT' if final['security_flag'] else 'Suggested triage'} by {engine}",
        f"Priority: {final['priority']} | Category: {final['category']} | Route to: {final['escalate_to'] or 'Service Desk'} | Confidence: {round(final['confidence'] * 100)}%",
    ]
    if final.get("security_reasons"):
        lines.append("Indicators: " + "; ".join(final["security_reasons"][:6]))
    if final.get("overrides"):
        lines.append("Guardrail overrides: " + "; ".join(f"{o['field']} ({o['reason']})" for o in final["overrides"]))
    if final.get("reasoning"):
        lines.append("Reasoning: " + final["reasoning"])
    lines.append(("" if final["security_flag"] else "Suggested reply: ") + final["suggested_response"])
    if final.get("kb_refs"):
        lines.append("Knowledge base: " + ", ".join(final["kb_refs"]))
    lines.append(f"This is an internal note from SentinelDesk ({profile_name}). It was not sent to the requester.")
    return "\n".join(lines)
