/// <reference lib="webworker" />
/**
 * Web Worker that owns the SQLite (WASM) database. Running queries off the
 * main thread keeps the UI responsive and, more importantly, lets the client
 * enforce a hard timeout by terminating the worker: sql.js has no interrupt,
 * so a runaway query (e.g. a huge cross join) is killed from outside.
 */
import initSqlJs from "sql.js";
import { Engine } from "./engine.ts";

export type WorkerRequest =
  | { id: number; type: "init" }
  | { id: number; type: "execute"; sql: string; maxRows?: number }
  | { id: number; type: "sample"; table: string; column: string };

let engine: Engine | undefined;
const ready = initSqlJs({ locateFile: () => new URL("../vendor/sql-wasm.wasm", self.location.href).href }).then((SQL) => {
  engine = new Engine(new SQL.Database());
  return engine;
});

self.onmessage = async (ev: MessageEvent<WorkerRequest>) => {
  const msg = ev.data;
  try {
    const e = await ready;
    let result: unknown;
    if (msg.type === "init") result = { rowCounts: e.rowCounts, stats: e.stats, pii: e.piiValues() };
    else if (msg.type === "execute") result = e.execute(msg.sql, msg.maxRows);
    else result = e.sampleValues(msg.table, msg.column);
    (self as unknown as Worker).postMessage({ id: msg.id, result });
  } catch (err) {
    (self as unknown as Worker).postMessage({ id: msg.id, error: (err as Error).message });
  }
};
