import { describe, expect, it } from "vitest";
import { guardSql, tokenize } from "../src/guard.ts";
import { TABLE_NAMES } from "../src/db/schema.ts";

const ok = (sql: string) => guardSql(sql, TABLE_NAMES);

describe("tokenizer", () => {
  it("keeps keywords inside strings and comments out of word tokens", () => {
    const words = tokenize("SELECT 'drop table x' AS s -- delete everything\n FROM orders /* update */")
      .filter((t) => t.type === "word")
      .map((t) => t.upper);
    expect(words).toEqual(["SELECT", "AS", "S", "FROM", "ORDERS"]);
  });

  it("handles escaped quotes and records token end offsets", () => {
    const sql = "SELECT 'it''s', \"weird \"\"col\"\"\" FROM orders";
    const toks = tokenize(sql);
    expect(toks[1]).toMatchObject({ type: "string", value: "it's" });
    expect(sql.slice(toks[1]!.pos, toks[1]!.end)).toBe("'it''s'");
    expect(toks[3]).toMatchObject({ type: "quoted_ident", value: 'weird "col"' });
  });

  it("rejects unterminated strings and comments", () => {
    expect(ok("SELECT 'abc FROM orders").ok).toBe(false);
    expect(ok("SELECT 1 /* never closed").ok).toBe(false);
  });
});

describe("guard: allowed read-only queries", () => {
  const allowed = [
    "SELECT * FROM orders",
    "select count(*) from orders;",
    "SELECT o.order_id FROM orders o JOIN order_items oi ON oi.order_id = o.order_id LEFT JOIN products p ON p.product_id = oi.product_id",
    "SELECT * FROM orders o, customers c WHERE o.customer_id = c.customer_id",
    "WITH t AS (SELECT customer_id, count(*) n FROM orders GROUP BY 1) SELECT * FROM t ORDER BY n DESC LIMIT 5",
    "WITH RECURSIVE months(m) AS (SELECT '2024-01' UNION ALL SELECT m FROM months LIMIT 3) SELECT * FROM months",
    "WITH a AS (SELECT 1 x), b(y) AS (SELECT x FROM a) SELECT * FROM b",
    "SELECT * FROM (SELECT customer_id FROM orders) sub",
    "SELECT name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders WHERE status = 'returned')",
    "SELECT 'DROP TABLE orders; DELETE FROM x' AS harmless_text FROM orders LIMIT 1",
    "SELECT CASE WHEN rating > 3 THEN 'good' ELSE 'bad' END AS bucket FROM reviews",
    "SELECT replace(name, ' ', '_') FROM products",
    "SELECT \"name\" FROM \"products\"",
    "SELECT name -- a comment with DROP\nFROM customers",
    "SELECT strftime('%Y-%m', order_date) m, sum(shipping_cost) FROM orders GROUP BY m",
    "SELECT rank() OVER (PARTITION BY category ORDER BY unit_price DESC) r, name FROM products",
  ];
  it.each(allowed)("allows: %s", (sql) => {
    const r = ok(sql);
    expect(r.reason).toBeUndefined();
    expect(r.ok).toBe(true);
  });

  it("reports the tables a query touches", () => {
    expect(ok("SELECT * FROM orders o JOIN customers c USING (customer_id)").tables).toEqual(["orders", "customers"]);
  });
});

describe("guard: rejected queries", () => {
  const rejected: [string, RegExp][] = [
    ["DROP TABLE orders", /Only SELECT/],
    ["DELETE FROM orders", /Only SELECT/],
    ["UPDATE orders SET status = 'x'", /Only SELECT/],
    ["INSERT INTO orders VALUES (1)", /Only SELECT/],
    ["PRAGMA table_info(orders)", /Only SELECT/],
    ["ATTACH DATABASE 'x.db' AS x", /Only SELECT/],
    ["VACUUM", /Only SELECT/],
    ["SELECT 1; DROP TABLE orders", /one SQL statement/],
    ["SELECT 1; SELECT 2", /one SQL statement/],
    ["SELECT * FROM orders --\n; UPDATE orders SET status = 'x'", /one SQL statement/],
    ["SELECT * FROM orders /* ; */ ; DELETE FROM orders", /one SQL statement/],
    ["WITH x AS (DELETE FROM orders RETURNING *) SELECT * FROM x", /DELETE/],
    ["WITH x AS (SELECT 1) INSERT INTO orders SELECT * FROM x", /INSERT/],
    ["SELECT * INTO backup FROM orders", /INTO/],
    ["SELECT load_extension('evil.so')", /load_extension/],
    ["SELECT readfile('/etc/passwd')", /readfile/],
    ["SELECT LOAD_EXTENSION ('x')", /LOAD_EXTENSION/],
    ["SELECT randomblob(1000000000)", /randomblob/],
    ["SELECT * FROM sqlite_master", /internal table/],
    ["SELECT * FROM sqlite_schema", /internal table/],
    ["SELECT * FROM orders JOIN sqlite_temp_master", /internal table/],
    ["SELECT * FROM pragma_table_info('orders')", /internal table/],
    ["SELECT * FROM orders, secrets", /disallowed table "secrets"/],
    ["SELECT * FROM users", /disallowed table "users"/],
    ["SELECT * FROM json_each('[1,2]')", /disallowed table "json_each"/],
    ["SELECT * FROM main.orders", /Schema-qualified/],
    ["SELECT * FROM temp.scratch", /Schema-qualified/],
    ["SEL/**/ECT * FROM orders", /Only SELECT/],
    ["REPLACE INTO orders VALUES (1)", /Only SELECT/],
    ["", /Empty/],
    [";;", /Empty/],
    ["SELECT 1 " + "x".repeat(9000), /too long/],
  ];
  it.each(rejected)("rejects: %s", (sql, reason) => {
    const r = ok(sql);
    expect(r.ok).toBe(false);
    expect(r.reason).toMatch(reason);
  });

  it("records which check failed", () => {
    const r = ok("SELECT * FROM sqlite_master");
    expect(r.checks.at(-1)).toMatchObject({ name: "table allowlist", passed: false });
  });
});
