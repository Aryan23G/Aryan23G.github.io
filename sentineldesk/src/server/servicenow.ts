// ServiceNow integration over the Table API.
//   read:  GET   /api/now/table/incident        (new, active incidents)
//   write: PATCH /api/now/table/incident/{id}   (adds the AI triage as a work note)
// Works against a free Personal Developer Instance (https://developer.servicenow.com).

import type { Ticket, TriageResult } from "../core/types.ts";

export interface ServiceNowConfig {
  /** e.g. https://dev12345.service-now.com */
  instanceUrl: string;
  username: string;
  password: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export interface SnIncident {
  sys_id: string;
  number: string;
  short_description: string;
  description: string;
  caller_email: string;
  priority: string;
  state: string;
  sys_created_on: string;
}

export class ServiceNowError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

const SYS_ID = /^[0-9a-f]{32}$/;
const FIELDS = ["sys_id", "number", "short_description", "description", "caller_id.email", "priority", "state", "sys_created_on"];

export function isSysId(id: string): boolean {
  return SYS_ID.test(id);
}

export class ServiceNowClient {
  private readonly base: string;
  private readonly auth: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(cfg: ServiceNowConfig) {
    const url = new URL(cfg.instanceUrl);
    if (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
      throw new ServiceNowError("ServiceNow instance URL must use https.");
    }
    this.base = url.origin;
    this.auth = "Basic " + Buffer.from(`${cfg.username}:${cfg.password}`).toString("base64");
    this.fetchImpl = cfg.fetchImpl ?? fetch;
    this.timeoutMs = cfg.timeoutMs ?? 15_000;
  }

  get instance(): string {
    return this.base;
  }

  private async request<T>(method: "GET" | "PATCH", path: string, body?: unknown): Promise<T> {
    const res = await this.fetchImpl(this.base + path, {
      method,
      headers: { Authorization: this.auth, Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(this.timeoutMs),
    });
    if (!res.ok) {
      // Never echo the response body: it can contain instance details.
      const hint = res.status === 401 ? " (check SN_USERNAME / SN_PASSWORD)" : res.status === 403 ? " (the user needs the itil role)" : "";
      throw new ServiceNowError(`ServiceNow ${method} ${path.split("?")[0]} failed with HTTP ${res.status}${hint}.`, res.status);
    }
    const json = (await res.json()) as { result?: T };
    if (json.result === undefined) throw new ServiceNowError("ServiceNow response had no 'result' field.");
    return json.result;
  }

  /** New (state=1), active incidents, newest first. */
  async listNewIncidents(limit = 10): Promise<SnIncident[]> {
    const params = new URLSearchParams({
      sysparm_query: "active=true^state=1^ORDERBYDESCsys_created_on",
      sysparm_fields: FIELDS.join(","),
      sysparm_limit: String(Math.min(Math.max(1, limit), 50)),
      sysparm_exclude_reference_link: "true",
    });
    const rows = await this.request<Array<Record<string, string>>>("GET", `/api/now/table/incident?${params}`);
    return rows.map(toIncident);
  }

  async getIncident(sysId: string): Promise<SnIncident> {
    if (!isSysId(sysId)) throw new ServiceNowError("Invalid sys_id.", 400);
    const params = new URLSearchParams({ sysparm_fields: FIELDS.join(","), sysparm_exclude_reference_link: "true" });
    return toIncident(await this.request<Record<string, string>>("GET", `/api/now/table/incident/${sysId}?${params}`));
  }

  /** Appends a work note (internal, not visible to the caller) to the incident. */
  async addWorkNote(sysId: string, note: string): Promise<void> {
    if (!isSysId(sysId)) throw new ServiceNowError("Invalid sys_id.", 400);
    await this.request("PATCH", `/api/now/table/incident/${sysId}`, { work_notes: note });
  }
}

function toIncident(r: Record<string, string>): SnIncident {
  return {
    sys_id: r.sys_id ?? "",
    number: r.number ?? "",
    short_description: r.short_description ?? "",
    description: r.description ?? "",
    caller_email: r["caller_id.email"] ?? "",
    priority: r.priority ?? "",
    state: r.state ?? "",
    sys_created_on: r.sys_created_on ?? "",
  };
}

export function incidentToTicket(inc: SnIncident): Ticket {
  return {
    id: inc.number || inc.sys_id,
    subject: inc.short_description.slice(0, 160) || "(no short description)",
    body: (inc.description || inc.short_description).slice(0, 4000),
    requester: inc.caller_email || "unknown@unknown.invalid",
    createdAt: inc.sys_created_on,
  };
}

export function formatWorkNote(r: TriageResult): string {
  const lines = [
    `[SentinelDesk AI triage] ${r.securityFlag ? "SECURITY INCIDENT" : "Triage"} via ${r.mode === "claude" ? `Claude (${r.model})` : "offline rules"}`,
    `Priority: ${r.priority} | Category: ${r.category} | Route to: ${r.escalateTo ?? "Service Desk"} | Confidence: ${Math.round(r.confidence * 100)}%`,
  ];
  if (r.securityReasons.length) lines.push(`Indicators: ${r.securityReasons.slice(0, 6).join("; ")}`);
  if (r.overrides.length) lines.push(`Guardrail overrides: ${r.overrides.map((o) => `${o.field} (${o.reason})`).join("; ")}`);
  lines.push(`Reasoning: ${r.reasoning}`);
  lines.push(r.securityFlag ? r.suggestedResponse : `Suggested reply: ${r.suggestedResponse}`);
  if (r.kbRefs.length) lines.push(`KB: ${r.kbRefs.join(", ")}`);
  lines.push(`Tools used: ${r.toolCalls.map((c) => c.name).join(" -> ")}`);
  return lines.join("\n");
}
