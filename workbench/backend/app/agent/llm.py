"""State 2 backend: Claude as a structured SQL generator.

`SqlGenerator` is the seam between the state machine and the model. The
production implementation calls Claude with structured outputs (the response
is validated into `SqlDraft`); tests inject a scripted generator, so the graph
is fully testable without network access.
"""

from __future__ import annotations

import time
from typing import Any, Protocol, cast

import anthropic
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


class ClaudeSqlGenerator:
    def __init__(
        self,
        client: anthropic.AsyncAnthropic,
        *,
        model: str,
        effort: str = "medium",
        max_tokens: int = 16_000,
        server_fallbacks: bool = True,
    ) -> None:
        self._client = client
        self._model = model
        self._effort = effort
        self._max_tokens = max_tokens
        # Server-side refusal fallback is offered on Opus/Sonnet-tier models (not Haiku).
        self._fallbacks = server_fallbacks and "haiku" not in model

    @property
    def model(self) -> str:
        return self._model

    async def generate(self, *, dialect: str, user_prompt: str) -> GenerationResult:
        extra: dict[str, Any] = {}
        if self._fallbacks:
            extra = {"betas": ["server-side-fallback-2026-07-01"], "fallbacks": "default"}
        started = time.perf_counter()
        try:
            # Raw response first: on refusal / truncation the body is not valid SqlDraft JSON, and
            # parse() would raise a validation error that hides the real stop_reason.
            raw = await self._client.beta.messages.with_raw_response.parse(
                model=self._model,
                max_tokens=self._max_tokens,
                # Static per dialect -> cached across runs.
                system=[{"type": "text", "text": system_prompt(dialect), "cache_control": {"type": "ephemeral"}}],
                messages=[{"role": "user", "content": user_prompt}],
                output_format=SqlDraft,
                output_config=cast(Any, {"effort": self._effort}),
                **extra,
            )
        except anthropic.APIStatusError as exc:
            raise GenerationError(f"Claude API error {exc.status_code}: {exc.message}") from exc
        except anthropic.APIConnectionError as exc:
            raise GenerationError(f"Could not reach the Claude API: {exc}") from exc
        latency_ms = round((time.perf_counter() - started) * 1000, 1)

        stop_reason = raw.http_response.json().get("stop_reason")
        if stop_reason == "refusal":
            raise GenerationError("Claude declined to answer this request.")
        if stop_reason == "max_tokens":
            raise GenerationError("Generation hit max_tokens before completing the SQL draft.")
        try:
            response = await raw.parse()
        except ValidationError as exc:
            raise GenerationError(
                f"Claude's output did not match the SqlDraft schema ({exc.error_count()} errors)") from exc
        draft = response.parsed_output
        if draft is None:
            raise GenerationError("Claude returned no structured output.")

        u = response.usage
        usage = TokenUsage(
            input_tokens=u.input_tokens or 0,
            output_tokens=u.output_tokens or 0,
            cache_read_input_tokens=u.cache_read_input_tokens or 0,
            cache_creation_input_tokens=u.cache_creation_input_tokens or 0,
        )
        return GenerationResult(
            draft=draft, usage=usage, model=response.model, latency_ms=latency_ms,
            request_id=raw.headers.get("request-id"),
        )
