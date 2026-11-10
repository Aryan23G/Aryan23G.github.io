import { describe, expect, it } from "vitest";
import { ANALYST_NOTE, assessIncident, enforcePolicy, gatherEvidence, replyProblems, type ModelDecision } from "../src/core/policy.ts";
import { decision, sample } from "./helpers.ts";

const d = (over: Record<string, unknown> = {}) => decision(over) as unknown as ModelDecision;

describe("guardrail", () => {
  it("leaves a correct decision on a real ticket untouched", () => {
    const t = sample(0);
    const r = enforcePolicy(d(), gatherEvidence(t), t);
    expect(r.overrides).toEqual([]);
    expect(r).toMatchObject({ priority: "P3", securityFlag: false, kbRefs: ["KB-101"] });
  });

  it("overrides a model that calls a phishing email safe", () => {
    const t = sample(1);
    const r = enforcePolicy(d({ priority: "P4", category: "Email & Collaboration" }), gatherEvidence(t), t);
    expect(r).toMatchObject({ securityFlag: true, priority: "P1", escalateTo: "Security Operations Center (SOC)", category: "Security Incident", suggestedResponse: ANALYST_NOTE });
    expect(r.overrides.map((o) => o.field)).toEqual(["securityFlag", "priority", "escalateTo", "category", "suggestedResponse"]);
    expect(r.securityReasons.length).toBeGreaterThan(0);
  });

  it("explains an override caused by prompt injection", () => {
    const t = sample(7);
    const r = enforcePolicy(d({ priority: "P4" }), gatherEvidence(t), t);
    expect(r.overrides[0]?.reason).toMatch(/prompt-injection/);
  });

  it("fails closed: honours a security flag even when the rules see nothing", () => {
    const t = sample(6);
    expect(assessIncident(gatherEvidence(t)).incident).toBe(false);
    const r = enforcePolicy(d({ security_flag: true, suggested_response: "Internal analyst note: odd request." }), gatherEvidence(t), t);
    expect(r).toMatchObject({ securityFlag: true, priority: "P1", escalateTo: "Security Operations Center (SOC)", suggestedResponse: "Internal analyst note: odd request." });
  });

  it("drops invented KB ids and unknown teams", () => {
    const t = sample(0);
    const r = enforcePolicy(d({ kb_refs: ["KB-101", "KB-999"], escalate_to: "Team Rocket" }), gatherEvidence(t), t);
    expect(r.kbRefs).toEqual(["KB-101"]);
    expect(r.escalateTo).toBeNull();
    expect(r.overrides.map((o) => o.field)).toEqual(["kbRefs", "escalateTo"]);
  });

  it("blocks a reply containing an outside link and replaces it with a grounded one", () => {
    const t = sample(0);
    const r = enforcePolicy(d({ suggested_response: "Reset it here: http://bit.ly/reset" }), gatherEvidence(t), t);
    expect(r.suggestedResponse).not.toContain("bit.ly");
    expect(r.suggestedResponse).toContain("self-service portal");
    expect(r.overrides[0]).toMatchObject({ field: "suggestedResponse" });
  });

  it("blocks a reply that asks for a password", () => {
    expect(replyProblems("Please reply with your password so we can unlock you.")).toHaveLength(1);
    expect(replyProblems("See https://portal.company.example/reset to reset it.")).toEqual([]);
  });

  it("clamps confidence into [0, 1]", () => {
    const t = sample(0);
    expect(enforcePolicy(d({ confidence: 7 }), gatherEvidence(t), t).confidence).toBe(1);
    expect(enforcePolicy(d({ confidence: Number.NaN }), gatherEvidence(t), t).confidence).toBe(0);
  });
});
