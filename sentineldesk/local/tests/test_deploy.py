import pytest

from sentineldesk_local.config import LocalOnlyError, Settings, assert_loopback_url
from sentineldesk_local.report import add_feedback, build_report
from sentineldesk_local.profile import demo_profile


def env(monkeypatch, **values):
    for k in [k for k in list(__import__("os").environ) if k.startswith("SENTINEL_")]:
        monkeypatch.delenv(k)
    for k, v in values.items():
        monkeypatch.setenv(k, v)


def test_model_host_allowlist_is_explicit():
    with pytest.raises(LocalOnlyError, match="SENTINEL_MODEL_HOSTS"):
        assert_loopback_url("http://ollama:11434")
    assert assert_loopback_url("http://ollama:11434/", ("ollama",)) == "http://ollama:11434"
    with pytest.raises(LocalOnlyError):
        assert_loopback_url("http://evil.example:11434", ("ollama",))


def test_settings_for_docker_compose(monkeypatch):
    env(monkeypatch, SENTINEL_OLLAMA_URL="http://ollama:11434", SENTINEL_MODEL_HOSTS="Ollama, gpu-box.lan", SENTINEL_HOST="0.0.0.0",
        SENTINEL_ALLOW_NETWORK="1", SENTINEL_FORWARDED_ALLOW_IPS="10.0.0.5", SENTINEL_RETENTION_DAYS="90")
    s = Settings.from_env()
    assert s.model_hosts == ("ollama", "gpu-box.lan") and s.allow_network and s.forwarded_allow_ips == "10.0.0.5" and s.retention_days == 90
    assert s.ollama_client().base_url == "http://ollama:11434"


def test_network_binding_needs_an_explicit_opt_in(monkeypatch):
    env(monkeypatch, SENTINEL_HOST="0.0.0.0")
    with pytest.raises(LocalOnlyError, match="SENTINEL_ALLOW_NETWORK=1"):
        Settings.from_env()
    env(monkeypatch, SENTINEL_HOST="0.0.0.0", SENTINEL_ALLOW_NETWORK="yes")  # only "1" counts
    with pytest.raises(LocalOnlyError):
        Settings.from_env()


def test_retention_removes_text_but_keeps_the_report(db):
    tid = db.add_ticket("pat@company.example", "VPN down", "secret body with personal data", source="dashboard")
    db.claim_next()
    final = {"priority": "P3", "category": "Network", "security_flag": False, "escalate_to": None, "confidence": 0.7, "overrides": [],
             "suggested_response": "x", "kb_refs": [], "security_reasons": [], "reasoning": ""}
    db.complete(tid, final=final, mode="council", model="llama3.2", evidence={"scan": {"reasons": ["x"]}}, fallback_reason=None)
    db.add_agent_run(tid, "intent", "llama3.2", "ok", 100, 10, 5, {"intent": "secret"}, None)
    db.add_event(tid, "intent", "info", "Help with: secret body")
    add_feedback(db, demo_profile(), tid, "ana", "accept")
    queued = db.add_ticket("x@company.example", "new", "still queued body")
    assert db.purge_older_than(30) == 0  # nothing is old enough
    with db.connect() as c:
        c.execute("UPDATE tickets SET created_at = '2020-01-01T00:00:00+00:00'")
    assert db.purge_older_than(30) == 1  # the queued ticket is never purged
    t = db.get_ticket(tid)
    assert "secret" not in t["body"] and t["evidence"] is None and t["requester"] == "removed@retention.invalid"
    assert t["agent_runs"][0]["output"] is None and t["agent_runs"][0]["duration_ms"] == 100
    assert all("secret" not in e["message"] for e in t["events"])
    assert db.get_ticket(queued)["body"] == "still queued body"
    assert db.purge_older_than(30) == 0  # idempotent
    r = build_report(db)
    assert r["review"]["accepted"] == 1 and r["agreement"]["priority_exact_pct"] == 100.0
