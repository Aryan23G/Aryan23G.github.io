"""Track job applications locally and sync them to Notion.

    python tracker.py add "Acme" "Backend Intern" --url https://acme.jobs/123
    python tracker.py list                  python tracker.py list --status interviewing
    python tracker.py status 3 interviewing python tracker.py note 3 "Round 2 on Friday"
    python tracker.py stats
    python tracker.py sync                  # needs NOTION_TOKEN and NOTION_DATABASE_ID

See LESSON.md for the one-time Notion setup.
"""

from __future__ import annotations

import argparse
import os
import sys
from collections import Counter

from store import STATUSES, Store


def cmd_add(store, a):
    job = store.add(a.company, a.role, a.status, a.date, a.url or "", a.notes or "")
    print(f"added #{job.id}: {job.company} - {job.role} ({job.status})")


def cmd_list(store, a):
    jobs = store.all(a.status)
    if not jobs:
        print("no jobs yet. Add one: python tracker.py add COMPANY ROLE")
        return
    print(f"{'#':>3}  {'Company':<18} {'Role':<24} {'Status':<13} {'Applied':<10}  ")
    for j in jobs:
        mark = "*" if j.dirty else " "
        print(f"{j.id:>3}  {j.company[:18]:<18} {j.role[:24]:<24} {j.status:<13} {j.applied_on or '':<10} {mark}")
    if any(j.dirty for j in jobs):
        print("\n* = not yet synced to Notion")


def cmd_status(store, a):
    job = store.update(a.id, status=a.status)
    print(f"#{job.id} {job.company} -> {job.status}")


def cmd_note(store, a):
    job = store.get(a.id)
    notes = f"{job.notes}\n{a.text}".strip() if job.notes else a.text
    store.update(a.id, notes=notes)
    print(f"noted on #{job.id}")


def cmd_stats(store, a):
    jobs = store.all()
    counts = Counter(j.status for j in jobs)
    applied = sum(counts[s] for s in STATUSES if s != "Wishlist")
    print(f"{len(jobs)} total")
    for s in STATUSES:
        if counts[s]:
            print(f"  {s:<13} {counts[s]:>3}  {'█' * counts[s]}")
    if applied:
        reached = counts["Interviewing"] + counts["Offer"]
        print(f"\ninterview rate: {reached / applied:.0%} of {applied} applications")


def cmd_sync(store, a):
    token, db_id = os.environ.get("NOTION_TOKEN"), os.environ.get("NOTION_DATABASE_ID")
    if not token or not db_id:
        print("set NOTION_TOKEN and NOTION_DATABASE_ID first (see LESSON.md)", file=sys.stderr)
        return 1
    from notion import NotionClient, NotionError
    from sync import sync
    try:
        print(sync(store, NotionClient(token), db_id))
    except NotionError as err:
        print(f"sync failed: {err}", file=sys.stderr)
        return 1


def main(argv=None) -> int:
    p = argparse.ArgumentParser(description="Job application tracker with Notion sync.")
    p.add_argument("--db", default=os.environ.get("JOBS_DB", "jobs.sqlite"))
    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("add"); s.set_defaults(fn=cmd_add)
    s.add_argument("company"); s.add_argument("role")
    s.add_argument("--status", default="Applied"); s.add_argument("--date", help="YYYY-MM-DD")
    s.add_argument("--url"); s.add_argument("--notes")

    s = sub.add_parser("list"); s.set_defaults(fn=cmd_list); s.add_argument("--status")
    s = sub.add_parser("status"); s.set_defaults(fn=cmd_status)
    s.add_argument("id", type=int); s.add_argument("status")
    s = sub.add_parser("note"); s.set_defaults(fn=cmd_note)
    s.add_argument("id", type=int); s.add_argument("text")
    sub.add_parser("stats").set_defaults(fn=cmd_stats)
    sub.add_parser("sync").set_defaults(fn=cmd_sync)

    a = p.parse_args(argv)
    try:
        return a.fn(Store(a.db), a) or 0
    except (ValueError, KeyError) as err:
        print(f"error: {err.args[0]}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
