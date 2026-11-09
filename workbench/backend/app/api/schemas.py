"""HTTP request/response contracts (mirrored in frontend/lib/types.ts)."""

from __future__ import annotations

from pydantic import BaseModel, Field

from app.rag.documents import TableMeta
from app.sql.executor import ExecutionResult
from app.sql.guard import ValidationReport


class QueryRequest(BaseModel):
    question: str = Field(min_length=3, max_length=2000)


class ExecuteRequest(BaseModel):
    """Manual override: run user-edited SQL through the same guard + executor (no LLM)."""

    sql: str = Field(min_length=1, max_length=20_000)


class ExecuteResponse(BaseModel):
    validation: ValidationReport
    execution: ExecutionResult | None = None
    records: list[dict[str, str | int | float | bool | None]] = Field(default_factory=list)


class DatabaseInfo(BaseModel):
    name: str
    dialect: str
    tables: list[TableMeta]


class SchemaResponse(BaseModel):
    databases: list[DatabaseInfo]
    indexed_collection: str


class HealthResponse(BaseModel):
    status: str
    model: str
    dialect: str
    tables: int
    embedder: str
    index_collection: str
