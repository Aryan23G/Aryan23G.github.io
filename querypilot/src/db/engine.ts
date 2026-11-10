/**
 * Query engine shared by the browser Web Worker and the tests.
 *
 * Defence in depth for "a query can only read":
 *   Layer 1  guardSql()          static token-level rules + table allowlist
 *   Layer 2  verifyBytecode()    compiles the query with EXPLAIN and inspects the
 *                                SQLite VDBE program: rejects any write opcode, write
 *                                transaction, cursor on a non-allowlisted b-tree
 *                                (incl. sqlite_schema) and denylisted functions
 *   Layer 3  PRAGMA query_only   the connection itself refuses writes
 *   Layer 4  resource limits     row cap while stepping + worker timeout (client.ts)
 *   Layer 5  sandbox             in-memory DB rebuilt from a seed; nothing to corrupt
 */
import type { Database, SqlValue } from "sql.js";
import { guardSql, FORBIDDEN_FUNCTIONS, type GuardResult } from "../guard.ts";
import { TABLE_NAMES } from "./schema.ts";
import { seedDatabase, type SeedStats } from "./seed.ts";

export interface QueryResult {
  columns: string[];
  rows: SqlValue[][];
  rowCount: number;
  truncated: boolean;
  elapsedMs: number;
}

export interface CheckReport {
  name: string;
  passed: boolean;
  detail?: string;
}

export type ExecOutcome =
  | { ok: true; result: QueryResult; checks: CheckReport[]; sql: string }
  | { ok: false; stage: "guard" | "bytecode" | "sqlite" | "timeout"; error: string; checks: CheckReport[] };

/**
 * Row-level write opcodes. SQLite legitimately uses these on *ephemeral* cursors
 * (temp b-trees for DISTINCT, GROUP BY, sorting, materialised CTEs), so they're
 * allowed only when their cursor (p1) was opened by one of EPHEMERAL_OPENERS.
 */
const CURSOR_WRITE_OPCODES = new Set(["Insert", "Delete", "IdxInsert", "IdxDelete", "SorterInsert"]);
const EPHEMERAL_OPENERS = new Set(["OpenEphemeral", "OpenAutoindex", "SorterOpen", "OpenPseudo", "OpenDup"]);

/** VDBE opcodes that modify the database or schema. Always rejected. */
const WRITE_OPCODES = new Set([
  "OpenWrite", "Destroy", "Clear",
  "CreateBtree", "DropTable", "DropIndex", "DropTrigger", "ParseSchema", "SetCookie", "VUpdate",
  "Vacuum", "IncrVacuum", "JournalMode", "VCreate", "VDestroy", "LoadAnalysis", "Expire", "ResetCount",
  "VOpen", "Pagecount", "MaxPgcnt", "TableLock",
]);

const DEFAULT_MAX_ROWS = 1000;

export class Engine {
  readonly allowedRoots: Map<number, string> = new Map();
  readonly stats: SeedStats;
  rowCounts: Record<string, number> = {};

  constructor(private db: Database) {
    this.stats = seedDatabase(db);
    // Map b-tree root pages -> object name for every allowlisted table and its indexes.
    const res = db.exec("SELECT name, tbl_name, rootpage FROM sqlite_schema WHERE rootpage > 0");
    for (const [name, tbl, root] of res[0]?.values ?? []) {
      if (TABLE_NAMES.includes(String(tbl))) this.allowedRoots.set(Number(root), String(name));
    }
    for (const t of TABLE_NAMES) {
      this.rowCounts[t] = Number(db.exec(`SELECT count(*) FROM ${t}`)[0]!.values[0]![0]);
    }
    db.run("PRAGMA query_only = 1");
  }

  verifyBytecode(sql: string): { ok: true; opcodes: number } | { ok: false; error: string } {
    let program;
    try {
      program = this.db.exec(`EXPLAIN ${sql}`)[0];
    } catch (e) {
      return { ok: false, error: `SQL error: ${(e as Error).message}` };
    }
    if (!program) return { ok: false, error: "Query compiled to an empty program." };
    const col = (name: string) => program.columns.indexOf(name);
    const [iOp, iP1, iP2, iP3, iP4] = [col("opcode"), col("p1"), col("p2"), col("p3"), col("p4")];
    const ephemeral = new Set<number>();
    for (const row of program.values) {
      const op = String(row[iOp]);
      if (EPHEMERAL_OPENERS.has(op)) ephemeral.add(Number(row[iP1]));
    }
    for (const row of program.values) {
      const op = String(row[iOp]);
      if (CURSOR_WRITE_OPCODES.has(op) && !ephemeral.has(Number(row[iP1]))) {
        return { ok: false, error: `Bytecode check: "${op}" targets a persistent table.` };
      }
      if (WRITE_OPCODES.has(op)) return { ok: false, error: `Bytecode check: write operation "${op}" detected.` };
      if (op === "Transaction" && Number(row[iP2]) !== 0) return { ok: false, error: "Bytecode check: query requests a write transaction." };
      if (op === "OpenRead" || op === "ReopenIdx") {
        const root = Number(row[iP2]);
        const dbIndex = Number(row[iP3]);
        if (dbIndex !== 0 || !this.allowedRoots.has(root)) {
          return { ok: false, error: `Bytecode check: query reads a b-tree (root page ${root}) outside the allowlisted tables.` };
        }
      }
      if (op === "Function" || op === "PureFunc" || op === "AggStep" || op === "AggFinal") {
        const fname = String(row[iP4] ?? "").split("(")[0]!.toUpperCase();
        if (FORBIDDEN_FUNCTIONS.has(fname)) return { ok: false, error: `Bytecode check: function ${fname.toLowerCase()}() is not allowed.` };
      }
    }
    return { ok: true, opcodes: program.values.length };
  }

  execute(sql: string, maxRows = DEFAULT_MAX_ROWS): ExecOutcome {
    const guard: GuardResult = guardSql(sql, TABLE_NAMES);
    const checks: CheckReport[] = [...guard.checks];
    if (!guard.ok) return { ok: false, stage: "guard", error: guard.reason!, checks };

    const bc = this.verifyBytecode(guard.sql!);
    checks.push({ name: "bytecode verification", passed: bc.ok, detail: bc.ok ? `${bc.opcodes} VDBE ops, no writes` : bc.error });
    if (!bc.ok) return { ok: false, stage: bc.error.startsWith("SQL error") ? "sqlite" : "bytecode", error: bc.error, checks };

    const t0 = performance.now();
    let stmt;
    try {
      stmt = this.db.prepare(guard.sql!);
      const columns = stmt.getColumnNames();
      const rows: SqlValue[][] = [];
      let truncated = false;
      while (stmt.step()) {
        if (rows.length >= maxRows) { truncated = true; break; }
        rows.push(stmt.get());
      }
      checks.push({ name: "row limit", passed: true, detail: truncated ? `capped at ${maxRows} rows` : `${rows.length} rows` });
      return {
        ok: true,
        sql: guard.sql!,
        checks,
        result: { columns, rows, rowCount: rows.length, truncated, elapsedMs: Math.round((performance.now() - t0) * 10) / 10 },
      };
    } catch (e) {
      return { ok: false, stage: "sqlite", error: `SQL error: ${(e as Error).message}`, checks };
    } finally {
      stmt?.free();
    }
  }
}
