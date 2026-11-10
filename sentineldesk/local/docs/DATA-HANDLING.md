# SentinelDesk: data handling and security

For your security, privacy and IT-risk reviewers. It describes the software as built. Where
behaviour depends on configuration, the setting is named.

## What SentinelDesk does

It reads new service-desk requests and suggests a priority, a team and a reply. It flags phishing,
fraud and prompt-injection attempts. In **shadow mode** it posts that suggestion as an
**internal comment** on the Jira request. It never changes fields, assignees, status, or anything
the requester can see. In **read-only** mode it writes nothing to Jira at all.

## Where data goes

| Data | Source | Sent to | Stored |
|---|---|---|---|
| Request summary, description, reporter email and name | Your Jira (REST API) | The model server you run (Ollama) | `sentineldesk.db` on your server |
| Triage suggestion | SentinelDesk | Your Jira, as an internal comment (shadow mode only) | `sentineldesk.db` |
| Priority / team your analysts set | Your Jira | nowhere | `sentineldesk.db` (for the accuracy report) |
| Analyst reviews | Dashboard | nowhere | `sentineldesk.db` |

* **No third-party AI service.** The model runs in Ollama on your hardware. The model address must be this machine or a host listed in `SENTINEL_MODEL_HOSTS`; anything else is refused at startup.
* **No telemetry, analytics, CDN or web fonts.** The dashboard loads nothing from the internet, and this is checked by an automated test.
* **Run-time network destinations:** your Jira (`[jira] base_url`, HTTPS required) and your model host. Nothing else.
* **Install-time downloads:** container images (Docker Hub), Python packages (PyPI) and model weights (the Ollama library). None of these involve your data.

## What is stored, and for how long

One SQLite file (`/data/sentineldesk.db` in the container):
- each request's text and evidence;
- each agent's structured output;
- the final decision;
- analyst reviews and the outcome read back from Jira;
- an activity log;
- dashboard accounts.

* **Retention:** with `SENTINEL_RETENTION_DAYS=N` (default 90 in `.env.example`), the worker removes request text, the reporter's email, evidence, model outputs and model log lines after N days. Decisions, timings and reviews stay so the report keeps working.
* **Deletion:** `docker compose down -v` deletes everything. Posted Jira comments start with `[SentinelDesk AI triage]` and can be found and deleted in Jira.
* **Report exports** (CSV) contain subjects and decisions, never request bodies.

## Access control

* Every dashboard and API route requires sign-in; only a minimal health check is anonymous.
* Accounts are local, with admin and analyst roles. Passwords are hashed with scrypt and need at least 12 characters. Five failed attempts lock an account for 15 minutes.
* Sessions last 12 hours. Only a SHA-256 hash of the session token is stored. Cookies are HttpOnly and SameSite=Strict, and are marked Secure behind HTTPS.
* State-changing requests need a custom header (CSRF protection). Responses carry a strict Content-Security-Policy and frame-deny headers.
* The dashboard binds to 127.0.0.1 unless `SENTINEL_ALLOW_NETWORK=1`. The intended setup is behind your HTTPS reverse proxy.
* The container runs as an unprivileged user (uid 10001). Only `/data` is writable.
* Jira credentials come from environment variables (`.env`), never from the config file or the database. Use a dedicated agent account with access to the pilot project only.

## How the AI is kept in check

* Ticket text is treated as untrusted data. It is escaped and fenced, and every prompt says it must not be followed as instructions.
* A deterministic guardrail re-checks every decision against the raw ticket:
  - it forces detected attacks (including prompt injection) to P1 for the security team, with no reply to the sender;
  - it removes knowledge-base articles and teams that don't exist;
  - it blocks replies with outside links, requests for credentials, or citations of articles that don't exist.

  Every change is logged and shown to analysts.
* If the model is unavailable or produces invalid output, a rules engine decides instead, and the comment says so.

## Known limitations

* Detection patterns are English-only.
* There is no single sign-on yet; accounts are local to SentinelDesk.
* Models can be wrong. Shadow mode exists so that people stay in control, and the pilot report measures agreement before anyone relies on it.
