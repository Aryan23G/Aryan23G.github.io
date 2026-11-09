"""Bounded, in-process store of recent run traces (newest first).

Deliberately simple: a process-local LRU-by-insertion ring. Traces are lost on restart and are
not shared between workers; swap in a database-backed store behind the same interface for that.
"""

from __future__ import annotations

from collections import OrderedDict
from threading import Lock
from typing import TYPE_CHECKING

from pydantic import BaseModel

if TYPE_CHECKING:
    from app.agent.runner import RunTrace


class RunSummary(BaseModel):
    run_id: str
    question: str
    outcome: str
    started_at: float
    total_ms: float
    llm_calls: int
    retries: int
    row_count: int | None


class RunStore:
    def __init__(self, capacity: int = 50) -> None:
        if capacity < 1:
            raise ValueError("capacity must be >= 1")
        self.capacity = capacity
        self._runs: OrderedDict[str, RunTrace] = OrderedDict()
        self._lock = Lock()

    def add(self, trace: RunTrace) -> None:
        with self._lock:
            self._runs[trace.run_id] = trace
            self._runs.move_to_end(trace.run_id)
            while len(self._runs) > self.capacity:
                self._runs.popitem(last=False)

    def get(self, run_id: str) -> RunTrace | None:
        with self._lock:
            return self._runs.get(run_id)

    def summaries(self) -> list[RunSummary]:
        with self._lock:
            traces = list(reversed(self._runs.values()))
        return [
            RunSummary(
                run_id=t.run_id, question=t.question, outcome=t.outcome, started_at=t.started_at,
                total_ms=t.total_ms, llm_calls=t.llm_calls, retries=t.static_retries + t.runtime_retries,
                row_count=t.result.row_count if t.result else None,
            )
            for t in traces
        ]

    def __len__(self) -> int:
        return len(self._runs)
