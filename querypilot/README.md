# QueryPilot: Text-to-SQL Analytics Agent

**Live demo:** https://aryan23g.github.io/querypilot/

QueryPilot answers business questions in plain English. A Claude agent explores the schema, writes SQLite, reads the result, fixes its own mistakes and submits an answer with a chart. Every query the model writes goes through a five-layer read-only guard before it touches data, and customer PII never reaches the model.

It runs entirely in the browser and is **free to use with no API key**: SQLite (compiled to WebAssembly) lives in a Web Worker, and questions are answered by a built-in local NL→SQL engine. Visitors who add their own Anthropic key get the Claude agent for open-ended, multi-step questions.

| Mode | Cost | Handles |
|---|---|---|
| **Local engine** (default, no key) | Free, offline, instant | Aggregates: measures × groupings × filters × rankings, e.g. "revenue by month in 2025", "top 5 products by units", "return rate by category", "Canada vs United States" |
| **Claude agent** (your key) | Your API usage | Anything, including multi-step analysis and follow-ups |

```
question ──► Claude (tool loop) ──► run_sql / get_column_values / submit_answer
                  ▲                         │
                  │  results, SQL errors,   ▼
                  │  guard rejections   PII shield (restore placeholders)
                  │                         │
                  └──── masked preview ◄── guard ─► bytecode check ─► SQLite worker
                                                                    (query_only, row cap, 4s kill)
answer ◄── chart validator ◄── full result (real values, shown only to the user)
```

## Free local engine (`src/local/nl2sql.ts`)

A deterministic semantic parser. It does no LLM call and needs no model download.
- **Parse:** the question becomes a plan made of:
  - a **measure**: revenue, orders, average order value, units, gross margin and margin %, return and cancellation rate, customers, new customers, rating, reviews, shipping, discount, or price;
  - up to two **groupings**: month, quarter, year, weekday, category, product, channel, country, city, segment, status, customer, or rating;
  - **filters**: years, quarters, months, and real values loaded from the database, including negation ("excluding Footwear");
  - an optional **ranking**: "top 5", "cheapest", "which 5", and a minimum group size ("with at least 20 reviews").
- **Compile:** the plan is compiled to SQL from a fixed join graph.
- **Run:** that SQL goes through the same five-layer guard as the agent.
- **Answer:** the reply is written from the actual result rows.

The trace shows exactly how the question was understood. Values in the SQL come from the database vocabulary, never from the user's text.

Multi-step analyses (growth between periods, retention, top-N within each group, the share of a filtered subset, why/forecast questions) are **declined with an explanation** instead of answered with a guess.

On the 20-question eval set written for the Claude agent, the local engine answers 16 correctly and declines the other 4, with 0 wrong answers. A test enforces this.

## How the agent works (`src/agent.ts`)

* **Schema-grounded prompt.** A data dictionary (`src/db/schema.ts`) with column meanings, allowed values, date range and the store's revenue definition goes into a cached system prompt.
* **Three tools:**
  * `run_sql`: run one guarded SELECT and get columns, row count and a 25-row preview.
  * `get_column_values`: distinct values and frequencies, so filters use real values (`'returned'`, not `'Returned'`).
  * `submit_answer`: final SQL + plain-English answer + chart spec. The SQL is executed again through the guard. If it fails, the error goes back to the model.
* **Self-correction.** SQL errors and guard rejections come back as `is_error` tool results, so the model can repair the query. A step budget (10) bounds the loop.
* **Conversation memory.** Follow-up questions ("now split that by channel") continue the same message history. On any failure, history is rolled back to the last complete turn so the conversation stays valid.
* **Model setup:** Claude Opus 5.5 by default (Sonnet 5.5 and Haiku 5.5 selectable), adaptive thinking, strict tool schemas, prompt caching, server-side refusal fallback.

## Read-only by design: five layers (`src/guard.ts`, `src/db/engine.ts`)

| # | Layer | What it does |
|---|-------|--------------|
| 1 | Static guard | Real tokenizer (strings, quoted identifiers, comments). Exactly one statement, must start with `SELECT`/`WITH`, no write/DDL/transaction/`PRAGMA` keywords, no risky functions (`load_extension`, `readfile`, ...), and every table after `FROM`/`JOIN` must be allowlisted or a CTE. `sqlite_*` internals are blocked. |
| 2 | Bytecode verification | Compiles the query with `EXPLAIN` and inspects SQLite's VDBE program. It rejects write opcodes, write transactions, row writes to anything but ephemeral cursors, and any `OpenRead` on a b-tree outside the allowlisted tables (which also covers `sqlite_schema`). This checks what SQLite would actually run, not what the text looks like. |
| 3 | Read-only connection | `PRAGMA query_only = 1`: SQLite itself refuses writes. |
| 4 | Resource limits | Rows are capped while stepping. A 4-second timeout terminates and respawns the worker, because sql.js has no interrupt. |
| 5 | Sandbox | In-memory database rebuilt from a fixed seed. The prompt treats tool output as data, never as instructions. |

Layer 2 is tested on its own, as if layer 1 had a bug, and so is layer 3 (`test/engine.test.ts`).

## PII shield (`src/pii.ts`)

Customer names and emails are replaced by stable placeholders (`CUSTOMER_NAME_12`, `CUSTOMER_EMAIL_40`) in everything the model sees: query previews, error messages and the user's question. Masking works on values, so it holds no matter how the model aliases or joins columns. Placeholders the model writes into SQL are swapped back to real values just before execution, and the ones in its answer text are swapped back before display. The user sees real names in the chart and table. A test sends a whole conversation through the agent and checks that no real name or email appears in any request to the model.

## Charts (`src/viz.ts`)

The model proposes a chart (line, bar, pie, scatter, KPI or table). The proposal is validated against the real result: do the columns exist, are the measures numeric, is the x-axis temporal, is the row count sensible for that chart type. If it doesn't fit, a deterministic heuristic picks the chart instead. CSV export protects against spreadsheet formula injection.

## Dataset (`src/db/seed.ts`)

"Orbit Outfitters" is a made-up outdoor-gear store generated from a fixed seed, so every run sees identical numbers: 600 customers, 49 products, ~4.9k orders, ~10k line items, ~2.9k reviews (2024 to 2025). The data has realistic patterns to find: monthly growth, holiday peaks, summer seasonality by category, a mobile channel that grows over time, category-specific return rates and per-product quality.

## Tests and evaluation

```bash
npm ci
npm test            # 171 tests: guard, bytecode layer, engine, PII shield, agent loop (mocked model), charts, eval set, local engine
npm run typecheck
npm run build       # bundles src/ into dist/ (committed, since GitHub Pages serves it directly)
```

`eval/` holds a 20-question execution-accuracy benchmark (easy, medium and hard: window functions, retention, margin, per-group top-1) with gold SQL. The harness runs the real agent against the real engine and compares results. It ignores column names and order, and allows a small numeric tolerance and fraction-vs-percent differences.

```bash
ANTHROPIC_API_KEY=... npm run eval                              # default model
ANTHROPIC_API_KEY=... npm run eval -- --model claude-haiku-5-5  # compare models
```

It reports accuracy by difficulty, average steps and latency, self-corrections and token usage, and writes a JSON report to `eval/results/`. CI (`.github/workflows/querypilot.yml`) runs typecheck, tests, and a check that the committed bundle is up to date.

## Project layout

```
src/
  agent.ts        Claude tool-use loop, prompt, tool schemas
  guard.ts        tokenizer + static SQL guard (layer 1)
  pii.ts          PII placeholder shield
  viz.ts          chart inference/validation, CSV, formatting
  demo.ts         scripted demo questions + guard "attack" examples
  local/nl2sql.ts free local NL→SQL engine (parse → plan → SQL → answer)
  main.ts         browser UI
  db/
    schema.ts     tables + data dictionary
    seed.ts       deterministic data generator
    engine.ts     bytecode verification + execution (layers 2-4)
    worker.ts     Web Worker host for SQLite/WASM
    client.ts     worker RPC with timeout/kill/respawn
test/             Vitest suites
eval/             questions.json, compare.ts, run.ts
```

## Privacy note

No key is needed. If you add one, the API key is kept in `sessionStorage` for the current tab and is only sent to `api.anthropic.com`. There is no backend.
