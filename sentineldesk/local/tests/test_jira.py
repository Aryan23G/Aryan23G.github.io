import json
from datetime import date

import pytest

from sentineldesk_local.config import LocalOnlyError
from sentineldesk_local.connector import JiraSync
from sentineldesk_local.jira import MARKER, JiraClient, JiraConfig, JiraCredentials, JiraError, adf_to_text, format_comment
from sentineldesk_local.ollama_client import OllamaClient
from sentineldesk_local.worker import Worker

from .fake_jira import FakeJira, adf

CLOUD_CREDS = JiraCredentials(email="bot@acme.com", api_token="token")
DC_CREDS = JiraCredentials(pat="pat-123")
ACTIVATED = "2026-11-09T12:00:00.000+00:00"
BEFORE = "2026-11-05T09:30:00.000+0000"  # created before activation -> backfill (read-only)
AFTER_1 = "2026-11-09T13:00:00.000+0000"
AFTER_2 = "2026-11-09T13:05:00.000+0000"


def cfg(url: str, **over) -> JiraConfig:
    base = {"enabled": True, "base_url": url, "deployment": "cloud", "jql": 'project = "IT"', "mode": "shadow",
            "start_from": "2026-11-01", "priority_map": {"Highest": "P1", "High": "P2", "Medium": "P3", "Low": "P4"},
            "team_field": "customfield_10001", "team_map": {"T2 - Network": "Network Operations"}}
    return JiraConfig.from_dict({**base, **over})


@pytest.fixture
def jira():
    fake = FakeJira()
    yield fake
    fake.close()


def make_sync(db, fake: FakeJira, **over) -> JiraSync:
    c = cfg(fake.url, deployment=fake.deployment, **over)
    sync = JiraSync(db, JiraClient(c, CLOUD_CREDS if fake.deployment == "cloud" else DC_CREDS), c, "Company Example")
    db.set_meta("jira_activated_at", ACTIVATED)
    return sync


# ---------------------------------------------------------------- config + parsing


def test_config_validation():
    assert JiraConfig.from_dict({}) is None and JiraConfig.from_dict({"enabled": False, "base_url": "x"}) is None
    ok = cfg("https://acme.atlassian.net")
    assert ok.api_version == "3" and ok.start_from == date(2026, 11, 1)
    for bad, msg in [
        ({"base_url": "http://acme.atlassian.net"}, "https"),
        ({"base_url": "acme"}, "https://"),
        ({"deployment": "server"}, "deployment"),
        ({"jql": 'project = IT ORDER BY created'}, "ORDER BY"),
        ({"jql": ""}, "jql is required"),
        ({"mode": "write"}, "mode"),
        ({"start_from": "last week"}, "start_from"),
        ({"priority_map": {"High": "urgent"}}, "P1-P4"),
        ({"poll_interval_s": 5}, "at least 15"),
    ]:
        with pytest.raises(ValueError, match=msg):
            JiraConfig.from_dict({"enabled": True, "base_url": "https://acme.atlassian.net", "jql": "project = IT", **bad})
    with pytest.raises(ValueError, match="unknown teams"):
        JiraConfig.from_dict({"enabled": True, "base_url": "https://a.atlassian.net", "jql": "project = IT", "team_map": {"x": "Ghosts"}}, ("Network",))


def test_credentials():
    assert CLOUD_CREDS.header("cloud").startswith("Basic ") and DC_CREDS.header("datacenter") == "Bearer pat-123"
    with pytest.raises(LocalOnlyError, match="email and an API token"):
        JiraCredentials(email="a@b.c").header("cloud")
    with pytest.raises(LocalOnlyError, match="personal access token"):
        JiraCredentials().header("datacenter")
    assert JiraCredentials.from_env({"JIRA_EMAIL": "e", "JIRA_API_TOKEN": "t"}).api_token == "t"


def test_adf_keeps_hidden_link_targets_and_structure():
    doc = {"type": "doc", "content": [
        {"type": "paragraph", "content": [{"type": "text", "text": "Hi "}, {"type": "mention", "attrs": {"text": "@IT"}}, {"type": "hardBreak"},
                                          {"type": "text", "text": "Click here", "marks": [{"type": "link", "attrs": {"href": "http://bit.ly/x"}}]}]},
        {"type": "bulletList", "content": [{"type": "listItem", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "one"}]}]}]},
        {"type": "paragraph", "content": [{"type": "inlineCard", "attrs": {"url": "https://evil.example/a"}}]},
    ]}
    text = adf_to_text(doc)
    assert "Click here (http://bit.ly/x)" in text and "@IT" in text and "- one" in text and "https://evil.example/a" in text


# ---------------------------------------------------------------- client


def test_cloud_search_follows_next_page_tokens(jira):
    for i in range(7):
        jira.add(f"IT-{i + 1}", f"s{i}", adf("body"), f"2026-11-09T13:0{i}:00.000+0000")
    client = JiraClient(cfg(jira.url), CLOUD_CREDS)
    got = client.search('project = "IT"', 7, page_size=3)
    assert [r.key for r in got] == [f"IT-{i}" for i in range(1, 8)]
    searches = [q for m, p, q in jira.log if p == "/rest/api/3/search/jql"]
    assert len(searches) == 3 and [q.get("nextPageToken") for q in searches] == [None, "3", "6"]
    assert len(client.search('project = "IT"', 5, page_size=3)) == 5  # stops at the limit mid-page
    assert "customfield_10001" in searches[0]["fields"]


def test_datacenter_uses_v2_and_start_at():
    fake = FakeJira(deployment="datacenter")
    try:
        for i in range(3):
            fake.add(f"SD-{i + 1}", "s", "plain wiki text", f"2026-11-09T13:0{i}:00.000+0000")
        c = cfg(fake.url, deployment="datacenter")
        got = JiraClient(c, DC_CREDS).search('project = "SD"', 3, page_size=2)
        assert [r.description for r in got] == ["plain wiki text"] * 3
        assert [q["startAt"] for _, p, q in fake.log if p == "/rest/api/2/search"] == ["0", "2"]
    finally:
        fake.close()


def test_hidden_reporter_email_falls_back_to_service_desk_api(jira):
    jira.add("IT-9", "s", adf("b"), AFTER_1, email=None, name="Dana Ruiz")
    client = JiraClient(cfg(jira.url), CLOUD_CREDS)
    assert client.get_request("IT-9").requester == "dana.ruiz@hidden-email.invalid"
    jira.sd_emails["IT-9"] = "dana@acme.com"
    assert client.get_request("IT-9").requester == "dana@acme.com"


def test_bad_keys_and_auth_errors(jira):
    client = JiraClient(cfg(jira.url), CLOUD_CREDS)
    with pytest.raises(JiraError, match="Invalid issue key"):
        client.add_internal_comment("../../admin", "x")
    with pytest.raises(JiraError, match="401.*credentials"):
        JiraClient(cfg(jira.url), JiraCredentials(email="bot@acme.com", api_token="wrong")).myself()


# ---------------------------------------------------------------- sync


def test_poll_imports_new_requests_once_and_marks_old_ones_read_only(db, jira):
    jira.add("IT-1", "Old printer issue", adf("Printer jammed"), BEFORE)
    jira.add("IT-2", "VPN down", adf("VPN says gateway unreachable"), AFTER_1)
    sync = make_sync(db, jira)
    assert sync.poll_once() == 2
    assert sync.poll_once() == 0  # nothing new: no duplicates
    rows = {t["external_key"]: t for t in db.list_tickets()}
    assert rows["IT-1"]["backfill"] is True and rows["IT-2"]["backfill"] is False
    jql = [q["jql"] for m, p, q in jira.log if p == "/rest/api/3/search/jql"][-1]
    assert jql.startswith('(project = "IT") AND created >= "') and jql.endswith("ORDER BY created ASC")


def test_watermark_is_written_in_the_jira_account_time_zone(db, jira):
    jira.tz = "America/New_York"
    sync = make_sync(db, jira)
    db.set_meta("jira_watermark", "2026-11-09T18:00:00.000+00:00")
    assert sync.build_jql(sync._watermark()).endswith('created >= "2026-11-09 12:59" ORDER BY created ASC')  # 18:00 UTC = 13:00 EST, minus 1 min


def test_shadow_mode_posts_exactly_one_internal_comment(db, jira, ollama):
    jira.add("IT-1", "Old one", adf("Printer jammed on floor 2"), BEFORE)
    jira.add("IT-2", "Mailbox will be deactivated", adf("Verify your password immediately", link=("here", "http://bit.ly/x")), AFTER_1, email="it@c0mpany-helpdesk.xyz")
    sync = make_sync(db, jira)
    worker = Worker(db, OllamaClient(ollama.url, 10), "llama3.2", "llama3.2", jira=sync)
    sync.poll_once()
    while worker.process_one():
        pass
    assert sync.writeback_once() == 1
    assert sync.writeback_once() == 0
    assert list(jira.comments) == ["IT-2"]  # the backfilled IT-1 never gets a comment
    c = jira.comments["IT-2"][0]
    assert c["public"] is False and c["body"].startswith(f"{MARKER} SECURITY INCIDENT") and "not sent to the requester" in c["body"]
    t2 = next(t for t in db.list_tickets() if t["external_key"] == "IT-2")
    assert t2["writeback_status"] == "posted" and t2["security_flag"] is True
    detail = db.get_ticket(t2["id"])
    assert "http://bit.ly/x" in detail["body"]  # the hidden link target reached the scanner


def test_writeback_does_not_repost_after_a_restart(db, jira):
    jira.add("IT-2", "VPN", adf("VPN down"), AFTER_1)
    jira.comments["IT-2"] = [{"body": f"{MARKER} Suggested triage ...", "public": False}]
    sync = make_sync(db, jira)
    sync.poll_once()
    tid = db.list_tickets()[0]["id"]
    db.claim_next()
    db.complete(tid, final={"priority": "P3", "category": "Network", "security_flag": False, "escalate_to": None, "confidence": 0.5, "overrides": [],
                            "suggested_response": "x", "kb_refs": [], "security_reasons": [], "reasoning": ""},
                mode="rules", model="offline-rules", evidence={}, fallback_reason=None, writeback="pending", outcome="pending")
    assert sync.writeback_once() == 0
    assert len(jira.comments["IT-2"]) == 1 and db.get_ticket(tid)["writeback_status"] == "posted"


def _done(db, tid):
    db.complete(tid, final={"priority": "P2", "category": "Network", "security_flag": False, "escalate_to": "Network Operations", "confidence": 0.7,
                            "overrides": [], "suggested_response": "Try restarting the VPN client.", "kb_refs": ["KB-301"], "security_reasons": [], "reasoning": "r"},
                mode="council", model="llama3.2", evidence={}, fallback_reason=None, writeback="pending", outcome="pending")


def test_writeback_retries_transient_errors_and_gives_up_on_permanent_ones(db, jira):
    jira.add("IT-2", "VPN", adf("VPN down"), AFTER_1)
    jira.add("IT-3", "VPN 2", adf("VPN down again"), AFTER_2)
    sync = make_sync(db, jira)
    sync.poll_once()
    for t in db.list_tickets():
        _done(db, t["id"])
    jira.fail[("POST", "/rest/servicedeskapi/request/IT-2/comment")] = [429]
    jira.fail[("POST", "/rest/servicedeskapi/request/IT-3/comment")] = [403]
    assert sync.writeback_once() == 0
    by_key = {t["external_key"]: db.get_ticket(t["id"]) for t in db.list_tickets()}
    assert by_key["IT-2"]["writeback_status"] == "pending" and "429" in by_key["IT-2"]["writeback_error"]
    assert by_key["IT-2"]["writeback_next_at"] > by_key["IT-2"]["created_at"]  # Retry-After honoured (scheduled later)
    assert by_key["IT-3"]["writeback_status"] == "failed" and "agent access" in by_key["IT-3"]["writeback_error"]
    with db.connect() as c:
        c.execute("UPDATE tickets SET writeback_next_at = NULL")
    assert sync.writeback_once() == 1 and "IT-2" in jira.comments


def test_read_only_mode_never_writes(db, jira):
    jira.add("IT-2", "VPN", adf("VPN down"), AFTER_1)
    sync = make_sync(db, jira, mode="read-only")
    sync.poll_once()
    _done(db, db.list_tickets()[0]["id"])
    assert sync.writeback_once() == 0 and jira.posts() == []
    assert db.list_tickets()[0]["writeback_status"] == "skipped"


def test_outcomes_wait_for_analysts_then_map_priority_and_team(db, jira):
    jira.add("IT-1", "Old", adf("Printer jammed"), BEFORE, status="done", priority="High", team="T2 - Network")
    jira.add("IT-2", "VPN", adf("VPN down"), AFTER_1, status="new")
    sync = make_sync(db, jira, outcome_after_hours=0)
    sync.poll_once()
    for t in db.list_tickets():
        _done(db, t["id"])
    assert sync.outcomes_once() == 1  # IT-2 is still untouched in "To Do", so it waits
    rows = {t["external_key"]: db.get_ticket(t["id"]) for t in db.list_tickets()}
    assert rows["IT-1"]["human_priority"] == "P2" and rows["IT-1"]["human_team"] == "Network Operations"
    assert rows["IT-2"]["outcome_status"] == "pending"
    jira.issues["IT-2"]["fields"]["status"] = {"name": "In Progress", "statusCategory": {"key": "indeterminate"}}
    jira.issues["IT-2"]["fields"]["priority"] = {"name": "Low"}
    assert sync.outcomes_once() == 1
    it2 = next(db.get_ticket(t["id"]) for t in db.list_tickets() if t["external_key"] == "IT-2")
    assert it2["human_priority"] == "P4" and it2["outcome"]["priority_name"] == "Low"


def test_comment_format_for_a_normal_request():
    body = format_comment({"priority": "P3", "category": "Network", "security_flag": False, "escalate_to": None, "confidence": 0.8, "overrides": [],
                           "suggested_response": "Restart the VPN.", "kb_refs": ["KB-301"], "security_reasons": [], "reasoning": "VPN issue."},
                          "council", "llama3.2", "Acme")
    assert body.startswith(f"{MARKER} Suggested triage by AI council (llama3.2)") and "Suggested reply: Restart the VPN." in body
    assert json.dumps(body)  # plain text, serialisable


def test_worker_thread_runs_the_whole_loop(db, jira, ollama):
    import threading
    import time

    jira.add("IT-7", "Laptop will not turn on", adf("My laptop won't power on, nothing happens."), AFTER_1)
    sync = make_sync(db, jira)
    worker = Worker(db, OllamaClient(ollama.url, 10), "llama3.2", "llama3.2", poll_ms=50, jira=sync)
    th = threading.Thread(target=worker.run_forever)
    th.start()
    try:
        for _ in range(150):
            if jira.comments.get("IT-7"):
                break
            time.sleep(0.1)
    finally:
        worker.stop_event.set()
        th.join(10)
    assert not th.is_alive()
    assert jira.comments["IT-7"][0]["public"] is False
    assert db.list_tickets()[0]["writeback_status"] == "posted"


def test_launcher_checks_jira_credentials(tmp_path, jira, ollama):
    import os
    import subprocess
    import sys
    from pathlib import Path

    here = Path(__file__).resolve().parents[1]
    conf = tmp_path / "desk.toml"
    example = (here / "sentineldesk.example.toml").read_text()
    conf.write_text(example.replace('dir = "kb-example"', f'dir = "{here / "kb-example"}"')
                    .replace("enabled = false", "enabled = true").replace("https://acme.atlassian.net", jira.url))
    env = {k: v for k, v in os.environ.items() if not k.startswith(("SENTINEL_", "JIRA_"))}
    env.update(SENTINEL_CONFIG=str(conf), SENTINEL_DB=str(tmp_path / "x.db"), SENTINEL_PORT="18767", SENTINEL_OLLAMA_URL=ollama.url,
               JIRA_EMAIL="bot@acme.com", JIRA_API_TOKEN="token")
    ok = subprocess.run([sys.executable, str(here / "run.py"), "--check"], capture_output=True, text=True, env=env, timeout=60)
    assert ok.returncode == 0, ok.stdout
    assert "Organisation: Acme Corporation" in ok.stdout and "JQL works; mode shadow" in ok.stdout
    env["JIRA_API_TOKEN"] = "wrong"
    bad = subprocess.run([sys.executable, str(here / "run.py"), "--check"], capture_output=True, text=True, env=env, timeout=60)
    assert bad.returncode == 1 and "check the Jira credentials" in bad.stdout
