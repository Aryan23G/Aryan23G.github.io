"use client";

import { Card, Metric, Text } from "@tremor/react";
import { FileJson } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LogLine, RunState } from "@/hooks/use-agent-run";
import { api } from "@/lib/api";
import type { RunTrace } from "@/lib/types";
import { cn, download, fmt } from "@/lib/utils";

function Section({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="border-b px-3 py-2.5">
      <h2 className="mb-2 flex items-center justify-between text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
        {aside}
      </h2>
      {children}
    </section>
  );
}

function Telemetry({ trace }: { trace: RunTrace }) {
  const llmMs = trace.generations.reduce((s, g) => s + g.latency_ms, 0);
  const dbMs = trace.steps.filter((s) => s.node === "execute_sql").reduce((s, x) => s + x.duration_ms, 0);
  const u = trace.usage;
  const tokensIn = u.input_tokens + u.cache_read_input_tokens + u.cache_creation_input_tokens;
  const cards: [string, string][] = [
    ["Agent time", fmt.ms(trace.total_ms)],
    ["LLM time", fmt.ms(llmMs)],
    ["Tokens in", fmt.int(tokensIn)],
    ["Tokens out", fmt.int(u.output_tokens)],
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {cards.map(([label, value]) => (
          <Card key={label} className="rounded-md p-2.5 ring-0 dark:bg-background">
            <Text className="!text-2xs uppercase tracking-wider">{label}</Text>
            <Metric className="!text-lg font-mono tabular-nums">{value}</Metric>
          </Card>
        ))}
      </div>
      <dl className="kv mt-2.5">
        <dt>input (uncached)</dt>
        <dd>{fmt.int(u.input_tokens)}</dd>
        <dt>cache read</dt>
        <dd className="!text-emerald-300">
          {fmt.int(u.cache_read_input_tokens)}
          {tokensIn > 0 && ` (${fmt.pct(u.cache_read_input_tokens / tokensIn)})`}
        </dd>
        <dt>cache write</dt>
        <dd>{fmt.int(u.cache_creation_input_tokens)}</dd>
        <dt>output</dt>
        <dd>{fmt.int(u.output_tokens)}</dd>
        <dt>LLM calls</dt>
        <dd>{trace.llm_calls}</dd>
        <dt>self-corrections</dt>
        <dd className={cn(trace.static_retries + trace.runtime_retries > 0 && "!text-amber-300")}>
          {trace.static_retries} static · {trace.runtime_retries} runtime
        </dd>
        <dt>db execution</dt>
        <dd>{fmt.ms(dbMs)}</dd>
      </dl>
    </>
  );
}

function NodeTimings({ trace }: { trace: RunTrace }) {
  // Timeline in execution order; bar width relative to the slowest node.
  const seen: Record<string, number> = {};
  const max = Math.max(...trace.steps.map((s) => s.duration_ms), 0.0001);
  return (
    <ol className="space-y-1 font-mono text-2xs" aria-label="Node latency in execution order">
      {trace.steps.map((s, i) => {
        seen[s.node] = (seen[s.node] ?? 0) + 1;
        const name = `${s.node}${seen[s.node]! > 1 ? ` #${seen[s.node]}` : ""}`;
        return (
          <li key={i} className="flex items-center gap-2">
            <span className="w-32 shrink-0 truncate text-foreground">{name}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-sm bg-muted" aria-hidden="true">
              <span
                className={cn("block h-full", s.status === "error" ? "bg-rose-400/80" : "bg-cyan-400/70")}
                style={{ width: `${Math.max(2, (s.duration_ms / max) * 100)}%` }}
              />
            </span>
            <span className="w-16 shrink-0 text-right tabular-nums text-muted-foreground">{fmt.ms(s.duration_ms)}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Context({ trace }: { trace: RunTrace }) {
  const r = trace.retrieval;
  if (!r) return <p className="text-2xs text-muted-foreground">No retrieval.</p>;
  const max = Math.max(...r.tables.map((t) => t.score), 0.0001);
  return (
    <div className="space-y-1.5">
      {r.tables.map((t) => (
        <div key={t.name} className="font-mono text-2xs">
          <div className="flex items-center gap-2">
            <span className="w-32 truncate text-foreground">{t.name}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded bg-muted">
              <div
                className={cn("h-full", t.reason === "join_path" || t.reason === "fk_neighbor" ? "bg-violet-400/70" : "bg-cyan-400/80")}
                style={{ width: `${Math.max(4, (t.score / max) * 100)}%` }}
              />
            </div>
            <span className="w-10 text-right tabular-nums text-muted-foreground">{t.score.toFixed(2)}</span>
            <Badge variant={t.reason === "join_path" || t.reason === "fk_neighbor" ? "violet" : t.reason === "lexical" ? "success" : "info"} className="w-[4.5rem] justify-center">
              {t.reason}
            </Badge>
          </div>
          {(t.via.length > 0 || t.matched_columns.length > 0) && (
            <div className="pl-[8.5rem] text-muted-foreground">
              {t.via.length > 0 ? `via ${t.via.join(" ↔ ")}` : `matched ${t.matched_columns.slice(0, 4).join(", ")}`}
            </div>
          )}
        </div>
      ))}
      <p className="pt-1 font-mono text-2xs text-muted-foreground">
        {r.tables.length}/{r.total_tables} tables injected · candidates: {r.candidates.slice(0, 6).map(([n, s]) => `${n} ${s.toFixed(2)}`).join(", ")}
      </p>
    </div>
  );
}

function EventLog({ lines }: { lines: LogLine[] }) {
  const color: Record<LogLine["level"], string> = { info: "text-muted-foreground", ok: "text-emerald-300", warn: "text-amber-300", error: "text-rose-300" };
  return (
    <div className="space-y-px font-mono text-2xs">
      {lines.map((l, i) => (
        <div key={i} className="flex gap-2">
          <span className="w-12 shrink-0 text-right tabular-nums text-muted-foreground">{l.t}ms</span>
          <span className={cn("min-w-0 break-words", color[l.level])}>{l.text}</span>
        </div>
      ))}
    </div>
  );
}

/** Download the server's recorded RunTrace (GET /api/runs/{id}) - the audit record, not client state. */
function ExportButton({ runId }: { runId: string }) {
  const [status, setStatus] = useState<"idle" | "busy" | "error">("idle");
  const exportTrace = async () => {
    setStatus("busy");
    try {
      const trace = await api.run(runId);
      download(`querypilot-run-${runId}.json`, JSON.stringify(trace, null, 2), "application/json");
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };
  return (
    <Button size="sm" variant="ghost" onClick={exportTrace} disabled={status === "busy"} title={status === "error" ? "Export failed: run no longer in server history" : undefined}>
      <FileJson /> {status === "error" ? "Export failed" : "Export JSON"}
    </Button>
  );
}

export function TracePanel({ state }: { state: RunState }) {
  const t = state.trace;
  return (
    <div className="flex h-full flex-col bg-panel">
      <div className="pane-header">
        <span>Execution trace</span>
        <span className="flex items-center gap-1 normal-case tracking-normal">
          {t && <ExportButton runId={t.run_id} />}
          {t && (
            <Badge variant={t.outcome === "success" ? "success" : t.outcome === "failed" ? "danger" : "warning"}>
              {t.outcome}
            </Badge>
          )}
        </span>
        {state.status === "running" && <Badge variant="info">running</Badge>}
      </div>
      <ScrollArea className="min-h-0 flex-1">
        {!t && state.status !== "running" && state.log.length === 0 && (
          <p className="p-3 font-mono text-2xs text-muted-foreground">
            No run yet. Token usage, per-node latency, the tables injected by RAG, the model&apos;s reasoning chain and every self-correction cycle appear here.
          </p>
        )}
        {t && (
          <>
            <Section title="Run" aside={<span className="font-mono normal-case tracking-normal">{t.run_id}</span>}>
              <dl className="kv">
                <dt>model</dt>
                <dd>{t.model}</dd>
                <dt>dialect</dt>
                <dd>{t.dialect}</dd>
              </dl>
              {t.error && <p className="mt-2 font-mono text-2xs text-rose-300">{t.error}</p>}
              {t.clarification && <p className="mt-2 text-2xs text-amber-300">{t.clarification}</p>}
            </Section>
            <Section title="Telemetry">
              <Telemetry trace={t} />
            </Section>
            <Section title="Node latency">
              <NodeTimings trace={t} />
            </Section>
            <Section title="Context injected (RAG)">
              <Context trace={t} />
            </Section>
            <Section title="Reasoning chain" aside={<span className="font-mono normal-case tracking-normal">final attempt</span>}>
              <ol className="list-decimal space-y-1 pl-4 text-xs text-foreground marker:font-mono marker:text-2xs marker:text-muted-foreground">
                {t.reasoning_chain.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
            </Section>
            {t.feedback.length > 0 && (
              <Section title="Self-correction log">
                <div className="space-y-2">
                  {t.feedback.map((f, i) => (
                    <div key={i} className="rounded border border-amber-500/20 bg-amber-500/5">
                      <div className="flex items-center gap-2 border-b border-amber-500/20 px-2 py-1">
                        <Badge variant={f.stage === "static" ? "warning" : "danger"}>{f.stage}</Badge>
                        <span className="font-mono text-2xs text-muted-foreground">attempt {f.attempt} → routed back to generate_sql</span>
                      </div>
                      <pre className="max-h-40 overflow-auto whitespace-pre-wrap px-2 py-1.5 font-mono text-2xs text-amber-200/90">{f.log}</pre>
                    </div>
                  ))}
                </div>
              </Section>
            )}
            <Section title="LLM calls">
              <table className="w-full font-mono text-2xs">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="text-left font-normal">#</th>
                    <th className="text-left font-normal">trigger</th>
                    <th className="text-right font-normal">latency</th>
                    <th className="text-right font-normal">in/out</th>
                  </tr>
                </thead>
                <tbody>
                  {t.generations.map((g) => (
                    <tr key={g.attempt} title={g.request_id ?? undefined}>
                      <td>{g.attempt}</td>
                      <td className={g.trigger === "initial" ? "" : "text-amber-300"}>{g.trigger}</td>
                      <td className="text-right tabular-nums">{fmt.ms(g.latency_ms)}</td>
                      <td className="text-right tabular-nums">
                        {fmt.int(g.usage.input_tokens + g.usage.cache_read_input_tokens + g.usage.cache_creation_input_tokens)}/{fmt.int(g.usage.output_tokens)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </>
        )}
        {state.log.length > 0 && (
          <Section title="Event log">
            <EventLog lines={state.log} />
          </Section>
        )}
      </ScrollArea>
    </div>
  );
}
