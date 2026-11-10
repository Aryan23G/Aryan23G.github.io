"""Local web platform (FastAPI). Serves the dashboard and a JSON + SSE API over SQLite.

Every route except the page itself, POST /api/login and a minimal /api/health needs a signed-in user.
State-changing requests must carry `X-SentinelDesk: 1` (a header other sites cannot set cross-origin)
in addition to the SameSite=Strict session cookie.

Run with run.py, or: uvicorn sentineldesk_local.web:app_from_env --factory --host 127.0.0.1 --port 8765
"""

from __future__ import annotations

import asyncio
import json
import re
import time
from datetime import date, timedelta
from pathlib import Path
from typing import Literal

from fastapi import Depends, FastAPI, HTTPException, Query, Request, Response
from fastapi.responses import FileResponse, PlainTextResponse, StreamingResponse
from pydantic import BaseModel, Field, field_validator

from .auth import SESSION_COOKIE, SESSION_HOURS, Auth, AuthError, User
from .config import LocalOnlyError, Settings
from .config_store import DEFAULT_CATEGORIES, DEFAULT_PRIORITY_RULES
from .jira import JiraClient, JiraConfig, JiraCredentials, JiraError, deployment_for, suggest_priority_map
from .profile import ProfileError, _parse_markdown_article
from .db import Database
from .ollama_client import OllamaClient, OllamaError
from .report import FeedbackError, add_feedback, build_report, export_csv, latest_feedback
from .rules import SAMPLE_TICKETS

STATIC = Path(__file__).parent / "static"
_EMAIL = re.compile(r"^[^\s@<>\"]+@[^\s@<>\"]+\.[^\s@<>\"]+$")
CSRF_HEADER = "x-sentineldesk"


class TicketIn(BaseModel):
    requester: str = Field(max_length=120)
    subject: str = Field(min_length=1, max_length=160)
    body: str = Field(min_length=5, max_length=4000)

    @field_validator("requester", "subject", "body", mode="before")
    @classmethod
    def strip(cls, v: object) -> object:
        return v.strip() if isinstance(v, str) else v

    @field_validator("requester")
    @classmethod
    def email(cls, v: str) -> str:
        if not _EMAIL.match(v):
            raise ValueError("must be a valid email address")
        return v


class LoginIn(BaseModel):
    username: str = Field(max_length=64)
    password: str = Field(max_length=256)


class FeedbackIn(BaseModel):
    verdict: Literal["accept", "correct"]
    priority: Literal["P1", "P2", "P3", "P4"] | None = None
    escalate_to: str | None = Field(default=None, max_length=120)
    security_flag: bool | None = None
    category: str | None = Field(default=None, max_length=120)
    note: str | None = Field(default=None, max_length=1000)


class UserIn(BaseModel):
    username: str = Field(max_length=32)
    password: str = Field(max_length=256)
    role: Literal["admin", "analyst"] = "analyst"


class SetupAccountIn(BaseModel):
    token: str = Field(max_length=200)
    username: str = Field(max_length=32)
    password: str = Field(max_length=256)


class TeamIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    handles: str = Field(default="", max_length=300)


class OrgIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    domains: list[str] = Field(min_length=1, max_length=20)
    teams: list[TeamIn] = Field(min_length=1, max_length=30)
    security_team: str = Field(min_length=1, max_length=80)


class JiraTestIn(BaseModel):
    base_url: str = Field(min_length=8, max_length=200)
    email: str | None = Field(default=None, max_length=200)
    api_token: str | None = Field(default=None, max_length=500)
    pat: str | None = Field(default=None, max_length=500)


class JiraIn(JiraTestIn):
    enabled: bool = True
    project_key: str = Field(default="", max_length=50)
    mode: Literal["shadow", "read-only"] = "shadow"
    history_days: Literal[0, 7, 30, 60, 90] = 30
    priority_map: dict[str, Literal["P1", "P2", "P3", "P4"]] = Field(default_factory=dict)


class KbFile(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    content: str = Field(min_length=1, max_length=200_000)


class KbUploadIn(BaseModel):
    files: list[KbFile] = Field(min_length=1, max_length=100)


_DOMAIN = re.compile(r"^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$")
_PROJECT_KEY = re.compile(r"^[A-Z][A-Z0-9_]{0,49}$")


def create_app(settings: Settings, db: Database | None = None, client: OllamaClient | None = None) -> FastAPI:
    db = db or Database(settings.db_path)
    db.init()
    client = client or settings.ollama_client()
    store = settings.store()
    auth = Auth(db)
    app = FastAPI(title="SentinelDesk Local", docs_url=None, redoc_url=None, openapi_url=None)

    # ---------------------------------------------------------------- auth dependencies

    def current_user(request: Request) -> User:
        user = auth.user_for(request.cookies.get(SESSION_COOKIE))
        if user is None:
            raise HTTPException(401, "Sign in required.")
        if request.method not in ("GET", "HEAD") and request.headers.get(CSRF_HEADER) != "1":
            raise HTTPException(403, "Missing X-SentinelDesk header.")
        return user

    def admin_user(user: User = Depends(current_user)) -> User:
        if not user.is_admin:
            raise HTTPException(403, "Admins only.")
        return user

    @app.middleware("http")
    async def security_headers(request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'"
        )
        return response

    # ---------------------------------------------------------------- page + session

    @app.get("/", include_in_schema=False)
    def dashboard() -> FileResponse:
        return FileResponse(STATIC / "dashboard.html", media_type="text/html")

    @app.post("/api/login")
    def login(body: LoginIn, request: Request, response: Response) -> dict:
        if request.headers.get(CSRF_HEADER) != "1":
            raise HTTPException(403, "Missing X-SentinelDesk header.")
        try:
            user, token = auth.login(body.username, body.password)
        except AuthError as exc:
            raise HTTPException(401, str(exc)) from exc
        response.set_cookie(SESSION_COOKIE, token, max_age=SESSION_HOURS * 3600, httponly=True, samesite="strict",
                            secure=request.url.scheme == "https", path="/")
        return {"username": user.username, "role": user.role}

    @app.post("/api/logout")
    def logout(request: Request, response: Response, user: User = Depends(current_user)) -> dict:
        auth.logout(request.cookies.get(SESSION_COOKIE))
        response.delete_cookie(SESSION_COOKIE, path="/")
        return {"ok": True}

    @app.get("/api/me")
    def me(user: User = Depends(current_user)) -> dict:
        return {"username": user.username, "role": user.role}

    # ---------------------------------------------------------------- status

    @app.get("/api/health")
    def health(request: Request) -> dict:
        """Minimal for anonymous callers (the launcher); full details for signed-in users."""
        user = auth.user_for(request.cookies.get(SESSION_COOKIE))
        if user is None:
            return {"ok": True, "setup_required": auth.user_count() == 0}
        ollama: dict = {"url": settings.ollama_url, "reachable": False, "models": [], "agent_model": settings.agent_model, "chairman_model": settings.chairman_model}
        try:
            models = client.list_models()
            ollama.update(reachable=True, models=models, agent_model_ready=client.has_model(models, settings.agent_model),
                          chairman_model_ready=client.has_model(models, settings.chairman_model))
        except OllamaError as exc:
            ollama["error"] = str(exc)
        beat = (db.get_meta("worker_heartbeat") or "0||").split("|")
        age = time.time() - float(beat[0] or 0)
        worker = {"alive": age < 10, "last_seen_s": round(age, 1) if float(beat[0] or 0) > 0 else None}
        return {
            "ok": True, "ollama": ollama, "worker": worker, "queue": db.counts(), "db": str(settings.db_path),
            "profile": {"name": (p := store.profile()).name, "domains": list(p.internal_domains), "teams": len(p.teams), "kb_articles": len(p.kb),
                        "source": p.source, "configured": store.configured()},
            "jira": {"activated_at": db.get_meta("jira_activated_at"), "watermark": db.get_meta("jira_watermark")},
        }

    @app.get("/api/profile")
    def get_profile(user: User = Depends(current_user)) -> dict:
        p = store.profile()
        return {"name": p.name, "teams": list(p.team_names), "categories": list(p.category_names), "priorities": ["P1", "P2", "P3", "P4"]}

    @app.get("/api/samples")
    def samples(user: User = Depends(current_user)) -> list[dict]:
        return SAMPLE_TICKETS

    # ---------------------------------------------------------------- tickets

    @app.post("/api/tickets", status_code=201)
    def create_ticket(t: TicketIn, user: User = Depends(current_user)) -> dict:
        ticket_id = db.add_ticket(t.requester, t.subject, t.body, source=f"dashboard:{user.username}")
        return {"id": ticket_id, "status": "queued"}

    @app.get("/api/tickets")
    def list_tickets(limit: int = Query(50, ge=1, le=500), user: User = Depends(current_user)) -> list[dict]:
        rows = db.list_tickets(limit)
        with db.connect() as c:
            reviewed = {r[0]: r[1] for r in c.execute("SELECT ticket_id, verdict FROM feedback WHERE id IN (SELECT MAX(id) FROM feedback GROUP BY ticket_id)")}
        for r in rows:
            r["review"] = reviewed.get(r["id"])
        return rows

    @app.get("/api/tickets/{ticket_id}")
    def get_ticket(ticket_id: int, user: User = Depends(current_user)) -> dict:
        ticket = db.get_ticket(ticket_id)
        if ticket is None:
            raise HTTPException(404, "Ticket not found.")
        ticket["feedback"] = latest_feedback(db, ticket_id)
        return ticket

    @app.post("/api/tickets/{ticket_id}/feedback")
    def feedback(ticket_id: int, body: FeedbackIn, user: User = Depends(current_user)) -> dict:
        try:
            return add_feedback(db, store.profile(), ticket_id, user.username, body.verdict, priority=body.priority, escalate_to=body.escalate_to,
                                security_flag=body.security_flag, category=body.category, note=body.note)
        except FeedbackError as exc:
            raise HTTPException(404 if "not found" in str(exc) else 400, str(exc)) from exc

    # ---------------------------------------------------------------- report

    @app.get("/api/report")
    def report(days: int | None = Query(None, ge=1, le=3650), user: User = Depends(current_user)) -> dict:
        return build_report(db, days)

    @app.get("/api/report.csv")
    def report_csv(days: int | None = Query(None, ge=1, le=3650), user: User = Depends(current_user)) -> PlainTextResponse:
        return PlainTextResponse(export_csv(db, days), media_type="text/csv",
                                 headers={"Content-Disposition": 'attachment; filename="sentineldesk-pilot-report.csv"'})

    # ---------------------------------------------------------------- users (admin)

    @app.get("/api/users")
    def users(admin: User = Depends(admin_user)) -> list[dict]:
        return auth.list_users()

    @app.post("/api/users", status_code=201)
    def add_user(body: UserIn, admin: User = Depends(admin_user)) -> dict:
        try:
            u = auth.create_user(body.username, body.password, body.role)
        except AuthError as exc:
            raise HTTPException(400, str(exc)) from exc
        db.add_event(None, "auth", "info", f"{admin.username} created user {u.username} ({u.role}).")
        return {"username": u.username, "role": u.role}

    @app.post("/api/users/{username}/disable")
    def disable(username: str, admin: User = Depends(admin_user)) -> dict:
        if username.lower() == admin.username:
            raise HTTPException(400, "You cannot disable your own account.")
        try:
            auth.disable_user(username)
        except AuthError as exc:
            raise HTTPException(404, str(exc)) from exc
        db.add_event(None, "auth", "warn", f"{admin.username} disabled user {username}.")
        return {"ok": True}

    # ---------------------------------------------------------------- first-run setup

    @app.get("/api/setup/status")
    def setup_status(request: Request) -> dict:
        """Anonymous: just enough for the page to decide between setup, sign-in and the inbox."""
        signed_in = auth.user_for(request.cookies.get(SESSION_COOKIE)) is not None
        out = {"needs_account": auth.user_count() == 0}
        if signed_in:
            jira = store.jira()
            out |= {"configured": store.configured(), "managed_by_file": store.managed_by_file, "jira_enabled": jira is not None,
                    "kb_articles": len(store.profile().kb) if store.configured() else 0}
        return out

    @app.post("/api/setup/account")
    def setup_account(body: SetupAccountIn, request: Request, response: Response) -> dict:
        if request.headers.get(CSRF_HEADER) != "1":
            raise HTTPException(403, "Missing X-SentinelDesk header.")
        try:
            auth.create_first_admin(body.token, body.username, body.password)
            user, token = auth.login(body.username, body.password)
        except AuthError as exc:
            raise HTTPException(400, str(exc)) from exc
        response.set_cookie(SESSION_COOKIE, token, max_age=SESSION_HOURS * 3600, httponly=True, samesite="strict",
                            secure=request.url.scheme == "https", path="/")
        return {"username": user.username, "role": user.role}

    # ---------------------------------------------------------------- settings (admin)

    def editable() -> None:
        if store.managed_by_file:
            raise HTTPException(409, f"Settings are managed in {store.path}. Edit that file, or unset SENTINEL_CONFIG to edit them here.")

    def save(data: dict) -> None:
        try:
            store.write(data)
        except (ProfileError, ValueError) as exc:
            raise HTTPException(400, str(exc)) from exc

    @app.get("/api/settings")
    def get_settings(admin: User = Depends(admin_user)) -> dict:
        raw = store.raw()
        org = raw.get("organization") or {}
        jira = raw.get("jira") or {}
        key = re.search(r'project\s*=\s*"?([A-Z][A-Z0-9_]*)"?', jira.get("jql", ""))
        start = jira.get("start_from", "now")
        return {
            "configured": store.configured(),
            "managed_by_file": store.managed_by_file,
            "path": str(store.path),
            "organization": {"name": org.get("name", ""), "domains": org.get("domains", []), "security_team": org.get("security_team", "")},
            "teams": raw.get("teams", []),
            "jira": {
                "enabled": bool(jira.get("enabled")), "base_url": jira.get("base_url", ""), "project_key": key.group(1) if key else "",
                "mode": jira.get("mode", "shadow"), "priority_map": jira.get("priority_map", {}),
                # Suggest 30 days of history on first setup, so the report has numbers from day one.
                "history_days": 30 if not jira else 0 if start == "now" else max(0, (date.today() - date.fromisoformat(str(start))).days),
                "custom_jql": bool(jira.get("jql")) and not key,
            },
            "secrets": store.masked_secrets(),
            "kb": [{"id": a["id"], "title": a["title"]} for a in store.profile().kb] if store.configured() else [],
        }

    @app.put("/api/settings/organization")
    def save_organization(body: OrgIn, admin: User = Depends(admin_user)) -> dict:
        editable()
        domains = list(dict.fromkeys(d.strip().lower().lstrip("@") for d in body.domains if d.strip()))
        bad = [d for d in domains if not _DOMAIN.match(d)]
        if bad or not domains:
            raise HTTPException(400, f"These don't look like email domains: {', '.join(bad) or '(none)'}. Use e.g. acme.com")
        teams = [{"name": t.name.strip(), "handles": t.handles.strip() or t.name.strip()} for t in body.teams if t.name.strip()]
        names = [t["name"] for t in teams]
        if len(set(names)) != len(names):
            raise HTTPException(400, "Each team needs a different name.")
        if body.security_team not in names:
            raise HTTPException(400, "Pick which of your teams handles security incidents.")
        raw = store.raw()
        raw["organization"] = {**(raw.get("organization") or {}), "name": body.name.strip(), "domains": domains, "security_team": body.security_team}
        raw["organization"].pop("brand_tokens", None)  # re-derived from the domains
        raw["organization"]["security_kb"] = [i for i in raw["organization"].get("security_kb", []) if i]
        raw["teams"] = teams
        # Keep keyword routing that still points at an existing team; drop references to removed teams.
        cats = raw.get("categories") or [dict(c) for c in DEFAULT_CATEGORIES]
        raw["categories"] = [{k: v for k, v in c.items() if k != "team" or v in names} for c in cats]
        raw.setdefault("priority_rules", dict(DEFAULT_PRIORITY_RULES))
        if raw.get("jira", {}).get("team_map"):
            raw["jira"]["team_map"] = {k: v for k, v in raw["jira"]["team_map"].items() if v in names}
        save(raw)
        db.add_event(None, "settings", "info", f"{admin.username} updated the organisation settings.")
        return get_settings(admin)

    def jira_client(body: JiraTestIn) -> JiraClient:
        base = body.base_url.strip().rstrip("/")
        if not re.match(r"^https?://", base):
            base = "https://" + base
        cfg = JiraConfig.from_dict({"enabled": True, "base_url": base, "deployment": deployment_for(base), "jql": "project is not EMPTY"})
        assert cfg is not None
        stored = store.credentials()
        creds = JiraCredentials(email=body.email or stored.email, api_token=body.api_token or stored.api_token, pat=body.pat or stored.pat)
        return JiraClient(cfg, creds)

    @app.post("/api/settings/jira/test")
    def test_jira(body: JiraTestIn, admin: User = Depends(admin_user)) -> dict:
        try:
            client = jira_client(body)
            me = client.myself()
            desks = client.service_desks()
            priorities = client.priorities()
        except (ValueError, LocalOnlyError, JiraError) as exc:
            raise HTTPException(400, str(exc)) from exc
        return {"ok": True, "account": me.get("displayName") or me.get("name") or "unknown", "deployment": client.cfg.deployment,
                "base_url": client.cfg.base_url, "service_desks": desks, "priorities": priorities,
                "suggested_priority_map": suggest_priority_map(priorities)}

    @app.put("/api/settings/jira")
    def save_jira(body: JiraIn, admin: User = Depends(admin_user)) -> dict:
        editable()
        if not store.configured():
            raise HTTPException(409, "Set up your organisation first.")
        raw = store.raw()
        old = raw.get("jira") or {}
        if not body.enabled:
            raw["jira"] = {**old, "enabled": False}
            save(raw)
            db.add_event(None, "settings", "warn", f"{admin.username} turned the Jira connector off.")
            return get_settings(admin)
        if not _PROJECT_KEY.match(body.project_key):
            raise HTTPException(400, "Choose the service desk (project) to watch.")
        client = jira_client(body)  # normalises the URL and checks it
        base = client.cfg.base_url
        start = "now" if body.history_days == 0 else (date.today() - timedelta(days=body.history_days)).isoformat()
        raw["jira"] = {
            **{k: v for k, v in old.items() if k in ("team_field", "team_map", "max_per_poll", "poll_interval_s", "outcome_after_hours")},
            "enabled": True, "deployment": client.cfg.deployment, "base_url": base, "jql": f'project = "{body.project_key}"',
            "mode": body.mode, "start_from": start, "priority_map": dict(body.priority_map),
        }
        save(raw)
        if client.cfg.deployment == "cloud":
            store.save_secrets(jira_email=body.email, jira_api_token=body.api_token)
        else:
            store.save_secrets(jira_pat=body.pat)
        if old.get("base_url") != base or old.get("jql") != raw["jira"]["jql"]:
            db.set_meta("jira_watermark", "")  # a different site or project starts from its own beginning
        db.add_event(None, "settings", "info", f"{admin.username} connected Jira project {body.project_key} ({body.mode}).")
        return get_settings(admin)

    @app.post("/api/settings/kb")
    def upload_kb(body: KbUploadIn, admin: User = Depends(admin_user)) -> dict:
        editable()
        if not store.configured():
            raise HTTPException(409, "Set up your organisation first.")
        existing = {a["id"] for a in store.profile().kb}
        prepared: list[tuple[Path, str]] = []
        for f in body.files:
            stem = re.sub(r"[^A-Za-z0-9._-]+", "-", Path(f.name).stem).strip("-.")[:60] or "article"
            if Path(f.name).suffix.lower() not in (".md", ".txt", ".markdown", ""):
                raise HTTPException(400, f"{f.name}: upload Markdown (.md) or text (.txt) files.")
            text = f.content.replace("\r\n", "\n").strip()
            if not text.startswith("---") and not text.startswith("#"):
                text = f"# {stem.replace('-', ' ').replace('_', ' ')}\n\n{text}"
            target = store.kb_dir / f"{stem}.md"
            tmp = store.kb_dir / f".check-{stem}.md"
            store.kb_dir.mkdir(parents=True, exist_ok=True)
            tmp.write_text(text, encoding="utf-8")
            try:
                article = _parse_markdown_article(tmp)
            except ProfileError as exc:
                raise HTTPException(400, f"{f.name}: {exc}") from exc
            finally:
                tmp.unlink(missing_ok=True)
            replacing = target.exists() and _parse_markdown_article(target)["id"] == article["id"]
            if article["id"] in existing and not replacing:
                raise HTTPException(400, f"{f.name}: an article with id {article['id']} already exists.")
            existing.add(article["id"])
            prepared.append((target, text))
        for target, text in prepared:
            target.write_text(text, encoding="utf-8")
        raw = store.raw()
        raw.setdefault("knowledge_base", {})["dir"] = "kb"
        save(raw)
        db.add_event(None, "settings", "info", f"{admin.username} added {len(prepared)} help article(s).")
        return get_settings(admin)

    @app.delete("/api/settings/kb/{article_id}")
    def delete_kb(article_id: str, admin: User = Depends(admin_user)) -> dict:
        editable()
        for path in store.kb_dir.glob("*.md") if store.kb_dir.is_dir() else []:
            if _parse_markdown_article(path)["id"] == article_id:
                path.unlink()
                raw = store.raw()
                org = raw.get("organization") or {}
                org["security_kb"] = [i for i in org.get("security_kb", []) if i != article_id]
                save(raw)  # also bumps the version so readers reload
                db.add_event(None, "settings", "info", f"{admin.username} removed help article {article_id}.")
                return get_settings(admin)
        raise HTTPException(404, "Only uploaded articles can be removed here; others are in the settings file.")

    # ---------------------------------------------------------------- live log

    @app.get("/api/stream")
    async def stream(request: Request, after: int | None = Query(None, ge=0), timeout: float = Query(0, ge=0, le=3600),
                     user: User = Depends(current_user)) -> StreamingResponse:
        """Server-sent events for the execution log. `after` resumes from an event id; `timeout`
        (seconds, 0 = until the client disconnects) lets scripts take a bounded snapshot."""
        last = db.last_event_id() if after is None else after
        deadline = time.monotonic() + timeout if timeout else None
        token = request.cookies.get(SESSION_COOKIE)

        async def gen():
            nonlocal last
            yield f"event: hello\ndata: {json.dumps({'last': last})}\n\n"
            idle = 0.0
            while deadline is None or time.monotonic() < deadline:
                if await request.is_disconnected():
                    return
                if auth.user_for(token) is None:  # signed out or disabled mid-stream
                    yield "event: logout\ndata: {}\n\n"
                    return
                events = await asyncio.to_thread(db.events_after, last)
                for e in events:
                    last = e["id"]
                    yield f"id: {e['id']}\nevent: log\ndata: {json.dumps(e)}\n\n"
                if events:
                    idle = 0.0
                else:
                    idle += 0.4
                    if idle >= 15:
                        idle = 0.0
                        yield ": ping\n\n"
                await asyncio.sleep(0.4)

        return StreamingResponse(gen(), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})

    return app


def app_from_env() -> FastAPI:
    """Factory for uvicorn (`--factory`), so importing this module has no side effects."""
    return create_app(Settings.from_env())
