import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { resultsMatch } from "../eval/compare.ts";
import type { Engine } from "../src/db/engine.ts";
import { compile, describeResult, loadVocabulary, NotUnderstood, parse, type Vocabulary } from "../src/local/nl2sql.ts";
import { getEngine } from "./helpers.ts";

let engine: Engine;
let vocab: Vocabulary;

const rows = (sql: string) => {
  const r = engine.execute(sql);
  if (!r.ok) throw new Error(`${r.stage}: ${r.error}\n${sql}`);
  return r.result;
};

beforeAll(async () => {
  engine = await getEngine();
  vocab = await loadVocabulary(async (sql) => rows(sql).rows);
});

/** Ask the local engine; the SQL must pass the full guard + bytecode pipeline. */
function ask(q: string) {
  const compiled = compile(parse(q, vocab));
  const result = rows(compiled.sql);
  return { compiled, result, answer: describeResult(compiled, result.columns, result.rows) };
}

const REV = "SUM(oi.quantity * oi.unit_price * (1 - oi.discount))";
const REALISED = "o.status NOT IN ('cancelled','returned')";

describe("vocabulary", () => {
  it("is loaded from the database", () => {
    expect(vocab.categories).toContain("Footwear");
    expect(vocab.countries).toContain("Canada");
    expect(vocab.channels.sort()).toEqual(["marketplace", "mobile", "web"]);
  });
});

describe("answers match independently written gold SQL", () => {
  const cases: [string, string, boolean?][] = [
    ["What was total revenue in 2024?",
      `SELECT ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE ${REALISED} AND strftime('%Y', o.order_date) = '2024'`],
    ["revenue by category for 2025",
      `SELECT p.category, ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} AND strftime('%Y', o.order_date) = '2025' GROUP BY 1`],
    ["How many orders per month in 2025?",
      "SELECT strftime('%Y-%m', order_date), COUNT(*) FROM orders WHERE strftime('%Y', order_date) = '2025' GROUP BY 1 ORDER BY 1", true],
    ["how many customers per country",
      "SELECT country, COUNT(*) FROM customers GROUP BY 1"],
    ["How many customers do we have?", "SELECT COUNT(*) FROM customers"],
    ["How many orders were cancelled?", "SELECT COUNT(*) FROM orders WHERE status = 'cancelled'"],
    ["How many products are in each category?", "SELECT category, COUNT(*) FROM products GROUP BY 1"],
    ["average rating across all reviews", "SELECT ROUND(AVG(rating), 2) FROM reviews"],
    ["How much shipping did we charge for web orders?", "SELECT ROUND(SUM(shipping_cost), 2) FROM orders WHERE channel = 'web'"],
    ["return rate by channel",
      "SELECT channel, ROUND(1.0 * SUM(status = 'returned') / COUNT(*), 4) FROM orders WHERE status IN ('delivered','returned') GROUP BY 1"],
    ["average order value by segment",
      `WITH t AS (SELECT o.order_id, c.segment, ${REV} AS rev FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN customers c ON c.customer_id = o.customer_id WHERE ${REALISED} GROUP BY o.order_id) SELECT segment, ROUND(SUM(rev) / COUNT(*), 2) FROM t GROUP BY 1`],
    ["top 5 products by units sold",
      `SELECT p.name, SUM(oi.quantity) AS u FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} GROUP BY p.product_id ORDER BY u DESC LIMIT 5`, true],
    ["orders by channel in Q4 2025",
      "SELECT channel, COUNT(*) FROM orders WHERE strftime('%Y', order_date) = '2025' AND strftime('%m', order_date) IN ('10','11','12') GROUP BY 1"],
    ["Revenue from enterprise customers in Canada",
      `SELECT ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN customers c ON c.customer_id = o.customer_id WHERE ${REALISED} AND c.segment = 'Enterprise' AND c.country = 'Canada'`],
    ["average rating by category",
      "SELECT p.category, ROUND(AVG(r.rating), 2) FROM reviews r JOIN products p ON p.product_id = r.product_id GROUP BY 1"],
    ["gross margin % by category",
      `SELECT p.category, ROUND(SUM(oi.quantity * (oi.unit_price * (1 - oi.discount) - p.unit_cost)) / ${REV}, 4) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} GROUP BY 1`],
    ["compare revenue 2024 vs 2025",
      `SELECT strftime('%Y', o.order_date), ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE ${REALISED} GROUP BY 1 ORDER BY 1`, true],
    ["new customers by month in 2024",
      "SELECT strftime('%Y-%m', signup_date), COUNT(*) FROM customers WHERE strftime('%Y', signup_date) = '2024' GROUP BY 1 ORDER BY 1", true],
    ["revenue excluding Footwear",
      `SELECT ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} AND p.category <> 'Footwear'`],
    ["how many customers ordered on mobile in 2025",
      "SELECT COUNT(DISTINCT customer_id) FROM orders WHERE channel = 'mobile' AND strftime('%Y', order_date) = '2025'"],
    ["which country has the most customers",
      "SELECT country, COUNT(*) AS n FROM customers GROUP BY 1 ORDER BY n DESC"],
    ["orders by day of week",
      "SELECT CASE CAST(strftime('%w', order_date) AS INTEGER) WHEN 0 THEN '7 Sun' WHEN 1 THEN '1 Mon' WHEN 2 THEN '2 Tue' WHEN 3 THEN '3 Wed' WHEN 4 THEN '4 Thu' WHEN 5 THEN '5 Fri' ELSE '6 Sat' END, COUNT(*) FROM orders GROUP BY 1"],
    ["cancellation rate by month in 2025",
      "SELECT strftime('%Y-%m', order_date), ROUND(1.0 * SUM(status = 'cancelled') / COUNT(*), 4) FROM orders WHERE strftime('%Y', order_date) = '2025' GROUP BY 1 ORDER BY 1", true],
    ["revenue in Canada vs United States",
      `SELECT c.country, ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN customers c ON c.customer_id = o.customer_id WHERE ${REALISED} AND c.country IN ('Canada','United States') GROUP BY 1`],
    ["orders on web compared to mobile in 2025",
      "SELECT channel, COUNT(*) FROM orders WHERE channel IN ('web','mobile') AND strftime('%Y', order_date) = '2025' GROUP BY 1"],
    ["Who are our top 10 customers?",
      `SELECT c.name, ROUND(${REV}, 2) AS rev FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN customers c ON c.customer_id = o.customer_id WHERE ${REALISED} GROUP BY c.customer_id ORDER BY rev DESC LIMIT 10`, true],
  ];

  it.each(cases)("%s", (question, gold, ordered) => {
    const { result } = ask(question);
    const expected = rows(gold);
    // Compare value sets (column names/order differ); ordered where the question implies order.
    const norm = (rs: unknown[][]) => rs.map((r) => r.map((v) => (typeof v === "number" ? Math.round(v * 100) / 100 : v)).join("|"));
    const got = norm(result.rows);
    const want = norm(expected.rows);
    if (ordered) expect(got).toEqual(want);
    else expect([...got].sort()).toEqual([...want].sort());
  });
});

describe("parsing details", () => {
  it("records how the question was understood", () => {
    const { compiled } = ask("revenue by month in 2025 for mobile");
    expect(compiled.plan.dims).toEqual(["month"]);
    expect(compiled.plan.filters).toEqual(expect.arrayContaining([{ field: "channel", values: ["mobile"] }, { field: "year", values: ["2025"] }]));
    expect(compiled.chart.type).toBe("line");
    expect(compiled.plan.notes.join(" ")).toMatch(/excluding cancelled and returned/);
  });

  it("uses a pie for share questions and a KPI for single numbers", () => {
    expect(ask("share of orders by channel").compiled.chart.type).toBe("pie");
    expect(ask("total revenue").compiled.chart.type).toBe("kpi");
    expect(ask("revenue by month and channel").compiled.chart.type).toBe("table");
  });

  it("formats money with two decimals under $1,000", () => {
    expect(ask("average order value by segment").answer).toMatch(/\$\d{3}\.\d{2}\b/);
  });

  it("writes an answer from the actual rows", () => {
    const { answer } = ask("return rate by category");
    expect(answer).toMatch(/^Footwear leads with \d+\.\d%/);
    expect(ask("total revenue in 2025").answer).toMatch(/^Revenue for 2025: \$1,143,950 \(excluding cancelled and returned orders\)\.$/);
  });

  it("refuses unrelated questions instead of guessing", () => {
    expect(() => parse("what is the meaning of life", vocab)).toThrow(NotUnderstood);
    try {
      parse("tell me a joke", vocab);
    } catch (e) {
      expect((e as NotUnderstood).suggestions.length).toBeGreaterThan(3);
    }
  });

  it("generated SQL never contains user text verbatim (values come from the vocabulary)", () => {
    const { compiled } = ask("revenue for Canada'; DROP TABLE orders; -- by month");
    expect(compiled.sql).not.toMatch(/DROP|--/);
  });
});

describe("20-question eval set (written for the Claude agent)", () => {
  // The local engine must answer at least 16/20 correctly and DECLINE the rest: never a wrong answer.
  it("answers ≥16 correctly and declines, rather than guesses, the multi-step ones", () => {
    const qs = JSON.parse(readFileSync(new URL("../eval/questions.json", import.meta.url), "utf8")) as { id: string; question: string; gold: string; ordered?: boolean }[];
    const correct: string[] = [];
    const declined: string[] = [];
    const wrong: string[] = [];
    for (const q of qs) {
      let compiled;
      try {
        compiled = compile(parse(q.question, vocab));
      } catch (e) {
        if (e instanceof NotUnderstood) { declined.push(q.id); continue; }
        throw e;
      }
      const m = resultsMatch(rows(q.gold), rows(compiled.sql), q.ordered);
      (m.match ? correct : wrong).push(q.id);
    }
    expect(wrong).toEqual([]);
    expect(correct.length).toBeGreaterThanOrEqual(16);
    expect(declined.sort()).toEqual(["h01", "h03", "h04", "h06"]);
  });
});
