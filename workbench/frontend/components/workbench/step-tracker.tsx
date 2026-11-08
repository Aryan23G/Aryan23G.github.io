"use client";

import type { StepEntry } from "@/hooks/use-agent-run";
import type { NodeName } from "@/lib/types";
import { cn, fmt } from "@/lib/utils";

const PIPELINE: { node: NodeName; label: string }[] = [
  { node: "retrieve_context", label: "Injecting schema metadata (RAG)" },
  { node: "generate_sql", label: "Generating SQL (structured output)" },
  { node: "validate_sql", label: "Static compilation (SQLGlot)" },
  { node: "execute_sql", label: "Executing query (read-only)" },
  { node: "format_response", label: "Formatting result set" },
];

const MARK: Record<StepEntry["status"] | "pending", { glyph: string; cls: string }> = {
  pending: { glyph: "[ ]", cls: "text-zinc-600" },
  running: { glyph: "[⚙]", cls: "text-cyan-400" },
  done: { glyph: "[✓]", cls: "text-emerald-400" },
  error: { glyph: "[✗]", cls: "text-rose-400" },
  skipped: { glyph: "[–]", cls: "text-zinc-500" },
};

interface Props {
  steps: StepEntry[];
  status: "idle" | "running" | "done" | "error";
}

/**
 * Linear, deterministic tracker: every state the machine entered, in order (including
 * self-correction loops), followed by the canonical states it has not reached yet.
 */
export function StepTracker({ steps, status }: Props) {
  const reached = new Set(steps.map((s) => s.node));
  const lastIdx = Math.max(-1, ...steps.map((s) => PIPELINE.findIndex((p) => p.node === s.node)));
  const terminal = steps.some((s) => s.node === "fail") || (status !== "running" && steps.some((s) => s.node === "format_response"));
  const pending = status === "idle" || (!terminal && status === "running") ? PIPELINE.filter((p, i) => i > lastIdx && !reached.has(p.node)) : [];
  const attempt: Record<string, number> = {};

  return (
    <ol className="font-mono text-xs leading-6" aria-label="Agent state machine progress" aria-live="polite">
      {steps.map((s) => {
        attempt[s.node] = (attempt[s.node] ?? 0) + 1;
        const n = attempt[s.node]!;
        const m = MARK[s.status];
        return (
          <li key={s.id} className="flex items-baseline gap-2">
            <span className={cn("w-7 shrink-0", m.cls, s.status === "running" && "animate-pulse")}>{m.glyph}</span>
            <span className="w-36 shrink-0 text-muted-foreground">
              {s.node}
              {n > 1 && <span className="text-amber-400"> #{n}</span>}
            </span>
            <span className={cn("min-w-0 flex-1 truncate", s.status === "error" ? "text-rose-300" : "text-foreground")}>
              {s.label}
              {s.detail && <span className="text-muted-foreground"> · {s.detail}</span>}
            </span>
            <span className="w-16 shrink-0 text-right tabular-nums text-muted-foreground">
              {s.durationMs != null ? fmt.ms(s.durationMs) : "…"}
            </span>
          </li>
        );
      })}
      {pending.map((p) => (
        <li key={p.node} className="flex items-baseline gap-2 text-zinc-600">
          <span className="w-7 shrink-0">{MARK.pending.glyph}</span>
          <span className="w-36 shrink-0">{p.node}</span>
          <span className="flex-1 truncate">{p.label}</span>
          <span className="w-16 shrink-0" />
        </li>
      ))}
    </ol>
  );
}
