import csv
import io
import os
import subprocess
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from sentineldesk_local.auth import Auth, AuthError, hash_password, verify_password
from sentineldesk_local.ollama_client import OllamaClient
from sentineldesk_local.profile import demo_profile
from sentineldesk_local.report import FeedbackError, add_feedback, build_report, export_csv
from sentineldesk_local.web import create_app

H = {"X-SentinelDesk": "1"}
PW = "correct horse battery"
HERE = Path(__file__).resolve().parents[1]


# ---------------------------------------------------------------- accounts


def test_password_hashing():
    h = hash_password(PW)
    assert h.startswith("scrypt$") and PW not in h
    assert verify_password(PW, h) and not verify_password(PW + "x", h) and not verify_password(PW, "garbage")
    assert hash_password(PW) != h  # salted


def test_user_validation(db):
    a = Auth(db)
    for name, pw, role, msg in [("bad name", PW, "analyst", "Username"), ("bob", "short", "analyst", "12"), ("bob", PW, "owner", "Role"),
                                ("passwordbob1", "passwordbob1", "analyst", "not your username")]:
        with pytest.raises(AuthError, match=msg):
            a.create_user(name, pw, role)
    a.create_user("bob", PW)
    with pytest.raises(AuthError, match="already exists"):
        a.create_user("BOB", PW)


def test_sessions_are_stored_hashed_and_revocable(db):
    a = Auth(db)
    a.create_user("bob", PW)
    user, token = a.login("bob", PW)
    assert a.user_for(token).username == "bob" and a.user_for("nope") is None
    with db.connect() as c:
        assert token not in str([tuple(r) for r in c.execute("SELECT * FROM sessions")])
    a.set_password("bob", "another long password")
    assert a.user_for(token) is None  # password change signs everyone out
    _, token = a.login("bob", "another long password")
    a.disable_user("bob")
    assert a.user_for(token) is None
    with pytest.raises(AuthError, match="Wrong username or password"):
        a.login("bob", "another long password")


def test_expired_sessions_are_rejected(db):
    a = Auth(db)
    a.create_user("bob", PW)
    _, token = a.login("bob", PW)
    with db.connect() as c:
        c.execute("UPDATE sessions SET expires_at = '2000-01-01T00:00:00+00:00'")
    assert a.user_for(token) is None


def test_login_lockout_after_repeated_failures(db):
    a = Auth(db)
    a.create_user("bob", PW)
    for _ in range(5):
        with pytest.raises(AuthError, match="Wrong"):
            a.login("bob", "nope nope nope")
    with pytest.raises(AuthError, match="Too many"):
        a.login("bob", PW)  # even the right password is refused during lockout
    with pytest.raises(AuthError, match="Wrong username or password"):
        a.login("ghost", PW)  # unknown users get the same message


# ---------------------------------------------------------------- web


@pytest.fixture
def app_client(settings_for, db):
    a = Auth(db)
    a.create_user("admin", PW, "admin")
    a.create_user("ana", PW, "analyst")
    return TestClient(create_app(settings_for(), db, OllamaClient("http://127.0.0.1:9", 2)))


def login(c, user="admin"):
    r = c.post("/api/login", json={"username": user, "password": PW}, headers=H)
    assert r.status_code == 200
    return r


def test_everything_requires_sign_in(app_client):
    c = app_client
    assert c.get("/").status_code == 200
    assert c.get("/api/health").json() == {"ok": True, "setup_required": False}
    for path in ("/api/tickets", "/api/report", "/api/report.csv", "/api/profile", "/api/samples", "/api/users", "/api/me"):
        assert c.get(path).status_code == 401, path
    assert c.post("/api/tickets", json={}, headers=H).status_code == 401


def test_cookie_flags_csrf_and_security_headers(app_client):
    c = app_client
    assert c.post("/api/login", json={"username": "admin", "password": PW}).status_code == 403  # no CSRF header
    r = login(c)
    cookie = r.headers["set-cookie"].lower()
    assert "httponly" in cookie and "samesite=strict" in cookie
    assert c.post("/api/tickets", json={"requester": "a@b.co", "subject": "x", "body": "hello there"}).status_code == 403
    assert c.post("/api/tickets", json={"requester": "a@b.co", "subject": "x", "body": "hello there"}, headers=H).status_code == 201
    page = c.get("/")
    assert page.headers["x-frame-options"] == "DENY" and "frame-ancestors 'none'" in page.headers["content-security-policy"]
    assert c.get("/api/docs").status_code == 404  # no public API browser


def test_roles(app_client):
    c = app_client
    login(c, "ana")
    assert c.get("/api/users").status_code == 403
    assert c.post("/api/users", json={"username": "x1", "password": PW}, headers=H).status_code == 403
    login(c, "admin")
    assert c.post("/api/users", json={"username": "carl", "password": PW, "role": "analyst"}, headers=H).status_code == 201
    assert {u["username"] for u in c.get("/api/users").json()} == {"admin", "ana", "carl"}
    assert c.post("/api/users/admin/disable", headers=H).status_code == 400
    assert c.post("/api/users/ana/disable", headers=H).status_code == 200


def test_signing_out_ends_the_session_and_the_stream(app_client):
    c = app_client
    login(c)
    assert c.post("/api/logout", headers=H).status_code == 200
    assert c.get("/api/me").status_code == 401


def test_dashboard_ticket_source_records_the_user(app_client, db):
    c = app_client
    login(c, "ana")
    tid = c.post("/api/tickets", json={"requester": "a@b.co", "subject": "VPN", "body": "VPN is down"}, headers=H).json()["id"]
    assert db.get_ticket(tid)["source"] == "dashboard:ana"


# ---------------------------------------------------------------- review + report


def done_ticket(db, *, priority="P3", team=None, security=False, overrides=0, kb_fixes=0, external=None, human=None, backfill=False, subject="VPN down"):
    tid = db.add_ticket("pat@company.example", subject, "body text", source="jira" if external else "dashboard",
                        external_key=external, external_created="2026-11-01T00:00:00.000+00:00" if external else None, backfill=backfill)
    db.claim_next()
    final = {"priority": priority, "category": "Security Incident" if security else "Network", "security_flag": security, "escalate_to": team,
             "confidence": 0.8, "overrides": [{"field": "security_flag"}] * overrides + [{"field": "kb_refs"}] * kb_fixes, "suggested_response": "x", "kb_refs": [], "security_reasons": [], "reasoning": ""}
    db.complete(tid, final=final, mode="council", model="llama3.2", evidence={}, fallback_reason=None, outcome="pending" if external else "none")
    if human:
        db.set_outcome(tid, status="recorded", human_priority=human[0], human_team=human[1], raw={"untriaged": False})
    return tid


def test_feedback_validation(db):
    p = demo_profile()
    queued = db.add_ticket("a@b.co", "s", "body text")
    with pytest.raises(FeedbackError, match="finished"):
        add_feedback(db, p, queued, "ana", "accept")
    db.claim_next()
    tid = done_ticket(db)
    with pytest.raises(FeedbackError, match="Unknown team"):
        add_feedback(db, p, tid, "ana", "correct", escalate_to="Ghosts")
    with pytest.raises(FeedbackError, match="at least one field"):
        add_feedback(db, p, tid, "ana", "correct", priority="P3")
    with pytest.raises(FeedbackError, match="not found"):
        add_feedback(db, p, 9999, "ana", "accept")
    fb = add_feedback(db, p, tid, "ana", "correct", priority="P2", note="whole floor")
    assert fb["priority"] == "P2" and fb["escalate_to"] is None and fb["note"] == "whole floor"
    assert db.get_ticket(tid)["events"][-1]["agent"] == "review"


def test_report_agreement_and_security_metrics(db):
    p = demo_profile()
    a = done_ticket(db, priority="P1", team="Security Operations Center (SOC)", security=True, overrides=1)   # confirmed attack
    b = done_ticket(db, priority="P1", team="Security Operations Center (SOC)", security=True)                # false positive
    c = done_ticket(db, priority="P3", team="Network Operations", kb_fixes=1)                                 # missed attack
    d = done_ticket(db, priority="P3", team="Network Operations", external="IT-1", human=("P2", "Network Operations"))  # jira truth
    e = done_ticket(db, priority="P4", team=None, external="IT-2", human=("P2", None))                       # jira truth, off by two
    done_ticket(db, priority="P3")                                                                            # no truth yet
    add_feedback(db, p, a, "ana", "accept")
    add_feedback(db, p, b, "ana", "correct", security_flag=False, priority="P3", escalate_to="Desktop Support", category="Hardware")
    add_feedback(db, p, c, "ana", "correct", security_flag=True, priority="P1", escalate_to="Security Operations Center (SOC)", category="Security Incident")
    r = build_report(db)
    assert r["volume"]["triaged"] == 6 and r["volume"]["security_flagged"] == 2
    assert r["volume"]["security_overrides"] == 1 and r["volume"]["guardrail_corrections"] == 1  # KB clean-up is not an "attack caught"
    assert r["review"] == {"reviewed": 3, "accepted": 1, "acceptance_rate_pct": 33.3, "with_ground_truth": 5, "truth_from_jira": 2}
    # priority: a P1=P1 ok, b P1 vs P3 (2 off), c P3 vs P1 (2 off), d P3 vs P2 (1 off), e P4 vs P2 (2 off)
    assert r["agreement"]["priority_compared"] == 5 and r["agreement"]["priority_exact_pct"] == 20.0 and r["agreement"]["priority_within_one_pct"] == 40.0
    # routing: a ok, b no, c no, d ok; e has no team recorded in Jira, so it is not compared at all
    assert r["agreement"]["routing_compared"] == 4 and r["agreement"]["routing_pct"] == 50.0
    s = r["security"]
    assert (s["true_positives"], s["false_positives"], s["missed"], s["precision_pct"], s["recall_pct"]) == (1, 1, 1, 50.0, 50.0)
    assert s["guardrail_overrides_confirmed"] == 1 and s["compared"] == 3
    assert r["speed"]["median_seconds_to_triage"] is not None


def test_csv_export_is_safe_and_omits_ticket_bodies(db):
    p = demo_profile()
    tid = done_ticket(db, subject="=HYPERLINK(\"http://evil\")")
    add_feedback(db, p, tid, "ana", "accept")
    rows = list(csv.reader(io.StringIO(export_csv(db))))
    header, row = rows[0], rows[1]
    assert header[0] == "ticket" and "body" not in header
    assert row[header.index("subject")].startswith("'=")
    assert row[header.index("priority_match")] == "yes" and row[header.index("reviewed_by")] == "ana"


def test_report_endpoints(app_client, db):
    c = app_client
    login(c)
    done_ticket(db)
    assert c.get("/api/report?days=7").json()["volume"]["triaged"] == 1
    res = c.get("/api/report.csv")
    assert res.headers["content-type"].startswith("text/csv") and "attachment" in res.headers["content-disposition"]
    tid = done_ticket(db, priority="P4")
    assert c.post(f"/api/tickets/{tid}/feedback", json={"verdict": "correct", "escalate_to": "Ghosts"}, headers=H).status_code == 400
    assert c.post(f"/api/tickets/{tid}/feedback", json={"verdict": "accept"}, headers=H).status_code == 200
    assert c.get(f"/api/tickets/{tid}").json()["feedback"]["username"] == "admin"
    assert next(t for t in c.get("/api/tickets").json() if t["id"] == tid)["review"] == "accept"


# ---------------------------------------------------------------- launcher accounts


def launcher(tmp_path, *args, **env_extra):
    env = {k: v for k, v in os.environ.items() if not k.startswith(("SENTINEL_", "JIRA_"))}
    env.update(SENTINEL_DB=str(tmp_path / "l.db"), SENTINEL_PORT="18768", SENTINEL_OLLAMA_URL="http://127.0.0.1:9", **env_extra)
    return subprocess.run([sys.executable, str(HERE / "run.py"), *args], capture_output=True, text=True, env=env, timeout=60, stdin=subprocess.DEVNULL)


def test_launcher_manages_accounts_without_passwords_on_the_command_line(tmp_path):
    r = launcher(tmp_path, "--add-user", "boss", "--role", "admin", SENTINEL_NEW_PASSWORD=PW)
    assert r.returncode == 0 and "Created admin boss" in r.stdout
    assert "boss" in launcher(tmp_path, "--list-users").stdout
    assert launcher(tmp_path, "--add-user", "x", SENTINEL_NEW_PASSWORD="short").returncode == 1
    no_tty = launcher(tmp_path, "--add-user", "carl")
    assert no_tty.returncode != 0 and "SENTINEL_NEW_PASSWORD" in (no_tty.stdout + no_tty.stderr)
