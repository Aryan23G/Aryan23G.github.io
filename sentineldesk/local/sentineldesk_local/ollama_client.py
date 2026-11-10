"""Minimal client for a local Ollama server (native /api/chat with JSON-schema structured output)."""

from __future__ import annotations

import json
import time
from dataclasses import dataclass
from typing import Any

import requests

from .config import assert_loopback_url


class OllamaError(RuntimeError):
    """The model server failed or returned something unusable."""


class OllamaUnavailable(OllamaError):
    """The model server is not running or not reachable."""


@dataclass
class ChatResult:
    data: dict
    raw: str
    model: str
    prompt_tokens: int
    output_tokens: int
    duration_ms: int


class OllamaClient:
    def __init__(self, base_url: str, timeout_s: int = 180, session: requests.Session | None = None, allowed_hosts: tuple[str, ...] = ()):
        self.base_url = assert_loopback_url(base_url, allowed_hosts)
        self.timeout_s = timeout_s
        self.session = session or requests.Session()
        # Never route localhost traffic through an HTTP(S)_PROXY from the environment.
        self.session.trust_env = False

    def list_models(self) -> list[str]:
        try:
            res = self.session.get(f"{self.base_url}/api/tags", timeout=5)
        except requests.RequestException as exc:
            raise OllamaUnavailable(f"Ollama is not reachable at {self.base_url} ({exc.__class__.__name__}).") from exc
        if res.status_code != 200:
            raise OllamaError(f"Ollama /api/tags returned HTTP {res.status_code}.")
        return [m.get("name", "") for m in res.json().get("models", [])]

    @staticmethod
    def has_model(available: list[str], wanted: str) -> bool:
        """`llama3.2` matches `llama3.2:latest`; an explicit tag must match exactly."""
        if ":" in wanted:
            return wanted in available
        return any(name == wanted or name == f"{wanted}:latest" for name in available)

    def chat_json(self, model: str, system: str, user: str, schema: dict, temperature: float = 0.0) -> ChatResult:
        """One non-streaming chat turn constrained to `schema`. Raises OllamaError on bad output."""
        payload: dict[str, Any] = {
            "model": model,
            "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
            "stream": False,
            "format": schema,
            "options": {"temperature": temperature},
            "keep_alive": "10m",
        }
        started = time.monotonic()
        try:
            res = self.session.post(f"{self.base_url}/api/chat", json=payload, timeout=self.timeout_s)
        except requests.Timeout as exc:
            raise OllamaError(f"{model} did not answer within {self.timeout_s}s.") from exc
        except requests.RequestException as exc:
            raise OllamaUnavailable(f"Ollama is not reachable at {self.base_url} ({exc.__class__.__name__}).") from exc
        if res.status_code == 404:
            raise OllamaError(f"Model {model!r} is not installed. Run: ollama pull {model}")
        if res.status_code != 200:
            raise OllamaError(f"Ollama /api/chat returned HTTP {res.status_code}: {res.text[:200]}")
        body = res.json()
        raw = (body.get("message") or {}).get("content", "")
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as exc:
            raise OllamaError(f"{model} returned text that is not JSON: {raw[:120]!r}") from exc
        if not isinstance(data, dict):
            raise OllamaError(f"{model} returned JSON that is not an object.")
        return ChatResult(
            data=data,
            raw=raw,
            model=body.get("model", model),
            prompt_tokens=int(body.get("prompt_eval_count") or 0),
            output_tokens=int(body.get("eval_count") or 0),
            duration_ms=int((time.monotonic() - started) * 1000),
        )
