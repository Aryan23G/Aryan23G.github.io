"""HTTP routes. Thin: validation + delegation to the container's services."""

from __future__ import annotations

import asyncio
from collections.abc import AsyncIterator
from typing import Annotated

from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse

from app.agent.runner import RunTrace
from app.api.schemas import (
    DatabaseInfo,
    ExecuteRequest,
    ExecuteResponse,
    HealthResponse,
    QueryRequest,
    SchemaResponse,
)
from app.container import Container
from app.sql.executor import execute_readonly
from app.sql.guard import compile_sql

router = APIRouter(prefix="/api")


def get_container(request: Request) -> Container:
    container: Container = request.app.state.container
    return container


ContainerDep = Annotated[Container, Depends(get_container)]


@router.get("/health", response_model=HealthResponse)
async def health(c: ContainerDep) -> HealthResponse:
    return HealthResponse(status="ok", model=c.generator.model, dialect=c.settings.sql_dialect, tables=len(c.tables),
                          embedder=c.index.embedder.name, index_collection=c.index.collection)


@router.get("/schema", response_model=SchemaResponse)
async def schema(c: ContainerDep) -> SchemaResponse:
    return SchemaResponse(
        databases=[DatabaseInfo(name=c.settings.database_label, dialect=c.settings.sql_dialect, tables=c.tables)],
        indexed_collection=c.index.collection,
    )


@router.post("/query", response_model=RunTrace)
async def query(body: QueryRequest, c: ContainerDep) -> RunTrace:
    """Run the agent to completion and return the full trace (non-streaming clients, tests, batch)."""
    return await c.runner.run(body.question)


@router.post("/query/stream")
async def query_stream(body: QueryRequest, request: Request, c: ContainerDep) -> StreamingResponse:
    """Run the agent and stream state-machine events as Server-Sent Events.

    Event names: run_started, step, run_completed, run_error. Each `data:` line is JSON.
    """

    async def events() -> AsyncIterator[str]:
        stream = c.runner.stream(body.question)
        try:
            async for event in stream:
                if await request.is_disconnected():
                    break
                yield f"event: {event.type}\ndata: {event.model_dump_json()}\n\n"
        finally:
            await stream.aclose()

    return StreamingResponse(
        events(), media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no", "Connection": "keep-alive"})


@router.post("/execute", response_model=ExecuteResponse)
async def execute(body: ExecuteRequest, c: ContainerDep) -> ExecuteResponse:
    """Manual override path: user-edited SQL goes through exactly the same static guard and read-only executor."""
    report = compile_sql(body.sql, schema=c.schema, dialect=c.settings.sql_dialect, max_rows=c.settings.max_rows)
    if not report.ok or report.compiled_sql is None:
        return ExecuteResponse(validation=report)
    result = await asyncio.to_thread(
        execute_readonly, c.engine, report.compiled_sql, max_rows=c.settings.max_rows,
        timeout_ms=c.settings.statement_timeout_ms)
    names = [col.name for col in result.columns]
    return ExecuteResponse(validation=report, execution=result,
                           records=[dict(zip(names, row, strict=True)) for row in result.rows])
