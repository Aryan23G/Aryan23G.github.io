import type { Effort } from "./agent.ts";

export interface Config {
  port: number;
  /** null when ANTHROPIC_API_KEY is not set: the service then runs rules-only. */
  anthropicApiKey: string | null;
  model: string;
  effort: Effort;
  allowedOrigins: string[];
  dailyClaudeLimit: number;
  ratePerHour: number;
  maxConcurrent: number;
  cacheTtlMs: number;
  adminToken: string | null;
  serviceNow: { instanceUrl: string; username: string; password: string } | null;
  /** HMAC secret for POST /api/ingest/servicenow; null disables the webhook. */
  webhookSecret: string | null;
  /** Poll ServiceNow for new incidents every N ms; 0 disables polling. */
  pollIntervalMs: number;
  /** JSON file recording processed incidents. */
  storePath: string;
}

const EFFORTS: Effort[] = ["low", "medium", "high", "xhigh", "max"];

function int(env: NodeJS.ProcessEnv, key: string, fallback: number, min = 0): number {
  const raw = env[key];
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < min) throw new Error(`${key} must be an integer >= ${min}, got "${raw}".`);
  return n;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const effort = (env.SENTINEL_EFFORT || "low") as Effort;
  if (!EFFORTS.includes(effort)) throw new Error(`SENTINEL_EFFORT must be one of ${EFFORTS.join(", ")}.`);
  const sn = env.SN_INSTANCE_URL && env.SN_USERNAME && env.SN_PASSWORD
    ? { instanceUrl: env.SN_INSTANCE_URL, username: env.SN_USERNAME, password: env.SN_PASSWORD }
    : null;
  const adminToken = env.ADMIN_TOKEN?.trim() || null;
  if (adminToken && adminToken.length < 24) throw new Error("ADMIN_TOKEN must be at least 24 characters.");
  const webhookSecret = env.SN_WEBHOOK_SECRET?.trim() || null;
  if (webhookSecret && webhookSecret.length < 32) throw new Error("SN_WEBHOOK_SECRET must be at least 32 characters.");
  const pollSec = int(env, "SN_POLL_INTERVAL_SEC", 0);
  if (pollSec > 0 && pollSec < 30) throw new Error("SN_POLL_INTERVAL_SEC must be 0 (off) or at least 30.");
  if ((webhookSecret || pollSec > 0) && !sn) throw new Error("SN_WEBHOOK_SECRET / SN_POLL_INTERVAL_SEC need SN_INSTANCE_URL, SN_USERNAME and SN_PASSWORD.");
  return {
    port: int(env, "PORT", 8787, 1),
    anthropicApiKey: env.ANTHROPIC_API_KEY?.trim() || null,
    model: env.SENTINEL_MODEL?.trim() || "claude-opus-5-5",
    effort,
    allowedOrigins: (env.ALLOWED_ORIGINS ?? "https://aryan23g.github.io")
      .split(",")
      .map((s) => s.trim().replace(/\/$/, ""))
      .filter(Boolean),
    dailyClaudeLimit: int(env, "DAILY_CLAUDE_LIMIT", 200),
    ratePerHour: int(env, "RATE_LIMIT_PER_HOUR", 20, 1),
    maxConcurrent: int(env, "MAX_CONCURRENT", 4, 1),
    cacheTtlMs: int(env, "CACHE_TTL_HOURS", 24) * 3_600_000,
    adminToken,
    serviceNow: sn,
    webhookSecret,
    pollIntervalMs: pollSec * 1000,
    storePath: env.SENTINEL_STORE_PATH?.trim() || ".sentineldesk-store.json",
  };
}
