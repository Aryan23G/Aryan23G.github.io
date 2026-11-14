"""Database access. The ONLY file that writes SQL.

Routes call these functions; they never build queries themselves.
"""

from __future__ import annotations

import sqlite3
from pathlib import Path

import click
from flask import current_app, g

PRIORITIES = ("low", "medium", "high")


def get_db() -> sqlite3.Connection:
    """One connection per request, stored on `g`, closed by close_db()."""
    if "db" not in g:
        g.db = sqlite3.connect(current_app.config["DATABASE"])
        g.db.row_factory = sqlite3.Row          # rows behave like dicts: row["title"]
        g.db.execute("PRAGMA foreign_keys = ON")
    return g.db


def close_db(_exc=None) -> None:
    db = g.pop("db", None)
    if db is not None:
        db.close()


def init_db() -> None:
    schema = (Path(__file__).parent / "schema.sql").read_text()
    get_db().executescript(schema)


@click.command("init-db")
def init_db_command() -> None:
    """Create a fresh, empty database (deletes existing data)."""
    init_db()
    click.echo("Initialized the database.")


def init_app(app) -> None:
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


# ------------------------------------------------------------------ queries
# Every value goes in through a `?` placeholder, never an f-string.
# That one rule is what prevents SQL injection.

def list_tasks(status: str = "all", search: str = "") -> list[sqlite3.Row]:
    sql = "SELECT * FROM tasks WHERE 1=1"
    params: list = []
    if status == "open":
        sql += " AND done = 0"
    elif status == "done":
        sql += " AND done = 1"
    if search:
        sql += " AND (title LIKE ? OR notes LIKE ?)"
        params += [f"%{search}%", f"%{search}%"]
    sql += """ ORDER BY done,
               CASE priority WHEN 'high' THEN 0 WHEN 'medium' THEN 1 ELSE 2 END,
               id DESC"""
    return get_db().execute(sql, params).fetchall()


def get_task(task_id: int) -> sqlite3.Row | None:
    return get_db().execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()


def create_task(title: str, notes: str, priority: str) -> int:
    db = get_db()
    cur = db.execute(
        "INSERT INTO tasks (title, notes, priority) VALUES (?, ?, ?)",
        (title, notes, priority),
    )
    db.commit()
    return cur.lastrowid


def update_task(task_id: int, **fields) -> bool:
    allowed = {"title", "notes", "priority", "done"}
    fields = {k: v for k, v in fields.items() if k in allowed}
    if not fields:
        return get_task(task_id) is not None
    # Column names can't be `?` placeholders, so they come from the allow-list above,
    # never from the user. Values still go through `?`.
    assignments = ", ".join(f"{col} = ?" for col in fields)
    db = get_db()
    cur = db.execute(
        f"UPDATE tasks SET {assignments}, updated_at = datetime('now') WHERE id = ?",
        (*fields.values(), task_id),
    )
    db.commit()
    return cur.rowcount == 1


def delete_task(task_id: int) -> bool:
    db = get_db()
    cur = db.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    db.commit()
    return cur.rowcount == 1
