"""OpenAICompatibleSqlGenerator against a mocked HTTP transport: the exact request we send and response handling."""

from __future__ import annotations

import json
from typing import Any

import httpx
import pytest

from app.agent.llm import GenerationError, OpenAICompatibleSqlGenerator

DRAFT = {"reasoning_chain": ["Count orders by status."], "sql_query": "SELECT status, count(*) FROM orders GROUP BY 1",
         "tables_used": ["orders"], "answerable": True, "clarification": ""}


def make(  # type: ignore[no-untyped-def]
    finish_reason: str = "stop", content: str | None = None, status: int = 200, refusal: str | None = None,
    api_key: str | None = None,
):
    seen: dict[str, Any] = {}

    def handler(request: httpx.Request) -> httpx.Response:
        seen["url"] = str(request.url)
        seen["body"] = json.loads(request.content)
        seen["headers"] = dict(request.headers)
        if status != 200:
            return httpx.Response(status, json={"error": {"message": "slow down", "type": "rate_limit_error"}})
        return httpx.Response(200, headers={"x-request-id": "req_123"}, json={
            "id": "chatcmpl-1", "object": "chat.completion", "model": "qwen2.5-coder:7b",
            "choices": [{"index": 0, "finish_reason": finish_reason, "message": {
                "role": "assistant", "refusal": refusal,
                "content": content if content is not None else json.dumps(DRAFT)}}],
            "usage": {"prompt_tokens": 3000, "completion_tokens": 80, "prompt_tokens_details": {"cached_tokens": 2100}},
        })

    gen = OpenAICompatibleSqlGenerator(
        base_url="http://llm.local/v1/", model="qwen2.5-coder:7b", api_key=api_key,
        http_client=httpx.AsyncClient(transport=httpx.MockTransport(handler)))
    return gen, seen


async def test_request_shape_and_parsed_draft() -> None:
    gen, seen = make()
    result = await gen.generate(dialect="sqlite", user_prompt="<question>orders by status</question>")

    assert seen["url"] == "http://llm.local/v1/chat/completions"
    body = seen["body"]
    assert body["model"] == "qwen2.5-coder:7b"
    assert body["temperature"] == 0
    assert [m["role"] for m in body["messages"]] == ["system", "user"]
    assert body["messages"][1]["content"] == "<question>orders by status</question>"
    fmt = body["response_format"]
    assert fmt["type"] == "json_schema"  # structured output from the Pydantic model
    assert set(fmt["json_schema"]["schema"]["required"]) >= {"sql_query", "reasoning_chain"}
    assert "authorization" not in seen["headers"]  # local endpoints need no key

    assert result.draft.sql_query.startswith("SELECT status")
    assert result.usage.input_tokens == 900 and result.usage.cache_read_input_tokens == 2100
    assert result.usage.output_tokens == 80
    assert result.request_id == "req_123"
    assert result.model == "qwen2.5-coder:7b"


async def test_api_key_is_sent_as_bearer_token() -> None:
    gen, seen = make(api_key="secret")
    await gen.generate(dialect="sqlite", user_prompt="q")
    assert seen["headers"]["authorization"] == "Bearer secret"


async def test_fenced_json_is_accepted() -> None:
    gen, _ = make(content="```json\n" + json.dumps(DRAFT) + "\n```")
    result = await gen.generate(dialect="sqlite", user_prompt="q")
    assert result.draft.tables_used == ["orders"]


@pytest.mark.parametrize(("kwargs", "match"), [
    ({"refusal": "I can't help with that."}, "declined"),
    ({"finish_reason": "length"}, "max_tokens"),
    ({"content": ""}, "no structured output"),
    ({"content": '{"sql_query": 1}'}, "did not match the SqlDraft schema"),
])
async def test_bad_replies_raise(kwargs: dict[str, Any], match: str) -> None:
    gen, _ = make(**kwargs)
    with pytest.raises(GenerationError, match=match):
        await gen.generate(dialect="sqlite", user_prompt="q")


async def test_api_errors_become_generation_errors() -> None:
    gen, _ = make(status=429)
    with pytest.raises(GenerationError, match="429: slow down"):
        await gen.generate(dialect="sqlite", user_prompt="q")


async def test_unreachable_endpoint_becomes_generation_error() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        raise httpx.ConnectError("connection refused", request=request)

    gen = OpenAICompatibleSqlGenerator(base_url="http://llm.local/v1", model="m",
                                       http_client=httpx.AsyncClient(transport=httpx.MockTransport(handler)))
    with pytest.raises(GenerationError, match="Could not reach the LLM endpoint"):
        await gen.generate(dialect="sqlite", user_prompt="q")
