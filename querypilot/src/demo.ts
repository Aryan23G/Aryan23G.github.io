/**
 * Curated examples: a few questions the local engine can't phrase as one plan
 * (several measures at once, a correlation), answered with hand-written SQL that
 * is labelled as such in the UI. Everything after that is real: each query goes
 * through the same guard, bytecode check, worker and chart validator, and the
 * answer text is computed from the actual result.
 */
import type { SqlValue } from "sql.js";
import type { ChartSpec } from "./viz.ts";

export interface DemoScript {
  question: string;
  sql: string;
  chart: ChartSpec;
  answer: (columns: string[], rows: SqlValue[][]) => string;
}

const money = (v: SqlValue) => "$" + Number(v).toLocaleString("en-US", { maximumFractionDigits: 0 });
const REVENUE = "oi.quantity * oi.unit_price * (1 - oi.discount)";

export const DEMOS: DemoScript[] = [
  {
    question: "What were total revenue, order count and average order value in 2025?",
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
