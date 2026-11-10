// ServiceNow ingestion: new incidents arrive by signed webhook (a Business Rule on insert) or by
// polling, go through the work queue, are triaged by the shared pipeline, and get exactly one
// SentinelDesk work note.
//
// Trust boundary: a webhook only says "look at sys_id X". The incident itself is always fetched
// from the Table API, so a forged or replayed body cannot inject ticket content.

import type { Log, TriagePipeline } from "../pipeline.ts";
import { formatWorkNote, incidentToTicket, isSysId, ServiceNowError, type ServiceNowClient } from "../servicenow.ts";
import type { ProcessedStore } from "./store.ts";
import { TriageQueue, type EnqueueResult, type QueueOptions } from "./queue.ts";

/** ServiceNow's incident state for "New". */
export const STATE_NEW = "1";
const PREFIX = "servicenow:";

export const ingestKey = (sysId: string) => `${PREFIX}${sysId}`;

export type IngestOutcome = "written" | "dry-run" | "already-processed" | "already-annotated" | "not-new";

export interface IngestorDeps {
  sn: ServiceNowClient;
  pipeline: TriagePipeline;
  store: ProcessedStore;
  /** Triage and log, but do not write work notes or record the incident. */
  dryRun?: boolean;
  queue?: QueueOptions;
  log?: Log;
}

export class ServiceNowIngestor {
  readonly queue: TriageQueue;
  private readonly log: Log;
  private timer: ReturnType<typeof setInterval> | null = null;
  private polling = false;
  private lastPoll: { at: string; found: number; queued: number; error?: string } | null = null;

  constructor(private readonly deps: IngestorDeps) {
    this.log = deps.log ?? ((e) => console.log(JSON.stringify(e)));
    this.queue = new TriageQueue((key) => this.handle(key.slice(PREFIX.length)), {
      isRetryable: (err) => err instanceof ServiceNowError && err.retryable,
      log: this.log,
      ...deps.queue,
    });
  }

  /** Queue one incident. Rejects malformed ids before they reach a URL. */
  submit(sysId: string): EnqueueResult | "invalid" {
    if (!isSysId(sysId)) return "invalid";
    return this.queue.enqueue(ingestKey(sysId));
  }

  /** Triage one incident end to end. Throws ServiceNowError (possibly retryable) on API failure. */
  async handle(sysId: string): Promise<IngestOutcome> {
    const { sn, pipeline, store, dryRun = false } = this.deps;
    const key = ingestKey(sysId);
    if (await store.has(key)) return "already-processed";

    const incident = await sn.getIncident(sysId);
    if (incident.state !== STATE_NEW) {
      this.log({ evt: "ingest_skip", incident: incident.number, reason: "not new", state: incident.state });
      return "not-new";
    }

    // Survives restarts and ephemeral disks: ask ServiceNow whether a previous run already wrote a note.
    if ((await sn.hasTriageNote(sysId)) === true) {
      if (!dryRun) await store.put({ key, ref: incident.number, at: new Date().toISOString(), mode: "pre-existing", priority: null, securityFlag: null, escalateTo: null });
      return "already-annotated";
    }

    const result = await pipeline.run(incidentToTicket(incident));
    const note = formatWorkNote(result);
    this.log({ evt: "ingest_triaged", incident: incident.number, mode: result.mode, priority: result.priority, security: result.securityFlag, overrides: result.overrides.length, dryRun });
    if (dryRun) return "dry-run";

    await sn.addWorkNote(sysId, note);
    await store.put({
      key,
      ref: incident.number,
      at: new Date().toISOString(),
      mode: result.mode,
      priority: result.priority,
      securityFlag: result.securityFlag,
      escalateTo: result.escalateTo,
    });
    return "written";
  }

  /** List new incidents and queue the ones not yet processed. Never throws; errors are logged. */
  async pollOnce(limit = 20): Promise<{ found: number; queued: number }> {
    if (this.polling) return { found: 0, queued: 0 };
    this.polling = true;
    const at = new Date().toISOString();
    try {
      const incidents = await this.deps.sn.listNewIncidents(limit);
      let queued = 0;
      for (const inc of incidents) {
        if (await this.deps.store.has(ingestKey(inc.sys_id))) continue;
        if (this.submit(inc.sys_id) === "queued") queued++;
      }
      this.lastPoll = { at, found: incidents.length, queued };
      if (queued) this.log({ evt: "ingest_poll", found: incidents.length, queued });
      return { found: incidents.length, queued };
    } catch (err) {
      const error = err instanceof Error ? err.message.slice(0, 200) : "unknown";
      this.lastPoll = { at, found: 0, queued: 0, error };
      this.log({ evt: "ingest_poll_error", error });
      return { found: 0, queued: 0 };
    } finally {
      this.polling = false;
    }
  }

  start(intervalMs: number): void {
    if (this.timer) return;
    void this.pollOnce();
    this.timer = setInterval(() => void this.pollOnce(), intervalMs);
    this.timer.unref?.();
  }

  /** Stop polling and new intake, then wait for accepted jobs to finish. */
  async stop(timeoutMs = 20_000): Promise<boolean> {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.queue.close();
    return this.queue.drain(timeoutMs);
  }

  async status(recent = 20) {
    return {
      polling: this.timer !== null,
      lastPoll: this.lastPoll,
      queue: this.queue.stats(),
      jobs: this.queue.snapshot().slice(0, recent),
      deadLetters: this.queue.deadLetters(),
      processed: await this.deps.store.recent(recent),
    };
  }
}
