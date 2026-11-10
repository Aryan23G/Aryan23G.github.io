# SentinelDesk: project memory

Agentic AI ticket triage: a Claude tool-use agent investigates IT tickets; a deterministic guardrail
has the final word; tickets arrive from the web demo, the HTTP API, or ServiceNow.
Read `task/lessons.md` before starting work. Add a rule there after every bug or correction.

## Commands (run from the repo root)

| Task | Command |
|---|---|
| Install | `npm ci` |
| Typecheck | `npm run typecheck` |
| All tests | `npm test` (vitest; no network, no API key) |
| One file | `npx vitest run test/agent.test.ts` |
| Eval, rules only | `npm run eval` |
| Eval with Claude | `ANTHROPIC_API_KEY=... npm run eval -- --claude` (costs money; ask first) |
| Dev server | `npm run dev` → http://localhost:8787 (page + API; rules-only without a key) |
| Build | `npm run build` (`dist/app.js` is committed; `dist-server/` is not) |
| ServiceNow batch | `npm run sn:sync -- --limit 5 --dry-run` |

Definition of done: `npm run typecheck && npm test && npm run build:web` pass, and `git diff --stat dist`
shows a rebuilt bundle whenever `src/core` or `src/web` changed (CI fails on a stale bundle).

## Local edition (`local/`, Python): the default way to run SentinelDesk

**Cost rule: nothing in this project may call a paid service by default.** The local edition uses
Ollama on loopback only. The TypeScript server calls Claude only if someone sets `ANTHROPIC_API_KEY`
themselves; never set it, and never add a default that would.

| Task | Command (from `local/`) |
|---|---|
| Setup | `python3 -m venv .venv && .venv/bin/pip install -r requirements-dev.txt` |
| Tests | `.venv/bin/python -m pytest -q` (fake Ollama; no model needed) |
| Checks only | `.venv/bin/python run.py --check` |
| Run | `.venv/bin/python run.py --open` → http://127.0.0.1:8765 |

Layout: `rules.py` (port of src/core; keep it in parity, see lesson 9), `guardrail.py`, `ollama_client.py`,
`council.py` (Security/Sentiment/Intent in parallel → Chairman → guardrail), `db.py` (SQLite, WAL,
atomic claim), `worker.py`, `web.py` (FastAPI + SSE), `static/dashboard.html` (no external assets), `run.py`.
Local-only invariants: model URL and dashboard host must be loopback (`config.py`); `requests` sessions
use `trust_env=False`; the dashboard HTML contains no `http(s)://` URL (tested).

## Architecture (do not break these boundaries)

```
src/core/     pure TS, no Node/DOM imports. Runs on the server AND in the browser bundle.
              scanner, sender, knowledge, tools, rules (offline triage), policy (guardrail), types
src/server/   Node only. agent.ts (Claude loop), pipeline.ts (cache/budget/agent/fallback),
              app.ts (Express), limits.ts, servicenow.ts, ingest/ (queue, webhook, poller, store), config.ts
src/web/      browser only. Bundled to dist/app.js for GitHub Pages.
integrations/ code that runs inside other systems (ServiceNow Business Rule, ES5/Rhino; not typechecked).
```

Invariants. Each one has a test; keep it that way.
1. **The guardrail decides last.** Every triage result produced with Claude goes through `enforcePolicy`. Evidence is recomputed from the raw ticket, never taken from the model.
2. **Security tools take no model input.** `scan_security_indicators` and `check_sender_domain` read the ticket held by the server.
3. **Fail closed.** The model may escalate; it may never de-escalate a detected attack. Attacks get no reply to the sender.
4. **Always degrade to rules.** Any Claude failure (error, refusal, budget, step limit) returns a rules-engine result with a `fallbackReason`. Never a 5xx for a valid ticket.
5. **Ticket text is untrusted data.** Escape it inside `<ticket>`; never interpolate it into instructions.
6. **Data pulled from ServiceNow is authoritative; webhook bodies are not.** Webhooks carry a `sys_id` only; the incident is fetched over the Table API.
7. **Idempotent ingestion.** One work note per incident: dedupe on `servicenow:<sys_id>` in the processed store before and after the work.
8. **Secrets** come only from env vars (`ANTHROPIC_API_KEY`, `SN_*`, `ADMIN_TOKEN`, `SN_WEBHOOK_SECRET`). Never log ticket bodies, secrets or provider error bodies.

## Claude API usage (src/server/agent.ts)

- Model from `SENTINEL_MODEL` (default `claude-opus-5-5`); effort from `SENTINEL_EFFORT` (default `low`).
- `client.beta.messages.create` with `fallbacks: "default"` + beta `server-side-fallback-2026-07-01` only for models in `FALLBACK_MODELS`.
- No `thinking` param (Opus 5.5 is adaptive), no `budget_tokens`, no forced `tool_choice` (400 on Opus 5.5); steer with the prompt plus `strict: true` tools.
- Message history is append-only: push `response.content` unchanged; all tool results for a turn go in one user message.
- Use SDK types (`Anthropic.Beta.Messages.*`); don't redefine them.

## Code style

- TypeScript strict + `noUncheckedIndexedAccess`; ESM; relative imports end in `.ts`.
- No placeholders, stubs or TODO comments. Write complete code or don't write it.
- Comments explain *why* (security reasoning, trade-offs), not what.
- Dependency injection for anything with I/O or time (`fetchImpl`, `now`, `sleep`, `client`) so tests run offline and deterministic.
- Errors: typed error classes (`ServiceNowError`, `ToolInputError`); map them to HTTP status codes at the edge in `app.ts`.
- Env vars are namespaced (`SENTINEL_*`, `SN_*`) and parsed and validated only in `config.ts`.

## Testing rules

- Every new module ships with a test file in `test/`. Use `test/helpers.ts` (`FakeClient`, `message`, `toolUse`) for the agent.
- Security behaviour is tested against a *compromised* model (see `test/injection.test.ts`), not a cooperative one.
- HTTP tests start the real Express app on port 0 and use `fetch`.
- Before writing an assertion about scanner output, run the scanner on that input; don't assume what the regexes match.
