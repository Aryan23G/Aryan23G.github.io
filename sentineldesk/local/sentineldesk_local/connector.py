"""Jira Service Management sync: import new requests, write the triage back, record what humans did.

Three independent steps, each safe to call repeatedly (the worker runs them on timers):

poll_once      New requests matching the configured JQL become queued tickets. A watermark on the
               `created` time keeps each poll small; the unique external_key makes re-imports a no-op.
               Requests created before SentinelDesk was first switched on are imported read-only
               (backfill) when start_from is set: they are triaged for the report, never commented on.
writeback_once Shadow mode: post the triage as an INTERNAL comment exactly once (outbox with retries;
               Jira's own comments are checked for the marker before posting).
outcomes_once  After `outcome_after_hours`, read the priority / team your analysts actually set, for
               the agreement report. Waits until the request has left the "To Do" status category.
"""

from __future__ import annotations

import json
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from .db import Database, now_iso
from .jira import JiraClient, JiraConfig, JiraError, format_comment

MAX_WRITEBACK_ATTEMPTS = 6
UNTRIAGED_AFTER = timedelta(days=7)
BODY_LIMIT = 4000


def parse_jira_time(value: str) -> datetime:
    """Jira returns e.g. 2026-11-10T14:05:22.123+0000 (Cloud) or ...+00:00."""
    for fmt in ("%Y-%m-%dT%H:%M:%S.%f%z", "%Y-%m-%dT%H:%M:%S%z"):
        try:
            return datetime.strptime(value, fmt)
        except ValueError:
            continue
    return datetime.fromisoformat(value)


def to_iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat(timespec="milliseconds")


class JiraSync:
    def __init__(self, db: Database, client: JiraClient, cfg: JiraConfig, profile_name: str):
        self.db = db
        self.client = client
        self.cfg = cfg
        self.profile_name = profile_name
        self._tz: ZoneInfo | None = None

    # ---------------------------------------------------------------- helpers

    def _event(self, level: str, message: str, ticket_id: int | None = None) -> None:
        self.db.add_event(ticket_id, "connector", level, message)

    def account_tz(self) -> ZoneInfo:
        """JQL dates are read in the API account's time zone, so the watermark is converted to it."""
        if self._tz is None:
            name = self.client.myself().get("timeZone") or "UTC"
            try:
                self._tz = ZoneInfo(name)
            except ZoneInfoNotFoundError:
                self._tz = ZoneInfo("UTC")
        return self._tz

    def activated_at(self) -> datetime:
        raw = self.db.get_meta("jira_activated_at")
        if raw is None:
            raw = now_iso()
            self.db.set_meta("jira_activated_at", raw)
            self._event("info", f"Jira connector activated ({self.cfg.mode}). Only requests created from now on get comments.")
        return datetime.fromisoformat(raw)

    def _watermark(self) -> datetime:
        raw = self.db.get_meta("jira_watermark")
        if raw:
            return datetime.fromisoformat(raw)
        if self.cfg.start_from:
            return datetime.combine(self.cfg.start_from, datetime.min.time(), tzinfo=self.account_tz())
        return self.activated_at()

    # ---------------------------------------------------------------- poll

    def build_jql(self, since: datetime) -> str:
        local = (since - timedelta(minutes=1)).astimezone(self.account_tz())  # JQL has minute precision
        return f'({self.cfg.jql}) AND created >= "{local:%Y-%m-%d %H:%M}" ORDER BY created ASC'

    def poll_once(self) -> int:
        """Import new requests. Returns how many were queued. Raises JiraError on API failure."""
        activated = self.activated_at()
        since = self._watermark()
        fetch = min(100, self.cfg.max_per_poll * 2)
        found = self.client.search(self.build_jql(since), fetch)
        known = self.db.known_external_keys([r.key for r in found])
        queued = 0
        newest = since
        for req in found:
            created = parse_jira_time(req.created) if req.created else datetime.now(timezone.utc)
            newest = max(newest, created)
            if req.key in known or queued >= self.cfg.max_per_poll:
                continue
            body = req.description or req.summary
            if len(body) > BODY_LIMIT:
                body = body[:BODY_LIMIT] + "\n[truncated by SentinelDesk]"
            ticket_id = self.db.add_ticket(
                req.requester, req.summary or "(no summary)", body, source="jira",
                external_key=req.key, external_url=req.url, external_created=to_iso(created), backfill=created < activated,
            )
            if ticket_id is not None:
                queued += 1
        # When this poll hit max_per_poll, more may be waiting: keep the watermark so the next poll
        # re-reads this window (known keys are skipped). Otherwise move it to the newest request seen.
        if queued < self.cfg.max_per_poll:
            if found and newest == since and len(found) >= fetch:
                # A full page all within the watermark minute and all known: step past it.
                newest = since + timedelta(minutes=1)
                self._event("warn", "More than one page of requests share one minute; advancing the watermark by a minute.")
            self.db.set_meta("jira_watermark", to_iso(newest))
        if queued:
            self._event("info", f"Imported {queued} new request(s) from Jira.")
        return queued

    # ---------------------------------------------------------------- write-back

    def writeback_once(self) -> int:
        """Post pending internal comments. Returns how many were posted."""
        posted = 0
        for row in self.db.writebacks_due():
            tid, key = int(row["id"]), row["external_key"]
            if self.cfg.mode != "shadow" or row["backfill"]:
                self.db.set_writeback(tid, "skipped", attempted=False)
                continue
            try:
                if self.client.has_triage_comment(key):
                    self.db.set_writeback(tid, "posted", error="A SentinelDesk comment was already present; not posted again.")
                    self._event("info", f"{key}: triage comment already present, skipped.", tid)
                    continue
                final = json.loads(row["final_json"])
                self.client.add_internal_comment(key, format_comment(final, row["mode"], row["model"], self.profile_name))
                self.db.set_writeback(tid, "posted")
                self._event("info", f"{key}: internal triage comment posted to Jira.", tid)
                posted += 1
            except JiraError as exc:
                attempts = int(row["writeback_attempts"]) + 1
                if exc.retryable and attempts < MAX_WRITEBACK_ATTEMPTS:
                    delay = exc.retry_after_s or min(3600, 30 * 2 ** (attempts - 1))
                    next_at = to_iso(datetime.now(timezone.utc) + timedelta(seconds=delay))
                    self.db.set_writeback(tid, "pending", error=str(exc), next_at=next_at)
                    self._event("warn", f"{key}: comment failed ({exc}); retrying in {delay}s.", tid)
                else:
                    self.db.set_writeback(tid, "failed", error=str(exc))
                    self._event("error", f"{key}: comment failed permanently: {exc}", tid)
        return posted

    # ---------------------------------------------------------------- outcomes

    def outcomes_once(self) -> int:
        """Record the priority/team humans set. Returns how many were recorded."""
        cutoff = to_iso(datetime.now(timezone.utc) - timedelta(hours=self.cfg.outcome_after_hours))
        recorded = 0
        for row in self.db.outcomes_due(cutoff):
            tid, key = int(row["id"]), row["external_key"]
            try:
                req = self.client.get_request(key)
            except JiraError as exc:
                if not exc.retryable:
                    self.db.set_outcome(tid, status="recorded", raw={"error": str(exc)})
                    self._event("warn", f"{key}: could not read the human outcome ({exc}).", tid)
                continue
            age = datetime.now(timezone.utc) - datetime.fromisoformat(row["external_created"]) if row["external_created"] else UNTRIAGED_AFTER
            if req.status_category == "new" and age < UNTRIAGED_AFTER:
                continue  # analysts have not picked it up yet; check again later
            human_priority = self.cfg.priority_map.get(req.priority_name or "")
            human_team = self.cfg.team_map.get(req.team_value or "", req.team_value) if self.cfg.team_field else None
            raw = {"priority_name": req.priority_name, "team_value": req.team_value, "status_category": req.status_category,
                   "untriaged": req.status_category == "new"}
            self.db.set_outcome(tid, status="recorded", human_priority=human_priority, human_team=human_team, raw=raw)
            recorded += 1
        return recorded
