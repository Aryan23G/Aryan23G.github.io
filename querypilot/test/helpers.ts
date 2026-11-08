import initSqlJs from "sql.js";
import { Engine } from "../src/db/engine.ts";

let cached: Engine | undefined;
export async function getEngine(): Promise<Engine> {
  if (!cached) {
    const SQL = await initSqlJs();
    cached = new Engine(new SQL.Database());
  }
  return cached;
}
