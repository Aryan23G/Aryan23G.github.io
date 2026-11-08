"""Run the state machine and produce a complete, auditable `RunTrace`.

The graph executes in its own asyncio task under a root `agent.run` span, and
pushes events into a queue that the API drains as Server-Sent Events. Keeping
the span inside a single task avoids OpenTelemetry context leaking across
async-generator boundaries, and lets client disconnects cancel the run.
"""

from __future__ import annotations

import asyncio
import time
import uuid
from collections.abc import AsyncGenerator
from typing import Any, Literal

from langgraph.graph.state import CompiledStateGraph
from pydantic import BaseModel, Field

from app.agent.history import RunStore
from app.agent.state import (
    AgentState,
    CorrectionFeedback,
    FormattedResult,
    GenerationRecord,
    Outcome,
    StepRecord,
    TokenUsage,
)
from app.observability.tracing import tracer
from app.rag.store import RetrievalResult
from app.sql.guard import CompilerDiagnostic


class RunTrace(BaseModel):
    run_id: str
    question: str
    model: str
    dialect: str
    outcome: Outcome
    error: str | None = None
    sql: str | None = Field(default=None, description="Compiled SQL that was executed (or the last draft).")
    reasoning_chain: list[str] = Field(default_factory=list)
    clarification: str | None = None
    retrieval: RetrievalResult | None = None
    generations: list[GenerationRecord] = Field(default_factory=list)
    feedback: list[CorrectionFeedback] = Field(default_factory=list)
    diagnostics: list[CompilerDiagnostic] = Field(default_factory=list)
    steps: list[StepRecord] = Field(default_factory=list)
    usage: TokenUsage = Field(default_factory=TokenUsage)
    llm_calls: int = 0
    static_retries: int = 0
    runtime_retries: int = 0
    total_ms: float = 0.0
    started_at: float = Field(default=0.0, description="Unix epoch seconds when the run started.")
    result: FormattedResult | None = None


class RunStarted(BaseModel):
    type: Literal["run_started"] = "run_started"
    run_id: str
    question: str
    model: str
    dialect: str


class StepEvent(BaseModel):
    type: Literal["step"] = "step"
    node: str
    status: Literal["running", "done", "error", "skipped"]
    label: str
    started_at_ms: float | None = None
    duration_ms: float | None = None
    detail: str | None = None
    data: dict[str, Any] | None = None


class RunCompleted(BaseModel):
    type: Literal["run_completed"] = "run_completed"
    trace: RunTrace


class RunFailed(BaseModel):
    type: Literal["run_error"] = "run_error"
    run_id: str
    message: str


AgentEvent = RunStarted | StepEvent | RunCompleted | RunFailed
_DONE = object()


class AgentRunner:
    def __init__(self, graph: CompiledStateGraph, *, model: str, dialect: str,  # type: ignore[type-arg]
                 store: RunStore | None = None) -> None:
        self.graph = graph
        self.model = model
        self.dialect = dialect
        self.store = store if store is not None else RunStore()

    def _initial_state(self, question: str, run_id: str) -> AgentState:
        return {"run_id": run_id, "question": question.strip(), "started_at": time.time(),
                "static_retries": 0, "runtime_retries": 0, "feedback": [], "generations": [], "steps": []}

    def _trace(self, state: AgentState, run_id: str, total_ms: float) -> RunTrace:
        gens = state.get("generations", [])
        draft = state.get("draft")
        validation = state.get("validation")
        usage = TokenUsage()
        for g in gens:
            usage = usage + g.usage
        executed = state.get("execution")
        sql = executed.sql if executed is not None else (draft.sql_query if draft else None)
        return RunTrace(
            run_id=run_id, question=state.get("question", ""), model=self.model, dialect=self.dialect,
            started_at=state.get("started_at", 0.0),
            outcome=state.get("outcome", "failed"), error=state.get("error"), sql=sql,
            reasoning_chain=draft.reasoning_chain if draft else [],
            clarification=(draft.clarification or None) if draft else None,
            retrieval=state.get("retrieval"), generations=gens, feedback=state.get("feedback", []),
            diagnostics=validation.diagnostics if validation else [], steps=state.get("steps", []),
            usage=usage, llm_calls=len(gens), static_retries=state.get("static_retries", 0),
            runtime_retries=state.get("runtime_retries", 0), total_ms=round(total_ms, 1), result=state.get("result"),
        )

    async def _produce(self, question: str, run_id: str, queue: asyncio.Queue[Any]) -> None:
        started = time.perf_counter()
        state: dict[str, Any] = dict(self._initial_state(question, run_id))
        with tracer().start_as_current_span("agent.run") as span:
            span.set_attribute("agent.run_id", run_id)
            span.set_attribute("agent.question", question)
            span.set_attribute("gen_ai.request.model", self.model)
            try:
                stream: Any = self.graph.astream(state, stream_mode=["updates", "custom"],
                                                 config={"recursion_limit": 40})
                async for mode, chunk in stream:
                    if mode == "custom":
                        if chunk.get("type") == "step" and chunk.get("status") == "running":
                            await queue.put(StepEvent.model_validate(chunk))
                        continue
                    for update in chunk.values():  # mode == "updates": {node: partial_state}
                        for key, value in (update or {}).items():
                            if key in ("feedback", "generations", "steps"):
                                state[key] = [*state.get(key, []), *value]
                            else:
                                state[key] = value
                        for rec in (update or {}).get("steps", []):
                            await queue.put(StepEvent(**rec.model_dump()))
                trace = self._trace(state, run_id, (time.perf_counter() - started) * 1000)  # type: ignore[arg-type]
                span.set_attribute("agent.outcome", trace.outcome)
                span.set_attribute("agent.llm_calls", trace.llm_calls)
                span.set_attribute("agent.static_retries", trace.static_retries)
                span.set_attribute("agent.runtime_retries", trace.runtime_retries)
                span.set_attribute("gen_ai.usage.input_tokens", trace.usage.input_tokens)
                span.set_attribute("gen_ai.usage.output_tokens", trace.usage.output_tokens)
                self.store.add(trace)
                await queue.put(RunCompleted(trace=trace))
            except Exception as exc:  # surface unexpected failures as a terminal event
                span.record_exception(exc)
                await queue.put(RunFailed(run_id=run_id, message=f"{type(exc).__name__}: {exc}"))
            finally:
                await queue.put(_DONE)

    async def stream(self, question: str) -> AsyncGenerator[AgentEvent, None]:
        run_id = uuid.uuid4().hex[:12]
        yield RunStarted(run_id=run_id, question=question, model=self.model, dialect=self.dialect)
        queue: asyncio.Queue[Any] = asyncio.Queue()
        task = asyncio.create_task(self._produce(question, run_id, queue))
        try:
            while (event := await queue.get()) is not _DONE:
                yield event
        finally:
            if not task.done():
                task.cancel()

    async def run(self, question: str) -> RunTrace:
        final: RunTrace | None = None
        async for event in self.stream(question):
            if isinstance(event, RunCompleted):
                final = event.trace
            elif isinstance(event, RunFailed):
                raise RuntimeError(event.message)
        assert final is not None
        return final
