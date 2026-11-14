"""A task manager: HTML pages for people, a JSON API for programs.

    pip install flask
    flask --app app init-db
    flask --app app run --debug        -> http://127.0.0.1:5000

    C  POST   /tasks             |  POST   /api/tasks
    R  GET    /  ,  /tasks/<id>  |  GET    /api/tasks , /api/tasks/<id>
    U  POST   /tasks/<id>/edit   |  PATCH  /api/tasks/<id>
    D  POST   /tasks/<id>/delete |  DELETE /api/tasks/<id>
"""

from __future__ import annotations

import os
import secrets
from pathlib import Path

from flask import Flask, abort, flash, jsonify, redirect, render_template, request, session, url_for

import db


def create_app(test_config: dict | None = None) -> Flask:
    """The application factory: build a fresh app, so tests can make their own."""
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev-only-change-me"),
        DATABASE=str(Path(app.instance_path) / "tasks.sqlite"),
    )
    if test_config:
        app.config.update(test_config)
    Path(app.instance_path).mkdir(parents=True, exist_ok=True)
    db.init_app(app)
    register_routes(app)
    return app


# --------------------------------------------------------------- validation

class ValidationError(Exception):
    def __init__(self, errors: dict[str, str]):
        super().__init__(errors)
        self.errors = errors


def clean_task(data: dict, partial: bool = False) -> dict:
    """Check user input. Returns clean values or raises ValidationError.

    `partial=True` is for PATCH: only check the fields that were sent.
    """
    out, errors = {}, {}

    if "title" in data or not partial:
        title = str(data.get("title", "")).strip()
        if not title:
            errors["title"] = "Title is required."
        elif len(title) > 200:
            errors["title"] = "Title must be 200 characters or fewer."
        out["title"] = title

    if "notes" in data or not partial:
        notes = str(data.get("notes", "")).strip()
        if len(notes) > 5000:
            errors["notes"] = "Notes must be 5000 characters or fewer."
        out["notes"] = notes

    if "priority" in data or not partial:
        priority = data.get("priority", "medium")
        if priority not in db.PRIORITIES:
            errors["priority"] = f"Priority must be one of {', '.join(db.PRIORITIES)}."
        out["priority"] = priority

    if "done" in data:
        done = data["done"]
        if done in (True, "true", "on", "1", 1):
            out["done"] = 1
        elif done in (False, "false", "0", 0):
            out["done"] = 0
        else:
            errors["done"] = "done must be true or false."

    if errors:
        raise ValidationError(errors)
    return out


def task_to_dict(row) -> dict:
    d = dict(row)
    d["done"] = bool(d["done"])
    return d


# -------------------------------------------------------------- CSRF guard
# A form on an evil site could POST to /tasks/1/delete using your browser's cookies.
# Each of our forms carries a random token the evil site can't know.

def csrf_token() -> str:
    if "csrf" not in session:
        session["csrf"] = secrets.token_hex(16)
    return session["csrf"]


def check_csrf() -> None:
    sent = request.form.get("csrf", "")
    expected = session.get("csrf", "")
    # The `not expected` check matters: with no session, both are "" and would match.
    if not expected or not secrets.compare_digest(sent, expected):
        abort(400, "Missing or invalid form token. Reload the page and try again.")


# ------------------------------------------------------------------- routes

def register_routes(app: Flask) -> None:
    app.jinja_env.globals["csrf_token"] = csrf_token

    # ---------- HTML pages ----------

    @app.get("/")
    def index():
        status = request.args.get("status", "all")
        q = request.args.get("q", "").strip()
        return render_template("index.html", tasks=db.list_tasks(status, q), status=status, q=q)

    @app.post("/tasks")
    def create():
        check_csrf()
        try:
            data = clean_task(request.form)
        except ValidationError as err:
            return render_template("form.html", task=request.form, errors=err.errors), 400
        db.create_task(data["title"], data["notes"], data["priority"])
        flash("Task added.")
        return redirect(url_for("index"))      # Post/Redirect/Get: refresh won't resubmit

    @app.get("/tasks/new")
    def new():
        return render_template("form.html", task={}, errors={})

    @app.get("/tasks/<int:task_id>/edit")
    def edit(task_id):
        task = db.get_task(task_id) or abort(404)
        return render_template("form.html", task=task, errors={})

    @app.post("/tasks/<int:task_id>/edit")
    def update(task_id):
        check_csrf()
        db.get_task(task_id) or abort(404)
        form = request.form.to_dict()
        form["done"] = "done" in request.form       # unchecked checkboxes are simply absent
        try:
            data = clean_task(form)
        except ValidationError as err:
            return render_template("form.html", task={**form, "id": task_id}, errors=err.errors), 400
        db.update_task(task_id, **data)
        flash("Task saved.")
        return redirect(url_for("index"))

    @app.post("/tasks/<int:task_id>/toggle")
    def toggle(task_id):
        check_csrf()
        task = db.get_task(task_id) or abort(404)
        db.update_task(task_id, done=0 if task["done"] else 1)
        return redirect(request.referrer or url_for("index"))

    @app.post("/tasks/<int:task_id>/delete")
    def delete(task_id):
        check_csrf()
        if not db.delete_task(task_id):
            abort(404)
        flash("Task deleted.")
        return redirect(url_for("index"))

    # ---------- JSON API ----------

    @app.get("/api/tasks")
    def api_list():
        rows = db.list_tasks(request.args.get("status", "all"), request.args.get("q", ""))
        return jsonify([task_to_dict(r) for r in rows])

    @app.get("/api/tasks/<int:task_id>")
    def api_get(task_id):
        task = db.get_task(task_id)
        if task is None:
            return jsonify(error="not found"), 404
        return jsonify(task_to_dict(task))

    @app.post("/api/tasks")
    def api_create():
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return jsonify(error="send a JSON object"), 400
        try:
            clean = clean_task(data)
        except ValidationError as err:
            return jsonify(errors=err.errors), 422
        task_id = db.create_task(clean["title"], clean["notes"], clean["priority"])
        resp = jsonify(task_to_dict(db.get_task(task_id)))
        return resp, 201, {"Location": url_for("api_get", task_id=task_id)}

    @app.patch("/api/tasks/<int:task_id>")
    def api_update(task_id):
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return jsonify(error="send a JSON object"), 400
        try:
            clean = clean_task(data, partial=True)
        except ValidationError as err:
            return jsonify(errors=err.errors), 422
        if not db.update_task(task_id, **clean):
            return jsonify(error="not found"), 404
        return jsonify(task_to_dict(db.get_task(task_id)))

    @app.delete("/api/tasks/<int:task_id>")
    def api_delete(task_id):
        if not db.delete_task(task_id):
            return jsonify(error="not found"), 404
        return "", 204


# `flask --app app run` finds create_app() by name, so no global `app` is needed.
if __name__ == "__main__":
    create_app().run(debug=True)
