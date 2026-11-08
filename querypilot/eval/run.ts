/**
 * Live evaluation: runs every question in questions.json through the real
 * agent (real Claude API, real guarded SQLite engine) and scores execution
 * accuracy against the gold SQL.
 *
 *   ANTHROPIC_API_KEY=... npm run eval                 # all questions, default model
 *   ANTHROPIC_API_KEY=... npm run eval -- --model claude-haiku-5-5 --only h0
 *
 * Writes a JSON report to eval/results/. Costs real API tokens.
 */
import Anthropic from "@anthropic-ai/sdk";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import initSqlJs from "sql.js";
import { DEFAULT_MODEL, runAgent, type MessageParam, type QueryExecutor } from "../src/agent.ts";
import { Engine } from "../src/db/engine.ts";
import { resultsMatch } from "./compare.ts";

interface Question { id: string; difficulty: string; question: string; gold: string; ordered?: boolean }

const args = process.argv.slice(2);
const arg = (name: string) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const model = arg("model") ?? DEFAULT_MODEL;
const only = arg("only");

const questions = (JSON.parse(readFileSync(new URL("./questions.json", import.meta.url), "utf8")) as Question[])
  .filter((q) => !only || q.id.startsWith(only));

const SQL = await initSqlJs();
const engine = new Engine(new SQL.Database());
const executor: QueryExecutor = { execute: async (s) => engine.execute(s), sampleValues: async (t, c) => engine.sampleValues(t, c) };
const client = new Anthropic();

const rows: Record<string, unknown>[] = [];
let correct = 0;
const totals = { input: 0, output: 0, cacheRead: 0, steps: 0, guardRejections: 0, sqlErrors: 0, ms: 0 };

for (const q of questions) {
  const gold = engine.execute(q.gold);
  if (!gold.ok) throw new Error(`Gold SQL for ${q.id} failed: ${gold.error}`);
  let guardRejections = 0, sqlErrors = 0;
  const t0 = performance.now();
  const history: MessageParam[] = [];
  const res = await runAgent({
    client, executor, question: q.question, history, model, rowCounts: engine.rowCounts,
    onEvent: (e) => {
      if (e.type === "tool_result" && !e.outcome.ok) e.outcome.stage === "sqlite" ? sqlErrors++ : guardRejections++;
    },
  });
  const ms = Math.round(performance.now() - t0);
  const verdict = res.answer
    ? resultsMatch(gold.result, res.answer.outcome.result, q.ordered)
    : { match: false, reason: res.error };
  if (verdict.match) correct++;
  totals.input += res.usage.input + res.usage.cacheWrite; totals.output += res.usage.output; totals.cacheRead += res.usage.cacheRead;
  totals.steps += res.answer?.steps ?? 0; totals.guardRejections += guardRejections; totals.sqlErrors += sqlErrors; totals.ms += ms;
  rows.push({ id: q.id, difficulty: q.difficulty, match: verdict.match, reason: verdict.reason, steps: res.answer?.steps, ms, sql: res.answer?.sql, answer: res.answer?.answer, sqlErrors, guardRejections });
  console.log(`${verdict.match ? "PASS" : "FAIL"}  ${q.id.padEnd(4)} ${(ms / 1000).toFixed(1).padStart(5)}s  ${q.question}${verdict.match ? "" : `\n      -> ${verdict.reason}`}`);
}

const byDifficulty = Object.fromEntries(
  ["easy", "medium", "hard"].map((d) => {
    const subset = rows.filter((r) => r.difficulty === d);
    return [d, `${subset.filter((r) => r.match).length}/${subset.length}`];
  }),
);
const summary = {
  model,
  date: new Date().toISOString(),
  accuracy: `${correct}/${questions.length} (${((correct / questions.length) * 100).toFixed(1)}%)`,
  byDifficulty,
  avgSteps: +(totals.steps / questions.length).toFixed(2),
  avgSeconds: +(totals.ms / questions.length / 1000).toFixed(1),
  selfCorrections: { sqlErrors: totals.sqlErrors, guardRejections: totals.guardRejections },
  tokens: totals,
};
console.log("\n" + JSON.stringify(summary, null, 2));
mkdirSync(new URL("./results/", import.meta.url), { recursive: true });
writeFileSync(new URL(`./results/${model}-${Date.now()}.json`, import.meta.url), JSON.stringify({ summary, rows }, null, 2));
