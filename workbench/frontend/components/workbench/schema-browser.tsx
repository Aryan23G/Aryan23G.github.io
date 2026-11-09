"use client";

import { ChevronRight, Database, KeyRound, Link2, Search, Table2 } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { RetrievedTable, SchemaResponse, TableMeta } from "@/lib/types";
import { cn, fmt } from "@/lib/utils";

const REASON_LABEL: Record<RetrievedTable["reason"], string> = {
  semantic: "semantic",
  lexical: "named",
  fk_neighbor: "fk-adj",
  join_path: "join",
};

interface Props {
  schema: SchemaResponse | null;
  injected: Map<string, RetrievedTable>;
  error: string | null;
  onInsert: (text: string) => void;
  /** Replaces the "Schema" title (the workbench passes the Schema/History tab list). */
  title?: ReactNode;
}

export function SchemaBrowser({ schema, injected, error, onInsert, title }: Props) {
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const db = schema?.databases[0];

  const tables = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const all = db?.tables ?? [];
    const matches = q
      ? all.filter((t) => t.name.includes(q) || t.columns.some((c) => c.name.includes(q)))
      : all;
    // Injected tables first (in retrieval order), then the rest alphabetically.
    return [...matches].sort((a, b) => {
      const ia = injected.has(a.name) ? 0 : 1;
      const ib = injected.has(b.name) ? 0 : 1;
      return ia - ib || a.name.localeCompare(b.name);
    });
  }, [db, filter, injected]);

  const toggle = (name: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <div className="flex h-full flex-col bg-panel">
      <div className="pane-header">
        {title ?? <span>Schema</span>}
        {db && (
          <span className="font-mono normal-case tracking-normal">
            {injected.size > 0 ? `${injected.size}/${db.tables.length} in context` : `${db.tables.length} tables`}
          </span>
        )}
      </div>
      <div className="border-b p-2">
        <div className="flex h-7 items-center gap-2 rounded-md border bg-background px-2">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter tables / columns"
            aria-label="Filter schema"
            className="h-full w-full bg-transparent font-mono text-2xs outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      {error && <p className="p-3 font-mono text-2xs text-rose-300">schema: {error}</p>}
      {db && (
        <div className="flex items-center gap-2 border-b px-3 py-1.5 font-mono text-2xs">
          <Database className="size-3.5 text-cyan-400" />
          <span className="text-foreground">{db.name}</span>
          <span className="text-muted-foreground">{db.dialect}</span>
        </div>
      )}
      <ScrollArea className="min-h-0 flex-1">
        <ul className="py-1" aria-label="Database schema">
          {tables.map((t) => (
            <TableNode
              key={t.name}
              table={t}
              open={open.has(t.name) || (filter.length > 1 && !t.name.includes(filter.toLowerCase()))}
              onToggle={() => toggle(t.name)}
              retrieved={injected.get(t.name)}
              dimmed={injected.size > 0 && !injected.has(t.name)}
              onInsert={onInsert}
            />
          ))}
        </ul>
      </ScrollArea>
      {schema && (
        <div className="border-t px-3 py-1.5 font-mono text-2xs text-muted-foreground" title="Qdrant collection">
          idx {schema.indexed_collection}
        </div>
      )}
    </div>
  );
}

function TableNode({
  table,
  open,
  onToggle,
  retrieved,
  dimmed,
  onInsert,
}: {
  table: TableMeta;
  open: boolean;
  onToggle: () => void;
  retrieved: RetrievedTable | undefined;
  dimmed: boolean;
  onInsert: (text: string) => void;
}) {
  return (
    <li>
      <Collapsible open={open} onOpenChange={onToggle}>
        <div className="group flex items-center">
          {/* Collapsible trigger = disclosure button (aria-expanded/aria-controls set by Radix). */}
          <CollapsibleTrigger
            className={cn(
              "flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1 text-left font-mono text-xs hover:bg-accent",
              dimmed && "text-muted-foreground",
            )}
            aria-label={`${table.name}, ${table.row_count} rows${retrieved ? `, in context (${retrieved.reason})` : ""}`}
          >
            <ChevronRight className={cn("size-3 shrink-0 text-muted-foreground transition-transform", open && "rotate-90")} />
            <Table2 className={cn("size-3.5 shrink-0", retrieved ? "text-cyan-400" : "text-muted-foreground")} />
            <span className="truncate">{table.name}</span>
            <span className="ml-auto pl-2 text-2xs text-muted-foreground">{fmt.int(table.row_count)}</span>
          </CollapsibleTrigger>
          {retrieved && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant={retrieved.reason === "join_path" || retrieved.reason === "fk_neighbor" ? "violet" : "info"} className="mr-2">
                  {REASON_LABEL[retrieved.reason]}
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="right">
                score {retrieved.score.toFixed(3)} · {retrieved.reason}
                {retrieved.via.length > 0 && <> · via {retrieved.via.join(" ↔ ")}</>}
                {retrieved.matched_columns.length > 0 && <> · cols {retrieved.matched_columns.join(", ")}</>}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <CollapsibleContent>
          {table.description && <p className="py-0.5 pl-9 pr-3 text-2xs text-muted-foreground">{table.description}</p>}
          <ul aria-label={`${table.name} columns`}>
            {table.columns.map((c) => (
              <li key={c.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onDoubleClick={() => onInsert(`${table.name}.${c.name}`)}
                      className="flex w-full items-center gap-1.5 py-[3px] pl-9 pr-3 text-left font-mono text-2xs hover:bg-accent"
                    >
                      {c.primary_key ? (
                        <KeyRound className="size-3 shrink-0 text-amber-400" aria-label="primary key" />
                      ) : c.foreign_key ? (
                        <Link2 className="size-3 shrink-0 text-violet-400" aria-label="foreign key" />
                      ) : (
                        <span className="size-3 shrink-0" />
                      )}
                      <span className="truncate text-foreground">{c.name}</span>
                      <span className="ml-auto shrink-0 pl-2 uppercase text-muted-foreground">{c.type.toLowerCase()}</span>
                      {!c.nullable && !c.primary_key && <span className="shrink-0 text-muted-foreground">!</span>}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="space-y-0.5">
                    <div>
                      {table.name}.{c.name} · {c.type}
                      {c.nullable ? " · nullable" : " · not null"}
                    </div>
                    {c.foreign_key && (
                      <div className="text-violet-300">
                        → {c.foreign_key.ref_table}.{c.foreign_key.ref_column}
                      </div>
                    )}
                    {c.description && <div className="text-muted-foreground">{c.description}</div>}
                    {c.sample_values.length > 0 && <div className="text-muted-foreground">values: {c.sample_values.join(", ")}</div>}
                    <div className="text-muted-foreground">double-click to insert</div>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
