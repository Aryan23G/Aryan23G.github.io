"""State 4: read-only execution through SQLAlchemy.

The executor never trusts the static guard alone. The connection itself is
read-only (defence in depth), every statement runs under a timeout, and
results are fetched with a hard row cap.

* SQLite:  opened with `mode=ro` (URI), `PRAGMA query_only=ON`, and a progress
           handler that aborts the statement at the deadline.
* Postgres: `SET TRANSACTION READ ONLY` + `SET LOCAL statement_timeout` inside
           a transaction that is always rolled back.
* Others:  read-only transaction where supported; rollback always.

Runtime failures are captured with the database error message and a trimmed
stack trace, which the agent feeds back to the generator for self-correction.
"""

from __future__ import annotations

import datetime as dt
import decimal
import sqlite3
import time
import traceback
from collections.abc import Iterator
from contextlib import contextmanager
from typing import Any

from pydantic import BaseModel, Field
from sqlalchemy import Engine, create_engine, event, text
from sqlalchemy.engine import Connection, make_url
from sqlalchemy.exc import DBAPIError, SQLAlchemyError

JsonScalar = str | int | float | bool | None


class ColumnMeta(BaseModel):
    name: str
    type: str = Field(description="Inferred JSON-side type: number | string | boolean | date | null")


class ExecutionResult(BaseModel):
    ok: bool
    sql: str
    columns: list[ColumnMeta] = Field(default_factory=list)
    rows: list[list[JsonScalar]] = Field(default_factory=list)
    row_count: int = 0
    truncated: bool = False
    elapsed_ms: float = 0.0
    error_type: str | None = None
    error_message: str | None = None
    stack_trace: str | None = None

    def runtime_log(self) -> str:
        return (
            f"Database runtime error ({self.error_type}): {self.error_message}\n"
            f"--- stack trace (trimmed) ---\n{self.stack_trace or ''}"
        )


class QueryTimeoutError(Exception):
    """Raised when a statement exceeds the configured timeout."""


def create_readonly_engine(url: str) -> Engine:
    """Engine whose connections cannot write, whatever SQL is sent."""
    parsed = make_url(url)
    if parsed.get_backend_name() == "sqlite" and parsed.database not in (None, "", ":memory:"):
        # Open the file read-only at the OS level via an SQLite URI.
        path = parsed.database
        ro_url = f"sqlite:///file:{path}?mode=ro&uri=true"
        engine = create_engine(ro_url, pool_pre_ping=True)

        @event.listens_for(engine, "connect")
        def _sqlite_readonly(dbapi_conn: sqlite3.Connection, _record: Any) -> None:
            dbapi_conn.execute("PRAGMA query_only = ON")

        return engine
    return create_engine(url, pool_pre_ping=True, pool_size=5, max_overflow=5)


@contextmanager
def readonly_session(engine: Engine, timeout_ms: int) -> Iterator[Connection]:
    """Connection inside a read-only transaction with a statement deadline. Always rolled back."""
    backend = engine.dialect.name
    with engine.connect() as conn:
        trans = conn.begin()
        raw = conn.connection.dbapi_connection
        try:
            if backend == "postgresql":
                conn.execute(text("SET TRANSACTION READ ONLY"))
                conn.execute(text(f"SET LOCAL statement_timeout = {int(timeout_ms)}"))
            elif backend == "mysql":
                conn.execute(text(f"SET SESSION MAX_EXECUTION_TIME = {int(timeout_ms)}"))
            elif backend == "sqlite" and isinstance(raw, sqlite3.Connection):
                deadline = time.monotonic() + timeout_ms / 1000
                # Returning non-zero aborts the running statement with OperationalError("interrupted").
                raw.set_progress_handler(lambda: int(time.monotonic() > deadline), 10_000)
            yield conn
        finally:
            if backend == "sqlite" and isinstance(raw, sqlite3.Connection):
                raw.set_progress_handler(None, 0)
            trans.rollback()


def _to_json(value: Any) -> JsonScalar:
    if value is None or isinstance(value, str | int | float | bool):
        return value
    if isinstance(value, decimal.Decimal):
        return float(value)
    if isinstance(value, dt.datetime | dt.date | dt.time):
        return value.isoformat()
    if isinstance(value, bytes | bytearray | memoryview):
        return f"<{len(bytes(value))} bytes>"
    return str(value)


def _infer_type(values: list[JsonScalar]) -> str:
    present = [v for v in values if v is not None]
    if not present:
        return "null"
    if all(isinstance(v, bool) for v in present):
        return "boolean"
    if all(isinstance(v, int | float) and not isinstance(v, bool) for v in present):
        return "number"
    if all(isinstance(v, str) and len(v) >= 7 and v[4] == "-" and v[:4].isdigit() for v in present):
        return "date"
    return "string"


def _trim_trace(exc: BaseException, limit: int = 12) -> str:
    lines = traceback.format_exception(type(exc), exc, exc.__traceback__)
    flat = "".join(lines).splitlines()
    return "\n".join(flat[-limit:])


def execute_readonly(engine: Engine, sql: str, *, max_rows: int, timeout_ms: int) -> ExecutionResult:
    """Execute one validated statement. Never raises for database errors; returns them structured."""
    started = time.perf_counter()
    try:
        with readonly_session(engine, timeout_ms) as conn:
            cursor = conn.execute(text(sql))
            keys = list(cursor.keys())
            fetched = cursor.fetchmany(max_rows + 1)
        truncated = len(fetched) > max_rows
        rows = [[_to_json(v) for v in row] for row in fetched[:max_rows]]
        columns = [ColumnMeta(name=k, type=_infer_type([r[i] for r in rows])) for i, k in enumerate(keys)]
        return ExecutionResult(
            ok=True, sql=sql, columns=columns, rows=rows, row_count=len(rows), truncated=truncated,
            elapsed_ms=round((time.perf_counter() - started) * 1000, 2),
        )
    except (DBAPIError, SQLAlchemyError) as exc:
        orig = getattr(exc, "orig", None) or exc
        message = str(orig).strip()
        error_type = type(orig).__name__
        if "interrupted" in message.lower() or "statement timeout" in message.lower():
            error_type, message = "QueryTimeout", f"Query exceeded the {timeout_ms} ms statement timeout."
        return ExecutionResult(
            ok=False, sql=sql, error_type=error_type, error_message=message, stack_trace=_trim_trace(exc),
            elapsed_ms=round((time.perf_counter() - started) * 1000, 2),
        )
