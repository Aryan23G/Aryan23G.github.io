import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { resultsMatch } from "../eval/compare.ts";
import { getEngine } from "./helpers.ts";

const questions = JSON.parse(readFileSync(new URL("../eval/questions.json", import.meta.url), "utf8")) as { id: string; gold: string }[];

describe("eval set", () => {
  it.each(questions.map((q) => [q.id, q.gold]))("gold SQL %s passes the guard and returns rows", async (_id, gold) => {
    const r = (await getEngine()).execute(gold);
    expect(r.ok ? "" : r.error).toBe("");
    expect(r.ok && r.result.rowCount).toBeGreaterThan(0);
  });
  it("has unique ids", () => {
    expect(new Set(questions.map((q) => q.id)).size).toBe(questions.length);
  });
});

describe("resultsMatch", () => {
  const gold = { columns: ["category", "revenue"], rows: [["A", 10.004], ["B", 20]] };
  it("ignores column names, order and extra columns", () => {
    expect(resultsMatch(gold, { columns: ["rev", "cat", "n"], rows: [[20, "b", 1], [10, "a", 2]] }).match).toBe(true);
  });
  it("accepts fraction vs percent", () => {
    expect(resultsMatch({ columns: ["r"], rows: [[0.2031]] }, { columns: ["pct"], rows: [[20.31]] }).match).toBe(true);
  });
  it("rejects wrong values and wrong row counts", () => {
    expect(resultsMatch(gold, { columns: ["c", "r"], rows: [["A", 11], ["B", 20]] }).match).toBe(false);
    expect(resultsMatch(gold, { columns: ["c", "r"], rows: [["A", 10]] }).match).toBe(false);
  });
  it("respects order when required", () => {
    const pred = { columns: ["c", "r"], rows: [["B", 20], ["A", 10]] };
    expect(resultsMatch(gold, pred, false).match).toBe(true);
    expect(resultsMatch(gold, pred, true).match).toBe(false);
  });
});
