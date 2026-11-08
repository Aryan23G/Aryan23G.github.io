"use client";

import { PostgreSQL, SQLite, StandardSQL, sql } from "@codemirror/lang-sql";
import { EditorView, keymap } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { Copy, Play, RotateCcw } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ExecuteResponse, TableMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

const DIALECTS = { sqlite: SQLite, postgres: PostgreSQL } as const;

const paneTheme = EditorView.theme(
  {
    "&": { backgroundColor: "transparent", height: "100%" },
    ".cm-gutters": { backgroundColor: "transparent", borderRight: "1px solid hsl(240 4% 16%)", color: "hsl(240 4% 38%)" },
    ".cm-activeLine": { backgroundColor: "hsl(240 4% 11% / 0.6)" },
    ".cm-activeLineGutter": { backgroundColor: "transparent", color: "hsl(240 5% 70%)" },
    ".cm-content": { padding: "8px 0" },
    ".cm-tooltip": { backgroundColor: "hsl(240 5% 8%)", border: "1px solid hsl(240 4% 16%)" },
  },
  { dark: true },
);

/** Where the SQL in the editor came from and whether the compiler accepted it. */
export type SqlPhase = "empty" | "draft" | "compiled" | "rejected";

const PHASE_BADGE: Record<SqlPhase, { label: string; variant: "default" | "info" | "success" | "danger" }> = {
  empty: { label: "empty", variant: "default" },
  draft: { label: "draft · compiling", variant: "info" },
  compiled: { label: "generated · compiled", variant: "success" },
  rejected: { label: "generated · not executed", variant: "danger" },
};

interface Props {
  value: string;
  generated: string;
  phase: SqlPhase;
  dialect: string;
  tables: TableMeta[];
  disabled: boolean;
  overrideRunning: boolean;
  override: ExecuteResponse | null;
  onChange: (sql: string) => void;
  onExecute: (sql: string) => void;
  onReset: () => void;
}

export function SqlEditor({ value, generated, phase, dialect, tables, disabled, overrideRunning, override, onChange, onExecute, onReset }: Props) {
  const dirty = value.trim() !== generated.trim();
  const extensions = useMemo(
    () => [
      sql({
        dialect: DIALECTS[dialect as keyof typeof DIALECTS] ?? StandardSQL,
        schema: Object.fromEntries(tables.map((t) => [t.name, t.columns.map((c) => c.name)])),
        upperCaseKeywords: true,
      }),
      paneTheme,
      EditorView.lineWrapping,
      keymap.of([{ key: "Mod-Enter", run: (view) => (onExecute(view.state.doc.toString()), true) }]),
    ],
    [dialect, tables, onExecute],
  );
  const diag = override && !override.validation.ok ? override.validation.diagnostics : [];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="pane-header">
        <div className="flex items-center gap-2">
          <span>SQL</span>
          {dirty && generated ? (
            <Badge variant="warning">edited · manual override</Badge>
          ) : (
            <Badge variant={PHASE_BADGE[phase].variant}>{PHASE_BADGE[phase].label}</Badge>
          )}
          <Badge variant="outline">{dialect}</Badge>
        </div>
        <div className="flex items-center gap-1 normal-case tracking-normal">
          <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(value)} disabled={!value} aria-label="Copy SQL">
            <Copy /> Copy
          </Button>
          <Button size="sm" variant="ghost" onClick={onReset} disabled={!dirty || !generated} aria-label="Reset to generated SQL">
            <RotateCcw /> Reset
          </Button>
          <Button
            size="sm"
            variant={dirty ? "default" : "outline"}
            onClick={() => onExecute(value)}
            disabled={disabled || overrideRunning || !value.trim()}
          >
            <Play /> {overrideRunning ? "Executing…" : "Execute Edit"}
          </Button>
        </div>
      </div>
      <div className={cn("min-h-0 flex-1 overflow-auto", disabled && "opacity-70")}>
        <CodeMirror
          value={value}
          onChange={onChange}
          theme="dark"
          extensions={extensions}
          editable={!disabled}
          basicSetup={{ foldGutter: false, highlightActiveLine: true, autocompletion: true }}
          placeholder="-- Generated SQL appears here. Edit it and press Execute Edit (Ctrl/⌘+Enter) to run it through the same guard."
          aria-label="SQL editor"
          height="100%"
        />
      </div>
      {diag.length > 0 && (
        <div className="max-h-28 shrink-0 overflow-auto border-t bg-rose-500/5 px-3 py-1.5 font-mono text-2xs text-rose-300">
          {diag.map((d, i) => (
            <div key={i}>
              error[{d.code}]{d.line != null && ` ${d.line}:${d.column}`} {d.message}
              {d.hint && <span className="text-muted-foreground"> — {d.hint}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
