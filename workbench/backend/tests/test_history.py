from __future__ import annotations

from fastapi.testclient import TestClient

from app.agent.history import RunStore
from app.agent.runner import RunTrace
from app.agent.state import TokenUsage
from app.main import create_app
from tests.conftest import draft


def _trace(run_id: str, outcome: str = "success") -> RunTrace:
    return RunTrace(run_id=run_id, question=f"q {run_id}", model="m", dialect="sqlite", outcome=outcome,  # type: ignore[arg-type]
                    usage=TokenUsage(), total_ms=1.0, started_at=1.0)


def test_store_is_bounded_and_newest_first() -> None:
    store = RunStore(capacity=3)
    for i in range(5):
        store.add(_trace(f"r{i}"))
    assert len(store) == 3
    assert [s.run_id for s in store.summaries()] == ["r4", "r3", "r2"]
    assert store.get("r0") is None and store.get("r4") is not None


def test_runs_endpoints(make_container) -> None:  # type: ignore[no-untyped-def]
    container, _ = make_container([
        draft("SELECT segment, count(*) AS n FROM customers GROUP BY segment"),
        draft("SELECT nope FROM orders"), draft("SELECT status FROM orders LIMIT 2"),
    ])
    with TestClient(create_app(settings=container.settings, container=container)) as client:
        assert client.get("/api/runs").json() == []
        first = client.post("/api/query", json={"question": "customers per segment"}).json()
        second = client.post("/api/query", json={"question": "statuses"}).json()

        runs = client.get("/api/runs").json()
        assert [r["run_id"] for r in runs] == [second["run_id"], first["run_id"]]
        assert runs[0] == {
            "run_id": second["run_id"], "question": "statuses", "outcome": "success",
            "started_at": runs[0]["started_at"], "total_ms": second["total_ms"], "llm_calls": 2, "retries": 1,
            "row_count": 2,
        }
        assert runs[0]["started_at"] > 0

        full = client.get(f"/api/runs/{first['run_id']}").json()
        assert full["result"]["row_count"] == 3 and full["sql"] == first["sql"]
        assert client.get("/api/runs/does-not-exist").status_code == 404
