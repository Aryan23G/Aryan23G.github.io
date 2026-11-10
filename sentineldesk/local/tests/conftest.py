"""Test fixtures: a fake Ollama server speaking the real HTTP protocol on 127.0.0.1."""

from __future__ import annotations

import json
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Callable

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sentineldesk_local.config import Settings  # noqa: E402
from sentineldesk_local.db import Database  # noqa: E402
from sentineldesk_local.rules import SAMPLE_TICKETS, gather_evidence, triage_with_rules  # noqa: E402

Responder = Callable[[str, dict], "dict | str"]


ROLE_MARKERS = {"security": "the Security analyst", "sentiment": "the Sentiment and Impact analyst", "intent": "the Intent analyst", "chairman": "the Chairman"}


def agent_of(payload: dict) -> str:
    """Identify the agent by its role sentence, so this works for any organisation profile."""
    system = payload["messages"][0]["content"]
    return next(name for name, marker in ROLE_MARKERS.items() if system.startswith(f"You are {marker}"))


def ticket_fields(payload: dict) -> tuple[str, str, str]:
    import html
    import re

    user = payload["messages"][1]["content"]
    get = lambda tag: html.unescape(re.search(rf"<{tag}>(.*?)</{tag}>", user, re.S).group(1))  # noqa: E731
    return get("subject"), get("body"), get("from")


def honest(agent: str, payload: dict) -> dict:
    """A competent model: agrees with the deterministic engine and reports sensibly."""
    subject, body, requester = ticket_fields(payload)
    rules = triage_with_rules(subject, body, requester)
    ev = gather_evidence(subject, body, requester)
    if agent == "security":
        return {"is_attack": rules["security_flag"], "attack_type": ("prompt_injection" if ev.scan.injection else "phishing") if rules["security_flag"] else "none",
                "confidence": 0.9, "indicators": ev.scan.reasons[:4], "summary": "Assessed against scanner evidence."}
    if agent == "sentiment":
        return {"sentiment": "frustrated", "urgency": "high" if rules["priority"] in ("P1", "P2") else "medium", "people_affected": "one",
                "business_impact": "Work is blocked.", "summary": "Requester needs help soon."}
    if agent == "intent":
        return {"category": rules["category"], "intent": f"Help with: {subject}", "kb_query": subject, "suggested_team": rules["escalate_to"] or "Service Desk"}
    return {"category": rules["category"], "priority": rules["priority"], "security_flag": rules["security_flag"],
            "escalate_to": rules["escalate_to"] or "Service Desk", "suggested_response": rules["suggested_response"],
            "reasoning": "Synthesised from the three analysts and the scanner.", "confidence": 0.82, "kb_refs": rules["kb_refs"]}


class FakeOllama:
    def __init__(self) -> None:
        self.models = ["llama3.2:latest", "mistral:latest"]
        self.responders: dict[str, Responder] = {}
        self.requests: list[dict] = []
        self.delay_s = 0.0
        self.active = 0
        self.peak = 0
        self._lock = threading.Lock()
        fake = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args):  # silence
                pass

            def _send(self, status: int, body: dict) -> None:
                data = json.dumps(body).encode()
                self.send_response(status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)

            def do_GET(self):
                if self.path == "/api/tags":
                    return self._send(200, {"models": [{"name": m} for m in fake.models]})
                self._send(404, {"error": "not found"})

            def do_POST(self):
                payload = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
                with fake._lock:
                    fake.requests.append(payload)
                    fake.active += 1
                    fake.peak = max(fake.peak, fake.active)
                try:
                    if payload["model"] not in fake.models and f"{payload['model']}:latest" not in fake.models:
                        return self._send(404, {"error": f"model '{payload['model']}' not found"})
                    time.sleep(fake.delay_s)
                    agent = agent_of(payload)
                    out = fake.responders.get(agent, honest)(agent, payload)
                    content = out if isinstance(out, str) else json.dumps(out)
                    self._send(200, {"model": payload["model"], "message": {"role": "assistant", "content": content}, "done": True,
                                     "prompt_eval_count": 120, "eval_count": 40})
                finally:
                    with fake._lock:
                        fake.active -= 1

        self.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.url = f"http://127.0.0.1:{self.server.server_address[1]}"
        threading.Thread(target=self.server.serve_forever, daemon=True).start()

    def calls(self, agent: str) -> list[dict]:
        return [r for r in self.requests if agent_of(r) == agent]

    def close(self) -> None:
        self.server.shutdown()
        self.server.server_close()


@pytest.fixture
def ollama():
    fake = FakeOllama()
    yield fake
    fake.close()


@pytest.fixture
def db(tmp_path):
    d = Database(tmp_path / "test.db")
    d.init()
    return d


@pytest.fixture
def settings_for(tmp_path):
    def make(ollama_url: str = "http://127.0.0.1:9") -> Settings:
        return Settings(ollama_url=ollama_url, agent_model="llama3.2", chairman_model="llama3.2", db_path=tmp_path / "test.db",
                        host="127.0.0.1", port=8765, request_timeout_s=10, worker_poll_ms=50, stale_after_s=60)
    return make


@pytest.fixture
def sample():
    return lambda i: dict(SAMPLE_TICKETS[i])
