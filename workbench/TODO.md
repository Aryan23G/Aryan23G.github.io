# Workbench backlog

Worked top to bottom by an autonomous loop. One item per iteration. An item is checked off only when its
own acceptance criteria hold **and** every quality gate below passes.

**Quality gates (every iteration):**
- `cd backend && ruff check app tests && mypy app && pytest -q`
- `cd frontend && npm run typecheck && npm run lint && npm run build` (plus `npm test` once it exists)

**Definition of done:** every item below is `[x]` (or `[~]` blocked with a stated reason), all gates are green,
and the README matches the code.

**Loop rules:**
- Commit and push to `claude/inspiring-gates-uvvhxs` after each item. Never merge, never open a PR, never force-push.
- Never mark an item done with a failing or skipped test. If an item fails its gates twice, mark it `[~]` with
  the reason and move on.
- No live Anthropic API calls (no key in this environment). Use the scripted generator for anything model-facing.

## Items

- [x] **1. Frontend unit tests.** Add Vitest. Cover the `use-agent-run` reducer (step start/complete matching,
  retries, live payloads, override flow), the SSE frame parser in `lib/api.ts` (split frames, multi-line data),
  `toCsv` (quoting, formula injection) and `fmt`. Add `npm test`; add it to CI.
- [x] **2. Committed end-to-end test.** Move the scripted-generator demo server into `backend/tests/e2e_server.py`
  and add a Playwright spec in `frontend/e2e/` that covers: a preset run with one self-correction, the manual
  override, and a blocked `DROP TABLE`. Add an `npm run e2e` script and a CI job.
- [ ] **3. Run history.** Backend: keep the last 50 `RunTrace`s in a bounded in-memory store; add
  `GET /api/runs` (summaries) and `GET /api/runs/{run_id}` (full trace), with tests. Frontend: a "History" tab in
  the left pane that lists past runs (outcome, question, ms) and reloads a trace into the canvas and trace panel
  when clicked.
- [ ] **4. Export trace.** "Export JSON" button in the trace panel that downloads the full `RunTrace`. Backend:
  `GET /api/runs/{run_id}` is the source. Test the download content in the e2e spec.
- [ ] **5. API hardening.** Optional bearer-token auth (`QP_API_TOKEN`; disabled when unset), an in-memory
  per-client rate limit on the query endpoints (`QP_RATE_LIMIT_PER_MIN`, 429 with `Retry-After`), and a cap on
  concurrent agent runs. Frontend sends the token from `NEXT_PUBLIC_API_TOKEN` if set. Tests for 401/429.
- [ ] **6. Large-result rendering.** Virtualize the result grid rows with `@tanstack/react-virtual` so 1,000 rows
  render smoothly; keep sticky headers and sorting. Verify in the e2e test with a 1,000-row override query.
- [ ] **7. Workbench evaluation harness.** Port a 20-question benchmark with gold SQL for the 14-table warehouse
  (`backend/eval/questions.json`), an execution-accuracy comparator, and `python -m eval.run` that runs the real
  agent (needs `ANTHROPIC_API_KEY`) and writes a JSON report. Unit-test the comparator and verify every gold query
  compiles through the SQLGlot guard and returns rows. Running against the live API is out of scope here.
- [ ] **8. Accessibility and keyboard pass.** All controls reachable by keyboard with visible focus; tree uses
  correct ARIA roles; step tracker announced politely; contrast of muted text ≥ 4.5:1. Add an axe-core check to
  the e2e spec with zero serious/critical violations.
- [ ] **9. Docs final pass.** README reflects every feature above (endpoints, env vars, scripts, test counts), and
  the file tree matches the repository.
