"use client";

import { CornerDownLeft, Square } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const PRESETS = [
  "Monthly revenue for 2025, excluding cancelled orders",
  "Return rate by product category",
  "Average CSAT and resolution hours by support agent",
  "Which carrier has the slowest average delivery time?",
  "Attributed revenue by marketing channel vs budget",
];

interface Props {
  value: string;
  onChange: (value: string) => void;
  running: boolean;
  onRun: (question: string) => void;
  onCancel: () => void;
}

export const QueryInput = forwardRef<HTMLTextAreaElement, Props>(function QueryInput(
  { value, onChange, running, onRun, onCancel },
  ref,
) {
  const submit = () => {
    const q = value.trim();
    if (q.length >= 3 && !running) onRun(q);
  };

  return (
    <div className="shrink-0 border-b bg-panel p-2">
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-2 select-none font-mono text-xs text-cyan-400">&gt;</span>
          <Textarea
            ref={ref}
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Analytical request, e.g. 'Revenue by region and segment for Q4 2025'"
            aria-label="Analytical request"
            className="min-h-[52px] pl-7 font-mono text-xs"
            maxLength={2000}
          />
        </div>
        <div className="flex w-28 flex-col gap-1">
          {running ? (
            <Button variant="outline" className="h-full" onClick={onCancel}>
              <Square /> Cancel
            </Button>
          ) : (
            <Button className="h-full" onClick={submit} disabled={value.trim().length < 3}>
              <CornerDownLeft /> Run
            </Button>
          )}
          <span className="text-center font-mono text-2xs text-muted-foreground">Ctrl/⌘ + Enter</span>
        </div>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-1">
        <span className="mr-1 font-mono text-2xs uppercase tracking-wider text-muted-foreground">presets</span>
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            disabled={running}
            onClick={() => {
              onChange(p);
              onRun(p);
            }}
            className="rounded border px-1.5 py-0.5 font-mono text-2xs text-muted-foreground hover:border-primary/50 hover:text-foreground disabled:opacity-50"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
});
