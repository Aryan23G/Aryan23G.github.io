"""Two-way sync between the local Store and a Notion database.

Rules:
  push   local rows never synced -> create a Notion page
         local rows changed since last sync -> update their page
  pull   Status/Notes edited in Notion since last sync -> copy them locally
  both   changed on both sides -> the newer edit wins, and we report it
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone

from notion import NotionClient, NotionError
from store import STATUSES, Job, Store, now_utc


# ------------------------------------------------- translate local <-> Notion

def _text(value: str) -> list[dict]:
    return [{"type": "text", "text": {"content": value[:2000]}}] if value else []


def to_properties(job: Job) -> dict:
    """Notion wants every value wrapped in a type-specific object."""
    return {
        "Company": {"title": _text(job.company)},
        "Role": {"rich_text": _text(job.role)},
        "Status": {"select": {"name": job.status}},
        "Applied": {"date": {"start": job.applied_on} if job.applied_on else None},
        "Link": {"url": job.url or None},
        "Notes": {"rich_text": _text(job.notes)},
        "Local ID": {"number": job.id},
    }


def _plain(rich: list[dict]) -> str:
    return "".join(part.get("plain_text") or part.get("text", {}).get("content", "") for part in rich)


def from_page(page: dict) -> dict:
    props = page["properties"]
    select = props.get("Status", {}).get("select") or {}
    return {
        "page_id": page["id"],
        "local_id": props.get("Local ID", {}).get("number"),
        "status": select.get("name"),
        "notes": _plain(props.get("Notes", {}).get("rich_text", [])),
        "edited": page["last_edited_time"],
    }


def _ts(iso: str) -> datetime:
    return datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(timezone.utc)


# ---------------------------------------------------------------------- sync

@dataclass
class SyncReport:
    created: int = 0
    updated: int = 0
    pulled: int = 0
    conflicts: list[str] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)

    def __str__(self) -> str:
        lines = [f"created {self.created}, updated {self.updated}, pulled {self.pulled} from Notion"]
        lines += [f"  conflict: {c}" for c in self.conflicts]
        lines += [f"  error: {e}" for e in self.errors]
        return "\n".join(lines)


def sync(store: Store, client: NotionClient, database_id: str) -> SyncReport:
    report = SyncReport()
    remote = {}
    for page in client.query_database(database_id):
        info = from_page(page)
        if info["local_id"] is not None:
            remote[int(info["local_id"])] = info

    for job in store.all():
        info = remote.get(job.id)
        # Was the Notion copy edited after our last sync? Notion rounds last_edited_time
        # DOWN to the minute, so compare against our sync time rounded the same way, and
        # use >= so an edit in the same minute counts. Our own push also lands in that
        # minute, which is why we additionally require the content to actually differ.
        remote_changed = (
            info is not None and job.synced_at is not None
            and _ts(info["edited"]) >= _ts(job.synced_at).replace(second=0, microsecond=0)
            and (info["status"] != job.status or info["notes"] != job.notes)
        )
        try:
            if remote_changed and job.dirty:
                if _ts(info["edited"]) > _ts(job.updated_at):
                    _pull(store, job, info, report)
                    report.conflicts.append(f"#{job.id} {job.company}: kept Notion's newer edit")
                else:
                    _push(store, client, database_id, job, info, report)
                    report.conflicts.append(f"#{job.id} {job.company}: kept local newer edit")
            elif remote_changed:
                _pull(store, job, info, report)
            elif job.dirty or info is None:
                _push(store, client, database_id, job, info, report)
        except NotionError as err:
            report.errors.append(f"#{job.id} {job.company}: {err}")   # keep going; retry next sync
    return report


def _push(store, client, database_id, job: Job, info: dict | None, report: SyncReport) -> None:
    props = to_properties(job)
    page_id = (info or {}).get("page_id") or job.notion_page_id
    if page_id:
        client.update_page(page_id, props)
        report.updated += 1
    else:
        page_id = client.create_page(database_id, props)["id"]
        report.created += 1
    store.mark_synced(job.id, page_id, now_utc())


def _pull(store: Store, job: Job, info: dict, report: SyncReport) -> None:
    status = info["status"] if info["status"] in STATUSES else job.status
    store.apply_remote(job.id, status, info["notes"], now_utc())
    report.pulled += 1
