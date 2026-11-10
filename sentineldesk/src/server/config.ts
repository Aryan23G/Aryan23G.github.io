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
  const effort = (env.CLAUDE_EFFORT || "low") as Effort;
  if (!EFFORTS.includes(effort)) throw new Error(`CLAUDE_EFFORT must be one of ${EFFORTS.join(", ")}.`);
  const sn = env.SN_INSTANCE_URL && env.SN_USERNAME && env.SN_PASSWORD
    ? { instanceUrl: env.SN_INSTANCE_URL, username: env.SN_USERNAME, password: env.SN_PASSWORD }
    : null;
  const adminToken = env.ADMIN_TOKEN?.trim() || null;
  if (adminToken && adminToken.length < 24) throw new Error("ADMIN_TOKEN must be at least 24 characters.");
  return {
    port: int(env, "PORT", 8787, 1),
    anthropicApiKey: env.ANTHROPIC_API_KEY?.trim() || null,
    model: env.CLAUDE_MODEL?.trim() || "claude-opus-5-5",
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
  };
}
