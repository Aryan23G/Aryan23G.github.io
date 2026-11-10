"""SQLite persistence (sentineldesk.db): every ticket, every agent run and every log event.

The web process and the worker process share the file. WAL mode lets the dashboard read while
the worker writes; `claim_next` uses BEGIN IMMEDIATE so two workers can never take the same ticket.
Each call opens its own short-lived connection, which is the safe pattern across threads/processes.
"""

from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Iterator

SCHEMA_VERSION = 3

_SCHEMA = """
CREATE TABLE IF NOT EXISTS tickets (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at     TEXT NOT NULL,
    source         TEXT NOT NULL DEFAULT 'dashboard',
    requester      TEXT NOT NULL,
    subject        TEXT NOT NULL,
    body           TEXT NOT NULL,
    status         TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'done', 'failed')),
    attempts       INTEGER NOT NULL DEFAULT 0,
    claimed_at     TEXT,
    finished_at    TEXT,
    mode           TEXT,
    model          TEXT,
    priority       TEXT,
    category       TEXT,
    security_flag  INTEGER,
    escalate_to    TEXT,
    confidence     REAL,
    overrides      INTEGER,
    final_json     TEXT,
    evidence_json  TEXT,
    fallback_reason TEXT,
    error          TEXT
);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status, id);

CREATE TABLE IF NOT EXISTS agent_runs (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id      INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    agent          TEXT NOT NULL,
    model          TEXT NOT NULL,
    status         TEXT NOT NULL CHECK (status IN ('ok', 'failed')),
    created_at     TEXT NOT NULL,
    duration_ms    INTEGER NOT NULL,
    prompt_tokens  INTEGER NOT NULL DEFAULT 0,
    output_tokens  INTEGER NOT NULL DEFAULT 0,
    output_json    TEXT,
    error          TEXT
);
CREATE INDEX IF NOT EXISTS idx_runs_ticket ON agent_runs(ticket_id);

CREATE TABLE IF NOT EXISTS events (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id  INTEGER REFERENCES tickets(id) ON DELETE CASCADE,
    ts         TEXT NOT NULL,
    agent      TEXT NOT NULL,
    level      TEXT NOT NULL CHECK (level IN ('info', 'warn', 'alert', 'error')),
    message    TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_ticket ON events(ticket_id, id);

CREATE TABLE IF NOT EXISTS meta (
    key    TEXT PRIMARY KEY,
    value  TEXT NOT NULL
);
"""

# v2: tickets from external systems (Jira), the write-back outbox, human outcomes and analyst feedback.
_V2_COLUMNS = (
    "external_key TEXT",
    "external_url TEXT",
    "external_created TEXT",
    "backfill INTEGER NOT NULL DEFAULT 0",
    "writeback_status TEXT NOT NULL DEFAULT 'none'",   # none | pending | posted | skipped | failed
    "writeback_attempts INTEGER NOT NULL DEFAULT 0",
    "writeback_next_at TEXT",
    "writeback_error TEXT",
    "outcome_status TEXT NOT NULL DEFAULT 'none'",     # none | pending | recorded
    "human_priority TEXT",
    "human_team TEXT",
    "outcome_raw TEXT",
    "outcome_at TEXT",
)
_V2_SCHEMA = """
CREATE UNIQUE INDEX IF NOT EXISTS idx_tickets_external ON tickets(external_key) WHERE external_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tickets_writeback ON tickets(writeback_status, writeback_next_at);
CREATE TABLE IF NOT EXISTS feedback (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id      INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    username       TEXT NOT NULL,
    created_at     TEXT NOT NULL,
    verdict        TEXT NOT NULL CHECK (verdict IN ('accept', 'correct')),
    priority       TEXT CHECK (priority IN ('P1', 'P2', 'P3', 'P4')),
    escalate_to    TEXT,
    security_flag  INTEGER,
    category       TEXT,
    note           TEXT
);
CREATE INDEX IF NOT EXISTS idx_feedback_ticket ON feedback(ticket_id, id);
"""

# v3: dashboard accounts and sessions.
_V3_SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT NOT NULL UNIQUE,
    pw_hash     TEXT NOT NULL,
    role        TEXT NOT NULL CHECK (role IN ('admin', 'analyst')),
    created_at  TEXT NOT NULL,
    last_login  TEXT,
    disabled    INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS sessions (
    token_hash  TEXT PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at  TEXT NOT NULL,
    expires_at  TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS login_failures (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    username  TEXT NOT NULL,
    at        TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_login_failures ON login_failures(username, at);
"""


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds")


class Database:
    def __init__(self, path: Path | str):
        self.path = Path(path)

    @contextmanager
    def connect(self) -> Iterator[sqlite3.Connection]:
        conn = sqlite3.connect(self.path, timeout=10, isolation_level=None)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        conn.execute("PRAGMA busy_timeout = 10000")
        try:
            yield conn
        finally:
            conn.close()

    # ---------------------------------------------------------------- lifecycle

    def is_initialized(self) -> bool:
        if not self.path.exists():
            return False
        with self.connect() as c:
            return c.execute("PRAGMA user_version").fetchone()[0] >= SCHEMA_VERSION

    def init(self) -> None:
        """Create or upgrade the schema. Safe to call on every start."""
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as c:
            c.execute("PRAGMA journal_mode = WAL")
            version = c.execute("PRAGMA user_version").fetchone()[0]
            if version > SCHEMA_VERSION:
                raise RuntimeError(f"{self.path} has schema v{version}, newer than this code (v{SCHEMA_VERSION}).")
            c.executescript(_SCHEMA)
            if version < 2:
                existing = {r["name"] for r in c.execute("PRAGMA table_info(tickets)")}
                for col in _V2_COLUMNS:
                    if col.split()[0] not in existing:
                        c.execute(f"ALTER TABLE tickets ADD COLUMN {col}")
            c.executescript(_V2_SCHEMA)
            c.executescript(_V3_SCHEMA)
            c.execute(f"PRAGMA user_version = {SCHEMA_VERSION}")

    # ---------------------------------------------------------------- tickets

    def add_ticket(
        self, requester: str, subject: str, body: str, source: str = "dashboard", *,
        external_key: str | None = None, external_url: str | None = None, external_created: str | None = None, backfill: bool = False,
    ) -> int | None:
        """Queue a ticket. Returns None if `external_key` was already imported (idempotent ingestion)."""
        with self.connect() as c:
            cur = c.execute(
                """INSERT OR IGNORE INTO tickets (created_at, source, requester, subject, body, external_key, external_url, external_created, backfill)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (now_iso(), source, requester, subject, body, external_key, external_url, external_created, int(backfill)),
            )
            if cur.rowcount == 0:
                return None
            ticket_id = int(cur.lastrowid)
            label = f"{external_key} from {source}" if external_key else f"from {source}"
            note = " (read-only import for the accuracy report)" if backfill else ""
            c.execute("INSERT INTO events (ticket_id, ts, agent, level, message) VALUES (?, ?, 'system', 'info', ?)", (ticket_id, now_iso(), f"Ticket #{ticket_id} received: {label}{note}."))
            return ticket_id

    def known_external_keys(self, keys: list[str]) -> set[str]:
        if not keys:
            return set()
        with self.connect() as c:
            marks = ",".join("?" * len(keys))
            return {r[0] for r in c.execute(f"SELECT external_key FROM tickets WHERE external_key IN ({marks})", keys)}

    def claim_next(self) -> sqlite3.Row | None:
        """Atomically move the oldest queued ticket to running and return it."""
        with self.connect() as c:
            c.execute("BEGIN IMMEDIATE")
            try:
                row = c.execute("SELECT id FROM tickets WHERE status = 'queued' ORDER BY id LIMIT 1").fetchone()
                if row is None:
                    c.execute("COMMIT")
                    return None
                c.execute("UPDATE tickets SET status = 'running', claimed_at = ?, attempts = attempts + 1 WHERE id = ?", (now_iso(), row["id"]))
                ticket = c.execute("SELECT * FROM tickets WHERE id = ?", (row["id"],)).fetchone()
                c.execute("COMMIT")
                return ticket
            except BaseException:
                c.execute("ROLLBACK")
                raise

    def requeue_stale(self, older_than_s: int) -> int:
        """Return tickets stuck in 'running' (a worker died) to the queue."""
        cutoff = (datetime.now(timezone.utc) - timedelta(seconds=older_than_s)).isoformat(timespec="milliseconds")
        with self.connect() as c:
            cur = c.execute("UPDATE tickets SET status = 'queued', claimed_at = NULL WHERE status = 'running' AND claimed_at < ?", (cutoff,))
            return cur.rowcount

    def complete(self, ticket_id: int, *, final: dict, mode: str, model: str, evidence: dict, fallback_reason: str | None,
                 writeback: str = "none", outcome: str = "none") -> None:
        with self.connect() as c:
            c.execute(
                """UPDATE tickets SET status = 'done', finished_at = ?, mode = ?, model = ?, priority = ?, category = ?,
                   security_flag = ?, escalate_to = ?, confidence = ?, overrides = ?, final_json = ?, evidence_json = ?,
                   fallback_reason = ?, error = NULL, writeback_status = ?, outcome_status = ? WHERE id = ?""",
                (now_iso(), mode, model, final["priority"], final["category"], int(final["security_flag"]), final["escalate_to"],
                 final["confidence"], len(final["overrides"]), json.dumps(final), json.dumps(evidence), fallback_reason,
                 writeback, outcome, ticket_id),
            )

    # ---------------------------------------------------------------- write-back outbox and outcomes

    def writebacks_due(self, limit: int = 20) -> list[sqlite3.Row]:
        with self.connect() as c:
            return c.execute(
                """SELECT * FROM tickets WHERE writeback_status = 'pending' AND (writeback_next_at IS NULL OR writeback_next_at <= ?)
                   ORDER BY id LIMIT ?""", (now_iso(), limit),
            ).fetchall()

    def set_writeback(self, ticket_id: int, status: str, *, error: str | None = None, next_at: str | None = None, attempted: bool = True) -> None:
        with self.connect() as c:
            c.execute(
                "UPDATE tickets SET writeback_status = ?, writeback_error = ?, writeback_next_at = ?, writeback_attempts = writeback_attempts + ? WHERE id = ?",
                (status, error, next_at, int(attempted), ticket_id),
            )

    def outcomes_due(self, created_before: str, limit: int = 20) -> list[sqlite3.Row]:
        with self.connect() as c:
            return c.execute(
                """SELECT * FROM tickets WHERE outcome_status = 'pending' AND status = 'done'
                   AND (backfill = 1 OR external_created <= ?) ORDER BY id LIMIT ?""", (created_before, limit),
            ).fetchall()

    def set_outcome(self, ticket_id: int, *, status: str, human_priority: str | None = None, human_team: str | None = None, raw: dict | None = None) -> None:
        with self.connect() as c:
            c.execute(
                "UPDATE tickets SET outcome_status = ?, human_priority = ?, human_team = ?, outcome_raw = ?, outcome_at = ? WHERE id = ?",
                (status, human_priority, human_team, json.dumps(raw) if raw is not None else None, now_iso(), ticket_id),
            )

    def fail(self, ticket_id: int, error: str) -> None:
        with self.connect() as c:
            c.execute("UPDATE tickets SET status = 'failed', finished_at = ?, error = ? WHERE id = ?", (now_iso(), error[:1000], ticket_id))

    def get_ticket(self, ticket_id: int) -> dict | None:
        with self.connect() as c:
            row = c.execute("SELECT * FROM tickets WHERE id = ?", (ticket_id,)).fetchone()
            if row is None:
                return None
            runs = c.execute("SELECT * FROM agent_runs WHERE ticket_id = ? ORDER BY id", (ticket_id,)).fetchall()
            events = c.execute("SELECT * FROM events WHERE ticket_id = ? ORDER BY id", (ticket_id,)).fetchall()
        return {**_ticket_dict(row), "agent_runs": [_run_dict(r) for r in runs], "events": [dict(e) for e in events]}

    def list_tickets(self, limit: int = 50) -> list[dict]:
        with self.connect() as c:
            rows = c.execute("SELECT * FROM tickets ORDER BY id DESC LIMIT ?", (max(1, min(limit, 500)),)).fetchall()
            ids = [r["id"] for r in rows]
            reports: dict[int, dict] = {}
            if ids:
                marks = ",".join("?" * len(ids))
                for r in c.execute(f"SELECT ticket_id, agent, output_json FROM agent_runs WHERE status = 'ok' AND ticket_id IN ({marks}) ORDER BY id", ids):
                    reports.setdefault(r["ticket_id"], {})[r["agent"]] = json.loads(r["output_json"])
        return [{**_ticket_dict(r, with_body=False), "reports": reports.get(r["id"], {})} for r in rows]

    def counts(self) -> dict[str, int]:
        with self.connect() as c:
            rows = c.execute("SELECT status, COUNT(*) AS n FROM tickets GROUP BY status").fetchall()
        out = {"queued": 0, "running": 0, "done": 0, "failed": 0}
        out.update({r["status"]: r["n"] for r in rows})
        return out

    # ---------------------------------------------------------------- agent log

    def add_event(self, ticket_id: int | None, agent: str, level: str, message: str) -> int:
        with self.connect() as c:
            cur = c.execute("INSERT INTO events (ticket_id, ts, agent, level, message) VALUES (?, ?, ?, ?, ?)", (ticket_id, now_iso(), agent, level, message[:2000]))
            return int(cur.lastrowid)

    def add_agent_run(self, ticket_id: int, agent: str, model: str, status: str, duration_ms: int, prompt_tokens: int, output_tokens: int, output: dict | None, error: str | None) -> None:
        with self.connect() as c:
            c.execute(
                """INSERT INTO agent_runs (ticket_id, agent, model, status, created_at, duration_ms, prompt_tokens, output_tokens, output_json, error)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (ticket_id, agent, model, status, now_iso(), duration_ms, prompt_tokens, output_tokens, json.dumps(output) if output is not None else None, error),
            )

    def events_after(self, after_id: int, limit: int = 200) -> list[dict]:
        with self.connect() as c:
            rows = c.execute("SELECT * FROM events WHERE id > ? ORDER BY id LIMIT ?", (after_id, limit)).fetchall()
        return [dict(r) for r in rows]

    def set_meta(self, key: str, value: str) -> None:
        with self.connect() as c:
            c.execute("INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", (key, value))

    def get_meta(self, key: str) -> str | None:
        with self.connect() as c:
            row = c.execute("SELECT value FROM meta WHERE key = ?", (key,)).fetchone()
        return row["value"] if row else None

    def last_event_id(self) -> int:
        with self.connect() as c:
            return int(c.execute("SELECT COALESCE(MAX(id), 0) FROM events").fetchone()[0])


def _ticket_dict(row: sqlite3.Row, with_body: bool = True) -> dict:
    d = dict(row)
    d["security_flag"] = None if d["security_flag"] is None else bool(d["security_flag"])
    d["final"] = json.loads(d.pop("final_json")) if d.get("final_json") else None
    d["evidence"] = json.loads(d.pop("evidence_json")) if d.get("evidence_json") else None
    d["outcome"] = json.loads(d.pop("outcome_raw")) if d.get("outcome_raw") else None
    d["backfill"] = bool(d.get("backfill"))
    if not with_body:
        d.pop("body", None)
        d.pop("evidence", None)
    return d


def _run_dict(row: sqlite3.Row) -> dict:
    d = dict(row)
    d["output"] = json.loads(d.pop("output_json")) if d.get("output_json") else None
    return d
