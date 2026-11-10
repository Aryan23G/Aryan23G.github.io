"""A fake Jira (Cloud v3 / Data Center v2 + Service Desk API) over real HTTP on 127.0.0.1."""

from __future__ import annotations

import base64
import json
import re
import threading
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse
from zoneinfo import ZoneInfo


def adf(*paragraphs: str, link: tuple[str, str] | None = None) -> dict:
    content = [{"type": "paragraph", "content": [{"type": "text", "text": p}]} for p in paragraphs]
    if link:
        label, href = link
        content.append({"type": "paragraph", "content": [{"type": "text", "text": label, "marks": [{"type": "link", "attrs": {"href": href}}]}]})
    return {"type": "doc", "version": 1, "content": content}


class FakeJira:
    def __init__(self, deployment: str = "cloud", tz: str = "Europe/London"):
        self.deployment = deployment
        self.tz = tz
        self.issues: dict[str, dict] = {}
        self.comments: dict[str, list[dict]] = {}
        self.sd_emails: dict[str, str] = {}
        self.fail: dict[tuple[str, str], list[int]] = {}  # (method, path prefix) -> statuses to return first
        self.log: list[tuple[str, str, dict]] = []
        self.priority_names = ["Highest", "High", "Medium", "Low", "Lowest"]
        self.desks = [("IT", "IT Help Desk"), ("HR", "HR Requests")]
        self.expected_auth = "Basic " + base64.b64encode(b"bot@acme.com:token").decode() if deployment == "cloud" else "Bearer pat-123"
        fake = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *a):
                pass

            def _send(self, status: int, body: dict | None = None, headers: dict | None = None):
                data = json.dumps(body or {}).encode()
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                for k, v in (headers or {}).items():
                    self.send_header(k, v)
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)

            def _handle(self, method: str):
                u = urlparse(self.path)
                q = {k: v[0] for k, v in parse_qs(u.query).items()}
                body = json.loads(self.rfile.read(int(self.headers.get("Content-Length") or 0)) or b"{}") if method == "POST" else {}
                fake.log.append((method, u.path, q | body))
                if self.headers.get("Authorization") != fake.expected_auth:
                    return self._send(401, {"errorMessages": ["unauthorized"]})
                for (m, prefix), statuses in fake.fail.items():
                    if m == method and u.path.startswith(prefix) and statuses:
                        status = statuses.pop(0)
                        return self._send(status, {"errorMessages": ["injected"]}, {"Retry-After": "7"} if status == 429 else None)
                v = "3" if fake.deployment == "cloud" else "2"
                if u.path == f"/rest/api/{v}/myself":
                    return self._send(200, {"displayName": "SentinelDesk Bot", "timeZone": fake.tz})
                if u.path == f"/rest/api/{v}/priority":
                    return self._send(200, [{"name": n} for n in fake.priority_names])
                if u.path == "/rest/servicedeskapi/servicedesk":
                    return self._send(200, {"values": [{"id": str(i + 1), "projectKey": k, "projectName": n} for i, (k, n) in enumerate(fake.desks)], "isLastPage": True})
                if fake.deployment == "cloud" and u.path == "/rest/api/3/search/jql":
                    issues = fake.matching(q["jql"])
                    start = int(q.get("nextPageToken") or 0)
                    size = int(q.get("maxResults", 50))
                    page = issues[start : start + size]
                    nxt = start + size if start + size < len(issues) else None
                    return self._send(200, {"issues": page, **({"nextPageToken": str(nxt)} if nxt is not None else {}), "isLast": nxt is None})
                if fake.deployment == "datacenter" and u.path == "/rest/api/2/search":
                    issues = fake.matching(q["jql"])
                    start, size = int(q.get("startAt", 0)), int(q.get("maxResults", 50))
                    return self._send(200, {"issues": issues[start : start + size], "startAt": start, "maxResults": size, "total": len(issues)})
                m = re.fullmatch(rf"/rest/api/{v}/issue/([A-Z0-9_]+-\d+)", u.path)
                if m:
                    issue = fake.issues.get(m.group(1))
                    return self._send(200, issue) if issue else self._send(404)
                m = re.fullmatch(r"/rest/servicedeskapi/request/([A-Z0-9_]+-\d+)(/comment)?", u.path)
                if m:
                    key = m.group(1)
                    if key not in fake.issues:
                        return self._send(404)
                    if not m.group(2):
                        return self._send(200, {"issueKey": key, "reporter": {"emailAddress": fake.sd_emails.get(key)}})
                    if method == "POST":
                        fake.comments.setdefault(key, []).append({"body": body["body"], "public": body["public"]})
                        return self._send(201, {"id": "1"})
                    values = fake.comments.get(key, [])
                    return self._send(200, {"values": values, "isLastPage": True, "size": len(values)})
                self._send(404)

            def do_GET(self):
                self._handle("GET")

            def do_POST(self):
                self._handle("POST")

        self.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.url = f"http://127.0.0.1:{self.server.server_address[1]}"
        threading.Thread(target=self.server.serve_forever, daemon=True).start()

    def add(self, key: str, summary: str, description, created: str, *, email: str | None = "user@acme.com", name: str = "Pat Lee",
            status: str = "new", priority: str = "Medium", team: str | None = None) -> None:
        fields = {
            "summary": summary,
            "description": description,
            "reporter": {"displayName": name, **({"emailAddress": email} if email else {})},
            "created": created,
            "status": {"name": status, "statusCategory": {"key": status}},
            "priority": {"name": priority},
        }
        if team is not None:
            fields["customfield_10001"] = {"value": team}
        self.issues[key] = {"key": key, "fields": fields}

    def matching(self, jql: str) -> list[dict]:
        """Honour only `created >= "YYYY-MM-DD HH:mm"` (in the account time zone) and created ordering."""
        m = re.search(r'created >= "(\d{4}-\d{2}-\d{2} \d{2}:\d{2})"', jql)
        since = datetime.strptime(m.group(1), "%Y-%m-%d %H:%M").replace(tzinfo=ZoneInfo(self.tz)) if m else None
        out = []
        for issue in self.issues.values():
            created = datetime.strptime(issue["fields"]["created"], "%Y-%m-%dT%H:%M:%S.%f%z")
            if since is None or created >= since:
                out.append((created, issue))
        return [i for _, i in sorted(out, key=lambda x: x[0])]

    def posts(self) -> list[tuple[str, dict]]:
        return [(p, b) for m, p, b in self.log if m == "POST"]

    def close(self):
        self.server.shutdown()
        self.server.server_close()
