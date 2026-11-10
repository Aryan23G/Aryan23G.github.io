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
    // Second fuzz round: measures, periods and product types that used to be misread or ignored.
    ["how much did we sell in december 2025",
      `SELECT ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE ${REALISED} AND strftime('%Y-%m', o.order_date) = '2025-12'`],
    ["worst performing category",
      `SELECT p.category, ROUND(${REV}, 2) AS r FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} GROUP BY 1 ORDER BY r ASC`, true],
    ["average items per order",
      `SELECT ROUND(1.0 * SUM(oi.quantity) / COUNT(DISTINCT o.order_id), 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE ${REALISED}`],
    ["orders per customer", "SELECT ROUND(1.0 * COUNT(*) / COUNT(DISTINCT customer_id), 2) FROM orders"],
    ["average shipping cost by country",
      "SELECT c.country, ROUND(AVG(o.shipping_cost), 2) FROM orders o JOIN customers c ON c.customer_id = o.customer_id GROUP BY 1"],
    ["monthly active customers",
      "SELECT strftime('%Y-%m', order_date), COUNT(DISTINCT customer_id) FROM orders GROUP BY 1 ORDER BY 1", true],
    ["how many customers ordered more than 5 times",
      "SELECT COUNT(*) FROM (SELECT customer_id FROM orders GROUP BY customer_id HAVING COUNT(*) > 5)"],
    ["holiday season sales",
      `SELECT ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE ${REALISED} AND strftime('%m', o.order_date) IN ('11', '12')`],
    ["revenue in the second half of 2024",
      `SELECT ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE ${REALISED} AND strftime('%Y-%m', o.order_date) BETWEEN '2024-07' AND '2024-12'`],
    ["average rating for tents",
      "SELECT ROUND(AVG(r.rating), 2) FROM reviews r JOIN products p ON p.product_id = r.product_id WHERE p.name LIKE '% Tent %'"],
    ["revenue from helmets excluding bike helmets",
      `SELECT ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} AND p.name LIKE '%Helmet%' AND p.name NOT LIKE '%Bike Helmet%'`],
    ["weekly orders in december 2025",
      "SELECT strftime('%Y-W%W', order_date), COUNT(*) FROM orders WHERE strftime('%Y-%m', order_date) = '2025-12' GROUP BY 1 ORDER BY 1", true],
    ["fastest growing category",
      `WITH t AS (SELECT p.category AS k, SUM(CASE WHEN strftime('%Y', o.order_date) = '2024' THEN ${REV.slice(4, -1)} END) AS a, SUM(CASE WHEN strftime('%Y', o.order_date) = '2025' THEN ${REV.slice(4, -1)} END) AS b FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} GROUP BY 1) SELECT k, ROUND(a, 2), ROUND(b, 2), ROUND(ROUND(b, 2) / ROUND(a, 2) - 1, 4) AS g FROM t ORDER BY g DESC`, true],
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
    expect(compiled.plan.filters).toEqual(expect.arrayContaining([
      expect.objectContaining({ field: "channel", values: ["mobile"] }),
      expect.objectContaining({ field: "year", values: ["2025"] }),
    ]));
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
    const { compiled } = ask("revenue for Canada' OR 1=1 DROP TABLE orders by month");
    expect(compiled.sql).not.toMatch(/DROP|1=1/);
  });

  it("sends SQL typed into the question box to the SQL console", () => {
    expect(() => parse("revenue for Canada'; DROP TABLE orders; -- by month", vocab)).toThrow(/SQL console/);
    expect(() => parse("SELECT * FROM orders", vocab)).toThrow(/SQL console/);
  });
});

describe("20-question eval set", () => {
  // Including the multi-step ones (growth, retention, top-per-group, share of a subset): 20/20, no wrong answers.
  it("answers all 20 correctly, including the multi-step questions", () => {
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
    expect(declined).toEqual([]);
    expect(correct).toHaveLength(20);
  });
});

describe("multi-step questions, phrased differently from the eval set", () => {
  const REVQ = `SELECT strftime('%Y-%m', o.order_date) AS m, ${REV} AS v FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE ${REALISED}`;
  const cases: [string, string, boolean?][] = [
    ["month over month revenue growth in 2025",
      `WITH t AS (${REVQ} AND strftime('%Y', o.order_date) = '2025' GROUP BY 1) SELECT m, ROUND(v / LAG(v) OVER (ORDER BY m) - 1, 4) FROM t ORDER BY m`, true],
    ["which quarter saw the biggest increase in orders",
      "WITH t AS (SELECT strftime('%Y', order_date) || '-Q' || ((CAST(strftime('%m', order_date) AS INTEGER) + 2) / 3) AS q, COUNT(*) AS n FROM orders GROUP BY 1) SELECT q, ROUND(n * 1.0 / LAG(n) OVER (ORDER BY q) - 1, 4) AS g FROM t ORDER BY g DESC LIMIT 1", true],
    ["best selling product in each category",
      `WITH t AS (SELECT p.category, p.name, SUM(oi.quantity) AS u FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} GROUP BY p.category, p.product_id), r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY u DESC) AS rn FROM t) SELECT category, name, u FROM r WHERE rn = 1`],
    ["top 2 customers by revenue in every country",
      `WITH t AS (SELECT c.country, c.name, ${REV} AS v FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN customers c ON c.customer_id = o.customer_id WHERE ${REALISED} GROUP BY c.country, c.customer_id), r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY country ORDER BY v DESC) AS rn FROM t) SELECT country, rn, name, ROUND(v, 2) FROM r WHERE rn <= 2`],
    ["what percentage of orders came from mobile in 2025",
      "SELECT ROUND(1.0 * SUM(channel = 'mobile') / COUNT(*), 4) FROM orders WHERE strftime('%Y', order_date) = '2025'"],
    ["Footwear's share of revenue by year",
      `SELECT strftime('%Y', o.order_date), ROUND(SUM(CASE WHEN p.category = 'Footwear' THEN oi.quantity * oi.unit_price * (1 - oi.discount) ELSE 0 END) / ${REV}, 4) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id JOIN products p ON p.product_id = oi.product_id WHERE ${REALISED} GROUP BY 1`],
    ["how many repeat customers do we have",
      "WITH t AS (SELECT customer_id, COUNT(*) AS n FROM orders GROUP BY 1) SELECT COUNT(*), SUM(n >= 2), ROUND(1.0 * SUM(n >= 2) / COUNT(*), 4) FROM t"],
    ["customer retention from 2024 to 2025",
      "WITH a AS (SELECT DISTINCT customer_id FROM orders WHERE strftime('%Y', order_date) = '2024'), b AS (SELECT DISTINCT customer_id FROM orders WHERE strftime('%Y', order_date) = '2025') SELECT COUNT(*), COUNT(b.customer_id), ROUND(1.0 * COUNT(b.customer_id) / COUNT(*), 4) FROM a LEFT JOIN b ON b.customer_id = a.customer_id"],
  ];

  it.each(cases)("%s", (question, gold, ordered) => {
    const { compiled, result } = ask(question);
    expect(compiled.plan.kind).not.toBe("aggregate");
    const m = resultsMatch(rows(gold), result, ordered);
    expect(m.reason ?? "match").toBe("match");
  });

  it("writes multi-step answers from the rows", () => {
    expect(ask("which month had the biggest revenue growth").answer).toMatch(/^\d{4}-\d{2} had the largest revenue growth: \+\d+\.\d% vs the previous month/);
    expect(ask("customer retention from 2024 to 2025").answer).toMatch(/customers who ordered in 2024 also ordered in 2025: \d+\.\d% retention\.$/);
    expect(ask("what percentage of orders came from mobile in 2025").answer).toMatch(/^Mobile accounts for \d+\.\d% of orders for 2025\.$/);
  });

  it("still declines explanation and prediction", () => {
    expect(() => parse("why did revenue drop in March?", vocab)).toThrow(NotUnderstood);
    expect(() => parse("forecast revenue for next quarter", vocab)).toThrow(NotUnderstood);
  });
});

describe("sample questions shown on the page", () => {
  it("are all answered", () => {
    const src = readFileSync(new URL("../src/main.ts", import.meta.url), "utf8");
    const examples = [...src.slice(src.indexOf("const EXAMPLES")).split("];")[0]!.matchAll(/"([^"]+)"/g)].map((m) => m[1]!);
    expect(examples.length).toBeGreaterThanOrEqual(6);
    for (const q of examples) expect(ask(q).result.rows.length).toBeGreaterThan(0);
  });
});

describe("fuzz regressions", () => {
  it("negating one status keeps the other excluded for realised revenue", () => {
    const { compiled } = ask("revenue excluding returns");
    expect(compiled.sql).toMatch(/NOT IN \('cancelled', 'returned'\)/);
    const gold = rows(`SELECT ROUND(${REV}, 2) FROM orders o JOIN order_items oi ON oi.order_id = o.order_id WHERE ${REALISED}`);
    const r = ask("revenue excluding returns");
    expect(r.result.rows[0]![0]).toBeCloseTo(gold.rows[0]![0] as number, 2);
    expect(r.answer).not.toMatch(/excl\. returned/);
  });

  it("does not call one growth value both the biggest rise and fall", () => {
    const { answer } = ask("yoy revenue growth");
    expect(answer).not.toMatch(/biggest rise.*biggest fall/);
    expect(answer).toMatch(/2025/);
  });

  it("reads 'best X per Y' as top-per-group", () => {
    const { compiled, result } = ask("best customer per segment");
    expect(compiled.plan.kind).toBe("top_per_group");
    expect(result.rows.length).toBe(vocab.segments.length);
  });

  it("recognises retention phrasing without a customers word", () => {
    expect(ask("repeat purchase rate").compiled.plan.kind).toBe("retention");
    const churn = ask("churn from 2024 to 2025");
    expect(churn.compiled.plan.kind).toBe("retention");
    expect(churn.answer).toMatch(/churned/);
  });

  it("compares two quarters side by side", () => {
    const { compiled, result } = ask("orders in q1 vs q2 2025");
    expect(compiled.plan.filters.find((f) => f.field === "quarter")?.values).toEqual(["1", "2"]);
    expect(result.rows.length).toBe(2);
  });

  it("does not total averages", () => {
    expect(ask("average order value per month").answer).not.toMatch(/Total/);
    expect(ask("revenue by month").answer).toMatch(/Total/);
  });

  it("declines review text search and explains products with no reviews or sales", () => {
    expect(() => parse("how many reviews mention quality", vocab)).toThrow(/review text/);
    expect(ask("products with no reviews").answer).toBe("Every product has at least one review.");
    expect(ask("products that never sold").answer).toBe("Every product has been ordered at least once.");
  });

  it("reads seasons, halves and product types as one total, not a breakdown", () => {
    for (const q of ["holiday season sales", "revenue in h1 2025", "average rating for tents"]) expect(ask(q).compiled.plan.dims).toEqual([]);
    expect(ask("units sold by category in summer").compiled.plan.dims).toEqual(["category"]);
    expect(ask("winter boots sales").compiled.plan.filters.map((f) => f.field)).toEqual(["product"]);
  });

  it("declines several measures at once and two measures against each other", () => {
    expect(() => parse("What were total revenue, order count and average order value in 2025?", vocab)).toThrow(/several measures at once \(revenue, orders, average order value\)/);
    expect(() => parse("revenue and margin by category", vocab)).toThrow(/several measures/);
    expect(() => parse("Do more expensive products get better ratings?", vocab)).toThrow(/relationship between two measures/);
    expect(() => parse("does discount affect return rate", vocab)).toThrow(/relationship/);
    // A definition in parentheses or "excluding cancelled and returned" is not a second measure.
    expect(() => parse("average order value (revenue per order) by segment", vocab)).not.toThrow();
    expect(() => parse("revenue per customer excluding cancelled and returned orders", vocab)).not.toThrow();
  });

  it("maps colloquial spender questions to customers by revenue", () => {
    for (const q of ["who bought the most", "biggest spenders"]) {
      const { compiled } = ask(q);
      expect(compiled.plan.metric).toBe("revenue");
      expect(compiled.plan.dims).toContain("customer");
    }
  });
});
