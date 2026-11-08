"use client";

import { History, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { RunSummary } from "@/lib/types";
import { cn, fmt } from "@/lib/utils";

interface Props {
  runs: RunSummary[];
  activeRunId: string | null;
  loadingRunId: string | null;
  error: string | null;
  onOpen: (runId: string) => void;
  onRefresh: () => void;
}

const OUTCOME = { success: "success", unanswerable: "warning", failed: "danger" } as const;

export function HistoryList({ runs, activeRunId, loadingRunId, error, onOpen, onRefresh }: Props) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between border-b px-3 py-1.5 font-mono text-2xs text-muted-foreground">
        <span>{runs.length} recent run{runs.length === 1 ? "" : "s"} (server memory)</span>
        <Button size="icon" variant="ghost" onClick={onRefresh} aria-label="Refresh run history">
          <RefreshCw />
        </Button>
      </div>
      {error && <p className="p-3 font-mono text-2xs text-rose-300">history: {error}</p>}
      {runs.length === 0 && !error && (
        <p className="flex items-center gap-2 p-3 font-mono text-2xs text-muted-foreground">
          <History className="size-3.5" /> No completed runs yet.
        </p>
      )}
      <ScrollArea className="min-h-0 flex-1">
        <ul aria-label="Run history">
          {runs.map((r) => (
            <li key={r.run_id}>
              <button
                type="button"
                onClick={() => onOpen(r.run_id)}
                aria-current={r.run_id === activeRunId ? "true" : undefined}
                className={cn(
                  "w-full border-b border-border/60 px-3 py-2 text-left hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
                  r.run_id === activeRunId && "bg-accent",
                )}
              >
                <div className="flex items-center gap-2 font-mono text-2xs text-muted-foreground">
                  <Badge variant={OUTCOME[r.outcome]}>{r.outcome}</Badge>
                  <span>{new Date(r.started_at * 1000).toLocaleTimeString([], { hour12: false })}</span>
                  <span className="ml-auto tabular-nums">{loadingRunId === r.run_id ? "loading…" : fmt.ms(r.total_ms)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-foreground">{r.question}</p>
                <p className="mt-0.5 font-mono text-2xs text-muted-foreground">
                  {r.row_count != null ? `${fmt.int(r.row_count)} rows` : "no rows"} · {r.llm_calls} LLM call{r.llm_calls === 1 ? "" : "s"}
                  {r.retries > 0 && <span className="text-amber-300"> · {r.retries} retr{r.retries === 1 ? "y" : "ies"}</span>}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
