import { describe, expect, it } from "vitest";
import { DailyBudget, RateLimiter, Semaphore, TtlCache } from "../src/server/limits.ts";
import { loadConfig } from "../src/server/config.ts";

describe("RateLimiter", () => {
  it("allows max hits per window per key, then reports retry-after", () => {
    let t = 0;
    const rl = new RateLimiter(2, 1000, () => t);
    expect(rl.check("a").ok).toBe(true);
    expect(rl.check("a").ok).toBe(true);
    expect(rl.check("a")).toEqual({ ok: false, retryAfterSec: 1 });
    expect(rl.check("b").ok).toBe(true);
    t = 1000;
    expect(rl.check("a").ok).toBe(true);
  });
});

describe("DailyBudget", () => {
  it("stops at the limit and resets at UTC midnight", () => {
    let t = Date.parse("2026-11-10T23:59:00Z");
    const b = new DailyBudget(2, () => t);
    expect(b.tryConsume()).toBe(true);
    expect(b.tryConsume()).toBe(true);
    expect(b.tryConsume()).toBe(false);
    b.refund();
    expect(b.remaining()).toBe(1);
    t = Date.parse("2026-11-11T00:00:01Z");
    expect(b.remaining()).toBe(2);
  });
});

describe("TtlCache", () => {
  it("expires entries and evicts least-recently-used", () => {
    let t = 0;
    const c = new TtlCache<number>(2, 100, () => t);
    c.set("a", 1);
    c.set("b", 2);
    expect(c.get("a")).toBe(1); // a is now most recent
    c.set("c", 3); // evicts b
    expect(c.get("b")).toBeUndefined();
    t = 200;
    expect(c.get("a")).toBeUndefined();
  });
});

describe("Semaphore", () => {
  it("limits concurrency", () => {
    const s = new Semaphore(1);
    expect(s.tryAcquire()).toBe(true);
    expect(s.tryAcquire()).toBe(false);
    s.release();
    expect(s.tryAcquire()).toBe(true);
  });
});

describe("config", () => {
  it("defaults to rules-only without a key, and the site origin", () => {
    const c = loadConfig({});
    expect(c).toMatchObject({ anthropicApiKey: null, model: "claude-opus-5-5", effort: "low", allowedOrigins: ["https://aryan23g.github.io"], serviceNow: null });
  });
  it("rejects bad values", () => {
    expect(() => loadConfig({ CLAUDE_EFFORT: "turbo" })).toThrow();
    expect(() => loadConfig({ DAILY_CLAUDE_LIMIT: "-1" })).toThrow();
    expect(() => loadConfig({ ADMIN_TOKEN: "short" })).toThrow();
  });
});
