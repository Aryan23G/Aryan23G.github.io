# Lessons: rules learned from real mistakes in this project

Each entry: what went wrong → the rule that prevents it. Newest last.

1. **Scripted file edit corrupted index.html.** A Python edit took the slice end from `s.index(marker)` without a start position, matched an earlier element in another section, got an empty slice, and `replace("", new)` inserted text between every character (+104k lines).
   → Always search for the end marker *from the start index* (`s.index(end, start)`), `assert` that the slice is non-empty and of plausible length, and check `git diff --stat` right after any scripted edit. Prefer the Edit tool for exact replacements.

2. **Env var collision.** `CLAUDE_EFFORT` was already set by the host tooling, so the server silently ran at the wrong effort.
   → Namespace every project env var (`SENTINEL_*`, `SN_*`). Log the effective config at startup and check it.

3. **Same-origin POSTs were blocked.** Browsers send `Origin` on same-origin POSTs; the allowlist only had the GitHub Pages origin, so the page served by the API itself got 403.
   → The CORS check always allows `${req.protocol}://${req.get("host")}`. Exercise every new HTTP path from a real browser (Playwright), not only from `fetch` in tests.

4. **Test expectations guessed from regex intent.** The phishing test expected reasons that the patterns don't actually match.
   → Run the code on the input first, then write the assertion (see CLAUDE.md, Testing rules).

5. **URL extraction kept trailing punctuation** (`.../owa.`), a bug inherited from the original engine.
   → Strip `[.,;:!?]+$` from extracted URLs. Any parser of free text needs a test with the token at the end of a sentence.

6. **Test asserted a race outcome.** A "duplicate webhook" test expected the second of two concurrent deliveries to be reported as `duplicate`, but with fast fakes the first job had already finished, so it was `queued` and then short-circuited. The system was correct; the test was timing-dependent.
   → Assert invariants (exactly one work note, exactly one `written` outcome), not the interleaving of concurrent async I/O. Test exact interleavings only at the unit level with controlled gates (see the `gate` promise in the queue tests).

7. **Misnamed tests hide intent.** "refunds the budget" asserted that it doesn't refund, and "reports duplicate deliveries" tested a closed queue.
   → After writing a test, reread the name against the assertions. A name that disagrees with the assertions is a bug.

8. **A specific error was swallowed by its own base class.** `LocalOnlyError` subclasses `ValueError`; it was raised inside `try: ipaddress.ip_address(...) except ValueError`, so the helpful message ("would expose the dashboard to the network") was replaced with a generic one.
   → Never raise inside a `try` whose `except` catches the raised type's base class. Do the parsing in a helper that returns a value (`_loopback_ip -> bool | None`), then raise outside any `try`. Test the exact message, not just the exception type.

9. **Two engines must agree.** The Python port of the rules engine was checked against the TypeScript one on all 46 sample and eval tickets (0 differences). Any change to scanner patterns, weights or routing must be made in both `src/core/*.ts` and `local/sentineldesk_local/rules.py`, then re-run that parity check.

10. **The dashboard overflowed on phones.** A wide `<table>` inside `overflow-x:auto` still stretched the page, because grid items default to `min-width: auto`.
    → Give grid and flex children that hold wide content `min-width: 0`. The Playwright check asserts `scrollWidth == 390` at phone width.

11. **A shutdown test was a no-op.** `pkill -f "a\|b"` uses extended regex, where `\|` is a literal pipe, so nothing matched and the "graceful stop" was never exercised.
    → After sending a signal in a test script, assert that the process is gone (`pgrep` returns nothing) before checking anything else.

12. **A pagination test never paginated.** The page size was `min(50, limit)`, so 7 fake issues always fit on one page and the `nextPageToken` path was untested.
    → Any paging, batching or chunking code takes the page size as a parameter, and its test forces several pages and asserts the exact sequence of cursors sent.

13. **A config template contradicted the feature it enables.** The example JQL filtered to `statusCategory = "To Do"`, which would silently hide the resolved historical requests that the accuracy import and outcome capture need.
    → When a feature reads data under a user-supplied filter, document in the template what the filter must *not* exclude, and validate what you can (e.g. reject `ORDER BY`).

14. **The guardrail cleaned a list but not the text that quoted it.** Invented KB ids were removed from `kb_refs`, but the reply still said "(Ref: KB-601, KB-101)", so a Jira comment would have cited articles that do not exist. All 101 tests passed; only looking at the rendered dashboard caught it.
    → Validate every model-written field that reaches a human or an external system, including free text that may repeat structured fields. After any end-to-end run, read the screenshot as a customer would, not only the assertions.

15. **A metric that mixes severities misleads buyers.** "Guardrail overrides" counted a KB-id clean-up the same as "the AI missed an attack". Report security overrides and other corrections separately.

16. **Live UIs that both reload and stream will show duplicates.** A review event arrived in the detail reload and again over SSE. Dedupe streamed items by id on the client.

17. **Browser-test waits:** `waitForSelector("#x:not(.show)")` waits for *visible*, which a hidden overlay never is. To wait for something to close, use `waitForFunction` on its state.
