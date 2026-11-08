"use client";

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BarChart, LineChart } from "@tremor/react";
import { ArrowDown, ArrowUp, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ColumnMeta, JsonScalar } from "@/lib/types";
import { cn, download, fmt, toCsv } from "@/lib/utils";

export interface ResultSet {
  source: "agent" | "override";
  columns: ColumnMeta[];
  records: Record<string, JsonScalar>[];
  rowCount: number;
  truncated: boolean;
  executionMs: number;
}

type Row = Record<string, JsonScalar>;

function Cell({ value, type }: { value: JsonScalar; type: ColumnMeta["type"] }) {
  if (value === null) return <span className="italic text-zinc-600">NULL</span>;
  if (type === "number" && typeof value === "number") return <>{fmt.num(value)}</>;
  if (typeof value === "boolean") return <>{value ? "true" : "false"}</>;
  return <>{String(value)}</>;
}

/** Pick a chart only when the result shape supports one: one dimension + 1-4 numeric measures. */
function chartSpec(columns: ColumnMeta[], rowCount: number) {
  const dim = columns.find((c) => c.type === "string" || c.type === "date");
  const measures = columns.filter((c) => c.type === "number").map((c) => c.name).slice(0, 4);
  if (!dim || measures.length === 0 || rowCount < 2 || rowCount > 120) return null;
  return { index: dim.name, categories: measures, kind: dim.type === "date" ? ("line" as const) : ("bar" as const) };
}

export function ResultsTable({ result, emptyHint }: { result: ResultSet | null; emptyHint: string }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      {
        id: "__row",
        header: "#",
        cell: (ctx) => <span className="text-zinc-600">{ctx.row.index + 1}</span>,
        enableSorting: false,
        size: 44,
      },
      ...(result?.columns ?? []).map<ColumnDef<Row>>((c) => ({
        id: c.name,
        accessorFn: (row) => row[c.name],
        header: c.name,
        meta: { type: c.type },
        cell: (ctx) => <Cell value={ctx.getValue() as JsonScalar} type={c.type} />,
        sortingFn: c.type === "number" ? "basic" : "alphanumeric",
      })),
    ],
    [result?.columns],
  );
  const table = useReactTable({
    data: result?.records ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const spec = result ? chartSpec(result.columns, result.rowCount) : null;

  return (
    <Tabs defaultValue="grid" className="flex h-full min-h-0 flex-col">
      <div className="pane-header">
        <TabsList>
          <TabsTrigger value="grid">Result grid</TabsTrigger>
          <TabsTrigger value="chart" disabled={!spec}>
            Chart
          </TabsTrigger>
        </TabsList>
        {result && (
          <div className="flex items-center gap-2 font-mono normal-case tracking-normal">
            <Badge variant={result.source === "override" ? "warning" : "info"}>{result.source === "override" ? "manual override" : "agent"}</Badge>
            <span>
              <span className="text-foreground">{fmt.int(result.rowCount)}</span> rows{result.truncated && <span className="text-amber-400"> (capped)</span>}
            </span>
            <span>
              <span className="text-foreground">{result.columns.length}</span> cols
            </span>
            <span>
              db <span className="text-foreground">{fmt.ms(result.executionMs)}</span>
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => download("result.csv", toCsv(result.columns.map((c) => c.name), result.records))}
            >
              <Download /> CSV
            </Button>
          </div>
        )}
      </div>

      <TabsContent value="grid" className="min-h-0 flex-1 overflow-auto data-[state=inactive]:hidden">
        {!result ? (
          <p className="p-4 font-mono text-2xs text-muted-foreground">{emptyHint}</p>
        ) : (
          <table className="w-max min-w-full border-collapse font-mono text-2xs">
            <thead className="sticky top-0 z-10 bg-panel">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => {
                    const type = (h.column.columnDef.meta as { type?: string } | undefined)?.type;
                    const sorted = h.column.getIsSorted();
                    return (
                      <th
                        key={h.id}
                        scope="col"
                        onClick={h.column.getToggleSortingHandler()}
                        aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none"}
                        className={cn(
                          "select-none whitespace-nowrap border-b border-r px-2 py-1 text-left font-semibold text-muted-foreground",
                          h.column.getCanSort() && "cursor-pointer hover:text-foreground",
                          type === "number" && "text-right",
                        )}
                      >
                        <span className="inline-flex items-center gap-1">
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          {sorted === "asc" && <ArrowUp className="size-3" />}
                          {sorted === "desc" && <ArrowDown className="size-3" />}
                          {type && <span className="font-normal text-zinc-600">{type.slice(0, 3)}</span>}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="odd:bg-white/[0.015] hover:bg-accent">
                  {row.getVisibleCells().map((cell) => {
                    const type = (cell.column.columnDef.meta as { type?: string } | undefined)?.type;
                    return (
                      <td
                        key={cell.id}
                        className={cn(
                          "max-w-[28rem] truncate whitespace-nowrap border-b border-r border-border/60 px-2 py-[3px]",
                          (type === "number" || cell.column.id === "__row") && "text-right tabular-nums",
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </TabsContent>

      <TabsContent value="chart" className="min-h-0 flex-1 overflow-auto p-3 data-[state=inactive]:hidden">
        {spec && result && (
          <>
            {spec.kind === "line" ? (
              <LineChart
                className="h-full min-h-56"
                data={result.records}
                index={spec.index}
                categories={spec.categories}
                colors={["cyan", "amber", "emerald", "violet"]}
                valueFormatter={(v: number) => fmt.num(v)}
                yAxisWidth={64}
                showAnimation={false}
              />
            ) : (
              <BarChart
                className="h-full min-h-56"
                data={result.records}
                index={spec.index}
                categories={spec.categories}
                colors={["cyan", "amber", "emerald", "violet"]}
                valueFormatter={(v: number) => fmt.num(v)}
                yAxisWidth={64}
                showAnimation={false}
              />
            )}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
