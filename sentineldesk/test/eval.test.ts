// Regression gate on the labelled eval set: the rules baseline must not get worse.
import { describe, expect, it } from "vitest";
import { loadTickets, score, summarize } from "../eval/run.ts";
import { triageWithRules } from "../src/core/rules.ts";

describe("eval set", () => {
  const tickets = loadTickets();
  const m = summarize(tickets.map((t) => score(t, triageWithRules({ ...t }))));

  it("is well-formed", () => {
    expect(new Set(tickets.map((t) => t.id)).size).toBe(tickets.length);
    for (const t of tickets) {
      expect(t.priority.length, t.id).toBeGreaterThan(0);
      if (t.attack) expect(t.team, t.id).toEqual(["Security Operations Center (SOC)"]);
    }
  });

  it("rules baseline: no false positives, full injection containment", () => {
    expect(m.falsePositiveRate).toBe(0);
    expect(m.injectionContainment).toBe(1);
  });

  it("rules baseline does not regress", () => {
    expect(m.attackRecall).toBeGreaterThanOrEqual(0.72);
    expect(m.priorityAccuracy).toBeGreaterThanOrEqual(0.94);
    expect(m.routingAccuracy).toBeGreaterThanOrEqual(0.88);
  });
});
