from __future__ import annotations

from collections.abc import Callable, Iterator
from pathlib import Path

import pytest

from app.agent.llm import GenerationError, GenerationResult
from app.agent.state import SqlDraft, TokenUsage
from app.config import Settings
from app.container import Container, build_container
from app.db import seed
from app.rag.embeddings import HashingEmbedder


@pytest.fixture(scope="session")
def warehouse(tmp_path_factory: pytest.TempPathFactory) -> Path:
    path = tmp_path_factory.mktemp("db") / "warehouse.db"
    seed.build(path)
    return path


@pytest.fixture(scope="session")
def settings(warehouse: Path) -> Settings:
    return Settings(database_url=f"sqlite:///{warehouse}", embedder="hashing", otel_exporter="none", qdrant_path=None,
                    statement_timeout_ms=1500, max_rows=500)


def draft(sql: str, *, answerable: bool = True, reasoning: list[str] | None = None) -> SqlDraft:
    return SqlDraft(reasoning_chain=reasoning or ["Identify the metric.", "Aggregate."], sql_query=sql,
                    tables_used=[], answerable=answerable, clarification="" if answerable else "Missing data.")


class ScriptedGenerator:
    """Deterministic stand-in for the model: returns queued drafts and records every prompt it was given."""

    def __init__(self, script: list[SqlDraft | Exception]) -> None:
        self.script = list(script)
        self.prompts: list[str] = []

    @property
    def model(self) -> str:
        return "scripted-model"

    async def generate(self, *, dialect: str, user_prompt: str) -> GenerationResult:
        self.prompts.append(user_prompt)
        if not self.script:
            raise GenerationError("script exhausted")
        item = self.script.pop(0)
        if isinstance(item, Exception):
            raise item
        return GenerationResult(draft=item, model=self.model, latency_ms=12.5, request_id="req_test",
                                usage=TokenUsage(input_tokens=1200, output_tokens=150, cache_read_input_tokens=800))


@pytest.fixture
def make_container(
    settings: Settings,
) -> Iterator[Callable[[list[SqlDraft | Exception]], tuple[Container, ScriptedGenerator]]]:
    built: list[Container] = []

    def factory(script: list[SqlDraft | Exception]) -> tuple[Container, ScriptedGenerator]:
        gen = ScriptedGenerator(script)
        container = build_container(settings, generator=gen, embedder=HashingEmbedder())
        built.append(container)
        return container, gen

    yield factory
    for c in built:
        c.close()
