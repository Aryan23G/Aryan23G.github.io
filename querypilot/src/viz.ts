/**
 * Chart selection. The model proposes a chart, but its proposal is validated
 * against the *actual* result shape (column exists? numeric? temporal? row
 * count sane?). If it doesn't fit, a deterministic heuristic picks one instead,
 * so a bad suggestion never produces a broken chart.
 */
import type { SqlValue } from "sql.js";

export const CHART_TYPES = ["line", "bar", "pie", "scatter", "kpi", "table"] as const;
export type ChartType = (typeof CHART_TYPES)[number];

export interface ChartSpec {
  type: ChartType;
  x: string;
  y: string[];
  title: string;
}

export type ColumnKind = "numeric" | "temporal" | "categorical" | "empty";

const TEMPORAL_RE = /^\d{4}(-\d{2}(-\d{2})?)?$|^\d{4}-(Q[1-4]|W\d{2})$/;
const TEMPORAL_NAME_RE = /(^|_)(date|day|week|month|year|quarter|period|ym|time)($|_)/i;

export function columnKind(rows: SqlValue[][], idx: number, name = ""): ColumnKind {
  const vals = rows.map((r) => r[idx]).filter((v) => v !== null && v !== undefined);
  if (vals.length === 0) return "empty";
  if (vals.every((v) => typeof v === "string" && TEMPORAL_RE.test(v))) return "temporal";
  if (vals.every((v) => typeof v === "number")) {
    // Integer years named like a period (e.g. `year` = 2024) behave as time.
    if (TEMPORAL_NAME_RE.test(name) && vals.every((v) => Number.isInteger(v) && (v as number) >= 1900 && (v as number) <= 2100)) return "temporal";
    return "numeric";
  }
  return "categorical";
}

export function profile(columns: string[], rows: SqlValue[][]): ColumnKind[] {
  return columns.map((c, i) => columnKind(rows, i, c));
}

/** Pick a chart purely from data shape. */
export function inferChart(columns: string[], rows: SqlValue[][], title = ""): ChartSpec {
  const kinds = profile(columns, rows);
  const numeric = columns.filter((_, i) => kinds[i] === "numeric");
  const temporal = columns.filter((_, i) => kinds[i] === "temporal");
  const categorical = columns.filter((_, i) => kinds[i] === "categorical");

  if (rows.length === 0) return { type: "table", x: "", y: [], title };
  if (rows.length === 1 && numeric.length >= 1 && numeric.length <= 4 && categorical.length === 0) {
    return { type: "kpi", x: "", y: numeric, title };
  }
  if (temporal.length >= 1 && numeric.length >= 1 && rows.length >= 2) {
    // Long format (date, category, value) is better as a table than a tangled line.
    if (categorical.length > 0) return { type: "table", x: "", y: [], title };
    return { type: "line", x: temporal[0]!, y: numeric.slice(0, 4), title };
  }
  if (categorical.length >= 1 && numeric.length >= 1 && rows.length <= 40) {
    return { type: "bar", x: categorical[0]!, y: numeric.slice(0, 3), title };
  }
  if (numeric.length >= 2 && categorical.length === 0 && rows.length >= 3) {
    return { type: "scatter", x: numeric[0]!, y: [numeric[1]!], title };
  }
  return { type: "table", x: "", y: [], title };
}

/** Keep the model's chart if it fits the data; otherwise fall back to inference. */
export function resolveChart(proposed: ChartSpec | undefined, columns: string[], rows: SqlValue[][]): ChartSpec & { source: "model" | "inferred" } {
  const title = proposed?.title ?? "";
  if (proposed && fits(proposed, columns, rows)) return { ...proposed, source: "model" };
  return { ...inferChart(columns, rows, title), source: "inferred" };
}

export function fits(spec: ChartSpec, columns: string[], rows: SqlValue[][]): boolean {
  const kinds = profile(columns, rows);
  const kindOf = (c: string) => kinds[columns.indexOf(c)];
  const has = (c: string) => columns.includes(c);
  const allNumeric = spec.y.length > 0 && spec.y.every((c) => has(c) && kindOf(c) === "numeric");

  switch (spec.type) {
    case "table":
      return true;
    case "kpi":
      return rows.length === 1 && allNumeric && spec.y.length <= 4;
    case "line":
      return rows.length >= 2 && has(spec.x) && kindOf(spec.x) !== "numeric" && allNumeric && spec.y.length <= 4;
    case "bar":
      return rows.length >= 1 && rows.length <= 60 && has(spec.x) && allNumeric && spec.y.length <= 4;
    case "pie":
      return rows.length >= 2 && rows.length <= 8 && has(spec.x) && spec.y.length === 1 && allNumeric &&
        rows.every((r) => (r[columns.indexOf(spec.y[0]!)] as number) >= 0);
    case "scatter":
      return rows.length >= 3 && has(spec.x) && kindOf(spec.x) === "numeric" && allNumeric && spec.y.length === 1;
  }
}

export function toCsv(columns: string[], rows: SqlValue[][]): string {
  const esc = (v: SqlValue) => {
    if (v === null) return "";
    const s = v instanceof Uint8Array ? `<blob ${v.length} bytes>` : String(v);
    // Neutralise spreadsheet formula injection as well as quoting.
    const safe = /^[=+\-@\t\r]/.test(s) && typeof v === "string" ? `'${s}` : s;
    return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
  };
  return [columns.map(esc).join(","), ...rows.map((r) => r.map(esc).join(","))].join("\n");
}

export function formatValue(v: SqlValue, column = ""): string {
  if (v === null) return "NULL";
  if (typeof v === "number") {
    if (/(^|_)(year|id)$/i.test(column) && Number.isInteger(v)) return String(v);
    // Fractions shown as percentages. Growth can exceed ±150% (e.g. +166%), so it is not bounded.
    const fraction = /(rate|share|pct|ratio|margin_pct|percent|retention)/i.test(column) && Math.abs(v) <= 1.5;
    if ((fraction || /growth/i.test(column)) && !Number.isInteger(v)) {
      return (v * 100).toFixed(1) + "%";
    }
    return Number.isInteger(v) ? v.toLocaleString("en-US") : v.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  if (v instanceof Uint8Array) return `<blob ${v.length} bytes>`;
  return v;
}
