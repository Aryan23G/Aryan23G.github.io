// Records which external tickets have been triaged, so an incident is never annotated twice.
// The file store survives process restarts; on hosts with an ephemeral disk the ServiceNow
// journal check (ServiceNowClient.hasTriageNote) is the second line of idempotency.

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Priority } from "../../core/types.ts";

export interface ProcessedRecord {
  /** `<source>:<external id>`, e.g. `servicenow:0123...`. */
  key: string;
  /** Human reference, e.g. the incident number. */
  ref: string;
  at: string;
  mode: "claude" | "rules" | "pre-existing";
  priority: Priority | null;
  securityFlag: boolean | null;
  escalateTo: string | null;
}

export interface ProcessedStore {
  has(key: string): Promise<boolean>;
  put(record: ProcessedRecord): Promise<void>;
  /** Newest first. */
  recent(limit: number): Promise<ProcessedRecord[]>;
}

export class MemoryStore implements ProcessedStore {
  protected records = new Map<string, ProcessedRecord>();
  constructor(protected readonly maxEntries = 5000) {}

  async has(key: string): Promise<boolean> {
    return this.records.has(key);
  }

  async put(record: ProcessedRecord): Promise<void> {
    this.records.delete(record.key);
    this.records.set(record.key, record);
    while (this.records.size > this.maxEntries) this.records.delete(this.records.keys().next().value!);
  }

  async recent(limit: number): Promise<ProcessedRecord[]> {
    return [...this.records.values()].slice(-Math.max(0, limit)).reverse();
  }
}

/** JSON file, loaded once, written atomically (temp file + rename) and serially. */
export class FileStore extends MemoryStore {
  private loaded: Promise<void> | null = null;
  private writing: Promise<void> = Promise.resolve();

  constructor(
    private readonly file: string,
    maxEntries = 5000,
  ) {
    super(maxEntries);
  }

  private load(): Promise<void> {
    this.loaded ??= (async () => {
      let raw: string;
      try {
        raw = await readFile(this.file, "utf8");
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") return;
        throw err;
      }
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error(`${this.file} is not a JSON array of processed records.`);
      for (const r of parsed as ProcessedRecord[]) if (r && typeof r.key === "string") this.records.set(r.key, r);
    })();
    return this.loaded;
  }

  override async has(key: string): Promise<boolean> {
    await this.load();
    return super.has(key);
  }

  override async put(record: ProcessedRecord): Promise<void> {
    await this.load();
    await super.put(record);
    const snapshot = JSON.stringify([...this.records.values()], null, 1);
    // Chain writes so two puts never interleave; a failed write must not block later ones.
    this.writing = this.writing.catch(() => {}).then(async () => {
      await mkdir(path.dirname(path.resolve(this.file)), { recursive: true });
      const tmp = `${this.file}.${process.pid}.tmp`;
      await writeFile(tmp, snapshot, "utf8");
      await rename(tmp, this.file);
    });
    await this.writing;
  }

  override async recent(limit: number): Promise<ProcessedRecord[]> {
    await this.load();
    return super.recent(limit);
  }
}
