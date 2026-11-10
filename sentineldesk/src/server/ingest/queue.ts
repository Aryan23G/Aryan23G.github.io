// In-process work queue for ingested tickets.
// - Dedupes: a key that is queued, running or waiting to retry is not enqueued again.
// - Bounded: refuses new work when full, so a webhook storm cannot exhaust memory.
// - Retries temporary failures with exponential backoff, then dead-letters the job.
// A single small instance does not need an external broker; the interface (enqueue/stats/drain)
// is what a Redis- or SQS-backed version would keep.

export type JobStatus = "queued" | "running" | "retrying" | "done" | "failed";

export interface JobSnapshot {
  key: string;
  status: JobStatus;
  attempts: number;
  enqueuedAt: string;
  finishedAt?: string;
  outcome?: string;
  lastError?: string;
}

export interface QueueOptions {
  concurrency?: number;
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  maxQueued?: number;
  /** How many finished jobs to keep for the status endpoint. */
  history?: number;
  isRetryable?: (err: unknown) => boolean;
  sleep?: (ms: number) => Promise<void>;
  now?: () => number;
  log?: (entry: Record<string, unknown>) => void;
}

export type EnqueueResult = "queued" | "duplicate" | "full" | "closed";

const defaultSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export class TriageQueue {
  private readonly waiting: string[] = [];
  private readonly jobs = new Map<string, JobSnapshot>();
  private readonly finished: JobSnapshot[] = [];
  private running = 0;
  private closed = false;
  private idleWaiters: Array<() => void> = [];
  private readonly o: Required<QueueOptions>;

  constructor(
    private readonly handler: (key: string) => Promise<string>,
    opts: QueueOptions = {},
  ) {
    this.o = {
      concurrency: opts.concurrency ?? 2,
      maxAttempts: opts.maxAttempts ?? 4,
      baseDelayMs: opts.baseDelayMs ?? 2000,
      maxDelayMs: opts.maxDelayMs ?? 60_000,
      maxQueued: opts.maxQueued ?? 500,
      history: opts.history ?? 50,
      isRetryable: opts.isRetryable ?? (() => false),
      sleep: opts.sleep ?? defaultSleep,
      now: opts.now ?? Date.now,
      log: opts.log ?? ((e) => console.log(JSON.stringify(e))),
    };
    if (this.o.concurrency < 1 || this.o.maxAttempts < 1) throw new Error("concurrency and maxAttempts must be >= 1.");
  }

  enqueue(key: string): EnqueueResult {
    if (this.closed) return "closed";
    if (this.jobs.has(key)) return "duplicate";
    if (this.jobs.size >= this.o.maxQueued) return "full";
    this.jobs.set(key, { key, status: "queued", attempts: 0, enqueuedAt: new Date(this.o.now()).toISOString() });
    this.waiting.push(key);
    this.pump();
    return "queued";
  }

  /** Stop accepting work; jobs already accepted still run. */
  close(): void {
    this.closed = true;
  }

  /** Resolves true once nothing is queued, running or retrying; false on timeout. */
  drain(timeoutMs = 30_000): Promise<boolean> {
    if (this.jobs.size === 0) return Promise.resolve(true);
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(false), timeoutMs);
      this.idleWaiters.push(() => {
        clearTimeout(timer);
        resolve(true);
      });
    });
  }

  stats() {
    const active = [...this.jobs.values()];
    return {
      queued: active.filter((j) => j.status === "queued").length,
      running: active.filter((j) => j.status === "running").length,
      retrying: active.filter((j) => j.status === "retrying").length,
      done: this.finished.filter((j) => j.status === "done").length,
      failed: this.finished.filter((j) => j.status === "failed").length,
      closed: this.closed,
    };
  }

  /** Active jobs first, then finished ones, newest first. */
  snapshot(): JobSnapshot[] {
    return [...this.jobs.values(), ...[...this.finished].reverse()].map((j) => ({ ...j }));
  }

  deadLetters(): JobSnapshot[] {
    return this.finished.filter((j) => j.status === "failed").map((j) => ({ ...j }));
  }

  private pump(): void {
    while (this.running < this.o.concurrency && this.waiting.length > 0) {
      const key = this.waiting.shift()!;
      this.running++;
      void this.execute(key).finally(() => {
        this.running--;
        this.pump();
        this.checkIdle();
      });
    }
  }

  private async execute(key: string): Promise<void> {
    const job = this.jobs.get(key)!;
    job.status = "running";
    job.attempts++;
    try {
      job.outcome = await this.handler(key);
      this.finish(job, "done");
    } catch (err) {
      job.lastError = err instanceof Error ? err.message.slice(0, 300) : String(err);
      const retry = job.attempts < this.o.maxAttempts && this.o.isRetryable(err);
      this.o.log({ evt: "ingest_job_error", key, attempt: job.attempts, retry, error: job.lastError });
      if (!retry) return this.finish(job, "failed");
      job.status = "retrying";
      const delay = Math.min(this.o.maxDelayMs, this.o.baseDelayMs * 2 ** (job.attempts - 1));
      // The key stays in `jobs` while waiting, so duplicates are still rejected.
      void this.o.sleep(delay).then(() => {
        job.status = "queued";
        this.waiting.push(key);
        this.pump();
      });
    }
  }

  private finish(job: JobSnapshot, status: "done" | "failed"): void {
    job.status = status;
    job.finishedAt = new Date(this.o.now()).toISOString();
    this.jobs.delete(job.key);
    this.finished.push(job);
    if (this.finished.length > this.o.history) this.finished.shift();
  }

  private checkIdle(): void {
    if (this.jobs.size > 0) return;
    const waiters = this.idleWaiters;
    this.idleWaiters = [];
    for (const w of waiters) w();
  }
}
