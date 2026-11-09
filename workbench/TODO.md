# Workbench backlog

Worked top to bottom by an autonomous loop. One item per iteration. An item is checked off only when its
own acceptance criteria hold **and** every quality gate below passes.

**Quality gates (every iteration):**
- `cd backend && ruff check app tests eval && mypy app eval && pytest -q`
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
- [x] **3. Run history.** Backend: keep the last 50 `RunTrace`s in a bounded in-memory store; add
  `GET /api/runs` (summaries) and `GET /api/runs/{run_id}` (full trace), with tests. Frontend: a "History" tab in
  the left pane that lists past runs (outcome, question, ms) and reloads a trace into the canvas and trace panel
  when clicked.
- [x] **4. Export trace.** "Export JSON" button in the trace panel that downloads the full `RunTrace`. Backend:
  `GET /api/runs/{run_id}` is the source. Test the download content in the e2e spec.
- [x] **5. API hardening.** Optional bearer-token auth (`QP_API_TOKEN`; disabled when unset), an in-memory
  per-client rate limit on the query endpoints (`QP_RATE_LIMIT_PER_MIN`, 429 with `Retry-After`), and a cap on
  concurrent agent runs. Frontend sends the token from `NEXT_PUBLIC_API_TOKEN` if set. Tests for 401/429.
- [~] **6. Large-result rendering.** *Blocked after two attempts; grid left non-virtualized (renders up to the
  1,000-row cap, which works but is heavier).* Both `@tanstack/react-virtual` (3.13 and 3.14) and a minimal
  scroll-listener windowing hook froze the page as soon as the user typed in the SQL editor. A DevTools pause
  showed an endless synchronous React render (`renderWithHooksAgain`) inside Radix `Tabs`/`TabsContent` under the
  React 19 runtime that the Next.js 14 App Router bundles - triggered whenever the results component re-renders
  from its own state. Moving the ref off `TabsContent` did not help. Next step: replace the Radix Tabs in the
  results pane with plain buttons + conditional rendering (or upgrade Radix/Next together), then re-apply windowing.
- [x] **7. Workbench evaluation harness.** Port a 20-question benchmark with gold SQL for the 14-table warehouse
  (`backend/eval/questions.json`), an execution-accuracy comparator, and `python -m eval.run` that runs the real
  agent (needs `ANTHROPIC_API_KEY`) and writes a JSON report. Unit-test the comparator and verify every gold query
  compiles through the SQLGlot guard and returns rows. Running against the live API is out of scope here.
- [~] **8. Accessibility and keyboard pass.** *Mostly done; marked [~] after two gate runs.* An axe audit found
  1 critical, 4 serious and 3 moderate issues; fixed: Tremor BarList `aria-sort` on a div (replaced with a
  semantic list), 46 low-contrast nodes (muted token instead of zinc-600/opacity), unlabelled CodeMirror textbox,
  non-focusable scroll regions in the grid/trace panel, missing landmarks, heading order; the schema browser now
  uses the disclosure pattern instead of an incomplete ARIA tree; global `:focus-visible` outline. Passing tests:
  landmarks/labels/disclosure state, and a keyboard-only run (Tab to the input, Ctrl/⌘+Enter, visible focus).
  **Open:** (1) CodeMirror's built-in dark theme colours some SQL tokens below 4.5:1 - needs a custom
  `HighlightStyle`; (2) the SQL editor's wrapper div is a non-focusable scroll region - let CodeMirror's own
  scroller own scrolling. The full-state axe test is `test.fixme` in `e2e/a11y.spec.ts` until both are fixed.
- [ ] **9. Docs final pass.** README reflects every feature above (endpoints, env vars, scripts, test counts), and
  the file tree matches the repository.
