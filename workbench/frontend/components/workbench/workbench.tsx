"use client";

import { Activity, Cpu, Database, TerminalSquare } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAgentRun } from "@/hooks/use-agent-run";
import { API_URL, api } from "@/lib/api";
import type { HealthResponse, RetrievedTable, RunSummary, SchemaResponse } from "@/lib/types";
import { fmt } from "@/lib/utils";
import { HistoryList } from "./history-list";
import { QueryInput } from "./query-input";
import { type ResultSet, ResultsTable } from "./results-table";
import { SchemaBrowser } from "./schema-browser";
import { type SqlPhase, SqlEditor } from "./sql-editor";
import { StepTracker } from "./step-tracker";
import { TracePanel } from "./trace-panel";

export function Workbench() {
  const { state, run, cancel, executeOverride, loadTrace, editSql, resetSql } = useAgentRun();
  const [leftTab, setLeftTab] = useState<"schema" | "history">("schema");
  const [runs, setRuns] = useState<RunSummary[]>([]);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [loadingRunId, setLoadingRunId] = useState<string | null>(null);

  const refreshRuns = useCallback(() => {
    api.runs().then(
      (r) => {
        setRuns(r);
        setHistoryError(null);
      },
      (e: Error) => setHistoryError(e.message),
    );
  }, []);

  // Refresh history on load and whenever a run completes.
  const completedRunId = state.trace?.run_id;
  useEffect(() => {
    refreshRuns();
  }, [refreshRuns, completedRunId]);

  const openRun = useCallback(
    async (runId: string) => {
      setLoadingRunId(runId);
      try {
        loadTrace(await api.run(runId));
      } catch (e) {
        setHistoryError((e as Error).message);
      } finally {
        setLoadingRunId(null);
      }
    },
    [loadTrace],
  );
  const [schema, setSchema] = useState<SchemaResponse | null>(null);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    Promise.all([api.health(), api.schema()])
      .then(([h, s]) => {
        setHealth(h);
        setSchema(s);
      })
      .catch((e: Error) => setBackendError(e.message));
  }, []);

  const injected = useMemo(
    () => new Map<string, RetrievedTable>((state.trace?.retrieval?.tables ?? state.liveTables).map((t) => [t.name, t])),
    [state.trace, state.liveTables],
  );

  // The grid shows the latest executed result: the agent's, or a manual override that came after it.
  const result: ResultSet | null = useMemo(() => {
    const o = state.override.response;
    if (o?.execution?.ok) {
      return { source: "override", columns: o.execution.columns, records: o.records, rowCount: o.execution.row_count, truncated: o.execution.truncated, executionMs: o.execution.elapsed_ms };
    }
    const r = state.trace?.result;
    if (r) return { source: "agent", columns: r.columns, records: r.records, rowCount: r.row_count, truncated: r.truncated, executionMs: r.execution_ms };
    return null;
  }, [state.trace, state.override.response]);

  const runtimeError = state.override.response?.execution && !state.override.response.execution.ok ? state.override.response.execution : null;
  const emptyHint =
    state.status === "running"
      ? "Waiting for execution…"
      : state.trace?.outcome === "unanswerable"
        ? `Not executed: ${state.trace.clarification ?? "question not answerable from the schema."}`
        : state.trace?.outcome === "failed"
          ? `Not executed: ${state.trace.error ?? "run failed."}`
          : "Run an analytical request to populate the result grid.";

  // Schema browser double-click: insert `table.column` at the caret of the request input.
  const insert = useCallback((text: string) => {
    const el = inputRef.current;
    setQuestion((q) => {
      const start = el?.selectionStart ?? q.length;
      const end = el?.selectionEnd ?? q.length;
      return q.slice(0, start) + text + q.slice(end);
    });
    el?.focus();
  }, []);

  const db = schema?.databases[0];
  const sqlPhase: SqlPhase = !state.generatedSql
    ? "empty"
    : state.status === "running"
      ? "draft"
      : state.trace?.outcome === "success"
        ? "compiled"
        : "rejected";

  return (
    <TooltipProvider delayDuration={250}>
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Title bar */}
        <header className="flex h-9 shrink-0 items-center gap-3 border-b bg-panel px-3">
          <TerminalSquare className="size-4 text-cyan-400" />
          <h1 className="font-mono text-xs font-semibold tracking-tight">
            QueryPilot <span className="text-muted-foreground">workbench</span>
          </h1>
          <span className="h-4 w-px bg-border" />
          <span className="flex items-center gap-1.5 font-mono text-2xs text-muted-foreground">
            <Database className="size-3.5" /> {db ? `${db.name} · ${db.dialect} · ${db.tables.length} tables` : "—"}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-2xs text-muted-foreground">
            <Cpu className="size-3.5" /> {health?.model ?? "—"}
          </span>
          <span className="ml-auto flex items-center gap-2">
            {backendError ? (
              <Badge variant="danger">backend offline</Badge>
            ) : health ? (
              <Badge variant="success">
                <Activity className="size-3" /> api ok
              </Badge>
            ) : (
              <Badge>connecting</Badge>
            )}
          </span>
        </header>

        {backendError && (
          <div className="border-b border-rose-500/30 bg-rose-500/10 px-3 py-1 font-mono text-2xs text-rose-300">
            Cannot reach {API_URL}: {backendError}. Start the API with `uvicorn app.main:app` or set NEXT_PUBLIC_API_URL.
          </div>
        )}

        <ResizablePanelGroup direction="horizontal" autoSaveId="qp-workbench-h" className="min-h-0 flex-1">
          <ResizablePanel defaultSize={18} minSize={12} maxSize={32}>
            <Tabs value={leftTab} onValueChange={(v) => setLeftTab(v as "schema" | "history")} className="flex h-full flex-col bg-panel">
              <TabsContent value="schema" className="min-h-0 flex-1 data-[state=inactive]:hidden">
                <SchemaBrowser
                  schema={schema}
                  injected={injected}
                  error={backendError}
                  onInsert={insert}
                  title={<LeftTabs />}
                />
              </TabsContent>
              <TabsContent value="history" className="flex min-h-0 flex-1 flex-col data-[state=inactive]:hidden">
                <div className="pane-header">
                  <LeftTabs />
                </div>
                <div className="min-h-0 flex-1">
                  <HistoryList
                    runs={runs}
                    activeRunId={state.runId}
                    loadingRunId={loadingRunId}
                    error={historyError}
                    onOpen={openRun}
                    onRefresh={refreshRuns}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle />

          <ResizablePanel defaultSize={56} minSize={35}>
            <div className="flex h-full min-h-0 flex-col">
              <QueryInput
                ref={inputRef}
                value={question}
                onChange={setQuestion}
                running={state.status === "running"}
                onRun={run}
                onCancel={cancel}
              />
              <div className="shrink-0 border-b">
                <div className="pane-header">
                  <span>Pipeline</span>
                  <span className="font-mono normal-case tracking-normal">
                    {state.runId ? `run ${state.runId}` : "idle"}
                    {state.trace && ` · ${fmt.ms(state.trace.total_ms)}`}
                  </span>
                </div>
                <div className="px-3 py-1.5">
                  <StepTracker steps={state.steps} status={state.status} />
                  {state.status === "error" && state.error && <p className="font-mono text-2xs text-rose-300">{state.error}</p>}
                </div>
              </div>
              <ResizablePanelGroup direction="vertical" autoSaveId="qp-workbench-v" className="min-h-0 flex-1">
                <ResizablePanel defaultSize={38} minSize={15}>
                  <SqlEditor
                    value={state.editorSql}
                    generated={state.generatedSql}
                    phase={sqlPhase}
                    dialect={db?.dialect ?? "sqlite"}
                    tables={db?.tables ?? []}
                    disabled={state.status === "running"}
                    overrideRunning={state.override.status === "running"}
                    override={state.override.response}
                    onChange={editSql}
                    onExecute={executeOverride}
                    onReset={resetSql}
                  />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={62} minSize={20}>
                  {runtimeError ? (
                    <div className="h-full overflow-auto p-3 font-mono text-2xs">
                      <p className="text-rose-300">
                        {runtimeError.error_type}: {runtimeError.error_message}
                      </p>
                      <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">{runtimeError.stack_trace}</pre>
                    </div>
                  ) : (
                    <ResultsTable result={result} emptyHint={emptyHint} />
                  )}
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </ResizablePanel>
          <ResizableHandle />

          <ResizablePanel defaultSize={26} minSize={18} maxSize={40}>
            <TracePanel state={state} />
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Status bar */}
        <footer className="flex h-6 shrink-0 items-center gap-4 border-t bg-panel px-3 font-mono text-2xs text-muted-foreground">
          <span>{API_URL}</span>
          {health && <span>embedder {health.embedder}</span>}
          {state.trace && (
            <>
              <span>
                tokens {fmt.int(state.trace.usage.input_tokens + state.trace.usage.cache_read_input_tokens + state.trace.usage.cache_creation_input_tokens)} in /{" "}
                {fmt.int(state.trace.usage.output_tokens)} out
              </span>
              <span>llm calls {state.trace.llm_calls}</span>
            </>
          )}
          <span className="ml-auto">read-only · SQLGlot guard · row cap {fmt.int(1000)}</span>
        </footer>
      </div>
    </TooltipProvider>
  );
}

function LeftTabs() {
  return (
    <TabsList className="-ml-1 h-7">
      <TabsTrigger value="schema">Schema</TabsTrigger>
      <TabsTrigger value="history">History</TabsTrigger>
    </TabsList>
  );
}
