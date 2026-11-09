"""State-machine behaviour: every routing path, driven by a scripted generator."""

from __future__ import annotations

from app.agent.llm import GenerationError
from app.agent.runner import RunCompleted, StepEvent
from tests.conftest import draft

GOOD = "SELECT status, count(*) AS orders FROM orders GROUP BY status ORDER BY orders DESC"


async def test_happy_path_runs_all_five_states(make_container) -> None:  # type: ignore[no-untyped-def]
    c, gen = make_container([draft(GOOD)])
    trace = await c.runner.run("How many orders are in each status?")
    assert trace.outcome == "success"
    assert [s.node for s in trace.steps] == [
        "retrieve_context", "generate_sql", "validate_sql", "execute_sql", "format_response"]
    assert trace.result is not None and trace.result.row_count == 4
    assert trace.result.records[0].keys() == {"status", "orders"}
    assert trace.llm_calls == 1 and trace.usage.input_tokens == 1200
    assert "orders" in {t.name for t in trace.retrieval.tables}  # type: ignore[union-attr]
    assert "LIMIT" in (trace.sql or "")  # compiled SQL, with the injected limit, is what ran
    # The pruned schema, not the whole catalogue, was sent to the model.
    assert "TABLE orders" in gen.prompts[0] and "TABLE suppliers" not in gen.prompts[0]


async def test_static_error_routes_back_with_compiler_log(make_container) -> None:  # type: ignore[no-untyped-def]
    c, gen = make_container([draft("SELECT stauts FROM orders"), draft(GOOD)])
    trace = await c.runner.run("orders per status")
    assert trace.outcome == "success"
    assert trace.static_retries == 1 and trace.llm_calls == 2
    assert [g.trigger for g in trace.generations] == ["initial", "static_error"]
    assert "UNKNOWN_COLUMN" in gen.prompts[1] and "stauts" in gen.prompts[1]
    assert [s.node for s in trace.steps].count("validate_sql") == 2


async def test_static_retry_budget_is_two(make_container) -> None:  # type: ignore[no-untyped-def]
    c, _ = make_container([draft("SELECT nope FROM orders")] * 5)
    trace = await c.runner.run("orders per status")
    assert trace.outcome == "failed"
    assert trace.llm_calls == 3  # initial + 2 corrections
    assert "static compilation" in (trace.error or "")
    assert trace.steps[-1].node == "fail"


async def test_runtime_error_routes_back_with_stack_trace(make_container) -> None:  # type: ignore[no-untyped-def]
    # Statically valid but fails at runtime: integer overflow from abs(min int64).
    runtime_bad = "SELECT abs(-9223372036854775807 - 1) AS boom FROM orders LIMIT 1"
    c, gen = make_container([draft(runtime_bad), draft(GOOD)])
    trace = await c.runner.run("orders per status")
    assert trace.outcome == "success"
    assert trace.runtime_retries == 1
    assert trace.generations[1].trigger == "runtime_error"
    assert "Database runtime error" in gen.prompts[1] and "stack trace" in gen.prompts[1]


async def test_runtime_retry_budget(make_container) -> None:  # type: ignore[no-untyped-def]
    runtime_bad = "SELECT abs(-9223372036854775807 - 1) AS boom FROM orders LIMIT 1"
    c, _ = make_container([draft(runtime_bad)] * 5)
    trace = await c.runner.run("x x x")
    assert trace.outcome == "failed" and trace.runtime_retries == 3 and trace.llm_calls == 3


async def test_write_attempt_never_reaches_database(make_container) -> None:  # type: ignore[no-untyped-def]
    c, _ = make_container([draft("DELETE FROM orders"), draft(GOOD)])
    trace = await c.runner.run("delete everything")
    assert trace.feedback[0].stage == "static" and "NOT_A_QUERY" in trace.feedback[0].log
    assert trace.outcome == "success"
    assert sum(1 for s in trace.steps if s.node == "execute_sql") == 1


async def test_unanswerable_skips_execution(make_container) -> None:  # type: ignore[no-untyped-def]
    c, _ = make_container([draft("", answerable=False)])
    trace = await c.runner.run("What is the CEO's favourite colour?")
    assert trace.outcome == "unanswerable" and trace.clarification == "Missing data."
    assert [s.node for s in trace.steps] == ["retrieve_context", "generate_sql", "format_response"]


async def test_generation_error_fails_cleanly(make_container) -> None:  # type: ignore[no-untyped-def]
    c, _ = make_container([GenerationError("Claude declined to answer this request.")])
    trace = await c.runner.run("anything")
    assert trace.outcome == "failed" and trace.error == "Claude declined to answer this request."


async def test_stream_emits_running_then_done_for_each_state(make_container) -> None:  # type: ignore[no-untyped-def]
    c, _ = make_container([draft(GOOD)])
    events = [e async for e in c.runner.stream("orders per status")]
    assert events[0].type == "run_started" and isinstance(events[-1], RunCompleted)
    steps = [(e.node, e.status) for e in events if isinstance(e, StepEvent)]
    for node in ["retrieve_context", "generate_sql", "validate_sql", "execute_sql", "format_response"]:
        assert steps.index((node, "running")) < steps.index((node, "done"))
    done = {e.node: e for e in events if isinstance(e, StepEvent) and e.status == "done"}
    assert done["generate_sql"].data == {"sql": GOOD, "attempt": 1}  # draft streamed before validation
    assert {t["name"] for t in done["retrieve_context"].data["tables"]} >= {"orders"}  # type: ignore[index]
