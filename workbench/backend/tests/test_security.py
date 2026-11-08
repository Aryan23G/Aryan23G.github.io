from __future__ import annotations

from typing import Any

from fastapi.testclient import TestClient

from app.api.security import RunSlots, SlidingWindowLimiter
from app.main import create_app
from tests.conftest import draft

GOOD = "SELECT segment, count(*) AS n FROM customers GROUP BY segment"


def client(make_container, script: list[Any], **overrides: Any) -> TestClient:  # type: ignore[no-untyped-def]
    container, _ = make_container(script)
    settings = container.settings.model_copy(update=overrides)
    return TestClient(create_app(settings=settings, container=container))


# ------------------------------------------------------------------ units
def test_sliding_window_limits_and_recovers() -> None:
    lim = SlidingWindowLimiter(limit=2, window_s=60)
    assert lim.check("a", now=0) == 0 and lim.check("a", now=1) == 0
    assert lim.check("a", now=2) == 58  # blocked until the first event leaves the window
    assert lim.check("b", now=2) == 0   # per-key
    assert lim.check("a", now=60.5) == 0


def test_limiter_disabled_when_zero() -> None:
    lim = SlidingWindowLimiter(limit=0)
    assert all(lim.check("a", now=i) == 0 for i in range(100))


def test_run_slots() -> None:
    slots = RunSlots(capacity=1)
    assert slots.try_acquire() and not slots.try_acquire()
    slots.release()
    assert slots.try_acquire()


# ------------------------------------------------------------------ API
def test_bearer_token_protects_everything_but_health(make_container) -> None:  # type: ignore[no-untyped-def]
    with client(make_container, [draft(GOOD)], api_token="s3cret") as c:
        assert c.get("/api/health").status_code == 200
        for method, path, body in [("GET", "/api/schema", None), ("GET", "/api/runs", None),
                                   ("POST", "/api/execute", {"sql": "SELECT 1"}),
                                   ("POST", "/api/query", {"question": "customers per segment"})]:
            r = c.request(method, path, json=body)
            assert r.status_code == 401, path
            assert r.headers["www-authenticate"] == "Bearer"
            assert c.request(method, path, json=body, headers={"Authorization": "Bearer wrong"}).status_code == 401
        ok = c.post("/api/query", json={"question": "customers per segment"},
                    headers={"Authorization": "Bearer s3cret"})
        assert ok.status_code == 200 and ok.json()["outcome"] == "success"


def test_no_auth_when_token_unset(make_container) -> None:  # type: ignore[no-untyped-def]
    with client(make_container, []) as c:
        assert c.get("/api/schema").status_code == 200


def test_rate_limit_returns_429_with_retry_after(make_container) -> None:  # type: ignore[no-untyped-def]
    with client(make_container, [], rate_limit_per_min=2) as c:
        assert c.post("/api/execute", json={"sql": "SELECT 1"}).status_code == 200
        assert c.post("/api/execute", json={"sql": "SELECT 1"}).status_code == 200
        blocked = c.post("/api/execute", json={"sql": "SELECT 1"})
        assert blocked.status_code == 429
        assert 1 <= int(blocked.headers["retry-after"]) <= 60
        assert c.get("/api/schema").status_code == 200  # reads are not rate limited


def test_concurrency_cap_returns_503_and_stream_releases_slot(make_container) -> None:  # type: ignore[no-untyped-def]
    with client(make_container, [draft(GOOD), draft(GOOD)], max_concurrent_runs=1) as c:
        slots = c.app.state.guards.slots  # type: ignore[attr-defined]
        assert slots.try_acquire()  # simulate a run already in flight
        busy = c.post("/api/query", json={"question": "customers per segment"})
        assert busy.status_code == 503 and busy.headers["retry-after"] == "2"
        assert c.post("/api/query/stream", json={"question": "customers per segment"}).status_code == 503
        slots.release()

        with c.stream("POST", "/api/query/stream", json={"question": "customers per segment"}) as resp:
            assert resp.status_code == 200
            assert "run_completed" in resp.read().decode()
        assert slots.active == 0  # held for the stream's lifetime, then released
        assert c.post("/api/query", json={"question": "customers per segment"}).status_code == 200
        assert slots.active == 0
