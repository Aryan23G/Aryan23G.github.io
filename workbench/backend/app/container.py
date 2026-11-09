"""Composition root: builds every long-lived dependency once at startup."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, cast

import anthropic
from sqlalchemy import Engine

from app.agent.graph import build_graph
from app.agent.history import RunStore
from app.agent.llm import ClaudeSqlGenerator, SqlGenerator
from app.agent.nodes import AgentConfig, AgentDeps
from app.agent.runner import AgentRunner
from app.config import Settings
from app.observability.tracing import anthropic_otel_option, configure_tracing
from app.rag.documents import TableMeta, introspect, sqlglot_schema
from app.rag.embeddings import Embedder, build_embedder
from app.rag.store import SchemaIndex
from app.sql.executor import create_readonly_engine


@dataclass
class Container:
    settings: Settings
    engine: Engine
    tables: list[TableMeta]
    schema: dict[str, dict[str, str]]
    index: SchemaIndex
    generator: SqlGenerator
    runner: AgentRunner
    config: AgentConfig

    def close(self) -> None:
        self.engine.dispose()
        self.index.client.close()


def _data_window(engine: Engine, tables: list[TableMeta]) -> str:
    """Tell the model 'today' for relative dates, derived from the data rather than the wall clock."""
    from sqlalchemy import text

    if any(t.name == "orders" for t in tables):
        with engine.connect() as conn:
            lo, hi = conn.execute(text("SELECT min(order_date), max(order_date) FROM orders")).one()
        return (f"Order data covers {lo} to {hi}. Interpret relative dates ('last month', 'this year') "
                f"relative to {hi}.")
    return "Interpret relative dates relative to the latest date present in the data."


def build_container(
    settings: Settings,
    *,
    generator: SqlGenerator | None = None,
    embedder: Embedder | None = None,
) -> Container:
    configure_tracing(settings)
    engine = create_readonly_engine(settings.database_url)
    tables = introspect(engine)
    schema = sqlglot_schema(tables)
    index = SchemaIndex.build(
        tables, embedder or build_embedder(settings.embedder, settings.embedding_model),
        qdrant_url=settings.qdrant_url, qdrant_path=None if settings.qdrant_url else settings.qdrant_path)
    if generator is None:
        client = anthropic.AsyncAnthropic(open_telemetry=cast(Any, anthropic_otel_option(settings)), max_retries=3)
        generator = ClaudeSqlGenerator(
            client, model=settings.anthropic_model, effort=settings.anthropic_effort,
            max_tokens=settings.anthropic_max_tokens, server_fallbacks=settings.anthropic_fallbacks)
    config = AgentConfig(
        dialect=settings.sql_dialect, max_rows=settings.max_rows, statement_timeout_ms=settings.statement_timeout_ms,
        max_static_retries=settings.max_static_retries, max_runtime_retries=settings.max_runtime_retries,
        rag_top_k=settings.rag_top_k_tables, rag_relative_cutoff=settings.rag_relative_cutoff,
        rag_max_fk_expansion=settings.rag_max_fk_expansion, data_window=_data_window(engine, tables))
    deps = AgentDeps(config=config, engine=engine, index=index, tables={t.name: t for t in tables},
                     sqlglot_schema=schema, generator=generator)
    runner = AgentRunner(build_graph(deps), model=generator.model, dialect=settings.sql_dialect,
                         store=RunStore(settings.run_history_size))
    return Container(settings=settings, engine=engine, tables=tables, schema=schema, index=index,
                     generator=generator, runner=runner, config=config)
