# SentinelDesk: interview guide

## 60-second pitch

> IT service desks get hundreds of tickets a day, and some are attacks: phishing, CEO gift-card fraud, fake bank-detail changes. Once you put an AI on that queue, attackers start writing tickets aimed at the AI itself. SentinelDesk is a Claude tool-use agent that investigates each ticket with five tools and decides priority, routing and a reply grounded in the knowledge base. I didn't trust the model to be the last line of defence, so every decision goes through a deterministic guardrail. It re-scans the raw ticket and overrides the AI whenever it detects an attack, so even a fully hijacked model can't send a scam to a technician or reply to the attacker. It runs on Express with streaming, rate limits and a daily budget, so the public demo needs no API key. It also integrates with ServiceNow: it pulls live incidents and writes the triage back as work notes. I measure it on a labelled set of 38 tickets.

## Demo script (2 minutes)

1. Open https://aryan23g.github.io/sentineldesk/. The badge says **Live AI · Claude Opus 5.5** (the first load can take ~30s while the free server wakes).
2. Click **"URGENT: Mailbox will be deactivated"**. Watch the tool calls stream in, the lookalike domain get highlighted, and the P1 → SOC verdict.
3. Click **"Re: password reset ticket"** (tagged *Tries to trick the AI*). Point out the **"guardrail overruled the AI"** panel if it appears, or explain that the model also caught it and the guardrail agreed.
4. **Write your own → Trick the AI** to submit a live injection.
5. Open **Show the technical details** to show the raw tool inputs and outputs, then **Download trace**.

## Resume bullet → code

| Bullet | Where to point |
|---|---|
| Claude tool-use agent with five tools; priority, routing, grounded reply | `src/server/agent.ts`: `TOOLS`, `SYSTEM_PROMPT`, `runAgent` loop; grounding check in `policy.ts` (`kb_refs` must exist) |
| Prompt-injection defences; rules-based guardrail overrides the AI | `src/core/scanner.ts` (`INJECTION` patterns), `renderTicket` escaping, input-less security tools, `src/core/policy.ts` `enforcePolicy`; proven by `test/injection.test.ts` |
| ServiceNow integration: Table API in, work notes out | `src/server/servicenow.ts`, `scripts/servicenow-sync.ts`, admin routes in `app.ts` |
| Stack: TypeScript, Node.js, Express, Claude API, ServiceNow | `package.json`, `src/server/app.ts` |

The last bullet ("led the roadmap, reviewed and merged contributions") is about your team process. Be ready to describe it in your own words: how work was split, what you looked for in reviews, and a PR you pushed back on.

## Questions you're likely to get

**Why not just ask the model "is this phishing?"**
A model can be talked out of its answer by the very text it's judging. That's what prompt injection is. Security-critical decisions need something that can't be persuaded, so the model does the nuanced work (subtle phishing, routing, writing a reply) and deterministic rules enforce the non-negotiables.

**Then why use the model at all?**
Recall. The rules alone catch 72% of attacks in the eval, with 0% false positives. They miss phishing with no keywords, like a fake DocuSign link or a director asking for "a quiet favour". The model closes that gap, and the guardrail guarantees the combination is never worse than the rules on a detected attack. That's a defence-in-depth argument, not "AI vs rules".

**How do the defences work, layer by layer?**
1. *Spotlighting:* the ticket is escaped and wrapped in `<ticket>` tags, so `</ticket><system>...` stays inert text.
2. *Prompt:* everything in the ticket is labelled as data, and attempts to instruct the AI are treated as evidence of an attack.
3. *Tool design:* the security tools take no arguments and always read the real ticket, so the model can't be steered into scanning a sanitised copy.
4. *Process gate:* `submit_triage` is rejected until both security checks have run.
5. *Output guardrail:* attacks are forced to P1 → SOC with no reply, and replies with outside links or credential requests are blocked.
6. *Test:* the red-team suite simulates a *fully compromised* model, and every attack is still contained.

**Why a manual agent loop instead of the SDK's tool runner?**
I needed per-step control: validating inputs, refusing a premature verdict, streaming each step to the browser, falling back on refusals or a step budget, and passing the final decision through the guardrail before it counts.

**What happens when Claude is down, refuses, or loops?**
Every failure path ends in the rules engine: API error, refusal, `max_tokens`, no submission after one nudge, step budget exceeded, busy server, or budget used up. The response says which engine decided and why. Provider errors are logged on the server and never returned to the client.

**How do you stop people from running up your API bill?**
An origin allowlist, a per-IP sliding-window rate limit, a daily budget after which the service switches to rules-only, a response cache (the demo samples cost one call each per day), a concurrency cap, input size limits, and a spend limit in the Anthropic Console as the hard backstop. Origin can be spoofed by scripts, which is why the per-IP limit and budget exist too.

**How would you scale it?**
Move the rate limiter, budget and cache to Redis so several instances share them. Put ServiceNow sync behind a queue (or a ServiceNow Business Rule that calls the API when an incident is created), with retries and idempotency on `sys_id` (today that's a local ledger file). Use OAuth instead of basic auth for ServiceNow. Stream traces to an observability backend.

**How do you know it works?**
106 tests: unit tests for the scanner and guardrail, the agent loop against a scripted fake Claude (including schema errors, premature submits, refusals and the step budget), the HTTP API, ServiceNow with a mocked `fetch`, and the red-team suite. A labelled eval of 38 tickets runs in CI for the rules baseline, and `npm run eval -- --claude` compares Claude.

**What are the limitations?**
- The rules are pattern-based, so a novel attack with no known indicators relies on the model alone (the guardrail can't add what it can't see).
- The limits are kept in memory, so a restart resets them; the Console spend cap covers that.
- The eval set is small and hand-written.
- Injection patterns are English-only.
- ServiceNow uses basic auth.

**What would you do next?**
Run the Claude eval across models and effort levels and pick the cheapest setup that holds recall. Grow the eval with real (anonymised) tickets. Add a human-review queue for low-confidence decisions. Add a ServiceNow Business Rule for real-time triage instead of polling.

## Numbers to remember

- 5 tools, step budget of 8, effort `low`, Claude Opus 5.5.
- 106 tests, including 8 attack patterns × 3 checks each in the red-team suite.
- Eval: 38 tickets. Rules baseline: 0% false positives, 100% injection containment, 72% attack recall.
- Limits: 20 new triages per IP per hour, 200 Claude triages per day, 24-hour cache.
