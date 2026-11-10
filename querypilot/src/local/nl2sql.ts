/**
 * Local NL→SQL engine: free, offline, deterministic. No API key, no model download.
 *
 * A semantic parser for the Orbit Outfitters schema. It reads a question into a
 * structured plan (metric, grouping dimensions, filters, ranking), compiles the plan
 * to SQL from a fixed join graph, and the caller runs that SQL through the same
 * guard → bytecode check → worker pipeline as the Claude agent. Every interpretation
 * decision is recorded in `plan.notes`, so the UI can show exactly how the question
 * was understood.
 *
 * Scope: aggregate questions ("revenue by month in 2025", "top 5 products by units",
 * "return rate per channel", "how many enterprise customers in Canada"). Questions it
 * cannot map get a NotUnderstood error with suggestions instead of a guess.
 */

export type MetricId =
  | "revenue" | "margin" | "margin_pct" | "aov" | "units" | "orders" | "return_rate" | "cancel_rate"
  | "customers" | "new_customers" | "rating" | "reviews" | "shipping" | "discount" | "avg_price" | "products";

export type DimId =
  | "year" | "quarter" | "month" | "weekday" | "category" | "product" | "channel" | "country" | "city"
  | "segment" | "status" | "customer" | "rating";

type Scope = "order" | "review" | "customer" | "product";
type Format = "money" | "int" | "ratio" | "decimal";

export interface Filter {
  field: "year" | "quarter" | "month" | "category" | "product" | "channel" | "country" | "city" | "segment" | "status";
  values: string[];
  negate?: boolean;
  /** Character offset of the match in the normalised question (used to find a "share of" subject). */
  at?: number;
}

export type PlanKind = "aggregate" | "growth" | "top_per_group" | "share" | "retention";
type Period = "month" | "quarter" | "year";

export interface Plan {
  metric: MetricId;
  dims: DimId[];
  filters: Filter[];
  rank?: { dir: "desc" | "asc"; limit?: number };
  share: boolean;
  /** "with at least N reviews/orders" → HAVING count >= N. */
  minCount?: number;
  /** "customers who never placed an order" → anti-join. */
  neverOrdered?: boolean;
  /** Multi-step shape; plain aggregates are "aggregate". */
  kind: PlanKind;
  growth?: { period: Period; pick?: "max" | "min" };
  topPerGroup?: { outer: DimId; entity: DimId; n: number };
  /** Share kind: the subset (numerator) conditions; plan.filters stay the base population. */
  subset?: Filter[];
  retention?: { mode: "cohort"; from: string; to: string } | { mode: "repeat" };
  notes: string[];
}

export interface Vocabulary {
  categories: string[];
  countries: string[];
  cities: string[];
  segments: string[];
  channels: string[];
  statuses: string[];
  products: string[];
}

export interface Compiled {
  plan: Plan;
  sql: string;
  chart: { type: "line" | "bar" | "pie" | "kpi" | "table"; x: string; y: string[]; title: string };
  metricColumn: string;
  format: Format;
}

export class NotUnderstood extends Error {
  constructor(message: string, public suggestions: string[]) {
    super(message);
  }
}

export const SUGGESTIONS = [
  "Revenue by month in 2025",
  "Top 5 products by units sold",
  "Return rate by category",
  "How many customers per country?",
  "Average order value by segment",
  "Orders by channel in Q4 2025",
  "Average rating by category",
  "Revenue in Canada vs United States",
];

// ------------------------------------------------------------------ metrics
interface MetricDef {
  id: MetricId;
  label: string;
  column: string;
  scope: Scope;
  format: Format;
  pattern: RegExp;
  /** SQL expression (aliases: o orders, oi order_items, p products, c customers, r reviews). */
  expr: string;
  needsItems?: boolean;
  needsProducts?: boolean;
  /** Excludes cancelled and returned orders unless the question filters status explicitly. */
  realisedOnly?: boolean;
  definition: string;
}

const REV = "oi.quantity * oi.unit_price * (1 - oi.discount)";
const COGS = "oi.quantity * p.unit_cost";

// Ordered: the first match wins, so specific phrasings come before generic ones.
const METRICS: MetricDef[] = [
  { id: "margin_pct", label: "gross margin %", column: "margin_pct", scope: "order", format: "ratio",
    // No trailing \b: "%" is not a word character, so "margin %" would never match one.
    pattern: /\b(margin\s*(%|percent(age)?\b|rate\b|ratio\b)|profit margin\b)/,
    expr: `ROUND(SUM(${REV} - ${COGS}) / SUM(${REV}), 4)`, needsItems: true, needsProducts: true, realisedOnly: true,
    definition: "gross margin % = (revenue − cost) / revenue, excluding cancelled and returned orders" },
  { id: "aov", label: "average order value", column: "avg_order_value", scope: "order", format: "money",
    pattern: /\b(average order (value|size)|avg\.? order value|aov|basket size|order value)\b/,
    expr: `ROUND(SUM(${REV}) / COUNT(DISTINCT o.order_id), 2)`, needsItems: true, realisedOnly: true,
    definition: "average order value = revenue / number of orders, excluding cancelled and returned orders" },
  { id: "return_rate", label: "return rate", column: "return_rate", scope: "order", format: "ratio",
    pattern: /\b(return(s|ed)? (rate|ratio|percentage|%)|rate of returns?|how often .*returned)\b/,
    expr: "ROUND(1.0 * COUNT(DISTINCT CASE WHEN o.status = 'returned' THEN o.order_id END) / COUNT(DISTINCT o.order_id), 4)",
    definition: "return rate = returned orders / (delivered + returned orders)" },
  { id: "cancel_rate", label: "cancellation rate", column: "cancel_rate", scope: "order", format: "ratio",
    pattern: /\b(cancel(l)?ation (rate|ratio|percentage|%)|cancel(l)?ed (rate|ratio|percentage)|rate of cancel)/,
    expr: "ROUND(1.0 * COUNT(DISTINCT CASE WHEN o.status = 'cancelled' THEN o.order_id END) / COUNT(DISTINCT o.order_id), 4)",
    definition: "cancellation rate = cancelled orders / all orders" },
  { id: "margin", label: "gross margin", column: "gross_margin", scope: "order", format: "money",
    pattern: /\b(margin|profit|profits|profitable|gross profit)\b/,
    expr: `ROUND(SUM(${REV} - ${COGS}), 2)`, needsItems: true, needsProducts: true, realisedOnly: true,
    definition: "gross margin = revenue − unit cost × quantity, excluding cancelled and returned orders" },
  { id: "new_customers", label: "new customers", column: "new_customers", scope: "customer", format: "int",
    pattern: /\b(new customers|sign ?ups?|signed up|registrations|new accounts|customer acquisition)\b/,
    expr: "COUNT(*)", definition: "new customers = accounts by signup date" },
  { id: "rating", label: "average rating", column: "avg_rating", scope: "review", format: "decimal",
    pattern: /\b(ratings?|rated|stars?|review scores?|satisfaction)\b/,
    expr: "ROUND(AVG(r.rating), 2)", definition: "average rating = mean review stars (1-5)" },
  { id: "reviews", label: "reviews", column: "reviews", scope: "review", format: "int",
    pattern: /\breviews?\b/, expr: "COUNT(*)", definition: "reviews = number of product reviews" },
  { id: "shipping", label: "shipping charged", column: "shipping", scope: "order", format: "money",
    pattern: /\bshipping\b/, expr: "ROUND(SUM(o.shipping_cost), 2)", definition: "shipping = shipping charged to customers" },
  { id: "discount", label: "average discount", column: "avg_discount", scope: "order", format: "ratio",
    pattern: /\bdiscounts?\b/, expr: "ROUND(AVG(oi.discount), 4)", needsItems: true,
    definition: "average discount = mean line discount" },
  { id: "units", label: "units sold", column: "units", scope: "order", format: "int",
    pattern: /\b(units?|quantity|quantities|items sold|pieces|best[- ]selling|top[- ]selling|most popular|sold the most|sell the most)\b/,
    expr: "SUM(oi.quantity)", needsItems: true, realisedOnly: true,
    definition: "units sold = total quantity, excluding cancelled and returned orders" },
  { id: "revenue", label: "revenue", column: "revenue", scope: "order", format: "money",
    pattern: /\b(revenue|revenues|sales|income|turnover|gmv|earn(ed|ings)?|made|make|spend|spent|spending|lifetime value|ltv|money)\b/,
    expr: `ROUND(SUM(${REV}), 2)`, needsItems: true, realisedOnly: true,
    definition: "revenue = Σ quantity × unit price × (1 − discount), excluding cancelled and returned orders" },
  { id: "avg_price", label: "average price", column: "avg_price", scope: "product", format: "money",
    pattern: /\b(average|avg|mean|typical)( list)? price|(how much|what) do .* cost|prices?\b|\b(expensive|cheapest|cheap|priciest|pricey)\b/,
    expr: "ROUND(AVG(p.unit_price), 2)", definition: "average price = mean list price of products" },
  { id: "orders", label: "orders", column: "orders", scope: "order", format: "int",
    pattern: /\b(orders?|purchases?|transactions?|checkouts?)\b/, expr: "COUNT(DISTINCT o.order_id)",
    definition: "orders = number of distinct orders" },
  { id: "customers", label: "customers", column: "customers", scope: "customer", format: "int",
    pattern: /\b(customers?|buyers?|clients?|shoppers?|users?|accounts?)\b/, expr: "COUNT(*)",
    definition: "customers = number of customer accounts" },
  { id: "products", label: "products", column: "products", scope: "product", format: "int",
    pattern: /\b(products?|items?|skus?)\b/, expr: "COUNT(*)", definition: "products = number of catalogue products" },
];

// ------------------------------------------------------------------ dimensions
interface DimDef {
  id: DimId;
  column: string;
  temporal?: boolean;
  /** Words that name this dimension. */
  words: RegExp;
}

const DIMS: DimDef[] = [
  { id: "month", column: "month", temporal: true, words: /\b(months?|monthly|over time|trend|trends|time series)\b/ },
  { id: "quarter", column: "quarter", temporal: true, words: /\b(quarters?|quarterly)\b/ },
  { id: "year", column: "year", temporal: true, words: /\b(years?|yearly|annual|annually|year over year|yoy)\b/ },
  { id: "weekday", column: "weekday", words: /\b(weekdays?|day of (the )?week|days of (the )?week)\b/ },
  { id: "category", column: "category", words: /\b(product categor(y|ies)|categor(y|ies)|product (line|type|group)s?|departments?)\b/ },
  { id: "product", column: "product", words: /\b(products?|items?|skus?)\b/ },
  { id: "channel", column: "channel", words: /\b(sales channels?|channels?|platforms?)\b/ },
  { id: "country", column: "country", words: /\b(countr(y|ies)|nations?|markets?|regions?)\b/ },
  { id: "city", column: "city", words: /\b(cit(y|ies))\b/ },
  { id: "segment", column: "segment", words: /\b(customer segments?|segments?|customer types?|tiers?)\b/ },
  { id: "status", column: "status", words: /\b(status(es)?|order states?)\b/ },
  { id: "customer", column: "customer", words: /\b(customers?|buyers?|clients?|shoppers?)\b/ },
  { id: "rating", column: "stars", words: /\b(star ratings?|ratings?|stars)\b/ },
];

// Loose cues may sit up to two words before the dimension ("by product category", "top 5 selling products");
// "which/what" must be directly followed by it (optionally a number): "what is the average product rating"
// is a question about ratings, not a grouping by product.
const LOOSE_CUE = String.raw`(by|per|each|every|across|for each|for every|split by|broken down by|breakdown by|breakdown of|grouped by|top|bottom|best|worst|most|least|highest|lowest|cheapest|compare|comparing|between|of all)`;
const TIGHT_CUE = String.raw`(which|what)(\s+\d+)?`;

const COUNTRY_ALIASES: Record<string, string> = {
  usa: "United States", "u.s.": "United States", us: "United States", america: "United States", states: "United States",
  uk: "United Kingdom", britain: "United Kingdom", england: "United Kingdom",
};

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const DATA_END_YEAR = 2025;

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sqlStr = (s: string) => `'${s.replace(/'/g, "''")}'`;

/**
 * Multi-step analyses the rule-based engine cannot express correctly. Better to say so than to
 * return a plausible-looking wrong number.
 */
const MULTI_STEP: [RegExp, string][] = [
  [/\b(why|predict|forecast|will be|next (month|year|quarter)|correlat\w*|regression|causes?)\b/, "explanation or prediction"],
];

// ------------------------------------------------------------------ parsing
export function parse(question: string, vocab: Vocabulary): Plan {
  const notes: string[] = [];
  const q = ` ${question.toLowerCase().replace(/[?!,;:()"]/g, " ").replace(/\s+/g, " ").trim()} `;
  for (const [re, what] of MULTI_STEP) {
    if (re.test(q)) {
      throw new NotUnderstood(
        `This needs ${what}, which the free local engine does not do: it answers from the data, it does not explain or predict. Add an Anthropic API key in Settings to ask the Claude agent, or ask about what the data shows.`,
        SUGGESTIONS,
      );
    }
  }

  // Filters on catalogue values first, so their words are not mistaken for metrics or dimensions
  // (e.g. "Camping" is a category value, "mobile" a channel value).
  const filters: Filter[] = [];
  let rest = q;
  // Negated spans: "excluding cancelled and returned orders", "except Footwear or Apparel".
  const negSpans: string[] = [];
  for (const m of q.matchAll(/\b(excluding|exclude|except|without|other than|not including|apart from)\s+(.+?)(?=\s+(by|per|in|for|during|from|over|across|among|on|grouped|split)\b|\s*$)/g)) {
    negSpans.push(m[2]!);
  }
  const negated = (needle: string) => negSpans.some((span) => new RegExp(`\\b${esc(needle)}`).test(span));
  const take = (field: Filter["field"], values: readonly string[], aliases: Record<string, string> = {}) => {
    const found: { value: string; negate: boolean; at: number }[] = [];
    const candidates = [...values.map((v) => [v.toLowerCase(), v] as const), ...Object.entries(aliases)]
      .sort((a, b) => b[0].length - a[0].length);
    for (const [needle, value] of candidates) {
      const re = new RegExp(`(\\b(excluding|except|without|other than|not|non)\\s+(the\\s+)?)?\\b${esc(needle)}(s|es)?\\b`);
      const m = rest.match(re);
      if (m) {
        // Position in the ORIGINAL question (rest is edited as values are consumed, so its offsets drift).
        found.push({ value, negate: Boolean(m[1]) || negated(needle), at: Math.max(0, q.search(re)) });
        rest = rest.replace(m[0], " ");
      }
    }
    const posF = found.filter((f) => !f.negate);
    const negF = found.filter((f) => f.negate);
    const pos = [...new Set(posF.map((f) => f.value))];
    const neg = [...new Set(negF.map((f) => f.value))];
    if (pos.length) filters.push({ field, values: pos, at: Math.min(...posF.map((f) => f.at)) });
    if (neg.length) filters.push({ field, values: neg, negate: true, at: Math.min(...negF.map((f) => f.at)) });
  };
  take("product", vocab.products);
  take("category", vocab.categories);
  take("country", vocab.countries, COUNTRY_ALIASES);
  take("city", vocab.cities);
  take("segment", vocab.segments, { "small businesses": "Small Business", "smb": "Small Business", "b2b": "Enterprise", "consumers": "Consumer" });
  take("channel", vocab.channels, { website: "web", online: "web", app: "mobile", phone: "mobile", "third-party": "marketplace", amazon: "marketplace" });

  // Metric (status words are only filters when they are not the metric itself).
  const metricDef = pickMetric(rest.replace(/\bsales (channels?|platforms?)\b/g, "channel"));
  if (metricDef.id !== "return_rate" && metricDef.id !== "cancel_rate") {
    const statusAliases: Record<string, string> = { canceled: "cancelled", cancellations: "cancelled", refunded: "returned", returns: "returned" };
    take("status", vocab.statuses, statusAliases);
  }

  // Time filters.
  const years = [...new Set([...rest.matchAll(/\b(20\d\d)\b/g)].map((m) => m[1]!))];
  if (/\b(this|current) year\b|\bytd\b|\byear to date\b/.test(rest)) years.push(String(DATA_END_YEAR));
  if (/\b(last|previous|prior) year\b/.test(rest)) years.push(String(DATA_END_YEAR - 1));
  const quarterMatch = rest.match(/\b(q([1-4])|(first|second|third|fourth|1st|2nd|3rd|4th) quarter)\b/);
  const monthMatches = MONTHS.filter((m, i) => {
    const short = m.slice(0, 3);
    const re = i === 4 ? /\b(in|during|of) may\b|\bmay (20\d\d)\b/ : new RegExp(`\\b(${m}|${short})\\b`);
    return re.test(rest);
  });
  if (/\b(last|previous) month\b/.test(rest)) { monthMatches.push("december"); years.push(String(DATA_END_YEAR)); }

  const uniqYears = [...new Set(years)].sort();
  const dims: DimId[] = [];

  // Two or more explicit years with no other grouping → compare years side by side.
  const compareYears = uniqYears.length >= 2;
  if (uniqYears.length) filters.push({ field: "year", values: uniqYears });
  if (quarterMatch) {
    const word = quarterMatch[2] ?? quarterMatch[3]!;
    const n = ({ first: "1", "1st": "1", second: "2", "2nd": "2", third: "3", "3rd": "3", fourth: "4", "4th": "4" } as Record<string, string>)[word] ?? word;
    filters.push({ field: "quarter", values: [n] });
  }
  if (monthMatches.length) {
    filters.push({ field: "month", values: monthMatches.map((m) => String(MONTHS.indexOf(m) + 1).padStart(2, "0")) });
  }

  // Grouping dimensions: a dimension word next to a grouping cue ("by month", "which category",
  // "top 5 products", "per country"), or a self-grouping word ("monthly", "over time").
  for (const d of DIMS) {
    if (dims.length >= 2) break;
    const m = rest.match(d.words);
    if (!m) continue;
    const word = esc(m[0]);
    const cued = new RegExp(`\\b${LOOSE_CUE}\\b(\\s+\\S+){0,2}\\s+${word}`).test(rest)
      || new RegExp(`\\b${TIGHT_CUE}\\s+${word}`).test(rest)
      || new RegExp(`${word}\\s+(with|has|had|have|that|generated|brought|made|drove|sold|spent|is|are|was|were)\\b`).test(rest)
      || /^(monthly|over time|trend|trends|time series|quarterly|yearly|annual|annually|year over year|yoy)$/.test(m[0]);
    if (!cued) continue;
    // "how many customers per country": customers is the measure, not a grouping.
    if (d.id === "customer" && (metricDef.id === "customers" || metricDef.id === "new_customers")) continue;
    if (d.id === "product" && metricDef.id === "products") continue;
    if (d.id === "rating" && (metricDef.id === "rating")) continue;
    // "in 2025" / "Q4" already pin the period; "this year" is a filter, not a grouping.
    if (d.id === "year" && /\b(this|last|previous|current) year\b/.test(rest) && !/\b(by|per|each) year\b/.test(rest)) continue;
    dims.push(d.id);
    rest = rest.replace(m[0], " ");
  }
  if (compareYears && !dims.includes("year") && dims.length < 2) dims.unshift("year");
  // "Canada vs United States", "web compared to mobile", "Footwear and Apparel": two or more values of one
  // field → compare them side by side by grouping on that field.
  const comparing = /\b(vs\.?|versus|compared? (to|with)|compare|comparing|against|between)\b/.test(q);
  for (const f of filters) {
    const dim = f.field as DimId;
    if (!f.negate && f.values.length >= 2 && DIMS.some((d) => d.id === dim) && !dims.includes(dim) && dims.length < 2
        && (comparing || f.field !== "year")) {
      dims.push(dim);
    }
  }

  // A plain "how many customers" with order-only context switches scope later; nothing to do here.
  const metric = metricDef.id;

  // "with at least 20 reviews" is a group threshold, not a ranking: consume it first.
  const min = rest.match(/\b(at least|minimum of|a minimum of|min|more than|over)\s+(\d+)\s+(reviews?|orders?|ratings?)\b/);
  const minCount = min ? Number(min[2]) + (/more than|over/.test(min[1]!) ? 1 : 0) : undefined;
  if (min) rest = rest.replace(min[0], " ");

  // Ranking.
  let rank: Plan["rank"];
  const top = rest.match(/\b(top|best|highest|largest|biggest|most|which|what)\s+(\d+)\b/) ?? rest.match(/\b(\d+)\s+(most|highest|largest|biggest|best|top)\b/);
  const bottom = rest.match(/\b(bottom|worst|lowest|(?<!at )least|fewest|smallest)\s+(\d+)\b/);
  const cheapN = rest.match(/\b(\d+)\s+cheapest\b|\bcheapest\s+(\d+)\b/);
  if (bottom) rank = { dir: "asc", limit: Number(bottom[2]) };
  else if (cheapN) rank = { dir: "asc", limit: Number(cheapN[1] ?? cheapN[2]) };
  else if (top) rank = { dir: "desc", limit: Number(top[2] && /\d/.test(top[2]) ? top[2] : top[1]) };
  else if (/\b(bottom|worst|lowest|(?<!at )least|fewest|smallest|minimum|min|cheapest)\b/.test(rest)) rank = { dir: "asc" };
  else if (/\b(top|best|highest|largest|biggest|most|maximum|max|leading)\b/.test(rest)) rank = { dir: "desc", limit: /\btop\b/.test(rest) ? 10 : undefined };

  const share = /\b(share|split|mix|proportion|percentage of|breakdown|distribution)\b/.test(rest);
  const neverOrdered = /\bnever\s+(placed|made|ordered|purchased|bought)\b|\b(without|with no|zero|no)\s+(any\s+)?orders?\b|\bhaven'?t (ordered|purchased|bought)\b/.test(rest);

  if (!dims.length && !filters.length && metricDef.fallback) {
    throw new NotUnderstood(
      "I couldn't find a measure (like revenue, orders, customers or rating) or a grouping (like month, category or country) in that question.",
      SUGGESTIONS,
    );
  }

  notes.push(`measure: ${metricDef.definition}`);
  if (metricDef.fallback) notes.push("no measure named, so counting orders");
  if (dims.length) notes.push(`grouped by: ${dims.join(" and ")}`);
  for (const f of filters) notes.push(`filter: ${f.field} ${f.negate ? "not in" : "="} ${f.values.join(", ")}`);
  if (rank) notes.push(`ranking: ${rank.dir === "desc" ? "highest" : "lowest"} first${rank.limit ? `, top ${rank.limit}` : ""}`);
  if (minCount) notes.push(`only groups with at least ${minCount} ${metricDef.scope === "review" ? "reviews" : "orders"}`);
  if (neverOrdered) notes.push("only customers with no orders");
  const plan: Plan = { metric, dims, filters, rank, share, minCount, neverOrdered, kind: "aggregate", notes };
  detectMultiStep(plan, q, metricDef.fallback === true);
  return plan;
}

const PERIODS: Period[] = ["month", "quarter", "year"];
const CATALOGUE_FIELDS = new Set<Filter["field"]>(["category", "product", "channel", "country", "city", "segment", "status"]);

/** Recognise the multi-step shapes and rewrite the plan's kind. Order matters: most specific first. */
function detectMultiStep(plan: Plan, q: string, metricWasGuessed: boolean) {
  const years = plan.filters.find((f) => f.field === "year")?.values ?? [];

  // Retention: "customers who ordered in 2024 also ordered in 2025", "repeat customers".
  if (/\b(also|again|came back|come back|returned to|retain|retained|retention|churn|repeat|returning)\b/.test(q)
      && /\b(customers?|buyers?|clients?|shoppers?)\b/.test(q)) {
    if (years.length === 2) {
      plan.kind = "retention";
      plan.retention = { mode: "cohort", from: years[0]!, to: years[1]! };
      plan.filters = plan.filters.filter((f) => f.field !== "year");
      plan.dims = [];
      plan.notes = [`retention: customers who ordered in ${years[0]} and also ordered in ${years[1]}, as a share of the ${years[0]} customers`];
      return;
    }
    if (/\brepeat|returning|more than (one|once)|twice|again\b/.test(q)) {
      plan.kind = "retention";
      plan.retention = { mode: "repeat" };
      plan.dims = [];
      plan.notes = ["repeat customers: customers with 2 or more orders, and their share of all ordering customers"];
      return;
    }
  }

  // Growth between periods.
  if (/\b(growth|grew|grow|increase|increased|decrease|decreased|decline|change|changed|jump|drop|dropped)\b|\b(month|quarter|year)[- ]over[- ](month|quarter|year)\b|\b(mom|qoq|yoy)\b/.test(q)) {
    const period: Period = /\b(year[- ]over[- ]year|yoy|annual|yearly|by year|per year)\b/.test(q) ? "year"
      : /\b(quarter[- ]over[- ]quarter|qoq|quarter|quarterly)\b/.test(q) ? "quarter" : "month";
    const pick = /\b(largest|biggest|highest|fastest|most|best|strongest|which|what)\b/.test(q) ? "max"
      : /\b(smallest|lowest|weakest|least|worst|slowest|biggest drop|largest drop)\b/.test(q) ? "min" : undefined;
    plan.kind = "growth";
    plan.growth = { period, pick: /\b(drop|decline|decrease|fell|worst)\b/.test(q) && pick === "max" ? "min" : pick };
    if (metricWasGuessed) plan.metric = "revenue";
    plan.dims = [period];
    plan.rank = undefined;
    plan.notes = [`${METRICS.find((m) => m.id === plan.metric)!.definition}`,
      `growth: change vs the previous ${period}${plan.growth.pick ? `, then the ${plan.growth.pick === "max" ? "largest" : "smallest"} one` : ""}`,
      ...plan.notes.filter((n) => n.startsWith("filter:"))];
    return;
  }

  // Top-N within each group: "top customer for each country", "best 3 products in every category".
  const each = q.match(/\b(for|in|within|per|across) (each|every) (\w+)|\b(each|every) (\w+)'?s?\b/);
  const ranked = /\b(top|best|biggest|highest|leading|largest|single top|number one|#1)\b/.test(q);
  if (each && ranked) {
    const word = each[3] ?? each[5]!;
    const outer = DIMS.find((d) => d.words.test(` ${word} `))?.id;
    const entityWord = q.match(/\b(?:top|best|biggest|highest|leading|largest)\s+(?:\d+\s+)?(\w+)/)?.[1] ?? "";
    const entity = DIMS.find((d) => d.words.test(` ${entityWord} `))?.id
      ?? plan.dims.find((d) => d !== outer);
    if (outer && entity && outer !== entity) {
      const n = Number(q.match(/\b(?:top|best|biggest|highest|leading)\s+(\d+)/)?.[1] ?? 1);
      plan.kind = "top_per_group";
      plan.topPerGroup = { outer, entity, n };
      if (metricWasGuessed || ["customers", "products", "orders"].includes(plan.metric)) plan.metric = "revenue";
      plan.dims = [outer, entity];
      plan.rank = undefined;
      plan.notes = [`${METRICS.find((m) => m.id === plan.metric)!.definition}`,
        `top ${n} ${entity}${n > 1 ? "s" : ""} by ${METRICS.find((m) => m.id === plan.metric)!.label} within each ${outer}`,
        ...plan.notes.filter((n2) => n2.startsWith("filter:"))];
      return;
    }
  }

  // Share of a subset: "mobile's share of orders", "what percentage of orders came from web".
  const shareMatch = q.match(/\b(share|percentage|percent|proportion|fraction|portion)\b/);
  if (shareMatch) {
    const idx = shareMatch.index ?? 0;
    const after = q.slice(idx);
    const subjectAfter = /\b(share|percentage|percent|proportion|fraction|portion) of \w+( \w+)? (that|which|were|was|are|is|came|come|from|on|via|placed|in|through)\b/.test(after);
    // Prefer a subject right before "share" ("mobile channel's share of orders in Q4"); otherwise one after
    // it ("share of orders that came from web"). "in"/"for" after the measure usually introduce scope.
    const candidates = plan.filters.filter((f) => !f.negate && CATALOGUE_FIELDS.has(f.field) && f.at !== undefined);
    const before = candidates.filter((f) => f.at! < idx && idx - f.at! < 40);
    const subset = before.length ? before : subjectAfter ? candidates.filter((f) => f.at! > idx) : [];
    if (subset.length) {
      plan.kind = "share";
      plan.subset = subset;
      plan.filters = plan.filters.filter((f) => !subset.includes(f));
      // A subset field that was also made a grouping ("mobile vs web") is no longer a grouping here.
      plan.dims = plan.dims.filter((d) => !subset.some((f) => f.field === d));
      plan.share = false;
      plan.notes = [
        `share: ${METRICS.find((m) => m.id === plan.metric)!.label} where ${subset.map((f) => `${f.field} = ${f.values.join("/")}`).join(" and ")}, divided by all ${METRICS.find((m) => m.id === plan.metric)!.label}`,
        ...plan.notes.filter((n) => !n.startsWith("measure:") && !(n.startsWith("filter:") && subset.some((f) => n.includes(f.values.join(", "))))),
      ];
    }
  }
}

function pickMetric(text: string): MetricDef & { fallback?: boolean } {
  // "how many customers ..." / "number of customers" → count customers even if "orders" appears later.
  if (/\b(how many|number of|count of|count) (new )?(customers|buyers|clients|shoppers|accounts)\b/.test(text)) {
    const id = /\bnew customers\b/.test(text) ? "new_customers" : "customers";
    return METRICS.find((m) => m.id === id)!;
  }
  if (/\b(how many|number of|count of) (products|items|skus)\b/.test(text) && !/\b(sold|ordered|bought)\b/.test(text)) {
    return METRICS.find((m) => m.id === "products")!;
  }
  if (/\b(how many|number of|count of|count) (\w+ )?(orders|purchases|transactions)\b/.test(text)) {
    return METRICS.find((m) => m.id === "orders")!;
  }
  if (/\b(how many|number of|count of) reviews\b/.test(text)) return METRICS.find((m) => m.id === "reviews")!;
  // Specific measures first (revenue, margin, rating, ...); generic counts (orders/customers/products) last.
  const GENERIC = new Set<MetricId>(["orders", "customers", "products"]);
  for (const m of METRICS) if (!GENERIC.has(m.id) && m.pattern.test(text)) return m;
  // "top 10 customers", "best products", "biggest categories" with no measure → rank by revenue.
  // ("most customers" is still a count: the cue must directly precede the ranked entity.)
  if (/\b(top|best|biggest|largest|leading)\s+(\d+\s+)?(customers?|clients?|buyers?|products?|items?|categor(y|ies)|countr(y|ies)|cit(y|ies)|segments?|channels?)\b/.test(text)) {
    return METRICS.find((m) => m.id === "revenue")!;
  }
  for (const m of METRICS) if (GENERIC.has(m.id) && m.pattern.test(text)) return m;
  return { ...METRICS.find((m) => m.id === "orders")!, fallback: true };
}

// ------------------------------------------------------------------ compiling
interface Ctx { scope: Scope; date: string; joins: Set<"oi" | "p" | "c" | "o">; where: string[] }

const ORDER_ONLY_FILTERS = new Set<Filter["field"]>(["channel", "status"]);

interface AggOptions {
  /** No ORDER BY / LIMIT: the SQL is embedded in a CTE by a multi-step compiler. */
  bare?: boolean;
  /** Share kind: numerator conditions; the metric becomes subset / total. */
  subset?: Filter[];
}

/** Build the share-of-subset ratio for metrics where a ratio of sums is meaningful. */
function shareExpr(metric: MetricId, scope: Scope, cond: string): string {
  const ratio = (num: string, den: string) => `ROUND(1.0 * ${num} / ${den}, 4)`;
  const sumIf = (x: string) => `SUM(CASE WHEN ${cond} THEN ${x} ELSE 0 END)`;
  switch (metric) {
    case "orders": return ratio(`COUNT(DISTINCT CASE WHEN ${cond} THEN o.order_id END)`, "COUNT(DISTINCT o.order_id)");
    case "revenue": return ratio(sumIf(REV), `SUM(${REV})`);
    case "units": return ratio(sumIf("oi.quantity"), "SUM(oi.quantity)");
    case "margin": return ratio(sumIf(`${REV} - ${COGS}`), `SUM(${REV} - ${COGS})`);
    case "shipping": return ratio(sumIf("o.shipping_cost"), "SUM(o.shipping_cost)");
    case "customers":
      return scope === "order"
        ? ratio(`COUNT(DISTINCT CASE WHEN ${cond} THEN o.customer_id END)`, "COUNT(DISTINCT o.customer_id)")
        : ratio(sumIf("1"), "COUNT(*)");
    case "reviews": case "products": case "new_customers": return ratio(sumIf("1"), "COUNT(*)");
    default:
      throw new NotUnderstood(`A "share of" ${METRICS.find((m) => m.id === metric)!.label} is not a meaningful ratio. Try a share of revenue, orders, units, customers or reviews.`, SUGGESTIONS);
  }
}

export function compile(plan: Plan): Compiled {
  switch (plan.kind) {
    case "growth": return compileGrowth(plan);
    case "top_per_group": return compileTopPerGroup(plan);
    case "retention": return compileRetention(plan);
    case "share": return compileAggregate(plan, { subset: plan.subset });
    default: return compileAggregate(plan);
  }
}

function compileAggregate(plan: Plan, opts: AggOptions = {}): Compiled {
  const def = METRICS.find((m) => m.id === plan.metric)!;
  let scope: Scope = def.scope;
  let metricExpr = def.expr;

  // Customer counts with order context ("customers who ordered on mobile in 2025") are counted from orders.
  const orderContext = [...plan.filters, ...(opts.subset ?? [])].some((f) => ORDER_ONLY_FILTERS.has(f.field) || f.field === "category" || f.field === "product")
    || plan.dims.some((d) => ["channel", "status", "category", "product"].includes(d));
  if (scope === "customer" && plan.metric === "customers" && orderContext) {
    scope = "order";
    metricExpr = "COUNT(DISTINCT o.customer_id)";
    plan.notes.push("customers counted from their orders (filters/groupings refer to orders)");
  }
  // Products: list price per category works on the catalogue; anything sales-related comes from orders.
  if (scope === "product" && plan.filters.some((f) => !["category", "product"].includes(f.field))) {
    plan.notes.push("time/customer filters do not apply to the product catalogue and were ignored");
  }

  const ctx: Ctx = {
    scope,
    date: scope === "review" ? "r.review_date" : scope === "customer" ? "c.signup_date" : "o.order_date",
    joins: new Set(),
    where: [],
  };
  if (def.needsItems && scope === "order") ctx.joins.add("oi");
  if (def.needsProducts && scope === "order") ctx.joins.add("p");

  const select: string[] = [];
  const group: string[] = [];
  const order: string[] = [];

  for (const d of plan.dims) {
    const [expr, groupBy] = dimExpr(d, ctx);
    select.push(`${expr} AS ${DIMS.find((x) => x.id === d)!.column}`);
    group.push(groupBy);
    if (DIMS.find((x) => x.id === d)!.temporal || d === "weekday" || d === "rating") order.push(groupBy);
  }
  for (const f of plan.filters) applyFilter(f, ctx, plan);

  if (scope === "order" && def.realisedOnly && !plan.filters.some((f) => f.field === "status")) {
    ctx.where.push("o.status NOT IN ('cancelled', 'returned')");
  }
  if (plan.metric === "return_rate") ctx.where.push("o.status IN ('delivered', 'returned')");

  let column = def.column;
  let format = def.format;
  if (opts.subset?.length) {
    // Numerator condition built with the same filter code (and join tracking) as WHERE clauses.
    const condCtx: Ctx = { ...ctx, where: [] };
    for (const f of opts.subset) applyFilter(f, condCtx, plan);
    metricExpr = shareExpr(plan.metric, scope, condCtx.where.join(" AND ") || "1 = 1");
    column = "share";
    format = "ratio";
  }
  select.push(`${metricExpr} AS ${column}`);

  let from: string;
  if (scope === "order") {
    from = "orders o";
    if (ctx.joins.has("oi") || ctx.joins.has("p")) from += "\nJOIN order_items oi ON oi.order_id = o.order_id";
    if (ctx.joins.has("p")) from += "\nJOIN products p ON p.product_id = oi.product_id";
    if (ctx.joins.has("c")) from += "\nJOIN customers c ON c.customer_id = o.customer_id";
  } else if (scope === "review") {
    from = "reviews r\nJOIN products p ON p.product_id = r.product_id";
    if (ctx.joins.has("c")) from += "\nJOIN customers c ON c.customer_id = r.customer_id";
  } else if (scope === "customer") {
    from = "customers c";
  } else {
    from = "products p";
  }

  // Ranking / ordering.
  const isTimeOnly = plan.dims.length > 0 && plan.dims.every((d) => DIMS.find((x) => x.id === d)!.temporal || d === "weekday" || d === "rating");
  let orderBy = order;
  if (plan.dims.length && (!isTimeOnly || plan.rank)) {
    orderBy = [`${column} ${plan.rank?.dir === "asc" ? "ASC" : "DESC"}`];
  }
  let limit = plan.rank?.limit;
  if (opts.bare) {
    orderBy = [];
    limit = undefined;
  } else if (!limit && plan.dims.some((d) => d === "product" || d === "customer" || d === "city") && plan.dims.length === 1) {
    limit = 15;
    plan.notes.push("long list: showing the top 15");
  }

  if (plan.neverOrdered && scope === "customer") {
    ctx.where.push("NOT EXISTS (SELECT 1 FROM orders o2 WHERE o2.customer_id = c.customer_id)");
  }
  const lines = [`SELECT ${select.join(",\n       ")}`, `FROM ${from}`];
  if (ctx.where.length) lines.push(`WHERE ${ctx.where.join("\n  AND ")}`);
  if (group.length) lines.push(`GROUP BY ${group.join(", ")}`);
  if (plan.minCount && group.length) {
    lines.push(`HAVING ${scope === "review" ? "COUNT(*)" : "COUNT(DISTINCT o.order_id)"} >= ${plan.minCount}`);
  }
  if (orderBy.length) lines.push(`ORDER BY ${orderBy.join(", ")}`);
  if (limit && plan.dims.length) lines.push(`LIMIT ${limit}`);

  const dimCols = plan.dims.map((d) => DIMS.find((x) => x.id === d)!.column);
  let chart: Compiled["chart"];
  const label = opts.subset?.length
    ? `${opts.subset.map((f) => f.values.join("/")).join(" ")} share of ${def.label}`
    : def.label;
  const title = `${capitalize(label)}${plan.dims.length ? ` by ${plan.dims.join(" and ")}` : ""}${describeFilters(plan.filters, plan.dims)}`;
  if (!plan.dims.length) chart = { type: "kpi", x: "", y: [column], title };
  else if (plan.dims.length === 2) chart = { type: "table", x: "", y: [], title };
  else if (DIMS.find((x) => x.id === plan.dims[0])!.temporal) chart = { type: "line", x: dimCols[0]!, y: [column], title };
  else if (plan.share && format !== "ratio") chart = { type: "pie", x: dimCols[0]!, y: [column], title };
  else chart = { type: "bar", x: dimCols[0]!, y: [column], title };

  return { plan, sql: lines.join("\n"), chart, metricColumn: column, format };
}

/** Growth: aggregate per period → LAG() → % change; optionally keep only the largest/smallest. */
function compileGrowth(plan: Plan): Compiled {
  const g = plan.growth!;
  const base = compileAggregate({ ...plan, kind: "aggregate", dims: [g.period], rank: undefined }, { bare: true });
  const m = base.metricColumn;
  const lines = [
    `WITH per_${g.period} AS (`,
    base.sql.split("\n").map((l) => `  ${l}`).join("\n"),
    `), with_growth AS (`,
    `  SELECT ${g.period}, ${m}, ${m} * 1.0 / LAG(${m}) OVER (ORDER BY ${g.period}) - 1 AS growth`,
    `  FROM per_${g.period}`,
    `)`,
    `SELECT ${g.period}, ${m}, ROUND(growth, 4) AS growth`,
    `FROM with_growth`,
  ];
  if (g.pick) lines.push("WHERE growth IS NOT NULL", `ORDER BY growth ${g.pick === "max" ? "DESC" : "ASC"}`, "LIMIT 1");
  else lines.push(`ORDER BY ${g.period}`);
  const def = METRICS.find((d) => d.id === plan.metric)!;
  const title = `${capitalize(def.label)} growth by ${g.period}${describeFilters(plan.filters)}`;
  return {
    plan, sql: lines.join("\n"), metricColumn: "growth", format: "ratio",
    chart: g.pick ? { type: "table", x: "", y: [], title } : { type: "bar", x: g.period, y: ["growth"], title },
  };
}

/** Top-N per group: aggregate over (group, entity) → ROW_NUMBER() per group. */
function compileTopPerGroup(plan: Plan): Compiled {
  const t = plan.topPerGroup!;
  const base = compileAggregate({ ...plan, kind: "aggregate", dims: [t.outer, t.entity], rank: undefined }, { bare: true });
  const m = base.metricColumn;
  const outerCol = DIMS.find((d) => d.id === t.outer)!.column;
  const entityCol = DIMS.find((d) => d.id === t.entity)!.column;
  const sql = [
    "WITH totals AS (",
    base.sql.split("\n").map((l) => `  ${l}`).join("\n"),
    "), ranked AS (",
    `  SELECT *, ROW_NUMBER() OVER (PARTITION BY ${outerCol} ORDER BY ${m} DESC) AS rank_in_group`,
    "  FROM totals",
    ")",
    `SELECT ${outerCol}, ${t.n > 1 ? "rank_in_group, " : ""}${entityCol}, ${m}`,
    "FROM ranked",
    `WHERE rank_in_group <= ${t.n}`,
    `ORDER BY ${outerCol}, ${m} DESC`,
  ].join("\n");
  const def = METRICS.find((d) => d.id === plan.metric)!;
  const title = `Top ${t.n > 1 ? `${t.n} ` : ""}${t.entity} by ${def.label} in each ${t.outer}${describeFilters(plan.filters)}`;
  return { plan, sql, metricColumn: m, format: base.format, chart: { type: "table", x: "", y: [], title } };
}

/** Retention: cohort of year A customers who also ordered in year B; or repeat-customer share. */
function compileRetention(plan: Plan): Compiled {
  const r = plan.retention!;
  if (r.mode === "repeat") {
    const sql = [
      "WITH per_customer AS (",
      "  SELECT customer_id, COUNT(*) AS orders",
      "  FROM orders",
      "  GROUP BY customer_id",
      ")",
      "SELECT COUNT(*) AS ordering_customers,",
      "       SUM(CASE WHEN orders >= 2 THEN 1 ELSE 0 END) AS repeat_customers,",
      "       ROUND(1.0 * SUM(CASE WHEN orders >= 2 THEN 1 ELSE 0 END) / COUNT(*), 4) AS repeat_rate",
      "FROM per_customer",
    ].join("\n");
    return { plan, sql, metricColumn: "repeat_rate", format: "ratio",
      chart: { type: "kpi", x: "", y: ["ordering_customers", "repeat_customers", "repeat_rate"], title: "Repeat customers" } };
  }
  const sql = [
    "WITH cohort AS (",
    `  SELECT DISTINCT customer_id FROM orders WHERE strftime('%Y', order_date) = '${r.from}'`,
    "), later AS (",
    `  SELECT DISTINCT customer_id FROM orders WHERE strftime('%Y', order_date) = '${r.to}'`,
    ")",
    `SELECT COUNT(*) AS customers_${r.from},`,
    `       COUNT(later.customer_id) AS also_in_${r.to},`,
    "       ROUND(1.0 * COUNT(later.customer_id) / COUNT(*), 4) AS retention",
    "FROM cohort",
    "LEFT JOIN later ON later.customer_id = cohort.customer_id",
  ].join("\n");
  return { plan, sql, metricColumn: "retention", format: "ratio",
    chart: { type: "kpi", x: "", y: [`customers_${r.from}`, `also_in_${r.to}`, "retention"], title: `Customer retention ${r.from} → ${r.to}` } };
}

function dimExpr(d: DimId, ctx: Ctx): [string, string] {
  const date = ctx.date;
  const needC = () => { if (ctx.scope === "order" || ctx.scope === "review") ctx.joins.add("c"); };
  const needP = () => { if (ctx.scope === "order") { ctx.joins.add("oi"); ctx.joins.add("p"); } };
  switch (d) {
    case "month": return [`strftime('%Y-%m', ${date})`, `strftime('%Y-%m', ${date})`];
    case "year": return [`strftime('%Y', ${date})`, `strftime('%Y', ${date})`];
    case "quarter": {
      const e = `strftime('%Y', ${date}) || '-Q' || ((CAST(strftime('%m', ${date}) AS INTEGER) + 2) / 3)`;
      return [e, e];
    }
    case "weekday": {
      const e = `CASE CAST(strftime('%w', ${date}) AS INTEGER) WHEN 0 THEN '7 Sun' WHEN 1 THEN '1 Mon' WHEN 2 THEN '2 Tue' WHEN 3 THEN '3 Wed' WHEN 4 THEN '4 Thu' WHEN 5 THEN '5 Fri' ELSE '6 Sat' END`;
      return [e, e];
    }
    case "category": needP(); return ["p.category", "p.category"];
    case "product": needP(); return ["p.name", "p.product_id"];
    case "channel": return ["o.channel", "o.channel"];
    case "status": return ["o.status", "o.status"];
    case "country": needC(); return ["c.country", "c.country"];
    case "city": needC(); return ["c.city", "c.city"];
    case "segment": needC(); return ["c.segment", "c.segment"];
    case "customer": needC(); return ["c.name", "c.customer_id"];
    case "rating": return ["r.rating", "r.rating"];
  }
}

function applyFilter(f: Filter, ctx: Ctx, plan: Plan) {
  const list = f.values.map(sqlStr).join(", ");
  const op = f.negate ? "NOT IN" : "IN";
  const col = (expr: string) => `${expr} ${op} (${list})`;
  switch (f.field) {
    case "year": ctx.where.push(col(`strftime('%Y', ${ctx.date})`)); break;
    case "month": ctx.where.push(col(`strftime('%m', ${ctx.date})`)); break;
    case "quarter": ctx.where.push(col(`CAST((CAST(strftime('%m', ${ctx.date}) AS INTEGER) + 2) / 3 AS TEXT)`)); break;
    case "category": case "product":
      if (ctx.scope === "order") { ctx.joins.add("oi"); ctx.joins.add("p"); }
      ctx.where.push(col(f.field === "category" ? "p.category" : "p.name")); break;
    case "country": case "city": case "segment":
      if (ctx.scope === "product") { plan.notes.push(`${f.field} filter ignored for the product catalogue`); break; }
      if (ctx.scope !== "customer") ctx.joins.add("c");
      ctx.where.push(col(`c.${f.field}`)); break;
    case "channel": case "status":
      if (ctx.scope !== "order") { plan.notes.push(`${f.field} filter ignored (only orders have a ${f.field})`); break; }
      ctx.where.push(col(`o.${f.field}`)); break;
  }
}

function describeFilters(filters: Filter[], dims: DimId[] = []): string {
  // A filter that also became the grouping ("Canada vs United States") is shown by the grouping itself.
  const parts = filters.filter((f) => !dims.includes(f.field as DimId)).map((f) => (f.field === "month" ? `month ${f.values.join("/")}` : f.field === "quarter" ? `Q${f.values.join("/Q")}` : `${f.negate ? "excl. " : ""}${f.values.join("/")}`));
  return parts.length ? `, ${parts.join(", ")}` : "";
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ------------------------------------------------------------------ answers
type Cell = string | number | null | Uint8Array;

export function formatMetric(v: Cell, format: Format): string {
  if (v === null || v === undefined) return "n/a";
  const n = Number(v);
  if (!Number.isFinite(n)) return String(v);
  switch (format) {
    case "money": return "$" + (Math.abs(n) >= 1000
      ? n.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    case "ratio": return (n * 100).toFixed(1) + "%";
    case "decimal": return n.toFixed(2);
    case "int": return Math.round(n).toLocaleString("en-US");
  }
}

/** Plain-English answer computed from the actual result rows. */
export function describeResult(c: Compiled, columns: string[], rows: Cell[][]): string {
  const special = describeMultiStep(c, columns, rows);
  if (special) return special;
  const def = METRICS.find((m) => m.id === c.plan.metric)!;
  const mi = columns.indexOf(c.metricColumn);
  const fmt = (v: Cell) => formatMetric(v, c.format);
  const scopeNote = def.realisedOnly && !c.plan.filters.some((f) => f.field === "status") ? " (excluding cancelled and returned orders)" : "";
  const filt = describeFilters(c.plan.filters, c.plan.dims).replace(/^, /, " for ");
  if (!rows.length) return `No data matched${filt}.`;
  if (!c.plan.dims.length) return `${capitalize(def.label)}${filt}: ${fmt(rows[0]![mi]!)}${scopeNote}.`;
  if (c.plan.dims.length === 2) return `${capitalize(def.label)} by ${c.plan.dims.join(" and ")}${filt}: ${rows.length} rows${scopeNote}.`;

  const label = (r: Cell[]) => String(r[0]);
  const additive = c.format === "money" || c.format === "int";
  const total = additive ? rows.reduce((s, r) => s + Number(r[mi] ?? 0), 0) : null;
  const sorted = [...rows].sort((a, b) => Number(b[mi]) - Number(a[mi]));
  const hi = sorted[0]!;
  const lo = sorted[sorted.length - 1]!;
  const temporal = DIMS.find((x) => x.id === c.plan.dims[0])!.temporal;

  if (temporal) {
    const first = rows[0]!, last = rows[rows.length - 1]!;
    const change = Number(first[mi]) ? (Number(last[mi]) / Number(first[mi]) - 1) * 100 : null;
    return `${capitalize(def.label)} by ${c.plan.dims[0]}${filt}: highest in ${label(hi)} (${fmt(hi[mi]!)}), lowest in ${label(lo)} (${fmt(lo[mi]!)})`
      + (change !== null && rows.length > 1 ? `; ${label(last)} vs ${label(first)}: ${change >= 0 ? "+" : ""}${change.toFixed(0)}%` : "")
      + (total !== null ? `. Total ${fmt(total)}` : "") + `${scopeNote}.`;
  }
  const lead = c.plan.rank?.dir === "asc" ? lo : hi;
  const second = c.plan.rank?.dir === "asc" ? sorted[sorted.length - 2] : sorted[1];
  let text = `${label(lead)} ${c.plan.rank?.dir === "asc" ? "is lowest" : "leads"} with ${fmt(lead[mi]!)}`;
  if (second) text += `, followed by ${label(second)} (${fmt(second[mi]!)})`;
  if (rows.length > 2 && !c.plan.rank?.limit) text += `; ${c.plan.rank?.dir === "asc" ? "highest" : "lowest"} is ${label(c.plan.rank?.dir === "asc" ? hi : lo)} (${fmt((c.plan.rank?.dir === "asc" ? hi : lo)[mi]!)})`;
  if (total !== null && c.plan.share) text += `. ${label(hi)} is ${((Number(hi[mi]) / total) * 100).toFixed(1)}% of the total`;
  return `${text}${filt ? ` —${filt.replace(/^ for/, "")}` : ""}${scopeNote}.`;
}

// ------------------------------------------------------------------ vocabulary
const VOCAB_QUERIES: Record<keyof Vocabulary, string> = {
  categories: "SELECT DISTINCT category FROM products",
  countries: "SELECT DISTINCT country FROM customers",
  cities: "SELECT DISTINCT city FROM customers",
  segments: "SELECT DISTINCT segment FROM customers",
  channels: "SELECT DISTINCT channel FROM orders",
  statuses: "SELECT DISTINCT status FROM orders",
  products: "SELECT DISTINCT name FROM products",
};

/** Load the value vocabulary from the database through any executor (worker in the browser, sql.js in tests). */
export async function loadVocabulary(run: (sql: string) => Promise<Cell[][]>): Promise<Vocabulary> {
  const entries = await Promise.all(
    (Object.keys(VOCAB_QUERIES) as (keyof Vocabulary)[]).map(async (k) => [k, (await run(VOCAB_QUERIES[k])).map((r) => String(r[0]))] as const),
  );
  return Object.fromEntries(entries) as unknown as Vocabulary;
}

function describeMultiStep(c: Compiled, columns: string[], rows: Cell[][]): string | null {
  const plan = c.plan;
  if (plan.kind === "aggregate") return null;
  const def = METRICS.find((m) => m.id === plan.metric)!;
  const col = (name: string) => columns.indexOf(name);
  const pct = (v: Cell) => formatMetric(v, "ratio");
  const signed = (v: Cell) => `${Number(v) >= 0 ? "+" : ""}${pct(v)}`;
  if (!rows.length) return `No data matched${describeFilters(plan.filters).replace(/^, /, " for ")}.`;

  if (plan.kind === "growth") {
    const g = plan.growth!;
    const mi = columns.findIndex((x) => x !== g.period && x !== "growth");
    const gi = col("growth");
    if (g.pick) {
      const r = rows[0]!;
      return `${r[0]} had the ${g.pick === "max" ? "largest" : "smallest"} ${def.label} growth: ${signed(r[gi]!)} vs the previous ${g.period} (${formatMetric(r[mi]!, def.format)}).`;
    }
    const valid = rows.filter((r) => r[gi] !== null);
    const best = valid.reduce((a, r) => (Number(r[gi]) > Number(a[gi]) ? r : a), valid[0]!);
    const worst = valid.reduce((a, r) => (Number(r[gi]) < Number(a[gi]) ? r : a), valid[0]!);
    return `${capitalize(def.label)} growth by ${g.period}: biggest rise in ${best[0]} (${signed(best[gi]!)}), biggest fall in ${worst[0]} (${signed(worst[gi]!)}).`;
  }

  if (plan.kind === "top_per_group") {
    const t = plan.topPerGroup!;
    const mi = col(c.metricColumn);
    const ei = col(DIMS.find((d) => d.id === t.entity)!.column);
    const shown = rows.slice(0, 6).map((r) => `${r[0]}: ${r[ei]} (${formatMetric(r[mi]!, c.format)})`).join("; ");
    return `Top ${t.n > 1 ? `${t.n} ${t.entity}s` : t.entity} by ${def.label} in each ${t.outer}: ${shown}${rows.length > 6 ? "; …" : ""}.`;
  }

  if (plan.kind === "share") {
    const si = col("share");
    const subject = plan.subset!.map((f) => f.values.join("/")).join(" ");
    const scope = describeFilters(plan.filters, plan.dims).replace(/^, /, " for ");
    if (!plan.dims.length) return `${capitalize(subject)} accounts for ${pct(rows[0]![si]!)} of ${def.label}${scope}.`;
    return `${capitalize(subject)} share of ${def.label}${scope}: ${rows.map((r) => `${r[0]} ${pct(r[si]!)}`).join(", ")}.`;
  }

  if (plan.kind === "retention") {
    const r = plan.retention!;
    const row = rows[0]!;
    if (r.mode === "repeat") {
      return `${Number(row[1]).toLocaleString("en-US")} of ${Number(row[0]).toLocaleString("en-US")} ordering customers placed 2 or more orders (${pct(row[2]!)} repeat rate).`;
    }
    return `${Number(row[1]).toLocaleString("en-US")} of the ${Number(row[0]).toLocaleString("en-US")} customers who ordered in ${r.from} also ordered in ${r.to}: ${pct(row[2]!)} retention.`;
  }
  return null;
}
