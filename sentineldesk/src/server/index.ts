import Anthropic from "@anthropic-ai/sdk";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runAgent } from "./agent.ts";
import { createApp, type AgentRunner } from "./app.ts";
import { loadConfig } from "./config.ts";
import { DailyBudget, RateLimiter, Semaphore, TtlCache } from "./limits.ts";
import { ServiceNowClient } from "./servicenow.ts";
import type { TriageResult } from "../core/types.ts";

const config = loadConfig();

let agent: AgentRunner | null = null;
if (config.anthropicApiKey) {
  const client = new Anthropic({ apiKey: config.anthropicApiKey, timeout: 60_000, maxRetries: 2 });
  agent = {
    model: config.model,
    run: (ticket, onEvent, signal) => runAgent(ticket, { client, model: config.model, effort: config.effort, onEvent, signal }),
  };
}

// Serve the demo page too, so `npm run dev` is a complete local app at http://localhost:8787.
// Bundled to dist-server/server.js, so the project root is one level up either way.
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", here.endsWith(path.join("src", "server")) ? ".." : "");

const app = createApp({
  agent,
  allowedOrigins: [...config.allowedOrigins, `http://localhost:${config.port}`, `http://127.0.0.1:${config.port}`],
  rateLimiter: new RateLimiter(config.ratePerHour, 3_600_000),
  budget: new DailyBudget(config.dailyClaudeLimit),
  cache: new TtlCache<TriageResult>(500, config.cacheTtlMs),
  semaphore: new Semaphore(config.maxConcurrent),
  serviceNow: config.serviceNow ? new ServiceNowClient(config.serviceNow) : null,
  adminToken: config.adminToken,
  staticDir: root,
});

app.listen(config.port, () => {
  console.log(
    JSON.stringify({
      evt: "listening",
      port: config.port,
      mode: agent ? "claude" : "rules-only (set ANTHROPIC_API_KEY to enable Claude)",
      model: agent?.model,
      effort: config.effort,
      dailyClaudeLimit: config.dailyClaudeLimit,
      serviceNow: Boolean(config.serviceNow),
    }),
  );
});
