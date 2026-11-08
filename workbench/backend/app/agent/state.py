"""Typed state and data contracts for the agent state machine."""

from __future__ import annotations

import operator
from typing import Annotated, Any, Literal, TypedDict

from pydantic import BaseModel, Field

from app.rag.store import RetrievalResult
from app.sql.executor import ColumnMeta, ExecutionResult, JsonScalar
from app.sql.guard import ValidationReport

NodeName = Literal["retrieve_context", "generate_sql", "validate_sql", "execute_sql", "format_response", "fail"]
Outcome = Literal["success", "unanswerable", "failed"]


# ---------------------------------------------------------------- LLM contract
class SqlDraft(BaseModel):
    """Structured output Claude must return (enforced with structured outputs)."""

    reasoning_chain: list[str] = Field(
        description="Ordered, concise reasoning steps: intent, tables and joins chosen, filters, aggregation, "
        "and how any previous error was fixed. One short sentence each.")
    sql_query: str = Field(description="One read-only SELECT statement in the target dialect. Empty if unanswerable.")
    tables_used: list[str] = Field(description="Physical tables referenced by sql_query.")
    answerable: bool = Field(description="False if the question cannot be answered from the provided schema.")
    clarification: str = Field(description="If not answerable: what is missing. Otherwise an empty string.")


class TokenUsage(BaseModel):
    input_tokens: int = 0
    output_tokens: int = 0
    cache_read_input_tokens: int = 0
    cache_creation_input_tokens: int = 0

    def __add__(self, other: TokenUsage) -> TokenUsage:
        return TokenUsage(**{k: getattr(self, k) + getattr(other, k) for k in type(self).model_fields})

    @property
    def total(self) -> int:
        return self.input_tokens + self.cache_read_input_tokens + self.cache_creation_input_tokens + self.output_tokens


class GenerationRecord(BaseModel):
    attempt: int
    trigger: Literal["initial", "static_error", "runtime_error"]
    model: str
    latency_ms: float
    usage: TokenUsage
    request_id: str | None = None
    draft: SqlDraft


class CorrectionFeedback(BaseModel):
    """Error routed back to State 2 for self-correction."""

    attempt: int
    stage: Literal["static", "runtime"]
    sql: str
    log: str


class StepRecord(BaseModel):
    node: NodeName
    label: str
    status: Literal["done", "error", "skipped"]
    started_at_ms: float
    duration_ms: float
    detail: str | None = None
    data: dict[str, Any] | None = Field(default=None, description="Small structured payload for live UIs.")


class FormattedResult(BaseModel):
    """State 5 output: frontend-ready dataset."""

    columns: list[ColumnMeta]
    records: list[dict[str, JsonScalar]]
    row_count: int
    truncated: bool
    execution_ms: float


# ---------------------------------------------------------------- graph state
class AgentState(TypedDict, total=False):
    run_id: str
    question: str
    started_at: float

    retrieval: RetrievalResult
    schema_context: str

    draft: SqlDraft
    validation: ValidationReport
    execution: ExecutionResult
    result: FormattedResult

    static_retries: int
    runtime_retries: int
    feedback: Annotated[list[CorrectionFeedback], operator.add]
    generations: Annotated[list[GenerationRecord], operator.add]
    steps: Annotated[list[StepRecord], operator.add]

    outcome: Outcome
    error: str
