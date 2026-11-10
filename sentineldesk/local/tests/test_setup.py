import json
import os
import signal
import stat
import subprocess
import sys
import time
import tomllib
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from sentineldesk_local.auth import Auth
from sentineldesk_local.config import Settings
from sentineldesk_local.config_store import ConfigStore, dump_toml
from sentineldesk_local.ollama_client import OllamaClient
from sentineldesk_local.web import create_app
from sentineldesk_local.worker import Worker

from .fake_jira import FakeJira

H = {"X-SentinelDesk": "1"}
PW = "correct horse battery"
HERE = Path(__file__).resolve().parents[1]
ORG = {"name": "Acme Corp", "domains": ["@Acme.com", "acme.co.uk"], "teams": [{"name": "Security", "handles": "phishing"}, {"name": "Desktop"}, {"name": "Network"}], "security_team": "Security"}


@pytest.fixture
def jira():
    # Served on 127.0.0.1, which SentinelDesk treats as Data Center (v2 API, personal access token).
    fake = FakeJira(deployment="datacenter")
    yield fake
    fake.close()


@pytest.fixture
def setup(settings_for, db, monkeypatch):
    for k in ("JIRA_EMAIL", "JIRA_API_TOKEN", "JIRA_PAT"):
        monkeypatch.delenv(k, raising=False)
    settings = settings_for()
    client = TestClient(create_app(settings, db, OllamaClient("http://127.0.0.1:9", 2)))
    return settings, client, db


def first_admin(client, db):
    token = Auth(db).setup_token()
    r = client.post("/api/setup/account", json={"token": token, "username": "boss", "password": PW}, headers=H)
    assert r.status_code == 200, r.text
    return token


# ---------------------------------------------------------------- first run


def test_setup_link_creates_the_first_admin_exactly_once(setup):
    _, c, db = setup
    assert c.get("/api/setup/status").json() == {"needs_account": True}
    token = Auth(db).setup_token()
    assert Auth(db).setup_token() == token  # stable until used
    bad = c.post("/api/setup/account", json={"token": "guess", "username": "boss", "password": PW}, headers=H)
    assert bad.status_code == 400 and "not valid" in bad.json()["detail"]
    assert c.post("/api/setup/account", json={"token": token, "username": "boss", "password": PW}).status_code == 403  # CSRF header
    assert c.post("/api/setup/account", json={"token": token, "username": "boss", "password": PW}, headers=H).status_code == 200
    assert c.get("/api/me").json() == {"username": "boss", "role": "admin"}  # signed in straight away
    again = TestClient(c.app).post("/api/setup/account", json={"token": token, "username": "eve", "password": PW}, headers=H)
    assert again.status_code == 400 and "already complete" in again.json()["detail"]
    assert Auth(db).setup_token() is None
    status = c.get("/api/setup/status").json()
    assert status["needs_account"] is False and status["configured"] is False


def test_organisation_step_writes_a_valid_config(setup):
    settings, c, db = setup
    first_admin(c, db)
    assert c.put("/api/settings/organization", json={**ORG, "domains": ["not a domain"]}, headers=H).status_code == 400
    assert c.put("/api/settings/organization", json={**ORG, "security_team": "Nobody"}, headers=H).status_code == 400
    assert c.put("/api/settings/organization", json={**ORG, "teams": [{"name": "A"}, {"name": "A"}]}, headers=H).status_code == 400
    r = c.put("/api/settings/organization", json=ORG, headers=H)
    assert r.status_code == 200, r.text
    s = r.json()
    assert s["organization"]["domains"] == ["acme.com", "acme.co.uk"] and [t["name"] for t in s["teams"]] == ["Security", "Desktop", "Network"]
    data = tomllib.loads((settings.db_path.parent / "sentineldesk.toml").read_text())
    assert data["categories"] and data["priority_rules"]  # sensible fallbacks filled in
    profile = c.get("/api/profile").json()
    assert profile["name"] == "Acme Corp" and profile["teams"] == ["Security", "Desktop", "Network"]  # live, no restart
    assert c.get("/api/setup/status").json()["configured"] is True


def test_analysts_cannot_change_settings(setup):
    _, c, db = setup
    first_admin(c, db)
    Auth(db).create_user("ana", PW, "analyst")
    c.post("/api/login", json={"username": "ana", "password": PW}, headers=H)
    assert c.get("/api/settings").status_code == 403
    assert c.put("/api/settings/organization", json=ORG, headers=H).status_code == 403


def test_jira_step_discovers_desks_and_priorities_and_keeps_secrets_out_of_the_config(setup, jira):
    settings, c, db = setup
    first_admin(c, db)
    c.put("/api/settings/organization", json=ORG, headers=H)
    missing = c.post("/api/settings/jira/test", json={"base_url": jira.url}, headers=H)
    assert missing.status_code == 400 and "personal access token" in missing.json()["detail"] and "environment" not in missing.json()["detail"]
    wrong = c.post("/api/settings/jira/test", json={"base_url": jira.url, "pat": "nope"}, headers=H)
    assert wrong.status_code == 400 and "credentials" in wrong.json()["detail"]
    t = c.post("/api/settings/jira/test", json={"base_url": jira.url, "pat": "pat-123"}, headers=H).json()
    assert t["account"] == "SentinelDesk Bot" and t["service_desks"] == [{"key": "IT", "name": "IT Help Desk"}, {"key": "HR", "name": "HR Requests"}]
    assert t["suggested_priority_map"] == {"Highest": "P1", "High": "P2", "Medium": "P3", "Low": "P4", "Lowest": "P4"}
    r = c.put("/api/settings/jira", json={"base_url": jira.url, "pat": "pat-123", "project_key": "IT", "history_days": 30,
                                          "priority_map": t["suggested_priority_map"]}, headers=H)
    assert r.status_code == 200, r.text
    s = r.json()["jira"]
    assert s["enabled"] and s["project_key"] == "IT" and s["mode"] == "shadow" and s["history_days"] == 30
    toml_text = (settings.db_path.parent / "sentineldesk.toml").read_text()
    assert "pat-123" not in toml_text and 'jql = "project = \\"IT\\""' in toml_text
    secrets = settings.db_path.parent / "secrets.json"
    assert json.loads(secrets.read_text())["jira_pat"] == "pat-123"
    assert stat.S_IMODE(secrets.stat().st_mode) == 0o600
    masked = c.get("/api/settings").json()["secrets"]
    assert masked["jira_pat"] == "••••••••"  # short tokens are fully hidden
    assert c.put("/api/settings/jira", json={"base_url": jira.url, "project_key": "it lower"}, headers=H).status_code == 400
    off = c.put("/api/settings/jira", json={"base_url": jira.url, "enabled": False}, headers=H).json()
    assert off["jira"]["enabled"] is False


def test_worker_picks_up_settings_without_a_restart(setup, jira):
    settings, c, db = setup
    first_admin(c, db)
    store = ConfigStore(settings)
    worker = Worker(db, OllamaClient("http://127.0.0.1:9", 2), "llama3.2", "llama3.2", store=store)
    assert worker.current_jira() is None and worker.profile.name == "Company Example"
    c.put("/api/settings/organization", json=ORG, headers=H)
    c.put("/api/settings/jira", json={"base_url": jira.url, "pat": "pat-123", "project_key": "IT", "history_days": 0, "priority_map": {}}, headers=H)
    sync = worker.current_jira()
    assert sync is not None and sync.cfg.jql == 'project = "IT"' and worker.profile.name == "Acme Corp"
    assert worker.current_jira() is sync  # unchanged settings: same connector
    c.put("/api/settings/jira", json={"base_url": jira.url, "enabled": False}, headers=H)
    assert worker.current_jira() is None


def test_help_articles_upload_and_delete(setup):
    settings, c, db = setup
    first_admin(c, db)
    assert c.post("/api/settings/kb", json={"files": [{"name": "a.md", "content": "x"}]}, headers=H).status_code == 409  # org first
    c.put("/api/settings/organization", json=ORG, headers=H)
    files = [
        {"name": "reset password.md", "content": "---\nid: IAM-1\ntags: password, reset\n---\n# Reset your password\nUse the portal."},
        {"name": "vpn_help.txt", "content": "Restart the VPN client, then sign in again."},
    ]
    s = c.post("/api/settings/kb", json={"files": files}, headers=H).json()
    assert {a["id"]: a["title"] for a in s["kb"]} == {"IAM-1": "Reset your password", "vpn_help": "vpn help"}
    dup = c.post("/api/settings/kb", json={"files": [{"name": "other.md", "content": "---\nid: IAM-1\n---\n# Dup\ntext"}]}, headers=H)
    assert dup.status_code == 400 and "already exists" in dup.json()["detail"]
    assert c.post("/api/settings/kb", json={"files": [{"name": "x.exe", "content": "MZ"}]}, headers=H).status_code == 400
    replaced = c.post("/api/settings/kb", json={"files": [{"name": "vpn_help.txt", "content": "Updated text."}]}, headers=H)
    assert replaced.status_code == 200  # re-uploading the same file replaces it
    assert len(c.get("/api/settings").json()["kb"]) == 2
    s = c.delete("/api/settings/kb/vpn_help", headers=H).json()
    assert [a["id"] for a in s["kb"]] == ["IAM-1"]
    assert c.delete("/api/settings/kb/nope", headers=H).status_code == 404


def test_settings_are_read_only_when_managed_by_a_file(setup, monkeypatch, tmp_path):
    settings, _, db = setup
    managed = Settings(**{**settings.__dict__, "config_path": HERE / "sentineldesk.example.toml"})
    c = TestClient(create_app(managed, db, OllamaClient("http://127.0.0.1:9", 2)))
    first_admin(c, db)
    assert c.get("/api/settings").json()["managed_by_file"] is True
    assert c.put("/api/settings/organization", json=ORG, headers=H).status_code == 409


def test_toml_writer_round_trips():
    data = tomllib.loads((HERE / "sentineldesk.example.toml").read_text())
    data["jira"]["team_map"] = {'Tier 2 "Network"': "Network"}
    assert tomllib.loads(dump_toml(data)) == data


def test_launcher_prints_a_one_time_setup_link(tmp_path):
    env = {k: v for k, v in os.environ.items() if not k.startswith(("SENTINEL_", "JIRA_"))}
    env.update(SENTINEL_DB=str(tmp_path / "s.db"), SENTINEL_PORT="18772", SENTINEL_OLLAMA_URL="http://127.0.0.1:9")
    proc = subprocess.Popen([sys.executable, str(HERE / "run.py")], env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, stdin=subprocess.DEVNULL)
    out = ""
    try:
        deadline = time.time() + 30
        while time.time() < deadline and "#setup=" not in out:
            line = proc.stdout.readline()
            if not line:
                break
            out += line
    finally:
        proc.send_signal(signal.SIGINT)
        proc.wait(timeout=30)
    assert "http://127.0.0.1:18772/#setup=" in out, out
    token = out.split("#setup=")[1].split()[0].replace("\x1b[0m", "")
    from sentineldesk_local.db import Database

    assert Database(tmp_path / "s.db").get_meta("setup_token") == token
