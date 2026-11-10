// Cost and abuse controls for a public endpoint that spends the owner's API credit.
// In-memory on purpose: the service runs as a single small instance, and a restart only resets
// counters (the Anthropic Console spend limit is the hard backstop).

/** Sliding-window limiter: at most `max` hits per `windowMs` for each key (an IP address). */
export class RateLimiter {
  private hits = new Map<string, number[]>();
  constructor(
    private readonly max: number,
    private readonly windowMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  check(key: string): { ok: true } | { ok: false; retryAfterSec: number } {
    const t = this.now();
    const recent = (this.hits.get(key) ?? []).filter((h) => t - h < this.windowMs);
    if (recent.length >= this.max) {
      this.hits.set(key, recent);
      return { ok: false, retryAfterSec: Math.max(1, Math.ceil((recent[0]! + this.windowMs - t) / 1000)) };
    }
    recent.push(t);
    this.hits.set(key, recent);
    if (this.hits.size > 10_000) this.prune(t);
    return { ok: true };
  }

  private prune(t: number): void {
    for (const [k, v] of this.hits) if (v.every((h) => t - h >= this.windowMs)) this.hits.delete(k);
  }
}

/** Caps the number of Claude-backed triages per UTC day; after that the service runs rules-only. */
export class DailyBudget {
  private day = "";
  private used = 0;
  constructor(
    private readonly limit: number,
    private readonly now: () => number = Date.now,
  ) {}

  private roll(): void {
    const today = new Date(this.now()).toISOString().slice(0, 10);
    if (today !== this.day) {
      this.day = today;
      this.used = 0;
    }
  }

  tryConsume(): boolean {
    this.roll();
    if (this.used >= this.limit) return false;
    this.used++;
    return true;
  }

  /** Give a unit back (e.g. the Claude call failed before doing any work). */
  refund(): void {
    this.roll();
    this.used = Math.max(0, this.used - 1);
  }

  remaining(): number {
    this.roll();
    return Math.max(0, this.limit - this.used);
  }
}

/** Small LRU cache with expiry. Identical tickets (e.g. the demo samples) cost one Claude call. */
export class TtlCache<V> {
  private map = new Map<string, { value: V; expires: number }>();
  constructor(
    private readonly maxEntries: number,
    private readonly ttlMs: number,
    private readonly now: () => number = Date.now,
  ) {}

  get(key: string): V | undefined {
    const hit = this.map.get(key);
    if (!hit) return undefined;
    if (hit.expires <= this.now()) {
      this.map.delete(key);
      return undefined;
    }
    this.map.delete(key);
    this.map.set(key, hit); // refresh LRU position
    return hit.value;
  }

  set(key: string, value: V): void {
    this.map.delete(key);
    this.map.set(key, { value, expires: this.now() + this.ttlMs });
    while (this.map.size > this.maxEntries) this.map.delete(this.map.keys().next().value!);
  }

  get size(): number {
    return this.map.size;
  }
}

/** Limits how many agent runs execute at once. */
export class Semaphore {
  private active = 0;
  constructor(private readonly max: number) {}
  tryAcquire(): boolean {
    if (this.active >= this.max) return false;
    this.active++;
    return true;
  }
  release(): void {
    this.active = Math.max(0, this.active - 1);
  }
}
