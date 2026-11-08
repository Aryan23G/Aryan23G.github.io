"""ClaudeSqlGenerator against a mocked HTTP transport: checks the exact request we send and response handling."""

from __future__ import annotations

import json
from typing import Any

import anthropic
import httpx2 as httpx
import pytest

from app.agent.llm import ClaudeSqlGenerator, GenerationError

DRAFT = {"reasoning_chain": ["Count orders by status."], "sql_query": "SELECT status, count(*) FROM orders GROUP BY 1",
         "tables_used": ["orders"], "answerable": True, "clarification": ""}


def make(stop_reason: str = "end_turn", text: str | None = None, status: int = 200):  # type: ignore[no-untyped-def]
    seen: dict[str, Any] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        seen["body"] = json.loads(request.content)
        seen["headers"] = dict(request.headers)
        if status != 200:
            err = {"type": "error", "error": {"type": "rate_limit_error", "message": "slow"}}
            return httpx.Response(status, json=err)
        return httpx.Response(200, headers={"request-id": "req_123"}, json={
            "id": "msg_1", "type": "message", "role": "assistant", "model": "claude-opus-5-5",
            "content": [{"type": "text", "text": text if text is not None else json.dumps(DRAFT)}],
            "stop_reason": stop_reason, "stop_sequence": None,
            "usage": {"input_tokens": 900, "output_tokens": 80, "cache_read_input_tokens": 2100,
                      "cache_creation_input_tokens": 0},
        })

    client = anthropic.AsyncAnthropic(api_key="sk-test", max_retries=0, open_telemetry=False,
                                      http_client=httpx.AsyncClient(transport=httpx.MockTransport(handler)))
    return client, seen


async def test_request_shape_and_parsed_draft() -> None:
    client, seen = make()
    gen = ClaudeSqlGenerator(client, model="claude-opus-5-5", effort="medium")
    result = await gen.generate(dialect="sqlite", user_prompt="<question>orders by status</question>")

    body = seen["body"]
    assert body["model"] == "claude-opus-5-5"
    assert body["output_config"]["effort"] == "medium"
    assert body["output_config"]["format"]["type"] == "json_schema"  # structured output from the Pydantic model
    assert set(body["output_config"]["format"]["schema"]["required"]) >= {"sql_query", "reasoning_chain"}
    assert body["system"][0]["cache_control"] == {"type": "ephemeral"}
    assert "thinking" not in body  # Opus 5.5: adaptive thinking is always on; effort controls depth
    assert body["fallbacks"] == "default"
    assert "server-side-fallback-2026-07-01" in seen["headers"]["anthropic-beta"]

    assert result.draft.sql_query.startswith("SELECT status")
    assert result.usage.cache_read_input_tokens == 2100
    assert result.request_id == "req_123"


async def test_haiku_gets_no_server_fallback() -> None:
    client, seen = make()
    await ClaudeSqlGenerator(client, model="claude-haiku-5-5").generate(dialect="sqlite", user_prompt="q")
    assert "fallbacks" not in seen["body"]


@pytest.mark.parametrize(("stop", "match"), [("refusal", "declined"), ("max_tokens", "max_tokens")])
async def test_stop_reasons_raise(stop: str, match: str) -> None:
    client, _ = make(stop_reason=stop, text="")
    with pytest.raises(GenerationError, match=match):
        await ClaudeSqlGenerator(client, model="claude-opus-5-5").generate(dialect="sqlite", user_prompt="q")


async def test_api_errors_become_generation_errors() -> None:
    client, _ = make(status=429)
    with pytest.raises(GenerationError, match="429"):
        await ClaudeSqlGenerator(client, model="claude-opus-5-5").generate(dialect="sqlite", user_prompt="q")
