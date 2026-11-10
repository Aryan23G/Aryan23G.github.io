# Installing SentinelDesk on your server

SentinelDesk runs as three containers on one Linux server: the Ollama model server, a one-time
model download, and SentinelDesk itself (triage worker, Jira connector and dashboard). Ticket data
stays on this server and in your own Jira.

## 1. Server

Rough starting points; measure in the first week of the pilot (the dashboard reports the median
seconds per ticket):

| | Minimum | Recommended |
|---|---|---|
| CPU / RAM | 4 cores, 16 GB | 8 cores, 32 GB |
| GPU | none (CPU works, but each ticket makes 4 model calls, so expect tens of seconds) | NVIDIA, 8 GB+ VRAM |
| Disk | 20 GB | 50 GB (models, plus the database grows by a few KB per ticket) |
| Software | Docker Engine with Compose v2; for a GPU, the NVIDIA Container Toolkit |

Outbound access is needed **only at install time**: Docker Hub and PyPI (to build) and the Ollama
model library (one model download). At run time the only destination is your Jira.

## 2. Configure

```bash
cd sentineldesk/local
cp .env.example .env                    # then fill it in (see below)
mkdir -p config
cp sentineldesk.example.toml config/sentineldesk.toml   # then edit it for your desk
```

**`config/sentineldesk.toml`** describes your desk:
* `[organization]`: your company name, every email domain your staff use, and the security team.
* `[[teams]]`: the teams tickets are routed to. Use the names your analysts use.
* `[[categories]]` and `[priority_rules]`: keyword rules for the offline fallback.
* `[knowledge_base]`: a folder of Markdown articles (see `kb-example/`), or inline articles. Replies are grounded only in these.
* `[jira]`: set `enabled = true`, your `base_url`, the `jql` for the project(s) to watch (no status filter), `mode = "shadow"`, your priority names in `[jira.priority_map]`, and `start_from` (a date imports older requests read-only for the accuracy report).

**`.env`** holds the secrets:
* Jira Cloud: `JIRA_EMAIL` and `JIRA_API_TOKEN` for an **agent** account (create the token at id.atlassian.com, Security, API tokens). Jira Data Center: `JIRA_PAT`.
* `SENTINEL_ADMIN_USER` and `SENTINEL_NEW_PASSWORD` create the first admin on first start. **Delete both lines after the first start.**
* `SENTINEL_RETENTION_DAYS`: how long ticket text is kept (default 90).

Behind a TLS-inspecting corporate proxy, build with your CA (it is not stored in the image):
```bash
docker build --secret id=ca,src=corporate-ca.pem -t sentineldesk:local .
```

## 3. Check, then start

```bash
docker compose run --rm sentineldesk python run.py --check
docker compose up -d                                                     # CPU
docker compose -f docker-compose.yml -f docker-compose.gpu.yml up -d     # NVIDIA GPU
docker compose logs -f sentineldesk
```

`--check` validates the profile, signs in to Jira, runs your JQL once, and confirms the model is
installed. Fix anything it reports before starting.

The dashboard listens on `127.0.0.1:8765` on the server. Give analysts access through your HTTPS
reverse proxy (nginx, IIS, Traefik, …), then set `SENTINEL_FORWARDED_ALLOW_IPS` in `.env` to the
proxy's address so session cookies are marked Secure.

## 4. Accounts

```bash
docker compose exec sentineldesk python run.py --add-user dana --role analyst   # prompts for a password
docker compose exec sentineldesk python run.py --reset-password dana
docker compose exec sentineldesk python run.py --list-users
```
Admins can also add and disable users through the API. Passwords need at least 12 characters, and
five failed sign-ins lock an account for 15 minutes.

## 5. Operate

* **Status:** the dashboard header shows the model, the worker and the queue. `docker compose ps` shows container health.
* **Storage:** compose uses a named volume (`data`). If you change it to a folder on the host, the container runs as uid 10001, so run `sudo chown -R 10001 <folder>` first.
* **Backup:** the whole state is one SQLite file in the `data` volume:
  `docker compose exec sentineldesk python -c "import sqlite3; s=sqlite3.connect('/data/sentineldesk.db'); s.backup(sqlite3.connect('/data/backup.db'))"`
  then copy `/data/backup.db` off the server.
* **Stop shadow mode immediately:** set `mode = "read-only"` (or `enabled = false`) in the `[jira]` section and run `docker compose restart sentineldesk`. Nothing more is written to Jira.
* **Upgrade:** `git pull && docker compose build && docker compose up -d`. Database migrations run automatically on start.
* **Uninstall:** `docker compose down -v` removes the containers, the model and the database. Comments already posted stay in Jira and all start with `[SentinelDesk AI triage]`, so they can be found with JQL.

## Model licences

The default model, Llama 3.2, is distributed under the Llama 3.2 Community License, which permits
commercial use under conditions (including attribution and an acceptable-use policy). Mistral 7B
(`SENTINEL_AGENT_MODEL=mistral`) is Apache 2.0. Have whoever approves software in your organisation
review the licence of the model you choose.
