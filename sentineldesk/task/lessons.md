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
