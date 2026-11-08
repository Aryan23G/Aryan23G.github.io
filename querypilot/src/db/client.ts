/**
 * Main-thread handle to the database worker, with per-query timeouts.
 * On timeout the worker is terminated and a fresh one is started (the DB is
 * deterministic, so the restart is invisible apart from ~200ms of seeding).
 */
import type { ExecOutcome } from "./engine.ts";
import type { QueryExecutor } from "../agent.ts";
import type { SeedStats } from "./seed.ts";
import type { PiiValues } from "../pii.ts";
import type { WorkerRequest } from "./worker.ts";

type Distribute<T> = T extends unknown ? Omit<T, "id"> : never;
type Pending = { resolve: (v: unknown) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> };

export class DbClient implements QueryExecutor {
  private worker!: Worker;
  private nextId = 1;
  private pending = new Map<number, Pending>();
  rowCounts: Record<string, number> = {};
  stats?: SeedStats;
  pii: PiiValues = { name: [], email: [] };

  constructor(private workerUrl: string, private timeoutMs = 4000) {
    this.spawn();
  }

  private spawn() {
    this.worker = new Worker(this.workerUrl);
    this.worker.onmessage = (ev: MessageEvent<{ id: number; result?: unknown; error?: string }>) => {
      const p = this.pending.get(ev.data.id);
      if (!p) return;
      clearTimeout(p.timer);
      this.pending.delete(ev.data.id);
      if (ev.data.error) p.reject(new Error(ev.data.error));
      else p.resolve(ev.data.result);
    };
  }

  private call<T>(req: Distribute<WorkerRequest>, timeoutMs = this.timeoutMs): Promise<T> {
    const id = this.nextId++;
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        // Kill the runaway query and restart; fail everything still in flight.
        this.worker.terminate();
        for (const [, p] of this.pending) { clearTimeout(p.timer); p.reject(new Error("worker restarted")); }
        this.pending.clear();
        this.spawn();
        reject(new TimeoutError(timeoutMs));
      }, timeoutMs);
      this.pending.set(id, { resolve: resolve as (v: unknown) => void, reject, timer });
      this.worker.postMessage({ ...req, id });
    });
  }

  async init(): Promise<void> {
    const r = await this.call<{ rowCounts: Record<string, number>; stats: SeedStats; pii: PiiValues }>({ type: "init" }, 30000);
    this.rowCounts = r.rowCounts;
    this.stats = r.stats;
    this.pii = r.pii;
  }

  async execute(sql: string): Promise<ExecOutcome> {
    try {
      return await this.call<ExecOutcome>({ type: "execute", sql });
    } catch (e) {
      return timeoutOutcome(e);
    }
  }

  async sampleValues(table: string, column: string): Promise<ExecOutcome> {
    try {
      return await this.call<ExecOutcome>({ type: "sample", table, column });
    } catch (e) {
      return timeoutOutcome(e);
    }
  }
}

class TimeoutError extends Error {
  constructor(public ms: number) { super(`Query exceeded the ${ms / 1000}s time limit and was killed.`); }
}

function timeoutOutcome(e: unknown): ExecOutcome {
  const message = (e as Error).message;
  return { ok: false, stage: "timeout", error: message, checks: [{ name: "time limit", passed: false, detail: message }] };
}
