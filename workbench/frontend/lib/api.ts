import { parseSseBuffer } from "./sse";
import type { AgentEvent, ExecuteResponse, HealthResponse, RunSummary, RunTrace, SchemaResponse } from "./types";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ApiError(res.status, `${res.status} ${res.statusText}${body ? `: ${body.slice(0, 300)}` : ""}`);
  }
  return (await res.json()) as T;
}

export const api = {
  health: () => request<HealthResponse>("/api/health"),
  schema: () => request<SchemaResponse>("/api/schema"),
  runs: () => request<RunSummary[]>("/api/runs"),
  run: (runId: string) => request<RunTrace>(`/api/runs/${encodeURIComponent(runId)}`),
  execute: (sql: string) => request<ExecuteResponse>("/api/execute", { method: "POST", body: JSON.stringify({ sql }) }),
};

/**
 * POST /api/query/stream and yield parsed Server-Sent Events.
 * (EventSource cannot POST a body, so this reads the stream manually.)
 */
export async function* streamQuery(question: string, signal: AbortSignal): AsyncGenerator<AgentEvent> {
  const res = await fetch(`${API_URL}/api/query/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify({ question }),
    signal,
  });
  if (!res.ok || !res.body) {
    throw new ApiError(res.status, `${res.status} ${res.statusText}: ${(await res.text()).slice(0, 300)}`);
  }
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    const parsed = parseSseBuffer(buffer + value);
    buffer = parsed.rest;
    yield* parsed.events;
  }
}
