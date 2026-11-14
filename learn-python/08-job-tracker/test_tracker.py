"""Sync tests run against an in-memory fake Notion with a controllable clock."""

from datetime import datetime, timedelta, timezone

import pytest

import store as store_mod
import sync as sync_mod
from notion import NotionClient, NotionError
from store import Store
from sync import from_page, sync
from tracker import main

DB = "db123"


class Clock:
    def __init__(self):
        self.t = datetime(2026, 11, 14, 10, 0, 0, tzinfo=timezone.utc)

    def advance(self, **kw):
        self.t += timedelta(**kw)

    def iso(self):
        return self.t.isoformat(timespec="seconds")


@pytest.fixture
def clock(monkeypatch):
    c = Clock()
    monkeypatch.setattr(store_mod, "now_utc", c.iso)
    monkeypatch.setattr(sync_mod, "now_utc", c.iso)
    return c


class FakeNotion:
    """Behaves like the parts of NotionClient that sync() uses, including the
    real API's habit of rounding last_edited_time down to the minute."""

    def __init__(self, clock):
        self.clock, self.pages, self.calls, self.fail_for = clock, {}, [], set()

    def _stamp(self):
        return self.clock.t.replace(second=0).strftime("%Y-%m-%dT%H:%M:00.000Z")

    def create_page(self, database_id, properties):
        self.calls.append("create")
        if properties["Company"]["title"][0]["text"]["content"] in self.fail_for:
            raise NotionError("400: validation failed")
        pid = f"page-{len(self.pages) + 1}"
        self.pages[pid] = {"id": pid, "properties": _as_returned(properties),
                           "last_edited_time": self._stamp()}
        return self.pages[pid]

    def update_page(self, page_id, properties):
        self.calls.append("update")
        self.pages[page_id]["properties"] = _as_returned(properties)
        self.pages[page_id]["last_edited_time"] = self._stamp()
        return self.pages[page_id]

    def query_database(self, database_id):
        self.calls.append("query")
        return list(self.pages.values())

    # what a person does in the Notion app
    def human_edit(self, page_id, status=None, notes=None):
        props = self.pages[page_id]["properties"]
        if status:
            props["Status"] = {"select": {"name": status}}
        if notes is not None:
            props["Notes"] = {"rich_text": [{"plain_text": notes}]}
        self.pages[page_id]["last_edited_time"] = self._stamp()


def _as_returned(props):
    """Notion returns rich text with a plain_text field; mimic that."""
    out = dict(props)
    for key in ("Role", "Notes"):
        out[key] = {"rich_text": [{"plain_text": p["text"]["content"]} for p in props[key]["rich_text"]]}
    return out


@pytest.fixture
def env(clock, tmp_path):
    return Store(str(tmp_path / "jobs.sqlite")), FakeNotion(clock), clock


def test_first_sync_creates_then_nothing_to_do(env):
    st, notion, clock = env
    st.add("Acme", "Intern")
    st.add("Globex", "SDE 1")
    clock.advance(seconds=5)
    r = sync(st, notion, DB)
    assert (r.created, r.updated, r.pulled) == (2, 0, 0)
    assert all(not j.dirty for j in st.all())
    clock.advance(minutes=1)
    r = sync(st, notion, DB)                     # idempotent: second run changes nothing
    assert (r.created, r.updated, r.pulled) == (0, 0, 0)


def test_local_change_is_pushed(env):
    st, notion, clock = env
    job = st.add("Acme", "Intern")
    sync(st, notion, DB)
    clock.advance(minutes=2)
    st.update(job.id, status="interviewing")
    r = sync(st, notion, DB)
    assert r.updated == 1
    assert from_page(notion.pages["page-1"])["status"] == "Interviewing"


def test_notion_change_is_pulled(env):
    st, notion, clock = env
    job = st.add("Acme", "Intern")
    sync(st, notion, DB)
    clock.advance(minutes=3)
    notion.human_edit("page-1", status="Offer", notes="🎉 offer call")
    r = sync(st, notion, DB)
    assert r.pulled == 1 and r.updated == 0
    assert st.get(job.id).status == "Offer" and st.get(job.id).notes == "🎉 offer call"
    assert not st.get(job.id).dirty              # pulling must not make it look locally edited


def test_notion_edit_in_same_minute_as_sync_is_not_missed(env):
    st, notion, clock = env
    job = st.add("Acme", "Intern")
    sync(st, notion, DB)
    clock.advance(seconds=20)                    # same minute; Notion's stamp == sync minute
    notion.human_edit("page-1", status="Rejected")
    sync(st, notion, DB)
    assert st.get(job.id).status == "Rejected"


@pytest.mark.parametrize("notion_is_newer, expected", [(True, "Offer"), (False, "Withdrawn")])
def test_conflict_newest_edit_wins(env, notion_is_newer, expected):
    st, notion, clock = env
    job = st.add("Acme", "Intern")
    sync(st, notion, DB)
    clock.advance(minutes=5)
    if notion_is_newer:
        st.update(job.id, status="Withdrawn")
        clock.advance(minutes=2)
        notion.human_edit("page-1", status="Offer")
    else:
        notion.human_edit("page-1", status="Offer")
        clock.advance(minutes=2)
        st.update(job.id, status="Withdrawn")
    r = sync(st, notion, DB)
    assert len(r.conflicts) == 1
    assert st.get(job.id).status == expected
    assert from_page(notion.pages["page-1"])["status"] == expected


def test_crash_after_create_does_not_duplicate(env):
    """Page was created in Notion but we crashed before saving its id locally."""
    st, notion, clock = env
    job = st.add("Acme", "Intern")
    notion.create_page(DB, sync_mod.to_properties(job))   # simulate the half-finished sync
    r = sync(st, notion, DB)
    assert r.created == 0 and r.updated == 1 and len(notion.pages) == 1


def test_one_failure_does_not_stop_the_rest(env):
    st, notion, clock = env
    st.add("Broken Co", "Intern")
    st.add("Fine Co", "Intern")
    notion.fail_for = {"Broken Co"}
    r = sync(st, notion, DB)
    assert r.created == 1 and len(r.errors) == 1
    notion.fail_for = set()
    assert sync(st, notion, DB).created == 1     # retried on the next run


# ------------------------------------------------------- the real HTTP client

class FakeResp:
    def __init__(self, status, data=None, headers=None):
        self.status_code, self._d, self.headers = status, data or {}, headers or {}
        self.content, self.text = b"x", str(data)

    def json(self):
        return self._d


class FakeSession:
    def __init__(self, responses):
        self.responses, self.headers, self.bodies = list(responses), {}, []

    def request(self, method, url, json=None, timeout=None):
        self.bodies.append(json)
        return self.responses.pop(0)


def test_client_respects_retry_after_and_paginates():
    waits = []
    session = FakeSession([
        FakeResp(429, headers={"Retry-After": "1.5"}),
        FakeResp(200, {"results": [{"id": 1}], "has_more": True, "next_cursor": "c2"}),
        FakeResp(200, {"results": [{"id": 2}], "has_more": False}),
    ])
    client = NotionClient("secret", session=session, sleep=waits.append)
    assert [p["id"] for p in client.query_database(DB)] == [1, 2]
    assert waits == [1.5]
    assert session.bodies[-1]["start_cursor"] == "c2"
    assert session.headers["Authorization"] == "Bearer secret"


def test_client_auth_error_has_helpful_message():
    client = NotionClient("bad", session=FakeSession([FakeResp(401, {"message": "API token is invalid."})]))
    with pytest.raises(NotionError, match="share the database"):
        client.query_database(DB)


# ------------------------------------------------------------------- the CLI

def test_cli(tmp_path, capsys):
    db = ["--db", str(tmp_path / "j.sqlite")]
    assert main(db + ["add", "Acme", "Intern", "--status", "wish"]) == 0
    assert main(db + ["status", "1", "interv"]) == 0
    assert main(db + ["status", "1", "hired?"]) == 1
    assert main(db + ["status", "99", "offer"]) == 1
    main(db + ["list"])
    out = capsys.readouterr().out
    assert "Interviewing" in out and "not yet synced" in out
