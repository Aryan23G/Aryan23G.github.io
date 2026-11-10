import { afterEach, describe, expect, it } from "vitest";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { createApp, type AgentRunner, type AppDeps } from "../src/server/app.ts";
import { DailyBudget, RateLimiter, Semaphore, TtlCache } from "../src/server/limits.ts";
import { runAgent } from "../src/server/agent.ts";
import { ServiceNowClient } from "../src/server/servicenow.ts";
import type { TriageResult } from "../src/core/types.ts";
import { decision, FakeClient, honestScript, sample } from "./helpers.ts";

const ORIGIN = "https://aryan23g.github.io";
const ADMIN = "a".repeat(32);
let server: Server | undefined;
afterEach(() => server?.close());

function fakeAgent(scriptFactory = () => honestScript(decision())): AgentRunner & { calls: number } {
  const runner = {
    model: "claude-opus-5-5",
    calls: 0,
    run: (ticket: Parameters<AgentRunner["run"]>[0], onEvent: Parameters<AgentRunner["run"]>[1]) => {
      runner.calls++;
      return runAgent(ticket, { client: new FakeClient(scriptFactory()), model: "claude-opus-5-5", onEvent });
    },
  };
  return runner;
}

async function start(over: Partial<AppDeps> = {}) {
  const deps: AppDeps = {
    agent: fakeAgent(),
    allowedOrigins: [ORIGIN],
    rateLimiter: new RateLimiter(100, 60_000),
    budget: new DailyBudget(100),
    cache: new TtlCache<TriageResult>(10, 60_000),
    semaphore: new Semaphore(2),
    serviceNow: null,
    adminToken: null,
    log: () => {},
    ...over,
  };
  server = createApp(deps).listen(0);
  await new Promise((r) => server!.once("listening", r));
  return { url: `http://127.0.0.1:${(server!.address() as AddressInfo).port}`, deps };
}

const post = (url: string, body: unknown, headers: Record<string, string> = {}) =>
  fetch(`${url}/api/triage`, { method: "POST", headers: { "Content-Type": "application/json", Origin: ORIGIN, ...headers }, body: JSON.stringify(body) });

const ticketBody = (i = 0) => {
  const { subject, body, requester } = sample(i);
  return { subject, body, requester };
};

function parseSse(raw: string): Array<{ event: string; data: any }> {
  return raw
    .split("\n\n")
    .filter((c) => c.startsWith("event:"))
    .map((c) => {
      const [e, d] = c.split("\n");
      return { event: e!.slice(7), data: JSON.parse(d!.slice(6)) };
    });
}

describe("HTTP API", () => {
  it("reports health and mode", async () => {
    const { url } = await start();
    const res = await fetch(`${url}/api/health`, { headers: { Origin: ORIGIN } });
    expect(res.headers.get("access-control-allow-origin")).toBe(ORIGIN);
    expect(await res.json()).toMatchObject({ ok: true, mode: "claude", model: "claude-opus-5-5", serviceNow: false });
  });

  it("triages with Claude over JSON", async () => {
    const { url } = await start();
    const res = await post(url, ticketBody(0));
    const { result } = await res.json();
    expect(result).toMatchObject({ mode: "claude", priority: "P3" });
  });

  it("streams tool calls as server-sent events", async () => {
    const { url } = await start();
    const res = await post(url, ticketBody(0), { Accept: "text/event-stream" });
    expect(res.headers.get("content-type")).toContain("text/event-stream");
    const events = parseSse(await res.text());
    expect(events[0]).toMatchObject({ event: "meta", data: { mode: "claude" } });
    expect(events.filter((e) => e.event === "tool").map((e) => e.data.call.name)).toEqual(["scan_security_indicators", "check_sender_domain", "search_knowledge_base", "submit_triage"]);
    expect(events.at(-1)).toMatchObject({ event: "result", data: { mode: "claude" } });
  });

  it("serves identical tickets from cache without spending budget", async () => {
    const agent = fakeAgent();
    const { url, deps } = await start({ agent });
    await post(url, ticketBody(0));
    const { result } = await (await post(url, ticketBody(0))).json();
    expect(result.cached).toBe(true);
    expect(agent.calls).toBe(1);
    expect(deps.budget.remaining()).toBe(99);
  });

  it("falls back to rules when the daily budget is spent", async () => {
    const { url } = await start({ budget: new DailyBudget(0) });
    const { result } = await (await post(url, ticketBody(1))).json();
    expect(result).toMatchObject({ mode: "rules", securityFlag: true });
    expect(result.fallbackReason).toMatch(/budget/);
  });

  it("falls back to rules when Claude errors, without refunding the budget", async () => {
    const broken: AgentRunner = { model: "claude-opus-5-5", run: async () => { throw new Error("upstream down"); } };
    const { url, deps } = await start({ agent: broken });
    const { result } = await (await post(url, ticketBody(4))).json();
    expect(result).toMatchObject({ mode: "rules", fallbackReason: "The live AI could not be reached." });
    expect(JSON.stringify(result)).not.toContain("upstream down");
    expect(deps.budget.remaining()).toBe(99);
  });

  it("runs rules-only when no API key is configured", async () => {
    const { url } = await start({ agent: null });
    expect(await (await fetch(`${url}/api/health`)).json()).toMatchObject({ mode: "rules" });
    const { result } = await (await post(url, ticketBody(2))).json();
    expect(result.mode).toBe("rules");
  });

  it("rejects other websites' origins", async () => {
    const { url } = await start();
    const res = await post(url, ticketBody(0), { Origin: "https://evil.example" });
    expect(res.status).toBe(403);
  });

  it("allows same-origin requests (the page served by the API itself)", async () => {
    const { url } = await start({ allowedOrigins: [] });
    const res = await post(url, ticketBody(0), { Origin: url });
    expect(res.status).toBe(200);
  });

  it("answers CORS preflight", async () => {
    const { url } = await start();
    const res = await fetch(`${url}/api/triage`, { method: "OPTIONS", headers: { Origin: ORIGIN } });
    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-methods")).toContain("POST");
  });

  it("rate-limits per client, but not for cached answers", async () => {
    const { url } = await start({ rateLimiter: new RateLimiter(1, 60_000) });
    expect((await post(url, ticketBody(0))).status).toBe(200);
    expect((await post(url, ticketBody(0))).status).toBe(200); // cached: free
    const res = await post(url, ticketBody(4));
    expect(res.status).toBe(429);
    expect(res.headers.get("retry-after")).toBeTruthy();
  });

  it.each([
    [{ requester: "nope", subject: "x", body: "hello there" }, /requester/],
    [{ requester: "a@b.co", subject: "", body: "hello there" }, /subject/],
    [{ requester: "a@b.co", subject: "x", body: "hi" }, /body/],
    [{ requester: "a@b.co", subject: "x", body: "y".repeat(4001) }, /body/],
  ])("validates input %#", async (body, msg) => {
    const { url } = await start();
    const res = await post(url, body);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(msg);
  });

  it("rejects oversized and malformed bodies", async () => {
    const { url } = await start();
    const big = await fetch(`${url}/api/triage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: "x".repeat(20_000) }) });
    expect(big.status).toBe(413);
    const bad = await fetch(`${url}/api/triage`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{oops" });
    expect(bad.status).toBe(400);
  });
});

describe("ServiceNow routes", () => {
  const SYS = "0123456789abcdef0123456789abcdef";
  const sn = () => {
    const calls: Array<{ url: string; method: string; body?: string }> = [];
    const fetchImpl = (async (url: string, init: RequestInit) => {
      calls.push({ url, method: String(init.method), body: init.body as string | undefined });
      const result = init.method === "PATCH" ? {} : { sys_id: SYS, number: "INC0010002", short_description: "Mailbox will be deactivated", description: sample(1).body, "caller_id.email": sample(1).requester };
      return new Response(JSON.stringify({ result }), { status: 200 });
    }) as unknown as typeof fetch;
    return { client: new ServiceNowClient({ instanceUrl: "https://dev1.service-now.com", username: "u", password: "p", fetchImpl }), calls };
  };

  it("requires the admin token", async () => {
    const { client } = sn();
    const { url } = await start({ serviceNow: client, adminToken: ADMIN });
    expect((await fetch(`${url}/api/servicenow/incidents`)).status).toBe(401);
    expect((await fetch(`${url}/api/servicenow/incidents`, { headers: { Authorization: `Bearer ${"b".repeat(32)}` } })).status).toBe(401);
  });

  it("triages an incident and writes a work note", async () => {
    const { client, calls } = sn();
    const { url } = await start({ serviceNow: client, adminToken: ADMIN, agent: null });
    const res = await fetch(`${url}/api/servicenow/incidents/${SYS}/triage`, { method: "POST", headers: { Authorization: `Bearer ${ADMIN}` } });
    const json = await res.json();
    expect(json).toMatchObject({ incident: "INC0010002", workNoteWritten: true, result: { securityFlag: true } });
    const patch = calls.find((c) => c.method === "PATCH")!;
    expect(JSON.parse(patch.body!).work_notes).toContain("SECURITY INCIDENT");
  });

  it("supports a dry run that writes nothing", async () => {
    const { client, calls } = sn();
    const { url } = await start({ serviceNow: client, adminToken: ADMIN, agent: null });
    await fetch(`${url}/api/servicenow/incidents/${SYS}/triage?dryRun=true`, { method: "POST", headers: { Authorization: `Bearer ${ADMIN}` } });
    expect(calls.some((c) => c.method === "PATCH")).toBe(false);
  });

  it("is hidden when ServiceNow is not configured", async () => {
    const { url } = await start();
    expect((await fetch(`${url}/api/servicenow/incidents`)).status).toBe(404);
  });
});
