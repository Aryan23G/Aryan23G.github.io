"""Local web platform (FastAPI). Serves the dashboard and a small JSON + SSE API over SQLite.

Run with run.py, or: uvicorn sentineldesk_local.web:app_from_env --factory --host 127.0.0.1 --port 8765
"""

from __future__ import annotations

import asyncio
import json
import re
import time
from pathlib import Path

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel, Field, field_validator

from .config import Settings
from .db import Database
from .ollama_client import OllamaClient, OllamaError
from .rules import SAMPLE_TICKETS

STATIC = Path(__file__).parent / "static"
_EMAIL = re.compile(r"^[^\s@<>\"]+@[^\s@<>\"]+\.[^\s@<>\"]+$")


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


def create_app(settings: Settings, db: Database | None = None, client: OllamaClient | None = None) -> FastAPI:
    db = db or Database(settings.db_path)
    db.init()
    client = client or OllamaClient(settings.ollama_url, settings.request_timeout_s)
    profile = settings.load_profile()
    app = FastAPI(title="SentinelDesk Local", docs_url="/api/docs", redoc_url=None)

    @app.get("/", include_in_schema=False)
    def dashboard() -> FileResponse:
        return FileResponse(STATIC / "dashboard.html", media_type="text/html")

    @app.get("/api/health")
    def health() -> dict:
        ollama: dict = {"url": settings.ollama_url, "reachable": False, "models": [], "agent_model": settings.agent_model, "chairman_model": settings.chairman_model}
        try:
            models = client.list_models()
            ollama.update(
                reachable=True,
                models=models,
                agent_model_ready=client.has_model(models, settings.agent_model),
                chairman_model_ready=client.has_model(models, settings.chairman_model),
            )
        except OllamaError as exc:
            ollama["error"] = str(exc)
        beat = (db.get_meta("worker_heartbeat") or "0||").split("|")
        age = time.time() - float(beat[0] or 0)
        worker = {"alive": age < 10, "last_seen_s": round(age, 1) if float(beat[0] or 0) > 0 else None}
        profile_info = {"name": profile.name, "domains": list(profile.internal_domains), "teams": len(profile.teams), "kb_articles": len(profile.kb), "source": profile.source}
        return {"ok": True, "ollama": ollama, "worker": worker, "queue": db.counts(), "db": str(settings.db_path), "profile": profile_info}

    @app.get("/api/samples")
    def samples() -> list[dict]:
        return SAMPLE_TICKETS

    @app.post("/api/tickets", status_code=201)
    def create_ticket(t: TicketIn) -> dict:
        ticket_id = db.add_ticket(t.requester, t.subject, t.body)
        return {"id": ticket_id, "status": "queued"}

    @app.get("/api/tickets")
    def list_tickets(limit: int = Query(50, ge=1, le=500)) -> list[dict]:
        return db.list_tickets(limit)

    @app.get("/api/tickets/{ticket_id}")
    def get_ticket(ticket_id: int) -> dict:
        ticket = db.get_ticket(ticket_id)
        if ticket is None:
            raise HTTPException(404, "Ticket not found.")
        return ticket

    @app.get("/api/stream")
    async def stream(request: Request, after: int | None = Query(None, ge=0), timeout: float = Query(0, ge=0, le=3600)) -> StreamingResponse:
        """Server-sent events for the execution log. `after` resumes from an event id; `timeout`
        (seconds, 0 = until the client disconnects) lets scripts take a bounded snapshot."""
        last = db.last_event_id() if after is None else after
        deadline = time.monotonic() + timeout if timeout else None

        async def gen():
            nonlocal last
            yield f"event: hello\ndata: {json.dumps({'last': last})}\n\n"
            idle = 0.0
            while deadline is None or time.monotonic() < deadline:
                if await request.is_disconnected():
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
