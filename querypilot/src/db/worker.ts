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
  | { id: number; type: "execute"; sql: string; maxRows?: number };

let engine: Engine | undefined;
const ready = initSqlJs({ locateFile: () => new URL("../vendor/sql-wasm.wasm", self.location.href).href }).then((SQL) => {
  engine = new Engine(new SQL.Database());
  return engine;
});

self.onmessage = async (ev: MessageEvent<WorkerRequest>) => {
  const msg = ev.data;
  try {
    const e = await ready;
    const result = msg.type === "init" ? { rowCounts: e.rowCounts, stats: e.stats } : e.execute(msg.sql, msg.maxRows);
    (self as unknown as Worker).postMessage({ id: msg.id, result });
  } catch (err) {
    (self as unknown as Worker).postMessage({ id: msg.id, error: (err as Error).message });
  }
};
