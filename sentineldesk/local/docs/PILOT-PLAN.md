# SentinelDesk pilot plan (4 weeks, shadow mode)

**Goal:** measure on your own tickets, without changing how your team works, how often
SentinelDesk's triage matches your analysts and how many phishing or fraud attempts it catches.

## What SentinelDesk does during the pilot

* It reads new requests from one Jira Service Management project and adds an **internal comment**
  with a suggested priority, team and reply, or a security warning. Customers never see it.
* It changes nothing in Jira: no fields, assignments or status. Analysts keep working as usual.
* It runs on your server with a local model. No ticket data goes to an outside AI service.

## Timeline

| When | What | Who |
|---|---|---|
| Week 0 (2-3 hours) | Install (see INSTALL.md), write the desk profile (teams, domains, priority names), import 10-30 KB articles, run `--check`, create analyst accounts | Your IT admin + us |
| Week 0 | Import the last 30-60 days of requests read-only (`start_from`) for a baseline accuracy report on decisions your team already made | automatic |
| Weeks 1-3 | Shadow mode on new requests. Analysts read the internal comments. When they have a minute, they mark the suggestion "accept" or "correct" in the dashboard (optional; Jira outcomes are also captured automatically) | Your analysts |
| End of week 1 | 30-minute check-in: false alarms, missing teams, KB gaps; adjust the profile | Both |
| Week 4 | Review the pilot report together and decide what happens next | Both |

## Success criteria (agree on these before starting)

| Measure | From the report | Target (proposed; adjust together) |
|---|---|---|
| Security recall: share of real attacks flagged | "security recall" | ______ % |
| Security false alarms per week | "security precision", security flagged | ≤ ______ |
| Priority within one level of your analysts | "priority within one level" | ______ % |
| Correct team | "routing match" | ______ % |
| Time to triage | "median seconds to triage" | ≤ ______ s |

The report and CSV export come from the dashboard (Pilot report, Download CSV).

## What we need from you

1. A Linux server or VM (see INSTALL.md for sizing) with Docker.
2. A Jira agent account limited to the pilot project, and its API token (Cloud) or personal access token (Data Center).
3. The project key, your priority names, and your team names (and the Jira field that records the team, if you have one).
4. 10-30 knowledge-base articles, exported as Markdown or text.
5. One named contact on your service desk and one in security.

## Stopping or rolling back

At any time, set `mode = "read-only"` (or `enabled = false`) in the `[jira]` section and restart.
Nothing more is written. `docker compose down -v` removes everything from the server. Every
comment SentinelDesk posted starts with `[SentinelDesk AI triage]` and can be found with JQL.

## After the pilot

Options to discuss in week 4: continue in shadow mode, more projects, assisted mode (analysts
apply suggestions with one click), single sign-on, and an ongoing support agreement.
