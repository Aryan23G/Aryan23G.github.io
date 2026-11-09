"""Typed runtime configuration, loaded from environment variables / `.env`."""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_ROOT = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="QP_", extra="ignore")

    # --- Target database -------------------------------------------------
    database_url: str = Field(
        default=f"sqlite:///{BACKEND_ROOT / 'data' / 'warehouse.db'}",
        description="SQLAlchemy URL of the database the agent queries (opened read-only).",
    )
    database_label: str = "warehouse"
    sql_dialect: str = "sqlite"  # SQLGlot dialect name: sqlite | postgres | duckdb | snowflake ...
    statement_timeout_ms: int = 5_000
    max_rows: int = 1_000

    # --- LLM ---------------------------------------------------------------
    anthropic_model: str = "claude-opus-5-5"
    anthropic_effort: Literal["low", "medium", "high", "xhigh", "max"] = "medium"
    anthropic_max_tokens: int = 16_000
    # Server-side refusal fallback (routes safety-classifier false positives to a fallback model).
    anthropic_fallbacks: bool = True

    # --- Agent loop ----------------------------------------------------------
    max_static_retries: int = 2   # SQLGlot compile failures routed back to generation
    max_runtime_retries: int = 2  # database runtime errors routed back to generation
    run_history_size: int = 50    # completed traces kept in memory for GET /api/runs

    # --- Schema RAG ----------------------------------------------------------
    qdrant_url: str | None = None  # e.g. http://localhost:6333 ; None = embedded local mode
    # Embedded on-disk index (single process). None = in-memory (tests, ephemeral runs).
    qdrant_path: str | None = str(BACKEND_ROOT / "data" / "qdrant")
    embedder: Literal["fastembed", "hashing"] = "fastembed"
    embedding_model: str = "BAAI/bge-small-en-v1.5"
    rag_top_k_tables: int = 5
    rag_relative_cutoff: float = 0.7
    rag_max_fk_expansion: int = 3

    # --- Observability -----------------------------------------------------
    otel_exporter: Literal["none", "console", "otlp", "traceloop"] = "none"
    otel_service_name: str = "querypilot-workbench"
    # For Langfuse use its OTLP endpoint, e.g. https://cloud.langfuse.com/api/public/otel
    otel_endpoint: str | None = None
    otel_headers: str | None = None  # "Authorization=Basic xxx,Other=yyy"
    trace_content: bool = False  # include prompts/responses in SDK spans

    # --- API -----------------------------------------------------------------
    cors_origins: list[str] = ["http://localhost:3000"]
    # Optional shared bearer token for every endpoint except /api/health. Unset = no auth.
    api_token: str | None = None
    rate_limit_per_min: int = 30   # per client on /query, /query/stream, /execute; 0 disables
    max_concurrent_runs: int = 4   # concurrent agent runs; extra requests get 503 + Retry-After


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
