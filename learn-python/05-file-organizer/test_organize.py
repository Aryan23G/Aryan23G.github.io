from pathlib import Path

import pytest

from organize import JOURNAL, apply, category_for, main, plan, undo


def make(folder: Path, *names: str) -> None:
    for name in names:
        (folder / name).write_text(name)        # content = name, so we can check it later


def snapshot(folder: Path) -> dict[str, str]:
    """Every file (relative path -> content), ignoring the journal."""
    return {str(p.relative_to(folder)): p.read_text()
            for p in folder.rglob("*") if p.is_file() and p.name != JOURNAL}


@pytest.mark.parametrize("name, category", [
    ("a.PDF", "Documents"), ("b.jpeg", "Images"), ("c.tar.gz", "Archives"),
    ("d.py", "Code"), ("README", "Other"), ("e.weird", "Other"),
])
def test_category_for(name, category):
    assert category_for(Path(name)) == category


def test_dry_run_changes_nothing(tmp_path):
    make(tmp_path, "a.pdf", "b.png")
    before = snapshot(tmp_path)
    assert main([str(tmp_path), "-q"]) == 0
    assert snapshot(tmp_path) == before


def test_apply_sorts_files(tmp_path):
    make(tmp_path, "a.pdf", "b.png", "notes")
    main([str(tmp_path), "--apply", "-q"])
    assert snapshot(tmp_path) == {"Documents/a.pdf": "a.pdf", "Images/b.png": "b.png",
                                  "Other/notes": "notes"}


def test_never_overwrites(tmp_path):
    (tmp_path / "Documents").mkdir()
    (tmp_path / "Documents" / "a.pdf").write_text("old")
    make(tmp_path, "a.pdf")
    main([str(tmp_path), "--apply", "-q"])
    assert snapshot(tmp_path) == {"Documents/a.pdf": "old", "Documents/a (1).pdf": "a.pdf"}


def test_skips_hidden_folders_links_and_partial_downloads(tmp_path):
    make(tmp_path, ".hidden.pdf", "movie.mp4.part", "keep.txt")
    (tmp_path / "subfolder").mkdir()
    (tmp_path / "link.pdf").symlink_to(tmp_path / "keep.txt")
    assert [m.src.name for m in plan(tmp_path)] == ["keep.txt"]


def test_running_twice_is_harmless(tmp_path):
    make(tmp_path, "a.pdf")
    main([str(tmp_path), "--apply", "-q"])
    after_first = snapshot(tmp_path)
    main([str(tmp_path), "--apply", "-q"])          # idempotent: nothing left to move
    assert snapshot(tmp_path) == after_first


def test_undo_restores_everything(tmp_path):
    make(tmp_path, "a.pdf", "b.png", "c.zip")
    before = snapshot(tmp_path)
    main([str(tmp_path), "--apply", "-q"])
    main([str(tmp_path), "--undo", "-q"])
    assert snapshot(tmp_path) == before
    assert not (tmp_path / "Images").exists()       # emptied folders cleaned up
    assert not (tmp_path / JOURNAL).exists()


def test_undo_is_per_batch(tmp_path):
    make(tmp_path, "a.pdf")
    apply(tmp_path, plan(tmp_path))
    make(tmp_path, "b.png")
    apply(tmp_path, plan(tmp_path))
    undo(tmp_path)                                  # only the second run is reversed
    assert snapshot(tmp_path) == {"Documents/a.pdf": "a.pdf", "b.png": "b.png"}


def test_refuses_home_and_missing(tmp_path):
    assert main([str(Path.home()), "-q"]) == 1
    assert main([str(tmp_path / "nope"), "-q"]) == 1
