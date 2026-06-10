# Aryan Gupta — Portfolio

A single-file, space-themed portfolio site. No build step, no dependencies — just `index.html`.

## Deploy in under 5 minutes

**GitHub Pages (recommended, free, fits your GitHub profile)**
1. Create a repo named `Aryan23G.github.io`
2. Add `index.html` to the repo root and push
3. Your site is live at `https://aryan23g.github.io` within a minute or two

**Netlify / Vercel (also free)**
- Netlify: drag and drop this folder at https://app.netlify.com/drop
- Vercel: `npx vercel` from this folder

## The projects on the site

Two are from your resume (badged **Deployed**), four are new ideas designed around your
actual experience (badged **In orbit** — i.e., in progress). Build them in roughly this order:

1. **Provision** (PowerShell + Active Directory) — weekend-sized. Spin up a free Windows Server
   eval VM with AD DS, write a module that reads a CSV and creates/disables users, assigns groups,
   and writes an audit log. Directly mirrors your WRHN IAM work — strongest resume signal.
2. **Tickeranalytics** (Python + SQL) — use a synthetic or anonymized ticket export
   (ServiceDesk Plus and Jira both export CSV). Pandas for cleanup, SQLite for storage,
   Plotly for an HTML dashboard.
3. **Sweep** (Python + Nmap) — scan your home network, store snapshots in SQLite,
   diff them to show new/changed devices.
4. **Stockroom** (Python + Pandas) — port your clinic Excel inventory model to code;
   simple moving-average forecasting is plenty.

As you finish each one, change its badge from "In orbit" to "Deployed" and link the GitHub repo
on the project card.

## Customizing

- Colors live in the `:root` CSS variables at the top of `index.html`
- Fonts: Unbounded (display), Outfit (body), Space Mono (labels) via Google Fonts
- Each project card is an `<article class="proj">` — duplicate one to add more
