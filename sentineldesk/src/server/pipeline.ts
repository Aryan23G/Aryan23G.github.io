// The single entry point for triaging a ticket on the server. The public HTTP route, the
// ServiceNow admin route, the webhook queue and the poller all go through this class, so the
// cost controls and the rules fallback apply to every channel the same way.
//
// Order: cache -> daily budget -> concurrency -> Claude agent -> (any failure) rules engine.

import { createHash } from "node:crypto";
import { triageWithRules } from "../core/rules.ts";
import type { Ticket, TriageResult } from "../core/types.ts";
import type { AgentEvent } from "./agent.ts";
import type { DailyBudget, Semaphore, TtlCache } from "./limits.ts";

export interface AgentRunner {
  model: string;
  run(ticket: Ticket, onEvent: (e: AgentEvent) => void, signal: AbortSignal): Promise<TriageResult>;
}

export type PipelineResult = TriageResult & { cached?: boolean; fallbackReason?: string };
export type Emit = (event: string, data: unknown) => void;
export type Log = (entry: Record<string, unknown>) => void;

export interface PipelineDeps {
  /** null when no API key is configured: everything runs on the rules engine. */
  agent: AgentRunner | null;
  budget: DailyBudget;
  cache: TtlCache<TriageResult>;
  semaphore: Semaphore;
  log?: Log;
}

export const cacheKey = (t: Pick<Ticket, "requester" | "subject" | "body">): string =>
  createHash("sha256").update(JSON.stringify([t.requester.toLowerCase(), t.subject, t.body])).digest("hex");

const noop: Emit = () => {};

export class TriagePipeline {
  private readonly log: Log;

  constructor(private readonly deps: PipelineDeps) {
    this.log = deps.log ?? ((e) => console.log(JSON.stringify(e)));
  }

  get model(): string {
    return this.deps.agent?.model ?? "offline-rules";
  }

  get liveAvailable(): boolean {
    return this.deps.agent !== null && this.deps.budget.remaining() > 0;
  }

  get dailyRemaining(): number {
    return this.deps.agent ? this.deps.budget.remaining() : 0;
  }

  isCached(ticket: Pick<Ticket, "requester" | "subject" | "body">): boolean {
    return this.deps.cache.get(cacheKey(ticket)) !== undefined;
  }

  /**
   * Never rejects for a valid ticket: every Claude failure degrades to the rules engine.
   * The only rejection is cancellation through `signal` (the caller went away).
   */
  async run(ticket: Ticket, emit: Emit = noop, signal: AbortSignal = new AbortController().signal): Promise<PipelineResult> {
    const started = Date.now();
    const key = cacheKey(ticket);
    const cached = this.deps.cache.get(key);
    if (cached) {
      emit("meta", { mode: cached.mode, model: cached.model, cached: true });
      for (const call of cached.toolCalls) emit("tool", { call });
      return { ...cached, cached: true };
    }

    const rules = (reason: string): PipelineResult => {
      emit("meta", { mode: "rules", model: "offline-rules", reason });
      const r = triageWithRules(ticket);
      for (const call of r.toolCalls) emit("tool", { call });
      return { ...r, fallbackReason: reason };
    };

    const { agent, budget, semaphore, cache } = this.deps;
    if (!agent) return rules("The live AI is not configured on this server.");
    if (!budget.tryConsume()) return rules("Today's live-AI budget is used up. It resets at midnight UTC.");
    if (!semaphore.tryAcquire()) {
      budget.refund();
      return rules("The live AI is busy right now.");
    }
    try {
      emit("meta", { mode: "claude", model: agent.model });
      const result = await agent.run(ticket, (e) => emit(e.type, e), signal);
      cache.set(key, result);
      this.log({
        evt: "triage",
        ticket: ticket.id,
        mode: result.mode,
        model: result.model,
        ms: Date.now() - started,
        steps: result.usage?.steps,
        inTok: result.usage?.inputTokens,
        outTok: result.usage?.outputTokens,
        overrides: result.overrides.length,
        security: result.securityFlag,
      });
      return result;
    } catch (err) {
      if (signal.aborted) throw err;
      // No refund: a failure mid-loop has already spent tokens, and refunding would let anyone who can
      // trigger errors bypass the daily cap.
      // Never leak provider error details to callers; log the class name and a short message.
      this.log({ evt: "agent_error", ticket: ticket.id, error: err instanceof Error ? err.constructor.name : "unknown", message: err instanceof Error ? err.message.slice(0, 200) : "" });
      return rules("The live AI could not be reached.");
    } finally {
      semaphore.release();
    }
  }
}
