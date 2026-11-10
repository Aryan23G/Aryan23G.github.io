"""Analyst feedback and the pilot agreement report.

Ground truth for each ticket, in order of preference:
  1. the latest analyst review in the dashboard (accept = the AI was right; correct = their values), else
  2. what the team actually set in Jira (priority via priority_map, team via team_map), when recorded.
The report compares SentinelDesk's final decision (after the guardrail) with that truth.
"""

from __future__ import annotations

import csv
import io
import json
import statistics
from datetime import datetime, timedelta, timezone

from .db import Database, now_iso
from .profile import PRIORITIES, OrgProfile

PRI_INDEX = {p: i for i, p in enumerate(PRIORITIES)}


class FeedbackError(ValueError):
    pass


def add_feedback(db: Database, profile: OrgProfile, ticket_id: int, username: str, verdict: str, *, priority: str | None = None,
                 escalate_to: str | None = None, security_flag: bool | None = None, category: str | None = None, note: str | None = None) -> dict:
    ticket = db.get_ticket(ticket_id)
    if ticket is None:
        raise FeedbackError("Ticket not found.")
    if ticket["status"] != "done":
        raise FeedbackError("Only finished tickets can be reviewed.")
    if verdict not in ("accept", "correct"):
        raise FeedbackError("verdict must be 'accept' or 'correct'.")
    if verdict == "accept":
        priority, escalate_to, security_flag, category = ticket["priority"], ticket["escalate_to"], ticket["security_flag"], ticket["category"]
    else:
        if priority is not None and priority not in PRIORITIES:
            raise FeedbackError("priority must be P1-P4.")
        if escalate_to not in (None, "") and escalate_to not in profile.team_names:
            raise FeedbackError(f"Unknown team {escalate_to!r}.")
        if category is not None and category not in profile.category_names:
            raise FeedbackError(f"Unknown category {category!r}.")
        priority = priority or ticket["priority"]
        escalate_to = (escalate_to or None) if escalate_to is not None else ticket["escalate_to"]
        security_flag = ticket["security_flag"] if security_flag is None else bool(security_flag)
        category = category or ticket["category"]
        if (priority, escalate_to, security_flag, category) == (ticket["priority"], ticket["escalate_to"], ticket["security_flag"], ticket["category"]):
            raise FeedbackError("A correction must change at least one field; use accept instead.")
    with db.connect() as c:
        c.execute(
            """INSERT INTO feedback (ticket_id, username, created_at, verdict, priority, escalate_to, security_flag, category, note)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (ticket_id, username, now_iso(), verdict, priority, escalate_to, int(bool(security_flag)), category, (note or "")[:1000] or None),
        )
    db.add_event(ticket_id, "review", "info", f"{username} {'accepted' if verdict == 'accept' else 'corrected'} the triage"
                 + ("" if verdict == "accept" else f": {priority}, {escalate_to or 'Service Desk'}{', SECURITY' if security_flag else ''}") + ".")
    return latest_feedback(db, ticket_id) or {}


def latest_feedback(db: Database, ticket_id: int) -> dict | None:
    with db.connect() as c:
        row = c.execute("SELECT * FROM feedback WHERE ticket_id = ? ORDER BY id DESC LIMIT 1", (ticket_id,)).fetchone()
    if row is None:
        return None
    d = dict(row)
    d["security_flag"] = bool(d["security_flag"])
    return d


def _rows(db: Database, days: int | None) -> list[dict]:
    where, params = "t.status = 'done'", []
    if days:
        where += " AND t.created_at >= ?"
        params.append((datetime.now(timezone.utc) - timedelta(days=days)).isoformat(timespec="milliseconds"))
    with db.connect() as c:
        rows = c.execute(
            f"""SELECT t.*, f.verdict AS fb_verdict, f.priority AS fb_priority, f.escalate_to AS fb_team,
                       f.security_flag AS fb_security, f.category AS fb_category, f.username AS fb_user
                FROM tickets t
                LEFT JOIN feedback f ON f.id = (SELECT MAX(id) FROM feedback WHERE ticket_id = t.id)
                WHERE {where} ORDER BY t.id""",
            params,
        ).fetchall()
    return [dict(r) for r in rows]


def _agent_durations(db: Database, ticket_ids: list[int]) -> dict[str, list[int]]:
    out: dict[str, list[int]] = {}
    if not ticket_ids:
        return out
    with db.connect() as c:
        for chunk in range(0, len(ticket_ids), 500):  # stay under SQLite's bound-parameter limit
            ids = ticket_ids[chunk : chunk + 500]
            marks = ",".join("?" * len(ids))
            for r in c.execute(f"SELECT agent, duration_ms FROM agent_runs WHERE status = 'ok' AND ticket_id IN ({marks})", ids):
                out.setdefault(r["agent"], []).append(int(r["duration_ms"]))
    return out


def _truth(r: dict) -> dict | None:
    if r["fb_verdict"]:
        return {"source": "analyst", "priority": r["fb_priority"], "team": r["fb_team"], "team_known": True,
                "security": bool(r["fb_security"]), "security_known": True}
    if r.get("outcome_status") == "recorded" and r.get("human_priority"):
        raw = json.loads(r["outcome_raw"]) if r.get("outcome_raw") else {}
        return {"source": "jira", "priority": r["human_priority"], "team": r.get("human_team"), "team_known": r.get("human_team") is not None,
                "security": None, "security_known": False, "untriaged": raw.get("untriaged", False)}
    return None


def _pct(n: int, d: int) -> float | None:
    return round(100 * n / d, 1) if d else None


def build_report(db: Database, days: int | None = None) -> dict:
    rows = _rows(db, days)
    judged = [(r, t) for r in rows if (t := _truth(r))]
    pri = [(r, t) for r, t in judged if t["priority"]]
    exact = sum(1 for r, t in pri if r["priority"] == t["priority"])
    within = sum(1 for r, t in pri if abs(PRI_INDEX[r["priority"]] - PRI_INDEX[t["priority"]]) <= 1)
    team = [(r, t) for r, t in judged if t["team_known"]]
    team_ok = sum(1 for r, t in team if (r["escalate_to"] or None) == (t["team"] or None))
    sec = [(r, t) for r, t in judged if t["security_known"]]
    tp = sum(1 for r, t in sec if r["security_flag"] and t["security"])
    fp = sum(1 for r, t in sec if r["security_flag"] and not t["security"])
    fn = sum(1 for r, t in sec if not r["security_flag"] and t["security"])
    reviewed = [r for r in rows if r["fb_verdict"]]

    def override_fields(r: dict) -> set[str]:
        return {o["field"] for o in (json.loads(r["final_json"]).get("overrides", []) if r.get("final_json") else [])}

    # A security override means the AI missed an attack and the rules caught it. Everything else
    # (invented KB ids or teams, an unsafe reply) is a correction; buyers should see them apart.
    overridden = [r for r in rows if "security_flag" in override_fields(r)]
    corrected = [r for r in rows if override_fields(r) and "security_flag" not in override_fields(r)]
    override_confirmed = sum(1 for r in overridden if r["fb_verdict"] and bool(r["fb_security"]) == bool(r["security_flag"]))

    def seconds(r: dict) -> float | None:
        try:
            return (datetime.fromisoformat(r["finished_at"]) - datetime.fromisoformat(r["created_at"])).total_seconds()
        except (TypeError, ValueError):
            return None

    times = [s for r in rows if (s := seconds(r)) is not None]
    by_agent = _agent_durations(db, [int(r["id"]) for r in rows])
    return {
        "generated_at": now_iso(),
        "window_days": days,
        "volume": {
            "triaged": len(rows),
            "by_source": _count(rows, "source"),
            "by_engine": _count(rows, "mode"),
            "security_flagged": sum(1 for r in rows if r["security_flag"]),
            "security_overrides": len(overridden),
            "guardrail_corrections": len(corrected),
            "historical_imports": sum(1 for r in rows if r.get("backfill")),
        },
        "review": {
            "reviewed": len(reviewed),
            "accepted": sum(1 for r in reviewed if r["fb_verdict"] == "accept"),
            "acceptance_rate_pct": _pct(sum(1 for r in reviewed if r["fb_verdict"] == "accept"), len(reviewed)),
            "with_ground_truth": len(judged),
            "truth_from_jira": sum(1 for _, t in judged if t["source"] == "jira"),
        },
        "agreement": {
            "priority_compared": len(pri),
            "priority_exact_pct": _pct(exact, len(pri)),
            "priority_within_one_pct": _pct(within, len(pri)),
            "routing_compared": len(team),
            "routing_pct": _pct(team_ok, len(team)),
        },
        "security": {
            "compared": len(sec),
            "true_positives": tp,
            "false_positives": fp,
            "missed": fn,
            "precision_pct": _pct(tp, tp + fp),
            "recall_pct": _pct(tp, tp + fn),
            "guardrail_overrides_confirmed": override_confirmed,
        },
        "speed": {
            "median_seconds_to_triage": round(statistics.median(times), 1) if times else None,
            "median_agent_ms": {a: int(statistics.median(v)) for a, v in sorted(by_agent.items())},
        },
        "jira": {
            "comments_posted": sum(1 for r in rows if r.get("writeback_status") == "posted"),
            "comments_failed": sum(1 for r in rows if r.get("writeback_status") == "failed"),
        },
    }


def _count(rows: list[dict], key: str) -> dict[str, int]:
    out: dict[str, int] = {}
    for r in rows:
        out[str(r.get(key))] = out.get(str(r.get(key)), 0) + 1
    return out


CSV_COLUMNS = [
    "ticket", "external_key", "source", "created_at", "subject", "engine", "ai_priority", "ai_team", "ai_security", "ai_category",
    "confidence", "guardrail_overrides", "truth_source", "true_priority", "true_team", "true_security", "priority_match", "team_match",
    "security_match", "reviewed_by", "jira_comment",
]


def export_csv(db: Database, days: int | None = None) -> str:
    """One row per triaged ticket. Ticket bodies are deliberately excluded."""
    buf = io.StringIO()
    w = csv.writer(buf)
    w.writerow(CSV_COLUMNS)
    for r in _rows(db, days):
        t = _truth(r)

        def match(a, b, known=True):
            return "" if t is None or not known or b is None else ("yes" if a == b else "no")

        w.writerow([
            r["id"], r.get("external_key") or "", r["source"], r["created_at"], _safe(r["subject"]), r["mode"], r["priority"],
            r["escalate_to"] or "Service Desk", "yes" if r["security_flag"] else "no", r["category"], r["confidence"], r["overrides"] or 0,
            t["source"] if t else "", (t or {}).get("priority") or "", ((t or {}).get("team") or "") if t and t["team_known"] else "",
            "" if not t or not t["security_known"] else ("yes" if t["security"] else "no"),
            match(r["priority"], (t or {}).get("priority")), match(r["escalate_to"] or None, (t or {}).get("team"), bool(t and t["team_known"])),
            match(bool(r["security_flag"]), (t or {}).get("security"), bool(t and t["security_known"])),
            r["fb_user"] or "", r.get("writeback_status") or "",
        ])
    return buf.getvalue()


def _safe(text: str | None) -> str:
    """Neutralise spreadsheet formula injection (a ticket subject like '=HYPERLINK(...)')."""
    s = text or ""
    return "'" + s if s[:1] in ("=", "+", "-", "@", "\t", "\r") else s
