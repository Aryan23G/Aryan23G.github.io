/**
 * Demo mode (no API key): scripted walkthroughs for a few sample questions.
 * The SQL is hand-written and labelled as such in the UI, but everything after
 * that is real: each query goes through the same guard, bytecode check, worker
 * and chart validator as the live agent. Answer text is computed from the
 * actual result, so the numbers are always correct.
 */
import type { SqlValue } from "sql.js";
import type { ChartSpec } from "./viz.ts";

export interface DemoStep {
  tool: "run_sql" | "get_column_values";
  purpose: string;
  sql?: string;
  table?: string;
  column?: string;
}

export interface DemoScript {
  question: string;
  steps: DemoStep[];
  sql: string;
  chart: ChartSpec;
  answer: (columns: string[], rows: SqlValue[][]) => string;
}

const money = (v: SqlValue) => "$" + Number(v).toLocaleString("en-US", { maximumFractionDigits: 0 });
const pct = (v: SqlValue) => (Number(v) * 100).toFixed(1) + "%";
const REVENUE = "oi.quantity * oi.unit_price * (1 - oi.discount)";

export const DEMOS: DemoScript[] = [
  {
    question: "How has monthly revenue trended over the last two years?",
    steps: [],
    sql: `SELECT strftime('%Y-%m', o.order_date) AS month,
       ROUND(SUM(${REVENUE}), 2) AS revenue
FROM orders o
JOIN order_items oi ON oi.order_id = o.order_id
WHERE o.status NOT IN ('cancelled', 'returned')
GROUP BY month
ORDER BY month`,
    chart: { type: "line", x: "month", y: ["revenue"], title: "Monthly revenue (USD)" },
    answer: (_c, rows) => {
      const y24 = rows.filter((r) => String(r[0]).startsWith("2024")).reduce((s, r) => s + Number(r[1]), 0);
      const y25 = rows.filter((r) => String(r[0]).startsWith("2025")).reduce((s, r) => s + Number(r[1]), 0);
      const peak = rows.reduce((a, b) => (Number(b[1]) > Number(a[1]) ? b : a));
      return `Revenue grew from ${money(y24)} in 2024 to ${money(y25)} in 2025 (+${(((y25 - y24) / y24) * 100).toFixed(0)}%). There is a strong holiday pattern: the best month was ${peak[0]} at ${money(peak[1]!)}, and November and December peak in both years.`;
    },
  },
  {
    question: "Which product categories have the highest return rate?",
    steps: [{ tool: "get_column_values", purpose: "Check the exact order status values", table: "orders", column: "status" }],
    sql: `SELECT p.category,
       COUNT(DISTINCT o.order_id) AS orders,
       ROUND(1.0 * COUNT(DISTINCT CASE WHEN o.status = 'returned' THEN o.order_id END)
             / COUNT(DISTINCT o.order_id), 4) AS return_rate
FROM orders o
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
WHERE o.status IN ('delivered', 'returned')
GROUP BY p.category
ORDER BY return_rate DESC`,
    chart: { type: "bar", x: "category", y: ["return_rate"], title: "Return rate by category" },
    answer: (_c, rows) =>
      `${rows[0]![0]} has the highest return rate at ${pct(rows[0]![2]!)} of completed orders, followed by ${rows[1]![0]} (${pct(rows[1]![2]!)}). ${rows[rows.length - 1]![0]} has the lowest at ${pct(rows[rows.length - 1]![2]!)}. Rates count an order once per category it contains.`,
  },
  {
    question: "Who are our top 10 customers by lifetime spend?",
    steps: [],
    sql: `SELECT c.name, c.segment, c.country,
       COUNT(DISTINCT o.order_id) AS orders,
       ROUND(SUM(${REVENUE}), 2) AS lifetime_spend
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
WHERE o.status NOT IN ('cancelled', 'returned')
GROUP BY c.customer_id
ORDER BY lifetime_spend DESC
LIMIT 10`,
    chart: { type: "bar", x: "name", y: ["lifetime_spend"], title: "Top 10 customers by lifetime spend" },
    answer: (_c, rows) => {
      const segs = rows.reduce<Record<string, number>>((m, r) => ((m[String(r[1])] = (m[String(r[1])] ?? 0) + 1), m), {});
      const top = Object.entries(segs).sort((a, b) => b[1] - a[1])[0]!;
      return `${rows[0]![0]} (${rows[0]![1]}, ${rows[0]![2]}) is the top customer with ${money(rows[0]![4]!)} across ${rows[0]![3]} orders. ${top[1]} of the top 10 are ${top[0]} customers.`;
    },
  },
  {
    question: "What share of 2025 orders came from each sales channel?",
    steps: [{ tool: "get_column_values", purpose: "Confirm the channel values", table: "orders", column: "channel" }],
    sql: `SELECT channel, COUNT(*) AS orders
FROM orders
WHERE strftime('%Y', order_date) = '2025'
GROUP BY channel
ORDER BY orders DESC`,
    chart: { type: "pie", x: "channel", y: ["orders"], title: "2025 orders by channel" },
    answer: (_c, rows) => {
      const total = rows.reduce((s, r) => s + Number(r[1]), 0);
      return `In 2025, ${rows.map((r) => `${r[0]} took ${((Number(r[1]) / total) * 100).toFixed(1)}%`).join(", ")} of ${total.toLocaleString()} orders.`;
    },
  },
  {
    question: "What were total revenue, order count and average order value in 2025?",
    steps: [],
    sql: `WITH order_totals AS (
  SELECT o.order_id, SUM(${REVENUE}) AS order_revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  WHERE o.status NOT IN ('cancelled', 'returned')
    AND o.order_date BETWEEN '2025-01-01' AND '2025-12-31'
  GROUP BY o.order_id
)
SELECT ROUND(SUM(order_revenue), 2) AS revenue,
       COUNT(*) AS orders,
       ROUND(AVG(order_revenue), 2) AS avg_order_value
FROM order_totals`,
    chart: { type: "kpi", x: "", y: ["revenue", "orders", "avg_order_value"], title: "2025 at a glance" },
    answer: (_c, rows) =>
      `In 2025 the store booked ${money(rows[0]![0]!)} of revenue from ${Number(rows[0]![1]).toLocaleString()} orders, an average order value of ${"$" + Number(rows[0]![2]).toFixed(2)}. Cancelled and returned orders are excluded.`,
  },
  {
    question: "Do more expensive products get better ratings?",
    steps: [],
    sql: `SELECT p.name, p.unit_price, ROUND(AVG(r.rating), 2) AS avg_rating, COUNT(*) AS reviews
FROM products p
JOIN reviews r ON r.product_id = p.product_id
GROUP BY p.product_id
HAVING COUNT(*) >= 10
ORDER BY p.unit_price`,
    chart: { type: "scatter", x: "unit_price", y: ["avg_rating"], title: "Price vs. average rating (products with 10+ reviews)" },
    answer: (_c, rows) => {
      const xs = rows.map((r) => Number(r[1])), ys = rows.map((r) => Number(r[2]));
      const mx = xs.reduce((a, b) => a + b) / xs.length, my = ys.reduce((a, b) => a + b) / ys.length;
      let sxy = 0, sxx = 0, syy = 0;
      xs.forEach((x, i) => { sxy += (x - mx) * (ys[i]! - my); sxx += (x - mx) ** 2; syy += (ys[i]! - my) ** 2; });
      const r = sxy / Math.sqrt(sxx * syy);
      const strength = Math.abs(r) < 0.2 ? "essentially no" : Math.abs(r) < 0.4 ? "a weak" : "a moderate";
      const takeaway = Math.abs(r) < 0.4 ? "Price explains little of the variation; ratings depend mostly on the individual product." : r > 0 ? "Pricier products do tend to rate higher." : "Pricier products tend to rate lower.";
      return `Across ${rows.length} products with 10+ reviews there is ${strength} ${r >= 0 ? "positive" : "negative"} relationship between price and average rating (Pearson r = ${r.toFixed(2)}). ${takeaway}`;
    },
  },
];

/** Queries the SQL console offers to show the guard at work. */
export const ATTACKS: { label: string; sql: string }[] = [
  { label: "DROP TABLE", sql: "DROP TABLE orders" },
  { label: "Stacked query", sql: "SELECT 1; DELETE FROM orders" },
  { label: "Comment trick", sql: "SELECT * FROM orders --\n; UPDATE orders SET status = 'x'" },
  { label: "System catalog", sql: "SELECT sql FROM sqlite_master" },
  { label: "Extension load", sql: "SELECT load_extension('/tmp/evil.so')" },
  { label: "Runaway join", sql: "SELECT count(*) FROM order_items a, order_items b, order_items c" },
];
