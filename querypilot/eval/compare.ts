/**
 * Execution-accuracy comparison: does the predicted query return the same
 * answer as the gold query? Column names and column order don't matter, and
 * the prediction may include extra columns. Each gold column's values must
 * appear (as a multiset, or in order for `ordered` questions) in some distinct
 * predicted column, and the row counts must match. Numbers compare with a
 * small relative tolerance; strings are case-insensitive.
 */
import type { SqlValue } from "sql.js";

export interface Table {
  columns: string[];
  rows: SqlValue[][];
}

function norm(v: SqlValue): string {
  if (v === null) return "null";
  if (typeof v === "number") {
    return v.toFixed(4);
  }
  if (v instanceof Uint8Array) return `blob:${v.length}`;
  const n = Number(v);
  if (v.trim() !== "" && Number.isFinite(n) && /^-?[\d.]+$/.test(v.trim())) return n.toFixed(4);
  return v.trim().toLowerCase();
}

function column(t: Table, i: number, ordered: boolean): string[] {
  const vals = t.rows.map((r) => norm(r[i]!));
  if (ordered) return vals;
  const numeric = vals.every((v) => v !== "null" && Number.isFinite(Number(v)));
  return [...vals].sort(numeric ? (a, b) => Number(a) - Number(b) : undefined);
}

function sameColumn(gold: string[], pred: string[]): boolean {
  if (gold.length !== pred.length) return false;
  return gold.every((g, i) => {
    const p = pred[i]!;
    if (g === p) return true;
    const a = Number(g), b = Number(p);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
    // relative tolerance, plus fraction-vs-percent equivalence
    const close = (x: number, y: number) => Math.abs(x - y) <= Math.max(0.011, Math.abs(y) * 0.001);
    return close(a, b) || close(a * 100, b) || close(a, b * 100);
  });
}

export function resultsMatch(gold: Table, pred: Table, ordered = false): { match: boolean; reason?: string } {
  if (gold.rows.length !== pred.rows.length) {
    return { match: false, reason: `row count ${pred.rows.length} != gold ${gold.rows.length}` };
  }
  const used = new Set<number>();
  for (let gi = 0; gi < gold.columns.length; gi++) {
    const g = column(gold, gi, ordered);
    let found = -1;
    for (let pi = 0; pi < pred.columns.length; pi++) {
      if (used.has(pi)) continue;
      if (sameColumn(g, column(pred, pi, ordered))) { found = pi; break; }
    }
    if (found === -1) return { match: false, reason: `no predicted column matches gold column "${gold.columns[gi]}"` };
    used.add(found);
  }
  return { match: true };
}
