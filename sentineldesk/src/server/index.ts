import Anthropic from "@anthropic-ai/sdk";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runAgent } from "./agent.ts";
import { createApp } from "./app.ts";
import { loadConfig } from "./config.ts";
import { DailyBudget, RateLimiter, Semaphore, TtlCache } from "./limits.ts";
import { TriagePipeline, type AgentRunner } from "./pipeline.ts";
import { ServiceNowClient } from "./servicenow.ts";
import { ServiceNowIngestor } from "./ingest/servicenow.ts";
import { FileStore } from "./ingest/store.ts";
import type { TriageResult } from "../core/types.ts";

const config = loadConfig();
const log = (e: Record<string, unknown>) => console.log(JSON.stringify(e));

let agent: AgentRunner | null = null;
if (config.anthropicApiKey) {
  const client = new Anthropic({ apiKey: config.anthropicApiKey, timeout: 60_000, maxRetries: 2 });
  agent = {
    model: config.model,
    run: (ticket, onEvent, signal) => runAgent(ticket, { client, model: config.model, effort: config.effort, onEvent, signal }),
  };
}

// One set of limits shared by every channel (web, admin route, webhook queue, poller).
const budget = new DailyBudget(config.dailyClaudeLimit);
const cache = new TtlCache<TriageResult>(500, config.cacheTtlMs);
const semaphore = new Semaphore(config.maxConcurrent);
const serviceNow = config.serviceNow ? new ServiceNowClient(config.serviceNow) : null;

let ingestor: ServiceNowIngestor | null = null;
if (serviceNow && (config.webhookSecret || config.pollIntervalMs > 0)) {
  const pipeline = new TriagePipeline({ agent, budget, cache, semaphore, log });
  ingestor = new ServiceNowIngestor({ sn: serviceNow, pipeline, store: new FileStore(config.storePath), log });
  if (config.pollIntervalMs > 0) ingestor.start(config.pollIntervalMs);
}

// Serve the demo page too, so `npm run dev` is a complete local app at http://localhost:8787.
// Bundled to dist-server/server.js, so the project root is one level up either way.
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", here.endsWith(path.join("src", "server")) ? ".." : "");

const app = createApp({
  agent,
  allowedOrigins: [...config.allowedOrigins, `http://localhost:${config.port}`, `http://127.0.0.1:${config.port}`],
  rateLimiter: new RateLimiter(config.ratePerHour, 3_600_000),
  budget,
  cache,
  semaphore,
  serviceNow,
  adminToken: config.adminToken,
  ingest: ingestor ? { ingestor, webhookSecret: config.webhookSecret } : null,
  staticDir: root,
  log,
});

const server = app.listen(config.port, () => {
  log({
    evt: "listening",
    port: config.port,
    mode: agent ? "claude" : "rules-only (set ANTHROPIC_API_KEY to enable Claude)",
    model: agent?.model,
    effort: config.effort,
    dailyClaudeLimit: config.dailyClaudeLimit,
    serviceNow: Boolean(serviceNow),
    webhook: Boolean(ingestor && config.webhookSecret),
    pollSec: config.pollIntervalMs / 1000,
  });
});

// Hosts send SIGTERM on deploys: stop intake, let accepted incidents finish, then exit.
let shuttingDown = false;
async function shutdown(signal: string) {
  if (shuttingDown) return;
  shuttingDown = true;
  log({ evt: "shutdown", signal });
  server.close();
  const drained = ingestor ? await ingestor.stop(20_000) : true;
  log({ evt: "shutdown_complete", drained });
  process.exit(0);
}
process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));
