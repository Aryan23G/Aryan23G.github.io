// Pull new incidents from ServiceNow, triage each one, and write the result back as a work note.
//
//   SN_INSTANCE_URL=https://dev12345.service-now.com SN_USERNAME=admin SN_PASSWORD=... \
//   ANTHROPIC_API_KEY=... npm run sn:sync -- --limit 5 [--dry-run]
//
// Same code path as the server's poller: ServiceNowIngestor -> queue -> pipeline -> work note.
// Without ANTHROPIC_API_KEY the rules engine is used. Processed incidents are recorded in
// SENTINEL_STORE_PATH (default .sentineldesk-store.json) and checked against ServiceNow's journal,
// so an incident is never annotated twice.

import Anthropic from "@anthropic-ai/sdk";
import { runAgent } from "../src/server/agent.ts";
import { loadConfig } from "../src/server/config.ts";
import { DailyBudget, Semaphore, TtlCache } from "../src/server/limits.ts";
import { TriagePipeline } from "../src/server/pipeline.ts";
import { ServiceNowClient } from "../src/server/servicenow.ts";
import { ServiceNowIngestor } from "../src/server/ingest/servicenow.ts";
import { FileStore } from "../src/server/ingest/store.ts";
import type { TriageResult } from "../src/core/types.ts";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const limitArg = args.indexOf("--limit");
const limit = limitArg >= 0 ? Number(args[limitArg + 1]) : 10;
if (!Number.isInteger(limit) || limit < 1) throw new Error("--limit must be a positive integer.");

const config = loadConfig();
if (!config.serviceNow) throw new Error("Set SN_INSTANCE_URL, SN_USERNAME and SN_PASSWORD.");
const client = config.anthropicApiKey ? new Anthropic({ apiKey: config.anthropicApiKey }) : null;
const pipeline = new TriagePipeline({
  agent: client ? { model: config.model, run: (t, onEvent, signal) => runAgent(t, { client, model: config.model, effort: config.effort, onEvent, signal }) } : null,
  budget: new DailyBudget(config.dailyClaudeLimit),
  cache: new TtlCache<TriageResult>(100, config.cacheTtlMs),
  // Sequential on purpose: a batch run should not compete with itself for the agent.
  semaphore: new Semaphore(1),
});
const ingestor = new ServiceNowIngestor({
  sn: new ServiceNowClient(config.serviceNow),
  pipeline,
  store: new FileStore(config.storePath),
  dryRun,
  queue: { concurrency: 1 },
});

const { found, queued } = await ingestor.pollOnce(limit);
console.log(`${found} new incident(s), ${queued} queued; engine: ${client ? config.model : "rules"}${dryRun ? " (dry run)" : ""}`);
await ingestor.stop(10 * 60_000);
const status = await ingestor.status(limit);
for (const job of status.jobs) console.log(`${job.key}  ${job.status}  ${job.outcome ?? job.lastError ?? ""}`);
if (status.deadLetters.length) process.exitCode = 1;
