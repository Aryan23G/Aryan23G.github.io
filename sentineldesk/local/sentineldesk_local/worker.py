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
from .connector import JiraSync
from .config import LocalOnlyError
from .config_store import ConfigStore
from .jira import JiraClient, JiraError


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
    def __init__(self, db: Database, client: OllamaClient, agent_model: str, chairman_model: str, poll_ms: int = 500, stale_after_s: int = 900,
                 profile: OrgProfile | None = None, jira: JiraSync | None = None, retention_days: int = 0, store: ConfigStore | None = None):
        self.db = db
        self.retention_days = retention_days
        self._profile = profile
        self.store = store  # when set, profile and Jira settings follow edits made in the browser
        self.jira = jira
        self._jira_key: tuple | None = None
        self.client = client
        self.agent_model = agent_model
        self.chairman_model = chairman_model
        self.poll_s = poll_ms / 1000
        self.stale_after_s = stale_after_s
        self.stop_event = threading.Event()

    @property
    def profile(self) -> OrgProfile:
        if self.store is not None:
            return self.store.profile()
        return self._profile or demo_profile()

    def current_jira(self) -> JiraSync | None:
        """The Jira sync for the current settings; rebuilt when settings or secrets change."""
        if self.store is None:
            return self.jira
        key = self.store.version()
        if key != self._jira_key:
            self._jira_key = key
            cfg = self.store.jira()
            if cfg is None:
                if self.jira is not None:
                    self.db.add_event(None, "connector", "info", "Jira connector turned off.")
                self.jira = None
            else:
                try:
                    self.jira = JiraSync(self.db, JiraClient(cfg, self.store.credentials()), cfg, self.profile.name)
                    self.db.add_event(None, "connector", "info", f"Jira connector using {cfg.base_url} ({cfg.mode}).")
                except LocalOnlyError as exc:
                    self.jira = None
                    self.db.add_event(None, "connector", "error", f"Jira not started: {exc}")
        return self.jira

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
            from_jira = row["source"] == "jira"
            sync = self.current_jira()
            writeback = ("pending" if sync and sync.cfg.mode == "shadow" and not row["backfill"] else "skipped") if from_jira else "none"
            self.db.complete(ticket_id, final=result.final, mode=result.mode, model=result.model, evidence=result.evidence,
                             fallback_reason=result.fallback_reason, writeback=writeback, outcome="pending" if from_jira else "none")
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

    def _connector_loop(self) -> None:
        """Jira polling, write-back and outcome capture, on their own timers and thread, so a slow
        model call never delays a write-back and a Jira outage never blocks triage."""
        due = {"poll": 0.0, "writeback": 0.0, "outcomes": 0.0}
        failures = 0
        active: JiraSync | None = None
        while not self.stop_event.is_set():
            sync = self.current_jira()
            if sync is None:
                self.stop_event.wait(2)
                continue
            if sync is not active:  # new or changed settings: run every step right away
                active, due = sync, {"poll": 0.0, "writeback": 0.0, "outcomes": 0.0}
            every = {"poll": sync.cfg.poll_interval_s, "writeback": 10.0, "outcomes": 300.0}
            now = time.monotonic()
            for step, fn in (("poll", sync.poll_once), ("writeback", sync.writeback_once), ("outcomes", sync.outcomes_once)):
                if now < due[step]:
                    continue
                try:
                    fn()
                    failures = 0
                    due[step] = now + every[step]
                except JiraError as exc:
                    failures += 1
                    backoff = min(600, every[step] * 2 ** min(failures, 5))
                    due[step] = now + backoff
                    self.db.add_event(None, "connector", "warn" if exc.retryable else "error", f"Jira {step} failed: {exc} Next try in {int(backoff)}s.")
                except Exception as exc:  # never let the connector thread die silently
                    due[step] = now + 60
                    self.db.add_event(None, "connector", "error", f"Jira {step} crashed: {exc.__class__.__name__}: {exc}")
            self.stop_event.wait(1)

    def run_forever(self) -> None:
        beat = threading.Thread(target=self._heartbeat, name="heartbeat", daemon=True)
        beat.start()
        connector = threading.Thread(target=self._connector_loop, name="jira", daemon=True) if (self.jira or self.store) else None
        if connector:
            connector.start()
        recovered = self.db.requeue_stale(self.stale_after_s)
        if recovered:
            self.db.add_event(None, "system", "warn", f"Worker requeued {recovered} ticket(s) left running by a previous worker.")
        self.db.add_event(None, "system", "info", f"Worker online for {self.profile.name}: subagents on {self.agent_model}, Chairman on {self.chairman_model}.")
        next_purge = 0.0
        while not self.stop_event.is_set():
            if self.retention_days and time.monotonic() >= next_purge:
                purged = self.db.purge_older_than(self.retention_days)
                if purged:
                    self.db.add_event(None, "system", "info", f"Retention: removed ticket text and model output from {purged} ticket(s) older than {self.retention_days} days.")
                next_purge = time.monotonic() + 6 * 3600
            if self.process_one() is None:
                self.stop_event.wait(self.poll_s)
        beat.join(timeout=5)  # so its last write cannot land after the "stopped" marker below
        if connector:
            connector.join(timeout=30)
        self.db.set_meta("worker_heartbeat", f"0|{self.agent_model}|{self.chairman_model}")
        self.db.add_event(None, "system", "info", "Worker stopped.")


def main() -> None:
    settings = Settings.from_env()
    db = Database(settings.db_path)
    db.init()
    worker = Worker(
        db,
        settings.ollama_client(),
        settings.agent_model,
        settings.chairman_model,
        settings.worker_poll_ms,
        # A ticket can legitimately run for several model timeouts; only reclaim beyond that.
        max(settings.stale_after_s, settings.request_timeout_s * 10),
        retention_days=settings.retention_days,
        store=settings.store(),
    )
    # Finish the current ticket, then exit, on Ctrl+C or a terminate from run.py.
    signal.signal(signal.SIGTERM, lambda *_: worker.stop_event.set())
    signal.signal(signal.SIGINT, lambda *_: worker.stop_event.set())
    worker.run_forever()


if __name__ == "__main__":
    main()
