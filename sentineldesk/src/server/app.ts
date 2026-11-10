import express, { type NextFunction, type Request, type Response } from "express";
import { timingSafeEqual } from "node:crypto";
import type { Ticket, TriageResult } from "../core/types.ts";
import { DailyBudget, RateLimiter, Semaphore, TtlCache } from "./limits.ts";
import { TriagePipeline, type AgentRunner, type Emit } from "./pipeline.ts";
import { formatWorkNote, incidentToTicket, isSysId, ServiceNowError, type ServiceNowClient } from "./servicenow.ts";
import type { ServiceNowIngestor } from "./ingest/servicenow.ts";
import { SIGNATURE_HEADER, TIMESTAMP_HEADER, verifyWebhook } from "./ingest/webhook.ts";

export type { AgentRunner } from "./pipeline.ts";

type RawRequest = Request & { rawBody?: Buffer };

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
  /** Webhook + poller ingestion; null/absent disables the /api/ingest routes. */
  ingest?: { ingestor: ServiceNowIngestor; webhookSecret: string | null } | null;
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

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function createApp(deps: AppDeps): express.Express {
  const app = express();
  const log = deps.log ?? ((e) => console.log(JSON.stringify(e)));
  const pipeline = new TriagePipeline({ agent: deps.agent, budget: deps.budget, cache: deps.cache, semaphore: deps.semaphore, log });
  const triage = (ticket: Ticket, emit: Emit, signal: AbortSignal) => pipeline.run(ticket, emit, signal);
  app.disable("x-powered-by");
  app.set("trust proxy", 1); // Render (and most hosts) put one proxy in front; req.ip is the client.
  // Keep the exact bytes: webhook signatures are computed over the raw body, not re-serialized JSON.
  app.use(express.json({ limit: "16kb", verify: (req, _res, buf) => void ((req as RawRequest).rawBody = Buffer.from(buf)) }));

  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    const origin = req.headers.origin;
    // Browsers send Origin on same-origin POSTs too, so the server's own origin is always allowed.
    const sameOrigin = origin === `${req.protocol}://${req.get("host")}`;
    if (origin && !sameOrigin) {
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
      mode: pipeline.liveAvailable ? "claude" : "rules",
      model: pipeline.model,
      dailyRemaining: pipeline.dailyRemaining,
      serviceNow: Boolean(deps.serviceNow),
      ingest: Boolean(deps.ingest),
    });
  });

  app.post("/api/triage", async (req: Request, res: Response) => {
    const parsed = validateTicketInput(req.body);
    if (!parsed.ok) return void res.status(400).json({ error: parsed.error });
    // Cached answers (e.g. the demo samples) are free, so only new work counts against the limit.
    if (!pipeline.isCached(parsed.ticket)) {
      const limit = deps.rateLimiter.check(req.ip ?? "unknown");
      if (!limit.ok) {
        res.setHeader("Retry-After", String(limit.retryAfterSec));
        return void res.status(429).json({ error: `Too many requests. Try again in ${limit.retryAfterSec}s.` });
      }
    }

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

  // ---- Ingestion: signed webhook from ServiceNow, and an admin status view ----
  app.post("/api/ingest/servicenow", (req: RawRequest, res: Response) => {
    const ingest = deps.ingest;
    if (!ingest?.webhookSecret) return void res.status(404).json({ error: "Webhook ingestion is not configured." });
    const check = verifyWebhook({
      secret: ingest.webhookSecret,
      signature: req.get(SIGNATURE_HEADER),
      timestamp: req.get(TIMESTAMP_HEADER),
      rawBody: req.rawBody,
    });
    if (!check.ok) {
      log({ evt: "webhook_rejected", reason: check.reason });
      return void res.status(401).json({ error: "Invalid webhook signature." });
    }
    const sysId = (req.body as { sys_id?: unknown } | undefined)?.sys_id;
    const outcome = typeof sysId === "string" ? ingest.ingestor.submit(sysId) : "invalid";
    if (outcome === "invalid") return void res.status(400).json({ error: "Body must be {\"sys_id\": \"<32 hex chars>\"}." });
    if (outcome === "full" || outcome === "closed") {
      res.setHeader("Retry-After", "30");
      return void res.status(503).json({ error: "Ingestion queue is unavailable, retry later.", status: outcome });
    }
    res.status(202).json({ status: outcome, key: `servicenow:${sysId as string}` });
  });

  app.get("/api/ingest/status", requireAdmin, async (_req, res) => {
    if (!deps.ingest) return void res.status(404).json({ error: "Ingestion is not configured." });
    res.json(await deps.ingest.ingestor.status());
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
