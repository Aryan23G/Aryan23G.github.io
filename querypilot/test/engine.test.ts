import initSqlJs from "sql.js";
import { beforeAll, describe, expect, it } from "vitest";
import { Engine } from "../src/db/engine.ts";
import { DEMOS } from "../src/demo.ts";
import { getEngine } from "./helpers.ts";

let engine: Engine;
beforeAll(async () => {
  engine = await getEngine();
});

describe("seeded dataset", () => {
  it("is deterministic across instances", async () => {
    const SQL = await initSqlJs();
    const other = new Engine(new SQL.Database());
    expect(other.stats).toEqual(engine.stats);
    const q = "SELECT round(sum(quantity * unit_price * (1 - discount)), 2) FROM order_items";
    const a = engine.execute(q), b = other.execute(q);
    expect(a.ok && b.ok && a.result.rows).toEqual(b.ok && b.result.rows);
  });

  it("has the expected shape", () => {
    expect(engine.stats).toMatchObject({ customers: 600 });
    expect(engine.stats.orders).toBeGreaterThan(4000);
    expect(engine.stats.order_items).toBeGreaterThan(engine.stats.orders);
    const r = engine.execute("SELECT min(order_date), max(order_date) FROM orders");
    expect(r.ok && r.result.rows[0]).toEqual(["2024-01-01", "2025-12-31"]);
  });

  it("has no orphaned foreign keys", () => {
    const r = engine.execute(
      "SELECT (SELECT count(*) FROM orders o LEFT JOIN customers c ON c.customer_id = o.customer_id WHERE c.customer_id IS NULL) + (SELECT count(*) FROM order_items i LEFT JOIN products p ON p.product_id = i.product_id WHERE p.product_id IS NULL) AS orphans",
    );
    expect(r.ok && r.result.rows[0]![0]).toBe(0);
  });
});

describe("layer 2: bytecode verification", () => {
  // These go straight to verifyBytecode, i.e. as if layer 1 had a bug and let them through.
  it.each([
    ["DELETE FROM orders", /write|persistent/],
    ["UPDATE orders SET status = 'x'", /write|persistent/],
    ["INSERT INTO reviews VALUES (999999, 1, 1, 5, '2025-01-01')", /write|persistent/],
    ["CREATE TABLE evil (x)", /write/],
    ["DROP TABLE reviews", /write/],
    ["SELECT * FROM sqlite_schema", /outside the allowlisted/],
    ["SELECT name FROM sqlite_master WHERE type = 'table'", /outside the allowlisted/],
  ])("blocks %s", (sql, why) => {
    const r = engine.verifyBytecode(sql);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(why);
  });

  it.each([
    "SELECT count(DISTINCT customer_id) FROM orders",
    "SELECT status, count(*) FROM orders GROUP BY status ORDER BY 2 DESC",
    "WITH t AS MATERIALIZED (SELECT * FROM orders) SELECT count(*) FROM t",
    "SELECT * FROM orders WHERE order_date > '2025-06-01' ORDER BY order_date",
    "SELECT name FROM customers UNION SELECT name FROM products",
  ])("allows ephemeral-table work in %s", (sql) => {
    expect(engine.verifyBytecode(sql).ok).toBe(true);
  });
});

describe("layer 3: read-only connection", () => {
  it("refuses writes even when both checks are bypassed", () => {
    // Reach into the underlying sql.js handle to simulate a total guard failure.
    const db = (engine as unknown as { db: { run(s: string): void } }).db;
    expect(() => db.run("DELETE FROM orders")).toThrow(/readonly/i);
    const r = engine.execute("SELECT count(*) FROM orders");
    expect(r.ok && r.result.rows[0]![0]).toBe(engine.stats.orders);
  });
});

describe("execute()", () => {
  it("returns guard checks for accepted queries", () => {
    const r = engine.execute("SELECT count(*) AS n FROM customers");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.result).toMatchObject({ columns: ["n"], rows: [[600]], truncated: false });
      expect(r.checks.map((c) => c.name)).toContain("bytecode verification");
      expect(r.checks.every((c) => c.passed)).toBe(true);
    }
  });

  it("caps rows (layer 4)", () => {
    const r = engine.execute("SELECT * FROM order_items", 50);
    expect(r.ok && r.result.rowCount).toBe(50);
    expect(r.ok && r.result.truncated).toBe(true);
  });

  it("surfaces SQLite errors with their message", () => {
    const r = engine.execute("SELECT chanel FROM orders");
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.stage).toBe("sqlite");
      expect(r.error).toMatch(/no such column: chanel/);
    }
  });

  it.each(DEMOS.map((d) => [d.question, d] as const))("curated example runs and answers: %s", (_q, demo) => {
    const r = engine.execute(demo.sql);
    expect(r.ok).toBe(true);
    if (r.ok) expect(demo.answer(r.result.columns, r.result.rows)).not.toMatch(/NaN|undefined/);
  });
});
