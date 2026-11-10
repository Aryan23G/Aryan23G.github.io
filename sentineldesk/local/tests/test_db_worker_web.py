import os
import sqlite3
import subprocess
import sys
import threading
from pathlib import Path

from fastapi.testclient import TestClient

from sentineldesk_local.db import SCHEMA_VERSION, Database
from sentineldesk_local.ollama_client import OllamaClient
from sentineldesk_local.web import create_app
from sentineldesk_local.worker import Worker

HERE = Path(__file__).resolve().parents[1]


# ---------------------------------------------------------------- database


def test_init_is_idempotent_and_versioned(tmp_path):
    d = Database(tmp_path / "x.db")
    assert not d.is_initialized()
    d.init()
    d.init()
    assert d.is_initialized()
    with sqlite3.connect(tmp_path / "x.db") as c:
        assert c.execute("PRAGMA user_version").fetchone()[0] == SCHEMA_VERSION
        assert c.execute("PRAGMA journal_mode").fetchone()[0] == "wal"


def test_concurrent_claims_never_take_the_same_ticket(db):
    ids = {db.add_ticket("a@b.co", f"t{i}", "body text") for i in range(30)}
    claimed: list[int] = []
    lock = threading.Lock()

    def claimer():
        while (row := db.claim_next()) is not None:
            with lock:
                claimed.append(row["id"])

    threads = [threading.Thread(target=claimer) for _ in range(6)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    assert sorted(claimed) == sorted(ids)
    assert db.counts()["running"] == 30


def test_stale_running_tickets_are_requeued(db):
    tid = db.add_ticket("a@b.co", "s", "body text")
    db.claim_next()
    assert db.requeue_stale(3600) == 0
    with db.connect() as c:
        c.execute("UPDATE tickets SET claimed_at = '2000-01-01T00:00:00+00:00' WHERE id = ?", (tid,))
    assert db.requeue_stale(60) == 1
    assert db.claim_next()["attempts"] == 2


# ---------------------------------------------------------------- worker


def make_worker(db, ollama_url):
    return Worker(db, OllamaClient(ollama_url, 10), "llama3.2", "llama3.2", poll_ms=50)


def test_worker_processes_a_ticket_end_to_end_and_logs_everything(db, ollama, sample):
    t = sample(7)
    tid = db.add_ticket(t["requester"], t["subject"], t["body"])
    assert make_worker(db, ollama.url).process_one() == tid
    assert make_worker(db, ollama.url).process_one() is None
    row = db.get_ticket(tid)
    assert row["status"] == "done" and row["mode"] == "council" and row["security_flag"] is True and row["priority"] == "P1"
    assert sorted(r["agent"] for r in row["agent_runs"]) == ["chairman", "intent", "security", "sentiment"]
    assert all(r["prompt_tokens"] > 0 for r in row["agent_runs"])
    agents = {e["agent"] for e in row["events"]}
    assert {"system", "guardrail", "security", "sentiment", "intent", "chairman"} <= agents
    assert row["evidence"]["scan"]["injection"] is True
    listed = db.list_tickets()[0]
    assert listed["reports"]["security"]["is_attack"] is True and "body" not in listed


def test_worker_uses_rules_when_ollama_is_down(db, sample):
    t = sample(4)
    tid = db.add_ticket(t["requester"], t["subject"], t["body"])
    make_worker(db, "http://127.0.0.1:9").process_one()
    row = db.get_ticket(tid)
    assert row["status"] == "done" and row["mode"] == "rules" and "not reachable" in row["fallback_reason"]


def test_worker_marks_a_ticket_failed_on_an_unexpected_error(db, ollama, monkeypatch, sample):
    import sentineldesk_local.worker as w

    def boom(self, *a):
        raise RuntimeError("disk full")

    monkeypatch.setattr(w.Council, "run", boom)
    tid = db.add_ticket("a@b.co", "s", "body text")
    make_worker(db, ollama.url).process_one()
    row = db.get_ticket(tid)
    assert row["status"] == "failed" and "disk full" in row["error"]
    assert row["events"][-1]["level"] == "error"


def test_worker_loop_stops_cleanly(db, ollama, sample):
    worker = make_worker(db, ollama.url)
    t = sample(0)
    tid = db.add_ticket(t["requester"], t["subject"], t["body"])
    th = threading.Thread(target=worker.run_forever)
    th.start()
    for _ in range(100):
        if db.get_ticket(tid)["status"] == "done":
            break
        threading.Event().wait(0.05)
    worker.stop_event.set()
    th.join(5)
    assert not th.is_alive() and db.get_ticket(tid)["status"] == "done"
    assert db.get_meta("worker_heartbeat").startswith("0|")


# ---------------------------------------------------------------- web


H = {"X-SentinelDesk": "1"}


def client_for(settings, db, ollama_url, login=True):
    from sentineldesk_local.auth import Auth

    c = TestClient(create_app(settings, db, OllamaClient(ollama_url, 5)))
    if login:
        if not Auth(db).user_count():
            Auth(db).create_user("alice", "correct horse battery", "admin")
        assert c.post("/api/login", json={"username": "alice", "password": "correct horse battery"}, headers=H).status_code == 200
    return c


def test_dashboard_is_fully_offline(settings_for, db):
    html = client_for(settings_for(), db, "http://127.0.0.1:9").get("/").text
    for text in ("Welcome to SentinelDesk", "Set up SentinelDesk", "Looks right", "How SentinelDesk decided", "Test a ticket", "Download CSV", "Connect Jira"):
        assert text in html, text
    assert "http://" not in html and "https://" not in html and "<link" not in html


def test_health_reports_ollama_models_and_worker(settings_for, db, ollama):
    h = client_for(settings_for(ollama.url), db, ollama.url).get("/api/health").json()
    assert h["profile"]["name"] == "Company Example"
    assert h["ollama"]["reachable"] and h["ollama"]["agent_model_ready"] and h["worker"]["alive"] is False
    down = client_for(settings_for(), db, "http://127.0.0.1:9").get("/api/health").json()
    assert down["ollama"]["reachable"] is False and "error" in down["ollama"]


def test_ticket_api_validates_creates_lists_and_details(settings_for, db):
    c = client_for(settings_for(), db, "http://127.0.0.1:9")
    assert c.post("/api/tickets", headers=H, json={"requester": "nope", "subject": "x", "body": "hello there"}).status_code == 422
    assert c.post("/api/tickets", headers=H, json={"requester": "a@b.co", "subject": "", "body": "hello there"}).status_code == 422
    assert c.post("/api/tickets", headers=H, json={"requester": "a@b.co", "subject": "x", "body": "y" * 4001}).status_code == 422
    r = c.post("/api/tickets", headers=H, json={"requester": " a@b.co ", "subject": "VPN", "body": "gateway unreachable"})
    assert r.status_code == 201 and r.json()["status"] == "queued"
    tid = r.json()["id"]
    assert c.get("/api/tickets").json()[0]["id"] == tid
    detail = c.get(f"/api/tickets/{tid}").json()
    assert detail["requester"] == "a@b.co" and detail["events"][0]["message"].startswith(f"Ticket #{tid} received")
    assert c.get("/api/tickets/99999").status_code == 404
    assert len(c.get("/api/samples").json()) == 8


def test_event_stream_replays_and_ends_at_timeout(settings_for, db):
    c = client_for(settings_for(), db, "http://127.0.0.1:9")
    tid = db.add_ticket("a@b.co", "s", "body text")
    db.add_event(tid, "security", "info", "Started on llama3.2.")
    with c.stream("GET", "/api/stream?after=0&timeout=1") as res:
        text = "".join(res.iter_text())
    assert text.startswith("event: hello") and "event: log" in text and "Started on llama3.2." in text


# ---------------------------------------------------------------- launcher


def run_launcher(env_extra, tmp_path, *args):
    env = {k: v for k, v in os.environ.items() if not k.startswith("SENTINEL_")}
    env.update({"SENTINEL_DB": str(tmp_path / "launch.db"), "SENTINEL_PORT": "18765", **env_extra})
    return subprocess.run([sys.executable, str(HERE / "run.py"), *args], capture_output=True, text=True, env=env, timeout=60)


def test_launcher_check_initialises_the_database(tmp_path, ollama):
    res = run_launcher({"SENTINEL_OLLAMA_URL": ollama.url}, tmp_path, "--check")
    assert res.returncode == 0, res.stdout + res.stderr
    assert "created" in res.stdout and "Model llama3.2 ready" in res.stdout
    assert Database(tmp_path / "launch.db").is_initialized()


def test_launcher_refuses_a_remote_model_endpoint(tmp_path):
    res = run_launcher({"SENTINEL_OLLAMA_URL": "https://api.example.com"}, tmp_path, "--check")
    assert res.returncode == 1 and "loopback" in res.stdout


def test_launcher_refuses_to_expose_the_dashboard(tmp_path):
    res = run_launcher({"SENTINEL_HOST": "0.0.0.0"}, tmp_path, "--check")
    assert res.returncode == 1 and "would expose the dashboard to the network" in res.stdout
