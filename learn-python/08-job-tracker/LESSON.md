# Lesson 8 — Job Tracker + Notion: syncing two sources of truth

**Setup:** `pip install requests`  **Run:** `python tracker.py add "Acme" "Backend Intern"`, `python tracker.py list`, `python tracker.py stats`  **Test:** `python -m pytest`

## What you built

A command-line job tracker (add, list, update status, add notes, stats) that stores everything in SQLite and **syncs both ways with a Notion database**. You can update an application from your phone in Notion, and the next `sync` brings it home.

## One-time Notion setup

1. Go to https://www.notion.so/profile/integrations, create an **internal integration**, and copy its secret.
2. In Notion, create a full-page **database** with these properties (names must match exactly):
   `Company` (Title) · `Role` (Text) · `Status` (Select) · `Applied` (Date) · `Link` (URL) · `Notes` (Text) · `Local ID` (Number)
3. On the database page, open **⋯ → Connections** and add your integration. Without this step you get 404 errors. It's the most common setup mistake.
4. Copy the database ID: the 32-character string in the database URL, before `?v=`.
5. Set both values as environment variables (never in code):
   ```bash
   export NOTION_TOKEN=ntn_...
   export NOTION_DATABASE_ID=0123456789abcdef0123456789abcdef
   python tracker.py sync
   ```

## Fundamental 1: sync is harder than it looks

"Copy my rows to Notion" sounds like one loop. Here's what actually happens:

| Situation | Naive code | What this code does |
|---|---|---|
| Run sync twice | creates every page twice | `notion_page_id` remembers each page, so the second sync is a no-op |
| Changed locally | resends everything | only rows that are **dirty** (`updated_at > synced_at`) are pushed |
| Changed in Notion | overwritten by the local copy | detected via `last_edited_time` and pulled |
| Changed in **both** | whichever runs last silently wins | **conflict**: the newer edit wins *and it's reported* |
| Crash after creating a page, before saving its ID | duplicate page next time | each page stores `Local ID`, so sync finds and adopts it |
| One row fails | whole sync aborts | error recorded, others continue, retried next run |

Every one of those has a test. Read `test_tracker.py` alongside this table.

## Fundamental 2: one source of truth, plus stable IDs

SQLite is the **source of truth**, and Notion is a **mirror** you can edit. The link between the two is a pair of IDs stored on both sides: `notion_page_id` locally, and `Local ID` in Notion.

Never match records by something a human can change, like the company name. If someone renames "Acme" to "Acme Corp" in Notion, a name-based sync creates a duplicate. **Match on IDs that never change.** The same rule applies in every system that connects to another one: payment webhooks, Google Calendar sync, data pipelines.

## Fundamental 3: time is tricky

Change detection compares timestamps. Three traps, all handled here:

1. **Use UTC everywhere.** `now_utc()` returns `2026-11-14T10:00:00+00:00`. Mixing local time with UTC makes "newer" wrong by hours. Store UTC, and convert to local time only for display.
2. **Precision.** Notion rounds `last_edited_time` *down to the minute*. An edit made 20 seconds after a sync gets a timestamp *earlier* than the sync. With a strict `>`, it would be lost forever. The fix is to round our side the same way, use `>=`, and also require that the content actually differs, so our own push isn't mistaken for a human edit.

   That bug was verified on purpose: changing `>=` back to `>` makes `test_notion_edit_in_same_minute_as_sync_is_not_missed` fail. If your test still passes after you break the code, the test isn't protecting anything. (Breaking code on purpose to check your tests is called **mutation testing**.)
3. **A test clock.** The tests swap `now_utc` for a `Clock` they control (`clock.advance(minutes=2)`). Tests that call the real clock or `sleep()` are slow and flaky. **Make time a dependency you can inject**, like the HTTP session in Lesson 2.

## Fundamental 4: being a good API citizen

`notion.py` follows the rules any real API expects:

- **Rate limits:** Notion allows roughly 3 requests per second and replies `429 Too Many Requests` beyond that. The client waits as long as the `Retry-After` header says, then retries. Ignoring 429s gets your integration blocked.
- **Pagination:** a query returns at most 100 results plus a `next_cursor`. `query_database` follows the cursor until `has_more` is false. With 100 or fewer jobs you'd never notice the bug, and on job 101 you'd lose data. The test fakes two pages to cover it.
- **API versioning:** the `Notion-Version` header pins the API behavior this code was written against, so a change on Notion's side can't silently break it.
- **Helpful auth errors:** a 401/403 adds "share the database with your integration", which turns an hour of debugging into a 10-second fix.

## Fundamental 5: fakes that behave like the real thing

`FakeNotion` isn't a lazy stub. It copies the real API's awkward details: the rounded timestamps, `plain_text` in rich text, and failures for specific rows. **A fake is only useful if it's faithful about the things that can break you.** If the fake used exact timestamps, the minute-rounding bug could never show up in tests.

## Where this goes next

This is the same pattern behind offline-first mobile apps, Dropbox, and Git: local state, remote state, and a merge step. Git asks *you* to resolve conflicts; we used "newest wins", which is simple but can lose an edit. Comparing each field separately (status from one side, notes from the other) would be better. If you want to go deeper, look up CRDTs.

## Exercises

1. Make conflict resolution per-field: if status changed only in Notion and notes changed only locally, keep both changes.
2. Add `tracker.py remind` to list applications that have been "Applied" for more than 14 days with no update, so you know to follow up.
3. Handle deletions: if a page is archived in Notion, what should happen locally? Write the test first.
4. Pull jobs that were created directly in Notion (no `Local ID`) into SQLite.
