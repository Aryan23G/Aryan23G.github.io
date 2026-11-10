"""Agent-loop worker: claims queued tickets from SQLite, runs the council, stores everything.

Run with `python -m sentineldesk_local.worker` (run.py starts it for you).
"""

from __future__ import annotations

import signal
import threading
import time

from .config import Settings
from .council import Council
from .db import Database
from .ollama_client import OllamaClient
from .profile import OrgProfile, demo_profile


class DbObserver:
    """Writes the council's live log and per-agent runs for one ticket."""

    def __init__(self, db: Database, ticket_id: int):
        self.db = db
        self.ticket_id = ticket_id

    def event(self, agent: str, level: str, message: str) -> None:
        self.db.add_event(self.ticket_id, agent, level, message)

    def agent_run(self, agent: str, model: str, status: str, duration_ms: int, prompt_tokens: int, output_tokens: int, output: dict | None, error: str | None) -> None:
        self.db.add_agent_run(self.ticket_id, agent, model, status, duration_ms, prompt_tokens, output_tokens, output, error)


class Worker:
    def __init__(self, db: Database, client: OllamaClient, agent_model: str, chairman_model: str, poll_ms: int = 500, stale_after_s: int = 900, profile: OrgProfile | None = None):
        self.db = db
        self.profile = profile or demo_profile()
        self.client = client
        self.agent_model = agent_model
        self.chairman_model = chairman_model
        self.poll_s = poll_ms / 1000
        self.stale_after_s = stale_after_s
        self.stop_event = threading.Event()

    def process_one(self) -> int | None:
        """Claim and triage one ticket. Returns its id, or None if the queue was empty."""
        row = self.db.claim_next()
        if row is None:
            return None
        ticket_id = int(row["id"])
        observer = DbObserver(self.db, ticket_id)
        started = time.monotonic()
        observer.event("system", "info", f"Worker claimed ticket #{ticket_id} (attempt {row['attempts']}).")
        try:
            council = Council(self.client, self.agent_model, self.chairman_model, observer, profile=self.profile)
            result = council.run(row["subject"], row["body"], row["requester"])
            self.db.complete(ticket_id, final=result.final, mode=result.mode, model=result.model, evidence=result.evidence, fallback_reason=result.fallback_reason)
            observer.event("system", "info", f"Ticket #{ticket_id} done in {time.monotonic() - started:.1f}s ({result.mode}).")
        except Exception as exc:  # the council degrades on model errors; this is a bug or a DB failure
            self.db.fail(ticket_id, f"{exc.__class__.__name__}: {exc}")
            observer.event("system", "error", f"Ticket #{ticket_id} failed: {exc.__class__.__name__}: {exc}")
        return ticket_id

    def _heartbeat(self) -> None:
        # Separate thread so the dashboard sees the worker as alive during long model calls.
        while not self.stop_event.is_set():
            self.db.set_meta("worker_heartbeat", f"{time.time():.3f}|{self.agent_model}|{self.chairman_model}")
            self.stop_event.wait(2)

    def run_forever(self) -> None:
        beat = threading.Thread(target=self._heartbeat, name="heartbeat", daemon=True)
        beat.start()
        recovered = self.db.requeue_stale(self.stale_after_s)
        if recovered:
            self.db.add_event(None, "system", "warn", f"Worker requeued {recovered} ticket(s) left running by a previous worker.")
        self.db.add_event(None, "system", "info", f"Worker online for {self.profile.name}: subagents on {self.agent_model}, Chairman on {self.chairman_model}.")
        while not self.stop_event.is_set():
            if self.process_one() is None:
                self.stop_event.wait(self.poll_s)
        beat.join(timeout=5)  # so its last write cannot land after the "stopped" marker below
        self.db.set_meta("worker_heartbeat", f"0|{self.agent_model}|{self.chairman_model}")
        self.db.add_event(None, "system", "info", "Worker stopped.")


def main() -> None:
    settings = Settings.from_env()
    db = Database(settings.db_path)
    db.init()
    worker = Worker(
        db,
        OllamaClient(settings.ollama_url, settings.request_timeout_s),
        settings.agent_model,
        settings.chairman_model,
        settings.worker_poll_ms,
        # A ticket can legitimately run for several model timeouts; only reclaim beyond that.
        max(settings.stale_after_s, settings.request_timeout_s * 10),
        profile=settings.load_profile(),
    )
    # Finish the current ticket, then exit, on Ctrl+C or a terminate from run.py.
    signal.signal(signal.SIGTERM, lambda *_: worker.stop_event.set())
    signal.signal(signal.SIGINT, lambda *_: worker.stop_event.set())
    worker.run_forever()


if __name__ == "__main__":
    main()
