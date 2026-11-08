import { describe, expect, it } from "vitest";
import { type Action, initialRunState, reducer, type RunState } from "@/hooks/use-agent-run";
import type { AgentEvent, ExecuteResponse, RunTrace } from "@/lib/types";

const ev = (event: AgentEvent): Action => ({ type: "event", event });
const step = (node: string, status: string, extra: Partial<Record<string, unknown>> = {}): Action =>
  ev({ type: "step", node, status, label: `${node} ${status}`, started_at_ms: null, duration_ms: status === "running" ? null : 5, detail: null, data: null, ...extra } as AgentEvent);

const run = (...actions: Action[]): RunState => actions.reduce(reducer, initialRunState);

const trace = (over: Partial<RunTrace> = {}): RunTrace => ({
  run_id: "r1", question: "q", model: "m", dialect: "sqlite", outcome: "success", error: null,
  sql: "SELECT 1", reasoning_chain: [], clarification: null, retrieval: null, generations: [], feedback: [],
  diagnostics: [], steps: [], usage: { input_tokens: 1, output_tokens: 1, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 },
  llm_calls: 1, static_retries: 0, runtime_retries: 0, total_ms: 10, started_at: 1, result: null, ...over,
});

describe("run lifecycle", () => {
  it("start resets state and marks running", () => {
    const s = run({ type: "edit", sql: "old" }, { type: "start", question: "how many?" });
    expect(s.status).toBe("running");
    expect(s.question).toBe("how many?");
    expect(s.editorSql).toBe("");
    expect(s.log[0]?.text).toContain("/api/query/stream");
  });

  it("completes the most recent running entry for the node, including retry loops", () => {
    const s = run(
      { type: "start", question: "q" },
      step("generate_sql", "running"),
      step("generate_sql", "done"),
      step("validate_sql", "running"),
      step("validate_sql", "error"),
      step("generate_sql", "running"),
      step("generate_sql", "done"),
    );
    expect(s.steps.map((x) => `${x.node}:${x.status}`)).toEqual([
      "generate_sql:done", "validate_sql:error", "generate_sql:done",
    ]);
    expect(s.log.filter((l) => l.level === "error")).toHaveLength(1);
  });

  it("applies live payloads: draft SQL into the editor and injected tables", () => {
    const tables = [{ name: "orders", score: 0.5, reason: "semantic", matched_columns: [], via: [] }];
    const s = run(
      { type: "start", question: "q" },
      step("retrieve_context", "running"),
      step("retrieve_context", "done", { data: { tables } }),
      step("generate_sql", "running"),
      step("generate_sql", "done", { data: { sql: "SELECT nope", attempt: 1 } }),
    );
    expect(s.liveTables.map((t) => t.name)).toEqual(["orders"]);
    expect(s.editorSql).toBe("SELECT nope");
    expect(s.generatedSql).toBe("SELECT nope");
  });

  it("run_completed stores the trace and the final SQL; failed runs surface the error", () => {
    const ok = run({ type: "start", question: "q" }, ev({ type: "run_completed", trace: trace({ sql: "SELECT 2" }) }));
    expect(ok.status).toBe("done");
    expect(ok.editorSql).toBe("SELECT 2");
    expect(ok.error).toBeNull();

    const bad = run({ type: "start", question: "q" }, ev({ type: "run_completed", trace: trace({ outcome: "failed", error: "budget" }) }));
    expect(bad.error).toBe("budget");
  });

  it("run_error and fail move to the error state", () => {
    expect(run({ type: "start", question: "q" }, ev({ type: "run_error", run_id: "r", message: "x" })).status).toBe("error");
    expect(run({ type: "start", question: "q" }, { type: "fail", message: "cancelled" }).error).toBe("cancelled");
  });
});

describe("load_trace (history)", () => {
  it("rebuilds tracker, editor and trace from a stored run, replacing the current one", () => {
    const stored = trace({
      run_id: "old", question: "past question", sql: "SELECT 9", outcome: "failed", error: "budget",
      steps: [
        { node: "retrieve_context", label: "Injected", status: "done", started_at_ms: 0, duration_ms: 3, detail: null, data: null },
        { node: "fail", label: "Run failed", status: "error", started_at_ms: 9, duration_ms: 0, detail: "budget", data: null },
      ],
    });
    const s = reducer(run({ type: "start", question: "current" }), { type: "load_trace", trace: stored });
    expect(s.status).toBe("done");
    expect(s.runId).toBe("old");
    expect(s.question).toBe("past question");
    expect(s.steps.map((x) => `${x.node}:${x.status}`)).toEqual(["retrieve_context:done", "fail:error"]);
    expect(s.editorSql).toBe("SELECT 9");
    expect(s.error).toBe("budget");
    expect(s.log).toHaveLength(1);
  });
});

describe("editor and manual override", () => {
  const done = run({ type: "start", question: "q" }, ev({ type: "run_completed", trace: trace({ sql: "SELECT 1" }) }));

  it("edit and reset", () => {
    const edited = reducer(done, { type: "edit", sql: "SELECT 3" });
    expect(edited.editorSql).toBe("SELECT 3");
    expect(reducer(edited, { type: "reset_sql" }).editorSql).toBe("SELECT 1");
  });

  it("logs rejected, executed and failed overrides", () => {
    const base: ExecuteResponse = {
      validation: { ok: true, dialect: "sqlite", input_sql: "", compiled_sql: "", tables: [], limit_injected: false, diagnostics: [] },
      execution: { ok: true, sql: "", columns: [], rows: [], row_count: 4, truncated: false, elapsed_ms: 2, error_type: null, error_message: null, stack_trace: null },
      records: [],
    };
    const started = reducer(done, { type: "override_start" });
    expect(started.override.status).toBe("running");

    const executed = reducer(started, { type: "override_done", response: base });
    expect(executed.override.response?.execution?.row_count).toBe(4);
    expect(executed.log.at(-1)?.text).toContain("4 rows");

    const rejected = reducer(started, {
      type: "override_done",
      response: { ...base, execution: null, validation: { ...base.validation, ok: false, diagnostics: [{ code: "NOT_A_QUERY", message: "", line: null, column: null, hint: null }] } },
    });
    expect(rejected.log.at(-1)).toMatchObject({ level: "error" });
    expect(rejected.log.at(-1)?.text).toContain("NOT_A_QUERY");

    const failed = reducer(started, { type: "override_fail", message: "network" });
    expect(failed.override.error).toBe("network");
  });
});
