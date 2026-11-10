import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { TriageQueue } from "../src/server/ingest/queue.ts";
import { FileStore, MemoryStore, type ProcessedRecord } from "../src/server/ingest/store.ts";
import { signatureHeader, computeSignature, verifyWebhook } from "../src/server/ingest/webhook.ts";
import { ingestKey, ServiceNowIngestor } from "../src/server/ingest/servicenow.ts";
import { ServiceNowClient, ServiceNowError, WORK_NOTE_MARKER } from "../src/server/servicenow.ts";
import { TriagePipeline } from "../src/server/pipeline.ts";
import { DailyBudget, RateLimiter, Semaphore, TtlCache } from "../src/server/limits.ts";
import { createApp } from "../src/server/app.ts";
import { loadConfig } from "../src/server/config.ts";
import type { TriageResult } from "../src/core/types.ts";
import { sample } from "./helpers.ts";

const SYS_A = "a".repeat(32);
const SYS_B = "b".repeat(32);
const SECRET = "s".repeat(40);
const flush = () => new Promise((r) => setTimeout(r, 0));

const record = (key: string): ProcessedRecord => ({ key, ref: "INC1", at: "2026-11-10T00:00:00Z", mode: "rules", priority: "P1", securityFlag: true, escalateTo: null });

// ---------- fake ServiceNow over a mocked fetch ----------
interface FakeIncident {
  sys_id: string;
  number: string;
  state: string;
  short_description: string;
  description: string;
  "caller_id.email": string;
}
function fakeServiceNow(incidents: FakeIncident[], opts: { journal?: "empty" | "has-note" | "forbidden"; failGets?: number[]; patchStatus?: number } = {}) {
  const notes: Array<{ sysId: string; note: string }> = [];
  let gets = 0;
  const fetchImpl = (async (url: string, init: RequestInit) => {
    const u = new URL(url);
    const json = (status: number, result: unknown) => new Response(JSON.stringify({ result }), { status });
    if (init.method === "PATCH") {
      if (opts.patchStatus) return json(opts.patchStatus, {});
      notes.push({ sysId: u.pathname.split("/").pop()!, note: JSON.parse(String(init.body)).work_notes });
      return json(200, {});
    }
    if (u.pathname === "/api/now/table/sys_journal_field") {
      if (opts.journal === "forbidden") return json(403, {});
      const id = /element_id=([0-9a-f]{32})/.exec(u.searchParams.get("sysparm_query") ?? "")?.[1];
      const has = opts.journal === "has-note" || notes.some((n) => n.sysId === id);
      return json(200, has ? [{ sys_id: "j1" }] : []);
    }
    gets++;
    if (opts.failGets?.includes(gets)) return json(503, {});
    if (u.pathname === "/api/now/table/incident") return json(200, incidents.filter((i) => i.state === "1"));
    const id = u.pathname.split("/").pop();
    const inc = incidents.find((i) => i.sys_id === id);
    return inc ? json(200, inc) : json(404, {});
  }) as unknown as typeof fetch;
  return { client: new ServiceNowClient({ instanceUrl: "https://dev1.service-now.com", username: "u", password: "p", fetchImpl }), notes };
}

const incident = (sys_id: string, i: number, state = "1"): FakeIncident => {
  const t = sample(i);
  return { sys_id, number: `INC00${i}`, state, short_description: t.subject, description: t.body, "caller_id.email": t.requester };
};

const rulesPipeline = () => new TriagePipeline({ agent: null, budget: new DailyBudget(10), cache: new TtlCache<TriageResult>(10, 60_000), semaphore: new Semaphore(1), log: () => {} });
const noSleepQueue = { sleep: async () => {}, log: () => {} };

// ---------- store ----------
describe("processed store", () => {
  let dir = "";
  afterEach(async () => dir && rm(dir, { recursive: true, force: true }));

  it("memory store keeps newest first and caps its size", async () => {
    const s = new MemoryStore(2);
    for (const k of ["a", "b", "c"]) await s.put(record(k));
    expect(await s.has("a")).toBe(false);
    expect((await s.recent(5)).map((r) => r.key)).toEqual(["c", "b"]);
  });

  it("file store persists across instances and writes valid JSON", async () => {
    dir = await mkdtemp(path.join(tmpdir(), "sd-store-"));
    const file = path.join(dir, "nested", "store.json");
    const a = new FileStore(file);
    await Promise.all([a.put(record("x")), a.put(record("y"))]);
    expect(JSON.parse(await readFile(file, "utf8"))).toHaveLength(2);
    const b = new FileStore(file);
    expect(await b.has("x")).toBe(true);
    expect(await b.has("z")).toBe(false);
  });

  it("file store starts empty when the file is missing and rejects a corrupt file", async () => {
    dir = await mkdtemp(path.join(tmpdir(), "sd-store-"));
    expect(await new FileStore(path.join(dir, "none.json")).recent(5)).toEqual([]);
    const bad = path.join(dir, "bad.json");
    await (await import("node:fs/promises")).writeFile(bad, '{"not":"an array"}');
    await expect(new FileStore(bad).has("x")).rejects.toThrow(/JSON array/);
  });
});

// ---------- queue ----------
describe("triage queue", () => {
  it("runs jobs, dedupes keys that are still active, and drains", async () => {
    const seen: string[] = [];
    const q = new TriageQueue(async (k) => (seen.push(k), "ok"), noSleepQueue);
    expect(q.enqueue("a")).toBe("queued");
    expect(q.enqueue("a")).toBe("duplicate");
    expect(q.enqueue("b")).toBe("queued");
    expect(await q.drain(1000)).toBe(true);
    expect(seen.sort()).toEqual(["a", "b"]);
    expect(q.stats()).toMatchObject({ done: 2, failed: 0, queued: 0 });
  });

  it("respects concurrency", async () => {
    let active = 0, peak = 0;
    const q = new TriageQueue(async () => {
      peak = Math.max(peak, ++active);
      await flush();
      active--;
      return "ok";
    }, { ...noSleepQueue, concurrency: 2 });
    for (const k of ["a", "b", "c", "d", "e"]) q.enqueue(k);
    await q.drain(1000);
    expect(peak).toBe(2);
  });

  it("retries retryable errors with exponential backoff, then dead-letters", async () => {
    const delays: number[] = [];
    let calls = 0;
    const q = new TriageQueue(async () => {
      calls++;
      throw new ServiceNowError("down", 503);
    }, { log: () => {}, maxAttempts: 3, baseDelayMs: 100, isRetryable: (e) => e instanceof ServiceNowError && e.retryable, sleep: async (ms) => void delays.push(ms) });
    q.enqueue("a");
    await q.drain(1000);
    expect(calls).toBe(3);
    expect(delays).toEqual([100, 200]);
    expect(q.deadLetters()).toMatchObject([{ key: "a", status: "failed", attempts: 3, lastError: "down" }]);
  });

  it("does not retry permanent errors", async () => {
    let calls = 0;
    const q = new TriageQueue(async () => {
      calls++;
      throw new ServiceNowError("not found", 404);
    }, { ...noSleepQueue, isRetryable: (e) => e instanceof ServiceNowError && e.retryable });
    q.enqueue("a");
    await q.drain(1000);
    expect(calls).toBe(1);
  });

  it("succeeds on a later attempt", async () => {
    let calls = 0;
    const q = new TriageQueue(async () => {
      if (++calls < 2) throw new ServiceNowError("blip", 429);
      return "ok";
    }, { ...noSleepQueue, isRetryable: (e) => e instanceof ServiceNowError && e.retryable });
    q.enqueue("a");
    await q.drain(1000);
    expect(q.snapshot()[0]).toMatchObject({ status: "done", attempts: 2, outcome: "ok" });
  });

  it("is bounded and refuses work after close", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const q = new TriageQueue(async () => (await gate, "ok"), { ...noSleepQueue, concurrency: 1, maxQueued: 2 });
    expect(q.enqueue("a")).toBe("queued");
    expect(q.enqueue("b")).toBe("queued");
    expect(q.enqueue("c")).toBe("full");
    q.close();
    expect(q.enqueue("d")).toBe("closed");
    release();
    expect(await q.drain(1000)).toBe(true);
  });

  it("reports a drain timeout", async () => {
    const q = new TriageQueue(() => new Promise<string>(() => {}), noSleepQueue);
    q.enqueue("stuck");
    expect(await q.drain(20)).toBe(false);
  });
});

// ---------- webhook signature ----------
describe("webhook signature", () => {
  const now = 1_794_000_000_000;
  const ts = String(now / 1000);
  const body = Buffer.from(JSON.stringify({ sys_id: SYS_A }));
  const base = { secret: SECRET, timestamp: ts, rawBody: body, nowMs: now };

  it("accepts hex and base64 (ServiceNow) encodings", () => {
    expect(verifyWebhook({ ...base, signature: signatureHeader(SECRET, ts, body) })).toEqual({ ok: true });
    expect(verifyWebhook({ ...base, signature: `sha256=${computeSignature(SECRET, ts, body).toString("base64")}` })).toEqual({ ok: true });
  });

  it("rejects a tampered body, wrong secret, and malformed or missing headers", () => {
    const sig = signatureHeader(SECRET, ts, body);
    expect(verifyWebhook({ ...base, signature: sig, rawBody: Buffer.from(JSON.stringify({ sys_id: SYS_B })) })).toMatchObject({ ok: false, reason: "Signature mismatch." });
    expect(verifyWebhook({ ...base, signature: signatureHeader("x".repeat(40), ts, body) }).ok).toBe(false);
    expect(verifyWebhook({ ...base, signature: "sha256=zz" })).toMatchObject({ reason: "Malformed signature." });
    expect(verifyWebhook({ ...base, signature: undefined }).ok).toBe(false);
    expect(verifyWebhook({ ...base, signature: sig, rawBody: undefined }).ok).toBe(false);
    expect(verifyWebhook({ ...base, signature: sig, timestamp: "yesterday" }).ok).toBe(false);
  });

  it("rejects replays outside the time window, even with a valid signature", () => {
    const old = String(now / 1000 - 301);
    expect(verifyWebhook({ ...base, timestamp: old, signature: signatureHeader(SECRET, old, body) })).toMatchObject({ reason: "Timestamp outside the allowed window." });
  });
});

// ---------- ingestor ----------
describe("ServiceNow ingestor", () => {
  it("triages a new incident, writes one marked work note, and records it", async () => {
    const { client, notes } = fakeServiceNow([incident(SYS_A, 1)]);
    const store = new MemoryStore();
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store, log: () => {}, queue: noSleepQueue });
    expect(await ing.handle(SYS_A)).toBe("written");
    expect(notes).toHaveLength(1);
    expect(notes[0]!.note.startsWith(WORK_NOTE_MARKER)).toBe(true);
    expect(notes[0]!.note).toContain("SECURITY INCIDENT");
    expect((await store.recent(1))[0]).toMatchObject({ key: ingestKey(SYS_A), ref: "INC001", priority: "P1", securityFlag: true });
    expect(await ing.handle(SYS_A)).toBe("already-processed");
    expect(notes).toHaveLength(1);
  });

  it("does not annotate twice after a restart with an empty store (journal check)", async () => {
    const { client, notes } = fakeServiceNow([incident(SYS_A, 4)], { journal: "has-note" });
    const store = new MemoryStore();
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store, log: () => {} });
    expect(await ing.handle(SYS_A)).toBe("already-annotated");
    expect(notes).toHaveLength(0);
    expect(await store.has(ingestKey(SYS_A))).toBe(true);
  });

  it("falls back to the local store when the journal is not readable", async () => {
    const { client, notes } = fakeServiceNow([incident(SYS_A, 4)], { journal: "forbidden" });
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store: new MemoryStore(), log: () => {} });
    expect(await ing.handle(SYS_A)).toBe("written");
    expect(notes).toHaveLength(1);
  });

  it("skips incidents that are no longer new", async () => {
    const { client, notes } = fakeServiceNow([incident(SYS_A, 4, "2")]);
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store: new MemoryStore(), log: () => {} });
    expect(await ing.handle(SYS_A)).toBe("not-new");
    expect(notes).toHaveLength(0);
  });

  it("dry run triages but writes and records nothing", async () => {
    const { client, notes } = fakeServiceNow([incident(SYS_A, 4)]);
    const store = new MemoryStore();
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store, dryRun: true, log: () => {} });
    expect(await ing.handle(SYS_A)).toBe("dry-run");
    expect(notes).toHaveLength(0);
    expect(await store.has(ingestKey(SYS_A))).toBe(false);
  });

  it("polls, queues only unprocessed incidents, and retries a ServiceNow outage", async () => {
    // GET #1 is the list, GET #2 (first incident fetch) fails with 503 and is retried.
    const { client, notes } = fakeServiceNow([incident(SYS_A, 1), incident(SYS_B, 4), incident("c".repeat(32), 6, "2")], { failGets: [2] });
    const store = new MemoryStore();
    await store.put(record(ingestKey("d".repeat(32))));
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store, log: () => {}, queue: { ...noSleepQueue, concurrency: 1 } });
    expect(await ing.pollOnce()).toEqual({ found: 2, queued: 2 });
    expect(await ing.stop(1000)).toBe(true);
    expect(notes.map((n) => n.sysId).sort()).toEqual([SYS_A, SYS_B]);
    const status = await ing.status();
    expect(status.deadLetters).toEqual([]);
    expect(status.jobs.find((j) => j.key === ingestKey(SYS_A))?.attempts).toBe(2);
  });

  it("dead-letters a permanent work-note failure without recording the incident", async () => {
    const { client } = fakeServiceNow([incident(SYS_A, 4)], { patchStatus: 403 });
    const store = new MemoryStore();
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store, log: () => {}, queue: noSleepQueue });
    ing.submit(SYS_A);
    await ing.stop(1000);
    expect((await ing.status()).deadLetters).toMatchObject([{ key: ingestKey(SYS_A), attempts: 1 }]);
    expect(await store.has(ingestKey(SYS_A))).toBe(false);
  });

  it("records a poll failure instead of throwing", async () => {
    const { client } = fakeServiceNow([], { failGets: [1] });
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store: new MemoryStore(), log: () => {} });
    expect(await ing.pollOnce()).toEqual({ found: 0, queued: 0 });
    expect((await ing.status()).lastPoll?.error).toMatch(/HTTP 503/);
  });

  it("rejects malformed sys_ids before they reach a URL", () => {
    const { client } = fakeServiceNow([]);
    const ing = new ServiceNowIngestor({ sn: client, pipeline: rulesPipeline(), store: new MemoryStore(), log: () => {} });
    expect(ing.submit("../../sys_user")).toBe("invalid");
  });
});

// ---------- HTTP routes ----------
describe("ingest HTTP routes", () => {
  let server: Server | undefined;
  afterEach(() => server?.close());

  async function start(incidents: FakeIncident[]) {
    const fake = fakeServiceNow(incidents);
    const ingestor = new ServiceNowIngestor({ sn: fake.client, pipeline: rulesPipeline(), store: new MemoryStore(), log: () => {}, queue: noSleepQueue });
    server = createApp({
      agent: null,
      allowedOrigins: [],
      rateLimiter: new RateLimiter(100, 60_000),
      budget: new DailyBudget(10),
      cache: new TtlCache<TriageResult>(10, 60_000),
      semaphore: new Semaphore(1),
      serviceNow: fake.client,
      adminToken: "t".repeat(32),
      ingest: { ingestor, webhookSecret: SECRET },
      log: () => {},
    }).listen(0);
    await new Promise((r) => server!.once("listening", r));
    return { url: `http://127.0.0.1:${(server!.address() as AddressInfo).port}`, ingestor, notes: fake.notes };
  }

  const deliver = (url: string, payload: unknown, opts: { secret?: string; ts?: number; raw?: string } = {}) => {
    const raw = opts.raw ?? JSON.stringify(payload);
    const ts = String(opts.ts ?? Math.floor(Date.now() / 1000));
    return fetch(`${url}/api/ingest/servicenow`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-SentinelDesk-Timestamp": ts, "X-SentinelDesk-Signature": signatureHeader(opts.secret ?? SECRET, ts, raw) },
      body: raw,
    });
  };

  it("accepts a signed delivery, triages it, and writes the work note", async () => {
    const { url, ingestor, notes } = await start([incident(SYS_A, 2)]);
    const res = await deliver(url, { sys_id: SYS_A, number: "INC002" });
    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({ status: "queued", key: ingestKey(SYS_A) });
    await ingestor.queue.drain(2000);
    expect(notes).toHaveLength(1);
  });

  it("verifies the exact bytes received (whitespace in the JSON is preserved)", async () => {
    const { url } = await start([incident(SYS_A, 2)]);
    const res = await deliver(url, null, { raw: `{ "sys_id" :  "${SYS_A}" }` });
    expect(res.status).toBe(202);
  });

  it("rejects bad signatures and stale timestamps with 401", async () => {
    const { url, notes } = await start([incident(SYS_A, 2)]);
    expect((await deliver(url, { sys_id: SYS_A }, { secret: "w".repeat(40) })).status).toBe(401);
    expect((await deliver(url, { sys_id: SYS_A }, { ts: Math.floor(Date.now() / 1000) - 3600 })).status).toBe(401);
    const unsigned = await fetch(`${url}/api/ingest/servicenow`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sys_id: SYS_A }) });
    expect(unsigned.status).toBe(401);
    expect(notes).toHaveLength(0);
  });

  it("rejects a signed body without a valid sys_id", async () => {
    const { url } = await start([]);
    expect((await deliver(url, { sys_id: "../etc" })).status).toBe(400);
    expect((await deliver(url, { number: "INC1" })).status).toBe(400);
  });

  it("treats a redelivered webhook as a duplicate and never writes a second note", async () => {
    const { url, ingestor, notes } = await start([incident(SYS_A, 2)]);
    // Whether a redelivery lands while the first job is active ("duplicate") or after it ("queued",
    // then short-circuited by the store) depends on timing. The invariant is one note either way.
    const responses = await Promise.all([1, 2, 3].map(() => deliver(url, { sys_id: SYS_A })));
    for (const r of responses) {
      expect(r.status).toBe(202);
      expect(["queued", "duplicate"]).toContain((await r.json()).status);
    }
    await ingestor.queue.drain(2000);
    await deliver(url, { sys_id: SYS_A }); // a late redelivery after completion
    await ingestor.queue.drain(2000);
    expect(notes).toHaveLength(1);
    const outcomes = ingestor.queue.snapshot().map((j) => j.outcome);
    expect(outcomes.filter((o) => o === "written")).toHaveLength(1);
    expect(outcomes.at(0)).toBe("already-processed");
  });

  it("answers 503 with Retry-After once the queue is closed for shutdown", async () => {
    const { url, ingestor } = await start([incident(SYS_A, 2)]);
    ingestor.queue.close();
    const res = await deliver(url, { sys_id: SYS_A });
    expect(res.status).toBe(503);
    expect(res.headers.get("retry-after")).toBe("30");
  });

  it("exposes queue and processed status to admins only", async () => {
    const { url, ingestor } = await start([incident(SYS_A, 2)]);
    await deliver(url, { sys_id: SYS_A });
    await ingestor.queue.drain(2000);
    expect((await fetch(`${url}/api/ingest/status`)).status).toBe(401);
    const res = await fetch(`${url}/api/ingest/status`, { headers: { Authorization: `Bearer ${"t".repeat(32)}` } });
    const body = await res.json();
    expect(body.queue).toMatchObject({ done: 1, failed: 0 });
    expect(body.processed[0]).toMatchObject({ key: ingestKey(SYS_A), ref: "INC002" });
  });

  it("is disabled when ingestion is not configured", async () => {
    const fake = fakeServiceNow([]);
    server = createApp({
      agent: null, allowedOrigins: [], rateLimiter: new RateLimiter(1, 1), budget: new DailyBudget(1), cache: new TtlCache<TriageResult>(1, 1),
      semaphore: new Semaphore(1), serviceNow: fake.client, adminToken: null, log: () => {},
    }).listen(0);
    await new Promise((r) => server!.once("listening", r));
    const url = `http://127.0.0.1:${(server!.address() as AddressInfo).port}`;
    expect((await deliver(url, { sys_id: SYS_A })).status).toBe(404);
  });
});

// ---------- config ----------
describe("ingest config", () => {
  const sn = { SN_INSTANCE_URL: "https://dev1.service-now.com", SN_USERNAME: "u", SN_PASSWORD: "p" };
  it("parses webhook and polling settings", () => {
    expect(loadConfig({ ...sn, SN_WEBHOOK_SECRET: SECRET, SN_POLL_INTERVAL_SEC: "60" })).toMatchObject({ webhookSecret: SECRET, pollIntervalMs: 60_000, storePath: ".sentineldesk-store.json" });
  });
  it("rejects unsafe or incomplete settings", () => {
    expect(() => loadConfig({ ...sn, SN_WEBHOOK_SECRET: "short" })).toThrow(/32/);
    expect(() => loadConfig({ ...sn, SN_POLL_INTERVAL_SEC: "5" })).toThrow(/30/);
    expect(() => loadConfig({ SN_WEBHOOK_SECRET: SECRET })).toThrow(/SN_INSTANCE_URL/);
  });
});
