# QueryPilot: Text-to-SQL Analytics

**Live demo:** https://aryan23g.github.io/querypilot/

QueryPilot answers business questions in plain English. It reads the question into a query plan, compiles the plan to SQLite, runs it through a five-layer read-only guard, and answers with a sentence, a table and a validated chart.

Everything runs in the browser. It is **free, needs no API key or account, and has no backend**: SQLite (compiled to WebAssembly) lives in a Web Worker, and the NL→SQL engine is plain TypeScript.

```
question ──► parse ──► query plan ──► compile ──► SQL
                                                   │
answer ◄── chart validator ◄── result ◄── SQLite worker ◄── bytecode check ◄── static guard
                                         (query_only, row cap, 4s kill)
```

## The engine (`src/local/nl2sql.ts`)

A deterministic semantic parser. It does no LLM call and needs no model download.

- **Parse:** the question becomes a plan made of:
  - a **measure**: revenue, orders, average order value, units, units per order, orders per customer, gross margin and margin %, return and cancellation rate, customers (active customers when a period is given), new customers, rating, reviews, shipping (total or average), discount, or price;
  - up to two **groupings**: week, month, quarter, year, weekday, category, product, channel, country, city, segment, status, customer, or rating;
  - **filters**: years, quarters, halves ("H1"), months, seasons ("summer", "holiday season"), product types ("tents", "hiking boots"), and real values loaded from the database, including negation ("helmets excluding bike helmets");
  - an optional **ranking**: "top 5", "cheapest", "which 5", and a minimum group size ("with at least 20 reviews").
- **Compile:** the plan is compiled to SQL from a fixed join graph.
- **Run:** that SQL goes through the five-layer guard, exactly like a query typed into the SQL console.
- **Answer:** the reply is written from the actual result rows.

The trace shows exactly how the question was understood. Values in the SQL come from the database vocabulary, never from the user's text.

Beyond single aggregates, a plan can be one of five **multi-step shapes**, each compiled to a CTE around the same aggregate builder:

| Shape | Example | SQL |
|---|---|---|
| growth | "which month had the biggest revenue growth" | `LAG()` over a per-period aggregate |
| growth by group | "fastest growing category" | per (group, year) aggregate pivoted to two years |
| top per group | "best selling product in each category" | `ROW_NUMBER() OVER (PARTITION BY …)` |
| share of a subset | "mobile's share of orders in Q4 2024 vs Q4 2025" | conditional sum / total |
| retention | "customer retention from 2024 to 2025", "repeat customers" | cohort CTEs with `LEFT JOIN` |

**Declined instead of guessed:** questions asking *why*, for a forecast, for a relationship between two measures ("do pricier products rate better?"), for several measures at once, or to search review text get an explanation and suggestions rather than a plausible-looking wrong number. SQL typed into the question box is pointed to the SQL console.

**Curated examples (`src/demo.ts`):** two sample questions the engine deliberately declines (several measures at once, price vs. rating) are answered with hand-written SQL, labelled as such in the UI. They still go through the same guard, checks and chart validator.

## Read-only by design: five layers (`src/guard.ts`, `src/db/engine.ts`)

| # | Layer | What it does |
|---|-------|--------------|
| 1 | Static guard | Real tokenizer (strings, quoted identifiers, comments). Exactly one statement, must start with `SELECT`/`WITH`, no write/DDL/transaction/`PRAGMA` keywords, no risky functions (`load_extension`, `readfile`, ...), and every table after `FROM`/`JOIN` must be allowlisted or a CTE. `sqlite_*` internals are blocked. |
| 2 | Bytecode verification | Compiles the query with `EXPLAIN` and inspects SQLite's VDBE program. It rejects write opcodes, write transactions, row writes to anything but ephemeral cursors, and any `OpenRead` on a b-tree outside the allowlisted tables (which also covers `sqlite_schema`). This checks what SQLite would actually run, not what the text looks like. |
| 3 | Read-only connection | `PRAGMA query_only = 1`: SQLite itself refuses writes. |
| 4 | Resource limits | Rows are capped while stepping. A 4-second timeout terminates and respawns the worker, because sql.js has no interrupt. |
| 5 | Sandbox | In-memory database rebuilt from a fixed seed. |

Layer 2 is tested on its own, as if layer 1 had a bug, and so is layer 3 (`test/engine.test.ts`). The SQL console on the page runs hand-written SQL through the same pipeline, with one-click attack examples.

## Charts (`src/viz.ts`)

The engine proposes a chart (line, bar, pie, scatter, KPI or table). The proposal is validated against the real result: do the columns exist, are the measures numeric, is the x-axis temporal, is the row count sensible for that chart type. If it doesn't fit, a deterministic heuristic picks the chart instead. CSV export protects against spreadsheet formula injection.

## Dataset (`src/db/seed.ts`)

"Orbit Outfitters" is a made-up outdoor-gear store generated from a fixed seed, so every run sees identical numbers: 600 customers, 49 products, ~4.9k orders, ~10k line items, ~2.9k reviews (2024 to 2025). The data has realistic patterns to find: monthly growth, holiday peaks, summer seasonality by category, a mobile channel that grows over time, category-specific return rates and per-product quality.

## Tests and evaluation

```bash
npm ci
npm test            # 181 tests: guard, bytecode layer, engine, charts, eval set, NL→SQL engine
npm run typecheck
npm run build       # bundles src/ into dist/ (committed, since GitHub Pages serves it directly)
```

`eval/questions.json` is a 20-question execution-accuracy benchmark (easy, medium and hard: window functions, retention, margin, per-group top-1) with gold SQL. The engine answers **all 20 correctly**, and a test enforces it. Another 47 phrasings that are not in the eval set (39 aggregates, 8 multi-step) are each checked against independently written gold SQL. `eval/compare.ts` compares results while ignoring column names and order, with a small numeric tolerance and fraction-vs-percent equivalence.

CI (`.github/workflows/querypilot.yml`) runs typecheck, tests, and a check that the committed bundle is up to date.

## Project layout

```
src/
  local/nl2sql.ts NL→SQL engine (parse → plan → SQL → answer)
  guard.ts        tokenizer + static SQL guard (layer 1)
  viz.ts          chart inference/validation, CSV, formatting
  demo.ts         curated examples + guard "attack" examples
  main.ts         browser UI
  db/
    schema.ts     tables + data dictionary
    seed.ts       deterministic data generator
    engine.ts     bytecode verification + execution (layers 2-4)
    worker.ts     Web Worker host for SQLite/WASM
    client.ts     worker RPC with timeout/kill/respawn
test/             Vitest suites
eval/             questions.json (gold SQL), compare.ts
```
