"""State machine nodes (States 1-5 plus a terminal failure node).

Every node:
  * is a pure function of (state, injected dependencies) -> partial state update,
  * emits a `running` event at start and a `StepRecord` on completion (streamed
    to the UI's step tracker via LangGraph's custom stream),
  * runs inside an OpenTelemetry span.

Blocking work (Qdrant search, SQLAlchemy execution) runs in worker threads so
the event loop stays free for concurrent requests and SSE streaming.
"""

from __future__ import annotations

import asyncio
import contextlib
import time
from dataclasses import dataclass
from typing import Any, Literal

from langgraph.config import get_stream_writer
from sqlalchemy import Engine

from app.agent.llm import GenerationError, SqlGenerator
from app.agent.prompts import user_prompt
from app.agent.state import (
    AgentState,
    CorrectionFeedback,
    FormattedResult,
    GenerationRecord,
    NodeName,
    StepRecord,
)
from app.observability.tracing import node_span
from app.rag.documents import TableMeta, table_ddl_context
from app.rag.store import SchemaIndex
from app.sql.executor import execute_readonly
from app.sql.guard import compile_sql


@dataclass(frozen=True)
class AgentConfig:
    dialect: str = "sqlite"
    max_rows: int = 1000
    statement_timeout_ms: int = 5000
    max_static_retries: int = 2
    max_runtime_retries: int = 2
    rag_top_k: int = 5
    rag_relative_cutoff: float = 0.7
    rag_max_fk_expansion: int = 3
    data_window: str = "Dates are ISO-8601 text."


@dataclass(frozen=True)
class AgentDeps:
    config: AgentConfig
    engine: Engine
    index: SchemaIndex
    tables: dict[str, TableMeta]
    sqlglot_schema: dict[str, dict[str, str]]
    generator: SqlGenerator


def _emit(event: dict[str, Any]) -> None:
    with contextlib.suppress(RuntimeError):  # not running under a streaming invocation
        get_stream_writer()(event)


class _Step:
    """Times a node and produces its StepRecord + live events."""

    def __init__(self, state: AgentState, node: NodeName, running_label: str) -> None:
        self.node = node
        self.t0 = time.perf_counter()
        self.offset_ms = round((time.time() - state.get("started_at", time.time())) * 1000, 1)
        _emit({"type": "step", "node": node, "status": "running", "label": running_label})

    def record(self, status: Literal["done", "error", "skipped"], label: str, detail: str | None = None,
               data: dict[str, Any] | None = None) -> StepRecord:
        rec = StepRecord(
            node=self.node, label=label, status=status, started_at_ms=self.offset_ms,
            duration_ms=round((time.perf_counter() - self.t0) * 1000, 1), detail=detail, data=data,
        )
        _emit({"type": "step", **rec.model_dump()})
        return rec


class AgentNodes:
    def __init__(self, deps: AgentDeps) -> None:
        self.d = deps

    # ---------------------------------------------------------- State 1
    async def retrieve_context(self, state: AgentState) -> dict[str, Any]:
        cfg = self.d.config
        step = _Step(state, "retrieve_context", "Retrieving relevant schema from vector index…")
        with node_span("retrieve_context", **{"rag.total_tables": len(self.d.tables)}) as span:
            result = await asyncio.to_thread(
                self.d.index.retrieve, state["question"], top_k=cfg.rag_top_k,
                relative_cutoff=cfg.rag_relative_cutoff, max_fk_expansion=cfg.rag_max_fk_expansion)
            names = [t.name for t in result.tables]
            span.set_attribute("rag.selected_tables", names)
            span.set_attribute("rag.candidates", [f"{n}:{s}" for n, s in result.candidates])
            context = "\n\n".join(table_ddl_context(self.d.tables[n]) for n in names)
        return {
            "retrieval": result,
            "schema_context": context,
            "steps": [step.record("done", f"Injected {len(names)}/{result.total_tables} tables into context",
                                  ", ".join(names), data={"tables": [t.model_dump() for t in result.tables]})],
        }

    # ---------------------------------------------------------- State 2
    async def generate_sql(self, state: AgentState) -> dict[str, Any]:
        feedback = state.get("feedback", [])
        attempt = len(state.get("generations", [])) + 1
        trigger: Literal["initial", "static_error", "runtime_error"] = (
            "initial" if not feedback else "static_error" if feedback[-1].stage == "static" else "runtime_error")
        label = f"Generating SQL with {self.d.generator.model}" + (
            f" (self-correction #{attempt - 1}: {trigger.replace('_', ' ')})" if attempt > 1 else "") + "…"
        step = _Step(state, "generate_sql", label)
        with node_span("generate_sql", **{"agent.attempt": attempt, "agent.trigger": trigger,
                                          "gen_ai.request.model": self.d.generator.model}) as span:
            prompt = user_prompt(state["question"], state["schema_context"], feedback,
                                 data_window=self.d.config.data_window)
            try:
                gen = await self.d.generator.generate(dialect=self.d.config.dialect, user_prompt=prompt)
            except GenerationError as exc:
                return {"error": str(exc), "steps": [step.record("error", "Generation failed", str(exc))]}
            span.set_attribute("gen_ai.usage.input_tokens", gen.usage.input_tokens)
            span.set_attribute("gen_ai.usage.output_tokens", gen.usage.output_tokens)
            span.set_attribute("gen_ai.usage.cache_read.input_tokens", gen.usage.cache_read_input_tokens)
            span.set_attribute("agent.answerable", gen.draft.answerable)
        record = GenerationRecord(attempt=attempt, trigger=trigger, model=gen.model,
                                  latency_ms=gen.latency_ms, usage=gen.usage, request_id=gen.request_id,
                                  draft=gen.draft)
        tokens_in = gen.usage.input_tokens + gen.usage.cache_read_input_tokens + gen.usage.cache_creation_input_tokens
        detail = f"{tokens_in:,} in / {gen.usage.output_tokens:,} out tokens"
        done_label = "SQL draft generated" if gen.draft.answerable else "Model marked the question unanswerable"
        live = {"sql": gen.draft.sql_query, "attempt": attempt}
        steps = [step.record("done", done_label, detail, data=live)]
        return {"draft": gen.draft, "generations": [record], "steps": steps}

    # ---------------------------------------------------------- State 3
    async def validate_sql(self, state: AgentState) -> dict[str, Any]:
        cfg = self.d.config
        step = _Step(state, "validate_sql", "Compiling SQL with SQLGlot (syntax, read-only, schema binding)…")
        sql = state["draft"].sql_query
        with node_span("validate_sql", **{"sql.dialect": cfg.dialect}) as span:
            report = compile_sql(sql, schema=self.d.sqlglot_schema, dialect=cfg.dialect, max_rows=cfg.max_rows)
            span.set_attribute("sql.compile.ok", report.ok)
            span.set_attribute("sql.compile.diagnostics", [d.code for d in report.diagnostics])
        if report.ok:
            extra = " · LIMIT injected" if report.limit_injected else ""
            return {"validation": report,
                    "steps": [step.record("done", "Static compilation passed", ", ".join(report.tables) + extra)]}
        retries = state.get("static_retries", 0) + 1
        fb = CorrectionFeedback(attempt=len(state.get("generations", [])), stage="static", sql=sql,
                                log=report.compiler_log())
        return {"validation": report, "static_retries": retries, "feedback": [fb],
                "steps": [step.record("error", f"Static compilation failed ({len(report.diagnostics)} diagnostic"
                                      f"{'s' if len(report.diagnostics) != 1 else ''})",
                                      report.diagnostics[0].message if report.diagnostics else None)]}

    # ---------------------------------------------------------- State 4
    async def execute_sql(self, state: AgentState) -> dict[str, Any]:
        cfg = self.d.config
        step = _Step(state, "execute_sql", "Executing query on read-only connection…")
        sql = state["validation"].compiled_sql or ""
        with node_span("execute_sql", **{"db.system": self.d.engine.dialect.name, "db.statement": sql}) as span:
            result = await asyncio.to_thread(execute_readonly, self.d.engine, sql, max_rows=cfg.max_rows,
                                             timeout_ms=cfg.statement_timeout_ms)
            span.set_attribute("db.rows", result.row_count)
            span.set_attribute("db.elapsed_ms", result.elapsed_ms)
            if not result.ok:
                span.set_attribute("db.error_type", result.error_type or "")
        if result.ok:
            label = f"{result.row_count:,} rows in {result.elapsed_ms:.1f} ms"
            if result.truncated:
                label += " (truncated)"
            return {"execution": result, "steps": [step.record("done", "Query executed", label)]}
        retries = state.get("runtime_retries", 0) + 1
        fb = CorrectionFeedback(attempt=len(state.get("generations", [])), stage="runtime",
                                sql=state["draft"].sql_query, log=result.runtime_log())
        return {"execution": result, "runtime_retries": retries, "feedback": [fb],
                "steps": [step.record("error", f"Runtime error: {result.error_type}", result.error_message)]}

    # ---------------------------------------------------------- State 5
    async def format_response(self, state: AgentState) -> dict[str, Any]:
        step = _Step(state, "format_response", "Formatting result set…")
        with node_span("format_response"):
            draft = state.get("draft")
            if draft is not None and not draft.answerable:
                return {"outcome": "unanswerable",
                        "steps": [step.record("done", "No query run: question not answerable from schema",
                                              draft.clarification)]}
            ex = state["execution"]
            names = [c.name for c in ex.columns]
            records = [dict(zip(names, row, strict=True)) for row in ex.rows]
            result = FormattedResult(columns=ex.columns, records=records, row_count=ex.row_count,
                                     truncated=ex.truncated, execution_ms=ex.elapsed_ms)
        return {"result": result, "outcome": "success",
                "steps": [step.record("done", "Result formatted", f"{len(records):,} records × {len(names)} columns")]}

    # ---------------------------------------------------------- terminal failure
    async def fail(self, state: AgentState) -> dict[str, Any]:
        step = _Step(state, "fail", "Stopping…")
        if state.get("error"):
            reason = state["error"]
        elif state.get("static_retries", 0) > self.d.config.max_static_retries:
            reason = f"SQL failed static compilation after {self.d.config.max_static_retries} correction attempts."
        else:
            reason = f"SQL failed at runtime after {self.d.config.max_runtime_retries} correction attempts."
        with node_span("fail", **{"agent.failure": reason}):
            pass
        return {"outcome": "failed", "error": reason, "steps": [step.record("error", "Run failed", reason)]}
