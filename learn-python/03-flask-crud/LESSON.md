# Lesson 3 — Flask CRUD: web apps, databases, and trusting no input

**Setup:** `pip install flask`  **Run:** `flask --app app init-db` then `flask --app app run --debug` and open http://127.0.0.1:5000  **Test:** `python -m pytest`

## What you built

A task manager with two front doors to the same data:

- **HTML pages** for people: list, filter, search, create, edit, toggle done, delete.
- **A JSON API** for programs: `GET/POST /api/tasks`, `GET/PATCH/DELETE /api/tasks/<id>`.

CRUD (Create, Read, Update, Delete) covers most of what most business software does. Learn it properly once and you'll recognize it everywhere.

Try the API from a terminal while the server runs:

```bash
curl -X POST localhost:5000/api/tasks -H 'content-type: application/json' -d '{"title":"hello"}'
curl localhost:5000/api/tasks
curl -X PATCH localhost:5000/api/tasks/1 -H 'content-type: application/json' -d '{"done":true}'
curl -X DELETE localhost:5000/api/tasks/1 -i
```

## Fundamental 1: HTTP is a small, strict language

| Verb | Means | Safe to repeat? | Our status codes |
|---|---|---|---|
| `GET` | read | yes, it changes nothing | 200, or 404 if missing |
| `POST` | create | no: twice makes two tasks | **201 Created** + a `Location` header |
| `PATCH` | change some fields | yes, same result each time | 200, 404, or 422 |
| `DELETE` | remove | yes | **204 No Content**, or 404 |

Status codes are the API's grammar. `400` means "I can't even read this" (not JSON). `422` means "I read it, but it's invalid" (empty title). A client program decides what to do from the number alone, so pick it carefully.

**Post/Redirect/Get:** after a form POST, the HTML side answers with a `302` redirect to `/`. Without it, pressing refresh re-sends the form and you get duplicate tasks.

## Fundamental 2: SQL injection, the bug that keeps getting exploited

Never build SQL with string formatting:

```python
# WRONG: user input becomes part of the SQL *code*
db.execute(f"SELECT * FROM tasks WHERE title LIKE '%{search}%'")
```

Search for `'; DROP TABLE tasks; --` and that query turns into two commands. The fix is **parameters**:

```python
# RIGHT: the `?` is filled in by the database driver, always treated as data
db.execute("SELECT * FROM tasks WHERE title LIKE ?", (f"%{search}%",))
```

`test_sql_injection_is_just_text` stores exactly that evil string and checks the table survives.

One subtle spot: column names *can't* be `?` parameters. `update_task` builds `SET title = ?, done = ?` from field names, so it first filters them through an **allow-list** (`allowed = {...}`). Anything not on the list never reaches the SQL.

## Fundamental 3: validate at the edge, enforce in the database

User input is checked twice, on purpose:

1. **`clean_task()`** in Python, for friendly messages ("Title is required.") shown next to the right field.
2. **`CHECK` constraints** in `schema.sql` (`priority IN ('low','medium','high')`, non-empty title), so that even a bug in your Python, or someone poking the DB directly, can't store garbage.

That's **defense in depth**. The database is the last line of defense, and it never forgets a rule.

`clean_task(partial=True)` is how PATCH works: only check the fields that were sent, and leave the rest alone. A test confirms PATCHing `done` doesn't wipe the title.

## Fundamental 4: the web has attackers, and templates help

**XSS (cross-site scripting):** if a task title is `<script>...</script>` and you print it raw, it runs in every visitor's browser. Jinja escapes `{{ task.title }}` automatically, turning `<` into `&lt;`. A test checks this. Never mark user content `|safe`.

**CSRF (cross-site request forgery):** an evil website can include a hidden form that POSTs to `yoursite/tasks/1/delete`, and your browser sends your cookies along. The defense: every form carries a random token stored in your session, which the evil site can't read.

**The bug the tests caught while building this.** The first version was:

```python
if not secrets.compare_digest(sent, session.get("csrf", "")):
```

A brand-new visitor has no session and sends no token, so that compares `""` with `""`: they match, and the attack gets through. `test_html_rejects_missing_csrf` failed, and the fix is a one-line `if not expected`. This is why you write a test for the *attack*, not only the happy path. (In a real project, use the `Flask-WTF` package, which already handles this.)

## Fundamental 5: structure

```
schema.sql   the shape of the data
db.py        the only file that writes SQL
app.py       routes: HTTP in -> validate -> call db -> HTTP out
templates/   HTML only, no logic beyond loops and ifs
```

This is the same layering as Project 2. Routes never write SQL, and templates never touch the database. Moving to PostgreSQL would change only `db.py`.

- **Application factory (`create_app`)**: each test builds its own app pointed at a temp database, so tests never share data or touch your real one.
- **One DB connection per request** (`g.db`), closed automatically by `teardown_appcontext`, so connections don't leak.
- **`SECRET_KEY` from the environment.** It signs session cookies. The fallback `dev-only-change-me` is fine on your laptop and a disaster on a server.

## When to use an ORM

SQLAlchemy lets you write `Task.query.filter_by(done=False)` instead of SQL. Use it in bigger projects. But learn raw SQL first, like this. ORMs generate SQL, and when it's slow or wrong you'll need to read it.

## Exercises

1. Add a `due_date` column. Update `schema.sql`, `clean_task` (reject invalid dates), the form, and sort overdue tasks first. Notice how many layers one feature touches.
2. Add pagination to `/api/tasks` with `?limit=20&offset=40`. Why should `limit` have a maximum?
3. Add a `tags` table with a many-to-many link to tasks. That's your first JOIN.
4. Changing `schema.sql` currently deletes your data. Look up "database migrations" (Alembic, or Flask-Migrate) to see how real apps change schemas safely.
