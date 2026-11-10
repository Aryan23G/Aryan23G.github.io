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
from pathlib import Path
from typing import Literal

from fastapi import Depends, FastAPI, HTTPException, Query, Request, Response
from fastapi.responses import FileResponse, PlainTextResponse, StreamingResponse
from pydantic import BaseModel, Field, field_validator

from .auth import SESSION_COOKIE, SESSION_HOURS, Auth, AuthError, User
from .config import Settings
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


def create_app(settings: Settings, db: Database | None = None, client: OllamaClient | None = None) -> FastAPI:
    db = db or Database(settings.db_path)
    db.init()
    client = client or OllamaClient(settings.ollama_url, settings.request_timeout_s)
    profile = settings.load_profile()
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
            "profile": {"name": profile.name, "domains": list(profile.internal_domains), "teams": len(profile.teams), "kb_articles": len(profile.kb), "source": profile.source},
            "jira": {"activated_at": db.get_meta("jira_activated_at"), "watermark": db.get_meta("jira_watermark")},
        }

    @app.get("/api/profile")
    def get_profile(user: User = Depends(current_user)) -> dict:
        return {"name": profile.name, "teams": list(profile.team_names), "categories": list(profile.category_names), "priorities": ["P1", "P2", "P3", "P4"]}

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
            return add_feedback(db, profile, ticket_id, user.username, body.verdict, priority=body.priority, escalate_to=body.escalate_to,
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
