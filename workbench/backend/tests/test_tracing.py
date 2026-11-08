"""The agent loop emits an OpenTelemetry span tree that captures each node, token usage and retries."""

from __future__ import annotations

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import SimpleSpanProcessor
from opentelemetry.sdk.trace.export.in_memory_span_exporter import InMemorySpanExporter

from tests.conftest import draft

EXPORTER = InMemorySpanExporter()
_provider = TracerProvider()
_provider.add_span_processor(SimpleSpanProcessor(EXPORTER))
trace.set_tracer_provider(_provider)


async def test_span_tree_for_self_correcting_run(make_container) -> None:  # type: ignore[no-untyped-def]
    EXPORTER.clear()
    c, _ = make_container([draft("SELECT stauts FROM orders"), draft("SELECT status FROM orders LIMIT 3")])
    trace_ = await c.runner.run("order statuses")
    assert trace_.outcome == "success"

    spans = EXPORTER.get_finished_spans()
    by_name: dict[str, list] = {}  # type: ignore[type-arg]
    for s in spans:
        by_name.setdefault(s.name, []).append(s)

    root = by_name["agent.run"][0]
    assert root.attributes["agent.outcome"] == "success"
    assert root.attributes["agent.static_retries"] == 1
    assert root.attributes["agent.llm_calls"] == 2
    assert root.attributes["gen_ai.usage.input_tokens"] == 2400

    gens = by_name["agent.node.generate_sql"]
    assert [g.attributes["agent.trigger"] for g in gens] == ["initial", "static_error"]
    assert [v.attributes["sql.compile.ok"] for v in by_name["agent.node.validate_sql"]] == [False, True]
    assert by_name["agent.node.execute_sql"][0].attributes["db.rows"] == 3

    # Every node span is a child of the run span (one trace per question).
    for name, group in by_name.items():
        if name.startswith("agent.node."):
            assert all(s.parent is not None and s.parent.span_id == root.context.span_id for s in group)
            assert all(s.context.trace_id == root.context.trace_id for s in group)
