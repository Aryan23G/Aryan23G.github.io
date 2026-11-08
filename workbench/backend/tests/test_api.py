from __future__ import annotations

import json

from fastapi.testclient import TestClient

from app.main import create_app
from tests.conftest import draft

GOOD = "SELECT segment, count(*) AS customers FROM customers GROUP BY segment"


def client_for(make_container, script):  # type: ignore[no-untyped-def]
    container, gen = make_container(script)
    return TestClient(create_app(settings=container.settings, container=container)), gen


def test_health_and_schema(make_container) -> None:  # type: ignore[no-untyped-def]
    client, _ = client_for(make_container, [])
    with client:
        health = client.get("/api/health").json()
        assert health["tables"] == 14 and health["embedder"].startswith("hashing")
        body = client.get("/api/schema").json()
        tables = {t["name"]: t for t in body["databases"][0]["tables"]}
        assert tables["orders"]["row_count"] > 1000
        assert any(c["foreign_key"] for c in tables["orders"]["columns"])


def test_query_returns_full_trace(make_container) -> None:  # type: ignore[no-untyped-def]
    client, _ = client_for(make_container, [draft(GOOD)])
    with client:
        trace = client.post("/api/query", json={"question": "customers per segment"}).json()
    assert trace["outcome"] == "success"
    assert {r["segment"] for r in trace["result"]["records"]} == {"Consumer", "Small Business", "Enterprise"}
    assert trace["usage"]["output_tokens"] == 150


def test_stream_is_server_sent_events(make_container) -> None:  # type: ignore[no-untyped-def]
    client, _ = client_for(make_container, [draft(GOOD)])
    with client, client.stream("POST", "/api/query/stream", json={"question": "customers per segment"}) as resp:
        assert resp.headers["content-type"].startswith("text/event-stream")
        frames = [f for f in resp.read().decode().split("\n\n") if f.strip()]
    names = [f.split("\n")[0].removeprefix("event: ") for f in frames]
    assert names[0] == "run_started" and names[-1] == "run_completed" and "step" in names
    final = json.loads(frames[-1].split("data: ", 1)[1])
    assert final["trace"]["result"]["row_count"] == 3


def test_manual_override_uses_same_guard(make_container) -> None:  # type: ignore[no-untyped-def]
    client, _ = client_for(make_container, [])
    with client:
        ok = client.post("/api/execute", json={"sql": "SELECT carrier, count(*) AS n FROM shipments GROUP BY 1"}).json()
        assert ok["validation"]["ok"] and ok["execution"]["row_count"] == 4 and ok["records"][0]["carrier"]
        blocked = client.post("/api/execute", json={"sql": "DROP TABLE orders"}).json()
        assert not blocked["validation"]["ok"] and blocked["execution"] is None
        assert blocked["validation"]["diagnostics"][0]["code"] == "NOT_A_QUERY"


def test_rejects_invalid_requests(make_container) -> None:  # type: ignore[no-untyped-def]
    client, _ = client_for(make_container, [])
    with client:
        assert client.post("/api/query", json={"question": ""}).status_code == 422
