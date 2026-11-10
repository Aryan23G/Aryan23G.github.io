import express, { type NextFunction, type Request, type Response } from "express";
import { createHash, timingSafeEqual } from "node:crypto";
import { triageWithRules } from "../core/rules.ts";
import type { Ticket, TriageResult } from "../core/types.ts";
import type { AgentEvent } from "./agent.ts";
import { DailyBudget, RateLimiter, Semaphore, TtlCache } from "./limits.ts";
import { formatWorkNote, incidentToTicket, isSysId, ServiceNowError, type ServiceNowClient } from "./servicenow.ts";

export interface AgentRunner {
  model: string;
  run(ticket: Ticket, onEvent: (e: AgentEvent) => void, signal: AbortSignal): Promise<TriageResult>;
}

export interface AppDeps {
  /** null when no API key is configured: everything runs on the rules engine. */
  agent: AgentRunner | null;
  allowedOrigins: string[];
  rateLimiter: RateLimiter;
  budget: DailyBudget;
  cache: TtlCache<TriageResult>;
  semaphore: Semaphore;
  serviceNow: ServiceNowClient | null;
  adminToken: string | null;
  /** Directory with the demo page to serve at "/", for local development. */
  staticDir?: string;
  log?: (entry: Record<string, unknown>) => void;
}

const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

export function validateTicketInput(body: unknown): { ok: true; ticket: Ticket } | { ok: false; error: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const requester = str(b.requester), subject = str(b.subject), text = str(b.body);
  if (!EMAIL.test(requester) || requester.length > 120) return { ok: false, error: "requester must be a valid email address (max 120 characters)." };
  if (!subject || subject.length > 160) return { ok: false, error: "subject is required (max 160 characters)." };
  if (text.length < 5 || text.length > 4000) return { ok: false, error: "body must be 5 to 4000 characters." };
  const id = typeof b.id === "string" && /^[A-Za-z0-9_-]{1,40}$/.test(b.id) ? b.id : `WEB-${Date.now().toString(36)}`;
  return { ok: true, ticket: { id, subject, body: text, requester, createdAt: new Date().toISOString() } };
}

const cacheKey = (t: Ticket): string =>
  createHash("sha256").update(JSON.stringify([t.requester.toLowerCase(), t.subject, t.body])).digest("hex");

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

type Emit = (event: string, data: unknown) => void;

export function createApp(deps: AppDeps): express.Express {
  const app = express();
  const log = deps.log ?? ((e) => console.log(JSON.stringify(e)));
  app.disable("x-powered-by");
  app.set("trust proxy", 1); // Render (and most hosts) put one proxy in front; req.ip is the client.
  app.use(express.json({ limit: "16kb" }));

  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    const origin = req.headers.origin;
    if (origin) {
      if (!deps.allowedOrigins.includes(origin)) {
        if (req.path.startsWith("/api/")) return void res.status(403).json({ error: "Origin not allowed." });
      } else {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Max-Age", "600");
      }
    }
    if (req.method === "OPTIONS") return void res.sendStatus(204);
    next();
  });

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      mode: deps.agent && deps.budget.remaining() > 0 ? "claude" : "rules",
      model: deps.agent?.model ?? "offline-rules",
      dailyRemaining: deps.agent ? deps.budget.remaining() : 0,
      serviceNow: Boolean(deps.serviceNow),
    });
  });

  /**
   * Core triage pipeline shared by the public endpoint and the ServiceNow route.
   * Order: cache -> budget -> concurrency -> Claude agent -> (any failure) rules engine.
   */
  async function triage(ticket: Ticket, emit: Emit, signal: AbortSignal): Promise<TriageResult & { cached?: boolean; fallbackReason?: string }> {
    const started = Date.now();
    const key = cacheKey(ticket);
    const cached = deps.cache.get(key);
    if (cached) {
      emit("meta", { mode: cached.mode, model: cached.model, cached: true });
      for (const call of cached.toolCalls) emit("tool", { call });
      return { ...cached, cached: true };
    }

    const rules = (reason: string) => {
      emit("meta", { mode: "rules", model: "offline-rules", reason });
      const r = triageWithRules(ticket);
      for (const call of r.toolCalls) emit("tool", { call });
      return { ...r, fallbackReason: reason };
    };

    if (!deps.agent) return rules("The live AI is not configured on this server.");
    if (!deps.budget.tryConsume()) return rules("Today's live-AI budget is used up. It resets at midnight UTC.");
    if (!deps.semaphore.tryAcquire()) {
      deps.budget.refund();
      return rules("The live AI is busy right now.");
    }
    try {
      emit("meta", { mode: "claude", model: deps.agent.model });
      const result = await deps.agent.run(ticket, (e) => emit(e.type, e), signal);
      deps.cache.set(key, result);
      log({ evt: "triage", mode: result.mode, model: result.model, ms: Date.now() - started, steps: result.usage?.steps, inTok: result.usage?.inputTokens, outTok: result.usage?.outputTokens, overrides: result.overrides.length, security: result.securityFlag });
      return result;
    } catch (err) {
      if (signal.aborted) throw err;
      // Never leak provider error details to the client; log the class name only.
      log({ evt: "agent_error", error: err instanceof Error ? err.constructor.name : "unknown", message: err instanceof Error ? err.message.slice(0, 200) : "" });
      return rules("The live AI could not be reached.");
    } finally {
      deps.semaphore.release();
    }
  }

  app.post("/api/triage", async (req: Request, res: Response) => {
    const limit = deps.rateLimiter.check(req.ip ?? "unknown");
    if (!limit.ok) {
      res.setHeader("Retry-After", String(limit.retryAfterSec));
      return void res.status(429).json({ error: `Too many requests. Try again in ${limit.retryAfterSec}s.` });
    }
    const parsed = validateTicketInput(req.body);
    if (!parsed.ok) return void res.status(400).json({ error: parsed.error });

    const controller = new AbortController();
    res.on("close", () => {
      if (!res.writableFinished) controller.abort();
    });

    const wantsStream = String(req.headers.accept ?? "").includes("text/event-stream");
    if (!wantsStream) {
      try {
        res.json({ result: await triage(parsed.ticket, () => {}, controller.signal) });
      } catch {
        if (!res.headersSent) res.status(499).end();
      }
      return;
    }

    // Server-sent events: each tool call is pushed to the page as it happens.
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" });
    const emit: Emit = (event, data) => {
      if (!res.writableEnded) res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };
    const heartbeat = setInterval(() => res.write(": ping\n\n"), 15_000);
    try {
      emit("result", await triage(parsed.ticket, emit, controller.signal));
    } catch {
      emit("error", { error: "Triage was cancelled." });
    } finally {
      clearInterval(heartbeat);
      res.end();
    }
  });

  // ---- ServiceNow (admin only: these routes read and write a real instance) ----
  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!deps.serviceNow) return void res.status(404).json({ error: "ServiceNow is not configured." });
    const header = req.headers.authorization ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!deps.adminToken || !token || !safeEqual(token, deps.adminToken)) return void res.status(401).json({ error: "Admin token required." });
    next();
  };

  const snError = (res: Response, err: unknown) => {
    if (err instanceof ServiceNowError) return void res.status(err.status === 400 ? 400 : 502).json({ error: err.message });
    log({ evt: "servicenow_error", error: err instanceof Error ? err.message.slice(0, 200) : "unknown" });
    res.status(502).json({ error: "ServiceNow request failed." });
  };

  app.get("/api/servicenow/incidents", requireAdmin, async (req, res) => {
    try {
      const limit = Number(req.query.limit ?? 10);
      res.json({ incidents: await deps.serviceNow!.listNewIncidents(Number.isFinite(limit) ? limit : 10) });
    } catch (err) {
      snError(res, err);
    }
  });

  app.post("/api/servicenow/incidents/:sysId/triage", requireAdmin, async (req, res) => {
    const sysId = String(req.params.sysId);
    if (!isSysId(sysId)) return void res.status(400).json({ error: "Invalid sys_id." });
    try {
      const incident = await deps.serviceNow!.getIncident(sysId);
      const controller = new AbortController();
      const result = await triage(incidentToTicket(incident), () => {}, controller.signal);
      const note = formatWorkNote(result);
      const write = req.query.dryRun !== "true";
      if (write) await deps.serviceNow!.addWorkNote(sysId, note);
      res.json({ incident: incident.number, workNoteWritten: write, note, result });
    } catch (err) {
      snError(res, err);
    }
  });

  if (deps.staticDir) {
    // Only the page and its bundle; never the project directory (source, node_modules, .env).
    const dir = deps.staticDir;
    app.get(["/", "/index.html"], (_req, res) => res.sendFile("index.html", { root: dir }));
    app.use("/dist", express.static(`${dir}/dist`, { dotfiles: "ignore", index: false }));
  }

  app.use((_req, res) => void res.status(404).json({ error: "Not found." }));
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const status = (err as { status?: number })?.status;
    if (status === 400 || status === 413) return void res.status(status).json({ error: status === 413 ? "Request too large." : "Malformed JSON." });
    log({ evt: "unhandled", error: err instanceof Error ? err.message.slice(0, 200) : "unknown" });
    res.status(500).json({ error: "Internal error." });
  });
  return app;
}
