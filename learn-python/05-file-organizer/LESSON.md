# Lesson 5 — File Organizer: code that can destroy things

**Run:** `python organize.py ~/Downloads` (dry run), then add `--apply`, and `--undo` to reverse it.  **Test:** `python -m pytest`  No packages needed.

## What you built

A tool that sorts a folder into `Images/`, `Documents/`, `Archives/` and so on, by file extension. It uses only the standard library (`pathlib`, `shutil`, `os`, `json`, `logging`).

The sorting takes about 10 lines. The other ~150 are there because **this program moves real files on a real disk**, and a bug could lose someone's thesis. Most of this lesson is about engineering for safety.

## Fundamental 1: plan first, then act

The code is split into two phases:

```python
moves = plan(folder)     # decides everything, touches nothing
apply(folder, moves)     # carries out the plan
```

`plan()` is (almost) a **pure function**: it reads the folder and returns a list of `Move(src, dst)`. That split pays off three times:

1. **Dry run for free.** Without `--apply`, we just print the plan. Defaulting to *not* doing the dangerous thing is called **safe by default**. `rm` doesn't do this. Good tools do.
2. **Easy to test.** Checking a list of moves is far simpler than checking a disk.
3. **Conflicts are resolved before anything moves.** Two files that would both become `Documents/a.pdf` are caught during planning, via the `taken` set.

You'll see this pattern everywhere: `terraform plan` / `terraform apply`, database migrations, `git add` then `git commit`.

## Fundamental 2: never destroy data you didn't mean to

| Danger | Guard |
|---|---|
| Overwriting a file with the same name | `free_name()` picks `a (1).pdf`, and `apply` checks again right before moving (the disk can change between planning and acting) |
| Moving folders, symlinks, hidden or system files | Only regular top-level files are moved; anything starting with `.` is skipped |
| Moving a half-finished download | `.part` and `.crdownload` files are skipped |
| Pointing it at the wrong folder | Refuses to run on your home folder or a drive root |
| Changing your mind | `--undo`, using the journal |

That "check again right before moving" detail has a name: a **TOCTOU** bug (time-of-check to time-of-use). What was true when you looked may not be true when you act.

## Fundamental 3: the journal (how undo works)

Every successful move is written to `.organize-journal.json` *as it happens*, not at the end. If the program crashes after 500 of 1,000 files, the journal still lists the 500 that moved, so `--undo` can put them back. Databases use the same idea, called a **write-ahead log**.

Two details:

- **Atomic writes.** `_write_journal` writes to a temp file and then calls `os.replace()`. A rename is all-or-nothing on most systems, so a crash can't leave a half-written, unreadable journal. Use this trick whenever you save a file that matters.
- **Batches.** Each `--apply` is one batch, and `--undo` reverses only the newest one (`test_undo_is_per_batch`). That's exactly how an undo stack works.

## Fundamental 4: idempotency

Running `--apply` twice does nothing the second time: the files are already in folders, and folders are skipped. An operation that's safe to repeat is **idempotent**. It matters most when things fail halfway, because the fix is simply "run it again". `test_running_twice_is_harmless` checks it.

## Fundamental 5: logging instead of print

`logging` gives you levels (`info`, `warning`, `error`), so `-q` can hide the chatter but keep warnings, with one setting instead of dozens of `if not quiet:` checks. In bigger programs, logging can also add timestamps, write to a file, or ship logs to a server, all without changing any code that logs.

## Smaller lessons worth keeping

- **`pathlib.Path`** beats string paths: `folder / "Images" / name` works on Windows and Mac, and `.suffix`, `.stem` and `.exists()` are built in.
- **`.lower()` on extensions**, because `photo.JPG` is still a photo.
- **Edge cases are where the real work is:** `.tar.gz` has two suffixes, `README` has none.
- **A lookup dict built once** (`EXT_TO_CATEGORY`) instead of looping over every category for every file.
- **Exit code 2** means "partly done", so scripts can tell it apart from full success (0) and failure (1).
- **`tmp_path` in tests** gives each test its own empty folder, which is the only sane way to test file-system code. Never test against your real Downloads folder.

## Exercises

1. Add `--by-date` to sort into `2026/11-November/` using each file's modified time (`path.stat().st_mtime`).
2. Read categories from an optional `organize.toml` (Python 3.11+ has `tomllib`), so users can add their own.
3. Add `--recursive`. Which new dangers does it bring? (Hint: running it on its own output folders.)
4. Find duplicates by hashing file contents (`hashlib.sha256`) and report them. Report only; don't delete anything.
