"use client";

import { useCallback, useReducer, useRef } from "react";
import { api, streamQuery } from "@/lib/api";
import type { AgentEvent, ExecuteResponse, NodeName, RetrievedTable, RunTrace } from "@/lib/types";

export interface StepEntry {
  id: number;
  node: NodeName;
  status: "running" | "done" | "error" | "skipped";
  label: string;
  detail: string | null;
  durationMs: number | null;
  startedAtMs: number | null;
}

export interface LogLine {
  t: number; // ms since run start (client clock)
  level: "info" | "ok" | "warn" | "error";
  text: string;
}

export interface RunState {
  status: "idle" | "running" | "done" | "error";
  question: string;
  runId: string | null;
  model: string | null;
  steps: StepEntry[];
  trace: RunTrace | null;
  /** Tables injected by RAG, available as soon as State 1 completes. */
  liveTables: RetrievedTable[];
  error: string | null;
  log: LogLine[];
  clientStartedAt: number | null;
  /** SQL currently shown in the editor (generated, or the user's edit). */
  editorSql: string;
  generatedSql: string;
  override: { status: "idle" | "running" | "done"; response: ExecuteResponse | null; error: string | null };
}

export type Action =
  | { type: "start"; question: string }
  | { type: "event"; event: AgentEvent }
  | { type: "fail"; message: string }
  | { type: "load_trace"; trace: RunTrace }
  | { type: "edit"; sql: string }
  | { type: "reset_sql" }
  | { type: "override_start" }
  | { type: "override_done"; response: ExecuteResponse }
  | { type: "override_fail"; message: string };

export const initialRunState: RunState = {
  status: "idle",
  question: "",
  runId: null,
  model: null,
  steps: [],
  trace: null,
  liveTables: [],
  error: null,
  log: [],
  clientStartedAt: null,
  editorSql: "",
  generatedSql: "",
  override: { status: "idle", response: null, error: null },
};

let nextId = 1;

function log(state: RunState, level: LogLine["level"], text: string): LogLine[] {
  const t = state.clientStartedAt ? Math.round(performance.now() - state.clientStartedAt) : 0;
  return [...state.log, { t, level, text }];
}

/** Pure state transition for one agent run. Exported for unit tests. */
export function reducer(state: RunState, action: Action): RunState {
  switch (action.type) {
    case "start":
      return {
        ...initialRunState,
        status: "running",
        question: action.question,
        clientStartedAt: performance.now(),
        log: [{ t: 0, level: "info", text: `POST /api/query/stream  question="${action.question}"` }],
      };
    case "event": {
      const e = action.event;
      if (e.type === "run_started") {
        return { ...state, runId: e.run_id, model: e.model, log: log(state, "info", `run ${e.run_id} started · ${e.model} · ${e.dialect}`) };
      }
      if (e.type === "step") {
        if (e.status === "running") {
          const entry: StepEntry = {
            id: nextId++, node: e.node, status: "running", label: e.label, detail: null, durationMs: null, startedAtMs: null,
          };
          return { ...state, steps: [...state.steps, entry], log: log(state, "info", `[${e.node}] ${e.label}`) };
        }
        // Completion: update the most recent running entry for this node.
        const steps = [...state.steps];
        for (let i = steps.length - 1; i >= 0; i--) {
          const s = steps[i]!;
          if (s.node === e.node && s.status === "running") {
            steps[i] = { ...s, status: e.status, label: e.label, detail: e.detail, durationMs: e.duration_ms, startedAtMs: e.started_at_ms };
            break;
          }
        }
        // Live payloads: show each draft in the editor as soon as it exists (even if it later fails
        // validation), and highlight injected tables as soon as retrieval finishes.
        const live: Partial<RunState> = {};
        if (e.data?.sql !== undefined) Object.assign(live, { editorSql: e.data.sql, generatedSql: e.data.sql });
        if (e.data?.tables) live.liveTables = e.data.tables;
        const level = e.status === "error" ? "error" : "ok";
        const text = `[${e.node}] ${e.label}${e.detail ? ` — ${e.detail}` : ""}${e.duration_ms != null ? ` (${e.duration_ms} ms)` : ""}`;
        return { ...state, ...live, steps, log: log(state, level, text) };
      }
      if (e.type === "run_completed") {
        const sql = e.trace.sql ?? "";
        const level = e.trace.outcome === "success" ? "ok" : e.trace.outcome === "failed" ? "error" : "warn";
        return {
          ...state,
          status: "done",
          trace: e.trace,
          generatedSql: sql,
          editorSql: sql,
          error: e.trace.outcome === "failed" ? e.trace.error : null,
          log: log(state, level, `run ${e.trace.run_id} ${e.trace.outcome} in ${e.trace.total_ms} ms · ${e.trace.llm_calls} LLM call(s)`),
        };
      }
      return { ...state, status: "error", error: e.message, log: log(state, "error", e.message) };
    }
    case "fail":
      return { ...state, status: "error", error: action.message, log: log(state, "error", action.message) };
    case "load_trace": {
      // Re-open a past run from history: rebuild the tracker from the recorded steps.
      const t = action.trace;
      const sql = t.sql ?? "";
      return {
        ...initialRunState,
        status: "done",
        question: t.question,
        runId: t.run_id,
        model: t.model,
        trace: t,
        steps: t.steps.map((s) => ({
          id: nextId++, node: s.node, status: s.status, label: s.label, detail: s.detail,
          durationMs: s.duration_ms, startedAtMs: s.started_at_ms,
        })),
        error: t.outcome === "failed" ? t.error : null,
        editorSql: sql,
        generatedSql: sql,
        log: [{ t: 0, level: "info", text: `GET /api/runs/${t.run_id} (loaded from history, ${t.outcome})` }],
      };
    }
    case "edit":
      return { ...state, editorSql: action.sql };
    case "reset_sql":
      return { ...state, editorSql: state.generatedSql };
    case "override_start":
      return { ...state, override: { status: "running", response: null, error: null }, log: log(state, "info", "POST /api/execute (manual override)") };
    case "override_done": {
      const r = action.response;
      const ok = r.validation.ok && r.execution?.ok;
      const text = !r.validation.ok
        ? `override rejected by SQLGlot: ${r.validation.diagnostics[0]?.code ?? "error"}`
        : r.execution?.ok
          ? `override executed · ${r.execution.row_count} rows in ${r.execution.elapsed_ms} ms`
          : `override runtime error: ${r.execution?.error_message ?? "unknown"}`;
      return { ...state, override: { status: "done", response: r, error: null }, log: log(state, ok ? "ok" : "error", text) };
    }
    case "override_fail":
      return { ...state, override: { status: "done", response: null, error: action.message }, log: log(state, "error", action.message) };
  }
}

export function useAgentRun() {
  const [state, dispatch] = useReducer(reducer, initialRunState);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async (question: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    dispatch({ type: "start", question });
    try {
      for await (const event of streamQuery(question, controller.signal)) dispatch({ type: "event", event });
    } catch (err) {
      if ((err as Error).name !== "AbortError") dispatch({ type: "fail", message: (err as Error).message });
    }
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    dispatch({ type: "fail", message: "Run cancelled by user." });
  }, []);

  const executeOverride = useCallback(async (sql: string) => {
    dispatch({ type: "override_start" });
    try {
      dispatch({ type: "override_done", response: await api.execute(sql) });
    } catch (err) {
      dispatch({ type: "override_fail", message: (err as Error).message });
    }
  }, []);

  return {
    state,
    run,
    cancel,
    executeOverride,
    loadTrace: (trace: RunTrace) => dispatch({ type: "load_trace", trace }),
    editSql: (sql: string) => dispatch({ type: "edit", sql }),
    resetSql: () => dispatch({ type: "reset_sql" }),
  };
}
