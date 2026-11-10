"""State 2 backend: an LLM as a structured SQL generator.

`SqlGenerator` is the seam between the state machine and the model. The
production implementation talks to any OpenAI-compatible `/chat/completions`
endpoint (a local Ollama, vLLM, LM Studio or llama.cpp server, or a hosted
provider) and asks for JSON matching the `SqlDraft` schema, which is then
validated with Pydantic. Tests inject a scripted generator, so the graph is
fully testable without network access.
"""

from __future__ import annotations

import json
import time
from typing import Any, Protocol

import httpx
from opentelemetry import trace
from pydantic import BaseModel, ValidationError

from app.agent.prompts import system_prompt
from app.agent.state import SqlDraft, TokenUsage


class GenerationResult(BaseModel):
    draft: SqlDraft
    usage: TokenUsage
    model: str
    latency_ms: float
    request_id: str | None = None


class GenerationError(Exception):
    """Non-retryable failure of the generation stage (refusal, truncation, invalid output, API error)."""


class SqlGenerator(Protocol):
    @property
    def model(self) -> str: ...

    async def generate(self, *, dialect: str, user_prompt: str) -> GenerationResult: ...


class OpenAICompatibleSqlGenerator:
    """Structured SQL drafts from an OpenAI-compatible chat completions API."""

    def __init__(
        self,
        *,
        base_url: str,
        model: str,
        api_key: str | None = None,
        max_tokens: int = 4_000,
        timeout_s: float = 120.0,
        trace_content: bool = False,
        http_client: httpx.AsyncClient | None = None,
    ) -> None:
        self._url = base_url.rstrip("/") + "/chat/completions"
        self._model = model
        self._max_tokens = max_tokens
        self._trace_content = trace_content
        headers = {"Authorization": f"Bearer {api_key}"} if api_key else {}
        self._client = http_client or httpx.AsyncClient(timeout=timeout_s)
        self._headers = headers

    @property
    def model(self) -> str:
        return self._model

    async def generate(self, *, dialect: str, user_prompt: str) -> GenerationResult:
        body: dict[str, Any] = {
            "model": self._model,
            "max_tokens": self._max_tokens,
            "temperature": 0,
            "messages": [
                {"role": "system", "content": system_prompt(dialect)},
                {"role": "user", "content": user_prompt},
            ],
            # Structured output: servers that support JSON schema constrain decoding to it;
            # the reply is validated against SqlDraft either way.
            "response_format": {
                "type": "json_schema",
                "json_schema": {"name": "sql_draft", "schema": SqlDraft.model_json_schema()},
            },
        }
        started = time.perf_counter()
        try:
            response = await self._client.post(self._url, json=body, headers=self._headers)
        except httpx.HTTPError as exc:
            raise GenerationError(f"Could not reach the LLM endpoint {self._url}: {exc}") from exc
        latency_ms = round((time.perf_counter() - started) * 1000, 1)
        if response.status_code != 200:
            raise GenerationError(f"LLM API error {response.status_code}: {_error_message(response)}")

        payload = response.json()
        choice = (payload.get("choices") or [{}])[0]
        message = choice.get("message") or {}
        if message.get("refusal"):
            raise GenerationError(f"The model declined to answer this request: {message['refusal']}")
        if choice.get("finish_reason") == "length":
            raise GenerationError("Generation hit max_tokens before completing the SQL draft.")
        content = message.get("content") or ""
        if not content.strip():
            raise GenerationError("The model returned no structured output.")
        try:
            draft = SqlDraft.model_validate_json(_strip_fences(content))
        except ValidationError as exc:
            raise GenerationError(
                f"The model's output did not match the SqlDraft schema ({exc.error_count()} errors)") from exc

        if self._trace_content:
            span = trace.get_current_span()
            span.set_attribute("gen_ai.prompt", user_prompt)
            span.set_attribute("gen_ai.completion", content)

        u = payload.get("usage") or {}
        prompt_tokens = int(u.get("prompt_tokens") or 0)
        cached = int((u.get("prompt_tokens_details") or {}).get("cached_tokens") or 0)
        usage = TokenUsage(
            input_tokens=prompt_tokens - cached,
            output_tokens=int(u.get("completion_tokens") or 0),
            cache_read_input_tokens=cached,
        )
        return GenerationResult(
            draft=draft, usage=usage, model=str(payload.get("model") or self._model), latency_ms=latency_ms,
            request_id=response.headers.get("x-request-id") or payload.get("id"),
        )


def _error_message(response: httpx.Response) -> str:
    try:
        err = response.json().get("error")
    except json.JSONDecodeError:
        return response.text[:200]
    if isinstance(err, dict):
        return str(err.get("message") or err)
    return str(err or response.text[:200])


def _strip_fences(text: str) -> str:
    """Some local servers wrap JSON in a ```json fence even in JSON mode."""
    t = text.strip()
    if t.startswith("```"):
        t = t.split("\n", 1)[1] if "\n" in t else ""
        t = t.rsplit("```", 1)[0]
    return t.strip()
