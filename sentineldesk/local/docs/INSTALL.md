# Installing SentinelDesk

Pick the way that suits you. Both take a few minutes, and everything after starting is done in
your browser.

## On a server (recommended for a team): Docker

You need a Linux server with Docker. A GPU is optional; see "Sizing" below.

```bash
cd sentineldesk/local
docker compose up -d
docker compose logs sentineldesk
```

The last command shows a **setup link**. Open it in your browser. If the server isn't your own
computer, open `http://<server>:8765/#setup=…` from a machine that can reach it (see "Letting
analysts in" below). The setup then asks for:

1. **Your account:** a username and password.
2. **Your organisation:** company name, email domains, and your teams.
3. **Jira:** your site address and an API token. Press *Test*, choose your service desk, done.
4. **Help articles:** drag in your how-to articles (Markdown or text). You can skip this.

New Jira requests then get an internal note from SentinelDesk within about a minute.

With an NVIDIA GPU: `docker compose -f docker-compose.yml -f docker-compose.gpu.yml up -d`.

## On one computer (to try it, or for a small desk)

1. Install [Ollama](https://ollama.com/download), the free local AI engine. It's optional: without it, SentinelDesk uses its built-in rules.
2. In the `sentineldesk/local` folder, run **`./start.sh`** (Mac or Linux) or double-click **`start.bat`** (Windows).

It prepares everything it needs the first time, downloads the AI model, and opens your browser
at the setup page. Run the same command any time to start SentinelDesk again.

## The Jira account

Use an agent account on your service desk (a dedicated one such as `sentineldesk@yourcompany.com`
is best, so its notes are easy to recognise):
* **Jira Cloud** (`…atlassian.net`): sign in as that account at id.atlassian.com, then Security, then *Create and manage API tokens*.
* **Jira Data Center / Server:** in Jira, your profile picture, then Profile, then *Personal access tokens*.

The token is stored on the server in a file only SentinelDesk can read. It is never shown again
in the browser and never written to the settings file.

## Everyday tasks

| To… | Do this |
|---|---|
| Add an analyst | Settings → People → Add person (give them the temporary password privately) |
| Stop writing to Jira | Settings → Jira → *Stop using Jira*, or choose "Don't write anything to Jira" |
| Change teams or domains | Settings → Organisation |
| Add help articles | Settings → Help articles (drag and drop) |
| See whether it's working | The dot next to your name: green = running. Settings → System has details |
| Reset a forgotten password | `docker compose exec sentineldesk python run.py --reset-password NAME` |

## Letting analysts in

By default the dashboard only answers on the server itself, which is the safe choice. Either:
* **Recommended:** put it behind your HTTPS reverse proxy (nginx, IIS, Traefik…) pointing to `127.0.0.1:8765`, and set `SENTINEL_FORWARDED_ALLOW_IPS` to the proxy's address in `.env` (see `.env.example`); or
* **On a trusted internal network:** `SENTINEL_BIND=0.0.0.0 docker compose up -d`, then analysts open `http://<server>:8765`. Everyone still has to sign in.

## Sizing

| | Small desk / pilot | Busier desk |
|---|---|---|
| CPU / RAM | 4 cores, 16 GB | 8 cores, 32 GB |
| GPU | none: works, but each request takes tens of seconds | NVIDIA with 8 GB+: a few seconds per request |
| Disk | 20 GB | 50 GB |

The Report tab shows the typical time per request, so you can see whether it keeps up.

## Behind a corporate proxy

If your network inspects HTTPS, building the image needs your company's CA certificate
(it is not stored in the image):

```bash
docker build --secret id=ca,src=corporate-ca.pem -t sentineldesk:local . && docker compose up -d
```

## Backup, upgrade, uninstall

* **Backup:** everything (settings, database, help articles, Jira token) is in the `data` volume:
  `docker run --rm -v sentineldesk_data:/data -v "$PWD":/backup alpine tar czf /backup/sentineldesk-backup.tgz -C /data .`
* **Upgrade:** get the new version, then `docker compose up -d --build`. Updates to the database happen automatically.
* **Uninstall:** `docker compose down -v` removes everything from the server. Notes already posted stay in Jira and start with `[SentinelDesk AI triage]`, so they are easy to find.

## For administrators who prefer files

Settings are stored as `sentineldesk.toml` in the data folder and can be edited by hand
(`sentineldesk.example.toml` documents every option). To manage them entirely from a file you
control, set `SENTINEL_CONFIG=/path/to/file.toml`; the browser then shows settings read-only.
Advanced environment variables are listed in `.env.example`.

## Model licences

The default model, Llama 3.2, is distributed under the Llama 3.2 Community License, which allows
commercial use under conditions (including attribution and an acceptable-use policy). Mistral 7B
(`SENTINEL_AGENT_MODEL=mistral`) is Apache 2.0. Have whoever approves software in your organisation
review the licence of the model you use.
