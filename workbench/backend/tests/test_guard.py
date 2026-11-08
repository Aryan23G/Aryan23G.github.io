from __future__ import annotations

import pytest

from app.sql.guard import compile_sql

SCHEMA = {
    "orders": {"order_id": "INTEGER", "customer_id": "INTEGER", "order_date": "TEXT", "status": "TEXT"},
    "customers": {"customer_id": "INTEGER", "full_name": "TEXT", "segment": "TEXT"},
    "order_items": {"order_item_id": "INTEGER", "order_id": "INTEGER", "quantity": "INTEGER", "unit_price": "REAL"},
}


def check(sql: str, dialect: str = "sqlite"):  # type: ignore[no-untyped-def]
    return compile_sql(sql, schema=SCHEMA, dialect=dialect, max_rows=100)


@pytest.mark.parametrize("sql", [
    "SELECT status, count(*) AS n FROM orders GROUP BY status",
    "SELECT o.status, c.segment FROM orders o JOIN customers c ON c.customer_id = o.customer_id",
    "WITH t AS (SELECT customer_id, count(*) AS n FROM orders GROUP BY 1) SELECT * FROM t ORDER BY n DESC LIMIT 5",
    "SELECT strftime('%Y-%m', order_date) AS month, sum(quantity * unit_price) AS revenue "
    "FROM orders JOIN order_items USING (order_id) GROUP BY month",
    "SELECT customer_id FROM orders UNION SELECT customer_id FROM customers",
    "SELECT 'DROP TABLE orders; DELETE FROM x' AS harmless FROM orders",
    "SELECT * FROM (SELECT customer_id FROM orders) AS sub",
    "SELECT rank() OVER (PARTITION BY status ORDER BY order_date) AS r FROM orders",
    "SELECT count(*) FROM orders;",
])
def test_accepts_read_only_queries(sql: str) -> None:
    report = check(sql)
    assert report.ok, report.compiler_log()
    assert report.compiled_sql


@pytest.mark.parametrize(("sql", "code"), [
    ("", "EMPTY"),
    ("SELEC status FROM orders", "PARSE_ERROR"),
    ("SELECT status FROM orders WHERE (", "PARSE_ERROR"),
    ("SELECT 1; DROP TABLE orders", "MULTIPLE_STATEMENTS"),
    ("DELETE FROM orders", "NOT_A_QUERY"),
    ("UPDATE orders SET status = 'x'", "NOT_A_QUERY"),
    ("INSERT INTO orders (order_id) VALUES (1)", "NOT_A_QUERY"),
    ("DROP TABLE orders", "NOT_A_QUERY"),
    ("CREATE TABLE x AS SELECT * FROM orders", "NOT_A_QUERY"),
    ("PRAGMA table_info(orders)", "NOT_A_QUERY"),
    ("ATTACH DATABASE 'x.db' AS x", "NOT_A_QUERY"),
    ("SELECT load_extension('evil.so')", "FORBIDDEN_FUNCTION"),
    ("SELECT * FROM sqlite_master", "UNKNOWN_TABLE"),
    ("SELECT * FROM secrets", "UNKNOWN_TABLE"),
    ("SELECT foo FROM orders", "UNKNOWN_COLUMN"),
    ("SELECT o.status, c.segmnt FROM orders o JOIN customers c ON c.customer_id = o.customer_id", "UNKNOWN_COLUMN"),
])
def test_rejects_with_precise_diagnostic(sql: str, code: str) -> None:
    report = check(sql)
    assert not report.ok
    assert report.diagnostics[0].code == code, report.compiler_log()
    assert "SQLGlot static compilation failed" in report.compiler_log()


def test_rejects_data_modifying_cte_in_postgres() -> None:
    report = check("WITH d AS (DELETE FROM orders RETURNING *) SELECT * FROM d", dialect="postgres")
    assert not report.ok
    assert report.diagnostics[0].code in {"FORBIDDEN_NODE", "NOT_A_QUERY"}


def test_rejects_postgres_side_effect_functions() -> None:
    assert check("SELECT pg_sleep(10)", dialect="postgres").diagnostics[0].code == "FORBIDDEN_FUNCTION"


def test_parse_error_carries_location() -> None:
    d = check("SELECT status FROM orders WHERE (").diagnostics[0]
    assert d.line == 1 and d.column is not None


def test_injects_limit_only_when_missing() -> None:
    injected = check("SELECT status FROM orders")
    assert injected.limit_injected and "LIMIT 101" in (injected.compiled_sql or "")
    kept = check("SELECT status FROM orders LIMIT 5")
    assert not kept.limit_injected and "LIMIT 5" in (kept.compiled_sql or "")


def test_reports_physical_tables_not_ctes() -> None:
    report = check("WITH t AS (SELECT * FROM orders) SELECT * FROM t JOIN customers USING (customer_id)")
    assert report.ok
    assert sorted(report.tables) == ["customers", "orders"]
