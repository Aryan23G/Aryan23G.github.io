from pathlib import Path

import pytest

from sentineldesk_local.council import Council, build_schemas
from sentineldesk_local.guardrail import enforce_policy, reply_problems
from sentineldesk_local.ollama_client import OllamaClient
from sentineldesk_local.profile import ProfileError, demo_profile, load_profile, profile_from_dict
from sentineldesk_local.rules import check_sender_domain, gather_evidence, triage_with_rules

from .conftest import honest

EXAMPLE = Path(__file__).resolve().parents[1] / "sentineldesk.example.toml"


@pytest.fixture(scope="module")
def acme():
    return load_profile(EXAMPLE)


def test_example_profile_loads_markdown_kb_in_all_three_styles(acme):
    assert acme.name == "Acme Corporation" and acme.brand_tokens == ("acme",)
    by_id = acme.kb_by_id
    assert set(by_id) == {"SEC-001", "IAM-010", "NET-020"}
    assert by_id["IAM-010"]["title"] == "Unlocking your account or resetting your password"  # heading after front matter
    assert by_id["NET-020"]["title"] == "VPN won't connect" and by_id["NET-020"]["tags"] == []  # no front matter
    assert "\n" not in by_id["SEC-001"]["content"]
    assert acme.category_names[-2:] == ("Security Incident", "Other")


def test_sender_check_uses_the_customers_domains(acme):
    assert check_sender_domain("a@acme.com", acme).internal
    assert check_sender_domain("a@it.acme.co.uk", acme).internal  # subdomains are internal
    assert check_sender_domain("a@acme-support.net", acme).lookalike
    assert check_sender_domain("a@4cme.com", acme).lookalike is False  # only listed substitutions (0->o, 1->l)
    assert check_sender_domain("a@company.example", acme).internal is False


def test_rules_and_guardrail_route_to_the_customers_teams(acme):
    phish = triage_with_rules("Password expires", "Your password will expire today, verify your password at http://bit.ly/x", "it@acme-helpdesk.net", acme)
    assert phish["security_flag"] and phish["escalate_to"] == "Security Operations" and phish["kb_refs"] == ["SEC-001"]
    assert "Security Operations" in phish["suggested_response"]
    vpn = triage_with_rules("VPN down", "The VPN says gateway unreachable", "bo@acme.com", acme)
    assert vpn["escalate_to"] == "Network" and "NET-020" in vpn["kb_refs"]
    assert reply_problems("Reset at https://password.acme.com", acme) == []
    assert reply_problems("Reset at https://password.company.example", acme)
    ev = gather_evidence("x", "My laptop is broken", "bo@acme.com", acme)
    out = enforce_policy({"category": "Hardware", "priority": "P3", "security_flag": False, "escalate_to": "Desktop Support",
                          "suggested_response": "ok", "reasoning": "", "confidence": 0.5, "kb_refs": ["KB-101"]}, ev, "bo@acme.com", None, acme)
    assert out["escalate_to"] is None and out["kb_refs"] == []  # demo team and demo KB do not exist for Acme


def test_council_schemas_only_allow_the_customers_categories_and_teams(acme):
    chairman = build_schemas(acme)["chairman"].model_json_schema()
    team_enum = chairman["properties"]["escalate_to"]["enum"]
    assert "Security Operations" in team_enum and "Desktop Support" not in team_enum and "Service Desk" in team_enum
    assert "Email & Collaboration" not in chairman["properties"]["category"]["enum"]


def test_council_runs_with_a_customer_profile(acme, ollama):
    ollama.responders["chairman"] = lambda a, p: {**honest(a, p), "category": "Network", "priority": "P3", "security_flag": False,
                                                  "escalate_to": "Network", "suggested_response": "See NET-020.", "kb_refs": ["NET-020"]}
    ollama.responders["intent"] = lambda a, p: {"category": "Network", "intent": "VPN", "kb_query": "vpn gateway", "suggested_team": "Network"}
    r = Council(OllamaClient(ollama.url, 10), "llama3.2", "llama3.2", profile=acme).run("VPN down", "VPN says gateway unreachable", "bo@acme.com")
    assert r.mode == "council" and r.final["escalate_to"] == "Network" and r.final["kb_refs"] == ["NET-020"]
    system = ollama.calls("chairman")[0]["messages"][0]["content"]
    assert "Acme Corporation" in system and "Security Operations" in system
    assert "NET-020" in ollama.calls("chairman")[0]["messages"][1]["content"]


def test_settings_load_the_configured_profile(settings_for, tmp_path, monkeypatch):
    monkeypatch.setenv("SENTINEL_CONFIG", str(EXAMPLE))
    from sentineldesk_local.config import Settings

    assert Settings.from_env().load_profile().name == "Acme Corporation"
    monkeypatch.delenv("SENTINEL_CONFIG")
    assert Settings.from_env().load_profile() is demo_profile()


BASE = {
    "organization": {"name": "X", "domains": ["x.com"], "security_team": "Sec"},
    "teams": [{"name": "Sec", "handles": "security"}],
}


@pytest.mark.parametrize(
    "patch,message",
    [
        ({"organization": {"name": "X", "domains": [], "security_team": "Sec"}}, "at least one entry in domains"),
        ({"organization": {"name": "X", "domains": ["x.com"], "security_team": "Nope"}}, "must be one of the"),
        ({"categories": [{"name": "Net", "keywords": ["vpn"], "team": "Ghost"}]}, "unknown team"),
        ({"categories": [{"name": "Net", "keywords": ["vpn"], "priority": "P9"}]}, "use P1-P4"),
        ({"categories": [{"name": "Net", "keywords": ["vpn("]}]}, "Invalid keyword pattern"),
        ({"knowledge_base": {"articles": [{"id": "A", "title": "t", "content": "c"}, {"id": "A", "title": "t", "content": "c"}]}}, "Duplicate"),
        ({"organization": {"name": "X", "domains": ["x.com"], "security_team": "Sec", "security_kb": ["KB-1"]}}, "do not exist"),
        ({"teams": [{"name": "Sec"}, {"name": "Sec"}]}, "unique"),
        ({"knowledge_base": {"dir": "missing-folder"}}, "is not a folder"),
    ],
)
def test_profile_validation_explains_mistakes(patch, message, tmp_path):
    with pytest.raises(ProfileError, match=message):
        profile_from_dict({**BASE, **patch}, base_dir=tmp_path)


def test_profile_file_errors(tmp_path):
    with pytest.raises(ProfileError, match="not found"):
        load_profile(tmp_path / "none.toml")
    bad = tmp_path / "bad.toml"
    bad.write_text("[organization\nname=")
    with pytest.raises(ProfileError, match="not valid TOML"):
        load_profile(bad)
    kb = tmp_path / "kb"
    kb.mkdir()
    (kb / "a.md").write_text("no title here")
    with pytest.raises(ProfileError, match="title"):
        profile_from_dict({**BASE, "knowledge_base": {"dir": "kb"}}, base_dir=tmp_path)


def test_short_domain_names_need_explicit_brand_tokens():
    p = profile_from_dict({**BASE, "organization": {"name": "HP", "domains": ["hp.com"], "security_team": "Sec"}})
    assert p.brand_tokens == ()  # "hp" would match half the internet
    assert profile_from_dict({**BASE, "organization": {"name": "HP", "domains": ["hp.com"], "security_team": "Sec", "brand_tokens": ["hpinc"]}}).brand_tokens == ("hpinc",)
