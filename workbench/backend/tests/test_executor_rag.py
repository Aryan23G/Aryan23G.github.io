from __future__ import annotations

from pathlib import Path

import pytest

from app.rag.documents import build_documents, introspect, schema_fingerprint, sqlglot_schema
from app.rag.embeddings import HashingEmbedder
from app.rag.store import SchemaIndex
from app.sql.executor import create_readonly_engine, execute_readonly


@pytest.fixture(scope="module")
def engine(warehouse: Path):  # type: ignore[no-untyped-def]
    e = create_readonly_engine(f"sqlite:///{warehouse}")
    yield e
    e.dispose()


@pytest.fixture(scope="module")
def index(engine):  # type: ignore[no-untyped-def]
    return SchemaIndex.build(introspect(engine), HashingEmbedder())


# ------------------------------------------------------------------ executor
def test_executes_and_types_columns(engine) -> None:  # type: ignore[no-untyped-def]
    r = execute_readonly(engine, "SELECT status, count(*) AS n FROM orders GROUP BY status ORDER BY n DESC",
                         max_rows=10, timeout_ms=2000)
    assert r.ok and r.row_count == 4 and not r.truncated
    assert [(c.name, c.type) for c in r.columns] == [("status", "string"), ("n", "number")]


def test_row_cap_marks_truncation(engine) -> None:  # type: ignore[no-untyped-def]
    r = execute_readonly(engine, "SELECT order_id FROM orders", max_rows=25, timeout_ms=2000)
    assert r.ok and r.row_count == 25 and r.truncated


@pytest.mark.parametrize("sql", ["DELETE FROM orders", "UPDATE orders SET status = 'x'", "CREATE TABLE t (x INT)"])
def test_connection_is_read_only_even_without_the_guard(engine, sql: str) -> None:  # type: ignore[no-untyped-def]
    r = execute_readonly(engine, sql, max_rows=10, timeout_ms=2000)
    assert not r.ok
    assert "readonly" in (r.error_message or "").lower() or "read-only" in (r.error_message or "").lower()
    assert execute_readonly(engine, "SELECT count(*) FROM orders", max_rows=1, timeout_ms=2000).rows[0][0] > 0


def test_statement_timeout_aborts_runaway_query(engine) -> None:  # type: ignore[no-untyped-def]
    r = execute_readonly(engine, "SELECT count(*) FROM order_items a, order_items b, order_items c",
                         max_rows=1, timeout_ms=300)
    assert not r.ok and r.error_type == "QueryTimeout"
    assert r.elapsed_ms < 3000


def test_runtime_error_is_structured_with_trace(engine) -> None:  # type: ignore[no-untyped-def]
    r = execute_readonly(engine, "SELECT nosuch FROM orders", max_rows=1, timeout_ms=2000)
    assert not r.ok and r.error_type == "OperationalError"
    assert "no such column" in (r.error_message or "")
    assert r.stack_trace and "Database runtime error" in r.runtime_log()


# ------------------------------------------------------------------ documents
def test_introspection_captures_keys_and_samples(engine) -> None:  # type: ignore[no-untyped-def]
    tables = {t.name: t for t in introspect(engine)}
    assert len(tables) == 14
    status = next(c for c in tables["orders"].columns if c.name == "status")
    assert set(status.sample_values) == {"cancelled", "delivered", "processing", "shipped"}
    fk = next(c for c in tables["orders"].columns if c.name == "customer_id").foreign_key
    assert fk is not None and fk.ref_table == "customers"
    assert next(c for c in tables["orders"].columns if c.name == "order_id").primary_key


def test_documents_include_relationships_and_columns(engine) -> None:  # type: ignore[no-untyped-def]
    docs = build_documents(introspect(engine))
    table_doc = next(d for d in docs if d.id == "table:returns")
    assert "returns.order_item_id -> order_items.order_item_id" in table_doc.text
    assert any(d.id == "column:shipments.carrier" for d in docs)


def test_fingerprint_ignores_row_counts(engine) -> None:  # type: ignore[no-untyped-def]
    tables = introspect(engine)
    bumped = [t.model_copy(update={"row_count": t.row_count + 1}) for t in tables]
    assert schema_fingerprint(tables) == schema_fingerprint(bumped)
    assert sqlglot_schema(tables)["orders"]["status"]


# ------------------------------------------------------------------ retrieval
@pytest.mark.parametrize(("question", "must_include"), [
    ("Which product categories have the highest return rate?", {"returns", "products", "product_categories"}),
    ("Average CSAT score by support agent", {"support_tickets", "employees"}),
    ("Which carrier has the slowest delivery times?", {"shipments"}),
    ("Marketing campaign attributed revenue by channel", {"marketing_campaigns", "campaign_attributions"}),
    ("Refund amount by return reason", {"returns"}),
    ("How many enterprise customers are in each region?", {"customers", "regions"}),
])
def test_retrieval_selects_needed_tables(index: SchemaIndex, question: str, must_include: set[str]) -> None:
    result = index.retrieve(question)
    names = {t.name for t in result.tables}
    assert must_include <= names, (names, result.candidates)
    assert len(names) < result.total_tables  # it actually prunes


def test_join_path_closure_finds_bridge_tables(index: SchemaIndex) -> None:
    # returns -> order_items -> products: the bridge is added even if it never scored semantically.
    assert index._join_bridges(["returns", "products"], limit=3) == [("order_items", ["returns", "products"])]
    # suppliers -> products -> order_items -> orders (path of 4)
    assert [b for b, _ in index._join_bridges(["suppliers", "orders"], limit=3)] == ["products", "order_items"]
    result = index.retrieve("Which product categories have the highest return rate?")
    bridge = next(t for t in result.tables if t.name == "order_items")
    assert bridge.reason in {"join_path", "fk_neighbor"} and bridge.via


def test_fk_neighbor_relaxation(index: SchemaIndex) -> None:
    result = index.retrieve("Average CSAT score by support agent")
    employees = next(t for t in result.tables if t.name == "employees")
    assert employees.reason in {"semantic", "fk_neighbor"}
    if employees.reason == "fk_neighbor":
        assert employees.via == ["support_tickets"]


def test_lexical_pinning(index: SchemaIndex) -> None:
    result = index.retrieve("list suppliers")
    assert result.tables[0].name == "suppliers" and result.tables[0].reason == "lexical"


def test_embedder_falls_back_when_model_unavailable() -> None:
    from app.rag.embeddings import build_embedder

    emb = build_embedder("fastembed", "no-such-org/no-such-model")
    assert isinstance(emb, HashingEmbedder)


def test_index_is_reused_for_same_schema(engine, index: SchemaIndex) -> None:  # type: ignore[no-untyped-def]
    again = SchemaIndex(introspect(engine), HashingEmbedder(), client=index.client)
    assert again.collection == index.collection
    assert again.ensure_indexed() is False
