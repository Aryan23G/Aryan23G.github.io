"""Sort a messy folder into subfolders by file type.

    python organize.py ~/Downloads              # dry run: shows the plan, moves nothing
    python organize.py ~/Downloads --apply      # actually move files
    python organize.py ~/Downloads --undo       # put everything back

Safety rules:
  * dry run by default            * never overwrite: "a.pdf" -> "a (1).pdf"
  * only top-level files          * every move is journaled so it can be undone
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import shutil
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

log = logging.getLogger("organize")

CATEGORIES: dict[str, set[str]] = {
    "Images":    {".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".svg", ".bmp"},
    "Documents": {".pdf", ".doc", ".docx", ".txt", ".md", ".rtf", ".odt", ".pages"},
    "Sheets":    {".xls", ".xlsx", ".csv", ".ods", ".numbers"},
    "Slides":    {".ppt", ".pptx", ".key", ".odp"},
    "Audio":     {".mp3", ".wav", ".flac", ".m4a", ".aac", ".ogg"},
    "Video":     {".mp4", ".mov", ".mkv", ".avi", ".webm"},
    "Archives":  {".zip", ".rar", ".7z", ".tar", ".gz", ".tgz"},
    "Code":      {".py", ".js", ".ts", ".html", ".css", ".json", ".ipynb", ".java", ".c", ".cpp", ".sh"},
    "Installers": {".exe", ".msi", ".dmg", ".pkg", ".deb", ".apk"},
}
OTHER = "Other"
JOURNAL = ".organize-journal.json"

# Build the reverse lookup once: ".png" -> "Images"
EXT_TO_CATEGORY = {ext: cat for cat, exts in CATEGORIES.items() for ext in exts}


@dataclass(frozen=True)
class Move:
    src: Path
    dst: Path


def category_for(path: Path) -> str:
    # Handle double extensions like .tar.gz before the plain suffix.
    if "".join(path.suffixes[-2:]).lower() == ".tar.gz":
        return "Archives"
    return EXT_TO_CATEGORY.get(path.suffix.lower(), OTHER)


def free_name(target: Path, taken: set[Path]) -> Path:
    """'report.pdf' -> 'report (1).pdf' if it exists on disk or is already planned."""
    if not target.exists() and target not in taken:
        return target
    stem, suffix = target.stem, target.suffix
    n = 1
    while True:
        candidate = target.with_name(f"{stem} ({n}){suffix}")
        if not candidate.exists() and candidate not in taken:
            return candidate
        n += 1


def plan(folder: Path) -> list[Move]:
    """Decide every move WITHOUT touching anything. Pure planning is easy to test."""
    moves: list[Move] = []
    taken: set[Path] = set()
    for entry in sorted(folder.iterdir()):
        if entry.name.startswith("."):          # hidden files, our journal, .DS_Store
            continue
        if entry.is_symlink() or not entry.is_file():
            continue                            # leave folders and links alone
        if entry.name.endswith((".part", ".crdownload", ".download")):
            continue                            # still downloading
        dst = free_name(folder / category_for(entry) / entry.name, taken)
        taken.add(dst)
        moves.append(Move(entry, dst))
    return moves


def apply(folder: Path, moves: list[Move]) -> int:
    """Carry out the plan, writing the journal as we go so a crash is still undoable."""
    journal_path = folder / JOURNAL
    history = json.loads(journal_path.read_text()) if journal_path.exists() else []
    batch = {"time": datetime.now().isoformat(timespec="seconds"), "moves": []}
    history.append(batch)
    done = 0
    for m in moves:
        try:
            m.dst.parent.mkdir(exist_ok=True)
            if m.dst.exists():                  # appeared since we planned: re-check
                raise FileExistsError(m.dst)
            shutil.move(str(m.src), str(m.dst))
        except OSError as err:                  # permissions, file in use, disk full...
            log.warning("skipped %s: %s", m.src.name, err)
            continue
        batch["moves"].append([str(m.src.relative_to(folder)), str(m.dst.relative_to(folder))])
        _write_journal(journal_path, history)
        done += 1
        log.info("moved %s -> %s", m.src.name, m.dst.relative_to(folder))
    return done


def undo(folder: Path) -> int:
    """Reverse the most recent --apply."""
    journal_path = folder / JOURNAL
    if not journal_path.exists():
        log.error("nothing to undo (no %s here)", JOURNAL)
        return 0
    history = json.loads(journal_path.read_text())
    if not history:
        log.error("nothing to undo")
        return 0
    batch = history.pop()
    restored = 0
    for src_rel, dst_rel in reversed(batch["moves"]):
        src, dst = folder / src_rel, folder / dst_rel
        if not dst.exists():
            log.warning("can't restore %s: it's no longer at %s", src_rel, dst_rel)
            continue
        target = free_name(src, set())
        shutil.move(str(dst), str(target))
        restored += 1
        log.info("restored %s", target.name)
        if dst.parent != folder and not any(dst.parent.iterdir()):
            dst.parent.rmdir()                  # remove category folders we emptied
    if history:
        _write_journal(journal_path, history)
    else:
        journal_path.unlink()
    return restored


def _write_journal(path: Path, history: list) -> None:
    """Write to a temp file then rename: a crash mid-write can't corrupt the journal."""
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(history, indent=1))
    os.replace(tmp, path)


def summarize(moves: list[Move]) -> str:
    counts: dict[str, int] = {}
    for m in moves:
        counts[m.dst.parent.name] = counts.get(m.dst.parent.name, 0) + 1
    return ", ".join(f"{cat}: {n}" for cat, n in sorted(counts.items())) or "nothing to do"


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Sort files into folders by type.")
    p.add_argument("folder", type=Path)
    mode = p.add_mutually_exclusive_group()
    mode.add_argument("--apply", action="store_true", help="actually move files")
    mode.add_argument("--undo", action="store_true", help="reverse the last --apply")
    p.add_argument("-q", "--quiet", action="store_true")
    args = p.parse_args(argv)

    logging.basicConfig(level=logging.WARNING if args.quiet else logging.INFO, format="%(message)s")
    folder = args.folder.expanduser().resolve()
    if not folder.is_dir():
        log.error("%s is not a folder", folder)
        return 1
    if folder == Path.home() or folder == Path(folder.anchor):
        log.error("refusing to organize %s itself; pick a subfolder like ~/Downloads", folder)
        return 1

    if args.undo:
        log.info("restored %d file(s)", undo(folder))
        return 0

    moves = plan(folder)
    if not args.apply:
        for m in moves:
            log.info("would move %s -> %s", m.src.name, m.dst.relative_to(folder))
        log.info("\nDry run. %s. Re-run with --apply to do it.", summarize(moves))
        return 0
    n = apply(folder, moves)
    log.info("\nMoved %d of %d file(s). Undo with --undo.", n, len(moves))
    return 0 if n == len(moves) else 2


if __name__ == "__main__":
    sys.exit(main())
