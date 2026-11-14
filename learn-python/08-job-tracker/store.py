"""Local storage for job applications. SQLite is the source of truth; Notion is a mirror."""

from __future__ import annotations

import sqlite3
from dataclasses import dataclass
from datetime import date, datetime, timezone

STATUSES = ["Wishlist", "Applied", "Interviewing", "Offer", "Rejected", "Withdrawn"]

SCHEMA = """
CREATE TABLE IF NOT EXISTS jobs (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    company          TEXT NOT NULL,
    role             TEXT NOT NULL,
    status           TEXT NOT NULL DEFAULT 'Applied',
    applied_on       TEXT,
    url              TEXT NOT NULL DEFAULT '',
    notes            TEXT NOT NULL DEFAULT '',
    updated_at       TEXT NOT NULL,          -- last LOCAL change (UTC ISO)
    notion_page_id   TEXT UNIQUE,            -- link to the mirror; NULL until first push
    synced_at        TEXT                    -- when local and Notion last agreed
);
"""


def now_utc() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@dataclass
class Job:
    id: int
    company: str
    role: str
    status: str
    applied_on: str | None
    url: str
    notes: str
    updated_at: str
    notion_page_id: str | None
    synced_at: str | None

    @property
    def dirty(self) -> bool:
        """Changed locally since the last sync?"""
        return self.synced_at is None or self.updated_at > self.synced_at


class Store:
    def __init__(self, path: str = "jobs.sqlite"):
        self.db = sqlite3.connect(path)
        self.db.row_factory = sqlite3.Row
        self.db.executescript(SCHEMA)

    def _job(self, row) -> Job:
        return Job(**dict(row))

    def add(self, company: str, role: str, status: str = "Applied",
            applied_on: str | None = None, url: str = "", notes: str = "") -> Job:
        company, role = company.strip(), role.strip()
        if not company or not role:
            raise ValueError("company and role are required")
        status = normalize_status(status)
        if applied_on is None and status != "Wishlist":
            applied_on = date.today().isoformat()
        cur = self.db.execute(
            "INSERT INTO jobs (company, role, status, applied_on, url, notes, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (company, role, status, applied_on, url, notes, now_utc()))
        self.db.commit()
        return self.get(cur.lastrowid)

    def get(self, job_id: int) -> Job:
        row = self.db.execute("SELECT * FROM jobs WHERE id = ?", (job_id,)).fetchone()
        if row is None:
            raise KeyError(f"no job with id {job_id}")
        return self._job(row)

    def all(self, status: str | None = None) -> list[Job]:
        if status:
            rows = self.db.execute("SELECT * FROM jobs WHERE status = ? ORDER BY id",
                                   (normalize_status(status),))
        else:
            rows = self.db.execute("SELECT * FROM jobs ORDER BY id")
        return [self._job(r) for r in rows]

    def update(self, job_id: int, **fields) -> Job:
        allowed = {"company", "role", "status", "applied_on", "url", "notes"}
        fields = {k: v for k, v in fields.items() if k in allowed and v is not None}
        if "status" in fields:
            fields["status"] = normalize_status(fields["status"])
        self.get(job_id)                                    # raises if missing
        if fields:
            sets = ", ".join(f"{k} = ?" for k in fields)
            self.db.execute(f"UPDATE jobs SET {sets}, updated_at = ? WHERE id = ?",
                            (*fields.values(), now_utc(), job_id))
            self.db.commit()
        return self.get(job_id)

    # --- used only by sync: these do NOT bump updated_at ---

    def mark_synced(self, job_id: int, page_id: str, when: str) -> None:
        self.db.execute("UPDATE jobs SET notion_page_id = ?, synced_at = ? WHERE id = ?",
                        (page_id, when, job_id))
        self.db.commit()

    def apply_remote(self, job_id: int, status: str, notes: str, when: str) -> None:
        self.db.execute("UPDATE jobs SET status = ?, notes = ?, updated_at = ?, synced_at = ? "
                        "WHERE id = ?", (status, notes, when, when, job_id))
        self.db.commit()


def normalize_status(value: str) -> str:
    """'interviewing', 'INTERVIEW' -> 'Interviewing'. Rejects anything unknown."""
    v = value.strip().lower()
    for s in STATUSES:
        if s.lower().startswith(v) and v:
            return s
    raise ValueError(f"unknown status {value!r}; use one of {', '.join(STATUSES)}")
