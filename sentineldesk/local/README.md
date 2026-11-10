# SentinelDesk Local: an agentic triage council on your own hardware

SentinelDesk reads new service-desk requests and suggests a priority, a team and a reply. It
catches phishing and fraud, and adds its suggestion as an internal note in Jira Service
Management. Everything runs on your own hardware: no cloud AI, no API key, nothing to pay for.

## Start

* **Server:** `docker compose up -d`, then `docker compose logs sentineldesk` shows a setup link.
* **One computer:** `./start.sh` (Mac/Linux) or double-click `start.bat` (Windows). It opens the setup page itself.

The setup page asks for your account, your teams and email domains, your Jira site and token
(press *Test*, pick your service desk), and optionally your help articles. That's all. Analysts
then work in a simple inbox: each request shows SentinelDesk's suggestion and two buttons,
**Looks right** and **Change**.

Read next: `docs/INSTALL.md` (details and everyday tasks), `docs/DATA-HANDLING.md` (for your
security team), `docs/PILOT-PLAN.md` (a 4-week trial).

## For developers

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements-dev.txt
.venv/bin/python -m pytest -q        # fake Ollama and fake Jira speak the real HTTP APIs
.venv/bin/python run.py --open
```

## How a ticket flows

```
dashboard form ─► POST /api/tickets ─► tickets (status=queued)
                                            │  worker claims it (BEGIN IMMEDIATE: one worker per ticket)
                                            ▼
     deterministic evidence: scanner (phishing, fraud, prompt injection) + sender check
                                            │
             ┌──────────────────────────────┼──────────────────────────────┐   in parallel, each
             ▼                              ▼                              ▼   JSON-schema constrained
      Security subagent            Sentiment subagent              Intent subagent
      attack? type, confidence     mood, urgency, reach            category, team, KB query
             └──────────────────────────────┼──────────────────────────────┘
                                            ▼
              Chairman (reports + evidence + knowledge-base articles + teams)
                                            ▼
              Guardrail: rules re-check the raw ticket and have the final word
                                            ▼
         tickets.final_json · agent_runs (one row per agent) · events (live log) ─► SSE ─► dashboard
```

* **Guardrail:** a detected attack is always P1 → SOC with no reply to the sender, whatever the Chairman says. A Security subagent that reports an attack with ≥ 70% confidence also escalates (fail closed). Invented KB articles and teams are removed, and replies with outside links or credential requests are blocked. Every change is logged as an override.
* **Robustness:**
  - Invalid model output is retried once with the validation error.
  - A subagent that still fails is marked unavailable, and the Chairman works without it.
  - If the Chairman fails, Ollama is down, or a model is missing, the rules engine decides instead.
  - A worker crash leaves tickets `running`; the next worker requeues them.
* **Untrusted input:** ticket text is HTML-escaped inside `<ticket>` tags, and every prompt tells the model it is data, never instructions.

## Local-only by construction

* The model endpoint must be a loopback address (`localhost`, `127.0.0.1`, `::1`). Anything else is refused at startup.
* The dashboard binds to 127.0.0.1. `SENTINEL_HOST=0.0.0.0` is refused.
* HTTP proxy environment variables are ignored for model calls (`trust_env = False`).
* The dashboard page loads no CDN, font or analytics. Tests assert it contains no external URL, and the browser test confirms it makes zero non-local requests.
* `--install` and `--pull` are the only commands that download anything, and only when you pass them.

## Configuration (environment variables)

| Variable | Default | |
|---|---|---|
| `SENTINEL_AGENT_MODEL` | `llama3.2` | Security, Sentiment and Intent subagents |
| `SENTINEL_CHAIRMAN_MODEL` | same as agent model | e.g. `mistral` for a different synthesiser |
| `SENTINEL_OLLAMA_URL` | `http://localhost:11434` | must be loopback |
| `SENTINEL_DB` | `sentineldesk.db` | SQLite file |
| `SENTINEL_PORT` | `8765` | dashboard port (host is always loopback) |
| `SENTINEL_OLLAMA_TIMEOUT` | `180` | seconds per model call |

## Data (sentineldesk.db)

* `tickets`: request, status, final decision (priority, team, flag, confidence, override count, full JSON), scanner evidence, and any fallback reason.
* `agent_runs`: one row per agent per ticket, with model, ok/failed, duration, prompt and output tokens, and the structured output or error.
* `events`: the execution log shown live in the dashboard.
* `meta`: the worker heartbeat.

```bash
sqlite3 sentineldesk.db "select id, priority, security_flag, escalate_to, overrides from tickets order by id desc limit 10"
```

## Tests

```bash
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/python -m pytest -q        # 106 tests; fake Ollama and fake Jira speak the real HTTP APIs
```

They cover:
- parity with the TypeScript rules engine;
- the guardrail against a compromised Chairman;
- local-only enforcement;
- that subagents really run in parallel;
- retry and fallback paths;
- atomic claims under 6 concurrent workers;
- the API, the event stream and the launcher.
