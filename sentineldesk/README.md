# SentinelDesk: Agentic AI Service Desk

**Live demo:** https://aryan23g.github.io/sentineldesk/ (no API key needed)

SentinelDesk triages IT help-desk tickets. A Claude agent investigates each ticket with five tools and decides its priority, its routing and a reply grounded in the knowledge base. Some tickets are attacks: phishing, CEO fraud, banking-detail changes, or text written to trick the AI itself. A deterministic, rules-based guardrail re-checks every decision against the raw ticket and overrides the model when it detects one. A ServiceNow integration pulls live incidents over the Table API and writes the triage back as work notes.

```
 browser (GitHub Pages)                 SentinelDesk API (Node.js + Express on Render)
 ┌─────────────────────┐  POST /api/triage   ┌──────────────────────────────────────────────────────┐
 │ demo page           │ ──────────────────► │ validate ─► cache ─► rate limit ─► daily budget       │
 │ (no API key)        │ ◄── SSE: each tool  │                                     │                 │
 │                     │     call, result    │   Claude tool loop (src/server/agent.ts)              │
 │ fallback: the same  │                     │   scan_security_indicators  check_sender_domain       │
 │ rules engine, run   │                     │   search_knowledge_base     list_escalation_teams     │
 │ in the browser      │                     │   submit_triage ──► guardrail (src/core/policy.ts) ──►│ decision
 └─────────────────────┘                     │                       ▲ re-scans the raw ticket       │
                                             │ any failure ─► rules engine (src/core/rules.ts)       │
 ServiceNow PDI ◄── GET incidents / PATCH work_notes ── src/server/servicenow.ts ◄── admin routes / sync script
                                             └──────────────────────────────────────────────────────┘
```

## How a ticket is triaged

1. **Untrusted input, clearly marked.** The ticket is HTML-escaped and wrapped in `<ticket>` tags, so text inside it cannot close the tag and pose as instructions. The system prompt says everything inside is data, and that any attempt to direct the AI is itself evidence of an attack.
2. **Claude investigates with tools** (`src/server/agent.ts`). The agent loop is written by hand rather than with the SDK's tool runner, so the server controls every step:
   - `scan_security_indicators` and `check_sender_domain` **take no input from the model**. They always read the real ticket, so an injection cannot get the model to scan a cleaned-up copy or check a different sender.
   - `search_knowledge_base` returns real articles, and the reply must cite them (`kb_refs`).
   - `submit_triage` is **refused until both security checks have run**. Invalid input (wrong priority, out-of-range confidence) goes back to the model as an `is_error` tool result so it can correct itself.
   - All tools use strict JSON schemas. Parallel tool calls are answered in one message. A step budget (8) bounds the loop.
3. **The guardrail has the final word** (`src/core/policy.ts`). It re-scans the raw ticket on its own and then:
   - **forces** a P1 security incident routed to the SOC if it detects an attack the model missed, or any prompt injection. The model can escalate (fail closed) but can never de-escalate a detected attack.
   - **replaces** any reply to an attacker with an internal analyst note.
   - **blocks** replies that contain links outside `company.example` or ask for passwords, codes or payment details.
   - **drops** knowledge-base ids and team names that don't exist.

   Every change is recorded as an `override` with a reason, and the demo shows them.
4. **Graceful degradation.** If the API key is missing, the daily budget is used up, the server is busy, Claude refuses or errors, or the model never submits, the same rules engine decides instead. The response always says which engine decided and why.

## Running it with no visitor API key

The key lives only on the server, as a Render secret. A public endpoint that spends someone's credit needs limits:

| Control | Where | Default |
|---|---|---|
| Origin allowlist (CORS + 403) | `app.ts` | `https://aryan23g.github.io` + same origin |
| Per-IP rate limit (sliding window) | `limits.ts` | 20 new triages / hour |
| Daily Claude budget, then rules-only | `limits.ts` | 200 / UTC day |
| Response cache (identical tickets are free) | `limits.ts` | 24 h, 500 entries |
| Concurrency cap | `limits.ts` | 4 agent runs |
| Input limits | `app.ts` | 16 KB body, 4,000-char ticket |
| Hard spend cap | Anthropic Console | set a monthly limit |

The origin check stops other websites from using the API through a visitor's browser. A script can fake the `Origin` header, which is why the per-IP limit and daily budget also exist. Provider errors are logged on the server and never sent to the client.

## Model setup

Claude Opus 5.5 (`SENTINEL_MODEL`) at `effort: low` (`SENTINEL_EFFORT`), because triage is closer to classification than to open-ended reasoning. It also uses prompt caching, the server-side `fallbacks: "default"` for refusals, and no forced `tool_choice` (the prompt and `strict` schemas steer it instead). The conversation history is append-only, so cached prefixes and thinking blocks stay valid. Compare models and effort levels with the eval before changing the defaults.

## ServiceNow

`src/server/servicenow.ts` uses the Table API with basic auth over HTTPS:

* `GET /api/now/table/incident?sysparm_query=active=true^state=1` lists new incidents, with the caller's email dot-walked through `caller_id.email`.
* `PATCH /api/now/table/incident/{sys_id}` with `{ "work_notes": ... }` writes the triage as an internal work note: priority, route, indicators, guardrail overrides, reasoning, suggested reply, KB references and the tool path.

There are two ways to run it:

```bash
# one-off batch, with a ledger so nothing is annotated twice
SN_INSTANCE_URL=https://devNNNNN.service-now.com SN_USERNAME=admin SN_PASSWORD=... \
ANTHROPIC_API_KEY=... npm run sn:sync -- --limit 5 --dry-run

# or through the API (admin token required; these routes are not public)
curl -H "Authorization: Bearer $ADMIN_TOKEN" https://<api>/api/servicenow/incidents
curl -X POST -H "Authorization: Bearer $ADMIN_TOKEN" https://<api>/api/servicenow/incidents/<sys_id>/triage
```

A free Personal Developer Instance is available at https://developer.servicenow.com.

## Evaluation

`eval/tickets.json` has 38 labelled tickets: real requests, users reporting a security problem, phishing, fraud, and prompt injection, including hard cases with no obvious keywords. `npm run eval` scores the rules engine, and `npm run eval -- --claude` also runs the Claude agent with the guardrail.

Rules engine baseline (runs in CI as a regression gate):

| Metric | Rules engine |
|---|---|
| False-positive rate on real requests | **0%** |
| Prompt-injection containment | **100%** |
| Attack recall (phishing + fraud + injection) | 72% |
| Priority / routing accuracy on real requests | 94% / 88% |
| User security reports routed to SOC | 0% |

The rules are tuned for precision: they never flag a real user, and they cannot be argued with. They miss attacks with no obvious keywords, such as a fake DocuSign link, a "remote support" AnyDesk lure, a vendor's "updated remittance details", or a director asking for a quiet favour. That gap is what the model is for. Run the Claude eval to measure how much it closes; the guardrail guarantees the combined system never does worse than the rules on detected attacks.

## Develop

```bash
npm ci
npm test              # 106 tests: scanner, guardrail, agent loop (scripted fake Claude), red-team suite, API, ServiceNow, eval gate
npm run typecheck
npm run eval
npm run dev           # http://localhost:8787 (page + API); rules-only unless ANTHROPIC_API_KEY is set
npm run build         # dist/app.js (committed, served by GitHub Pages) + dist-server/server.js
```

The red-team suite (`test/injection.test.ts`) assumes the worst: the model is fully compromised and submits exactly what the attacker asked for. Every attack must still end up as a P1 SOC incident with no reply, no outside link and no invented KB article.

## Deploy (Render, free)

1. Render dashboard → **New → Blueprint** → select this repository. `render.yaml` sets up the `sentineldesk-api` service.
2. Paste `ANTHROPIC_API_KEY` when asked (optionally the `SN_*` values too). Never commit it.
3. In the Anthropic Console, set a monthly spend limit.
4. If Render gives the service a different URL, update `<meta name="sentinel-api">` in `index.html`.

On the free plan the service sleeps when idle. The page shows "waking up" and uses the rules engine until the server answers.

## Layout

```
src/core/      shared, dependency-free: scanner, sender check, KB, tools, rules triage, guardrail
src/server/    agent.ts (Claude loop), app.ts (Express), limits.ts, servicenow.ts, config.ts
src/web/       demo page logic (bundled to dist/app.js)
test/          vitest suites      eval/  labelled set + runner      scripts/  ServiceNow sync
```
