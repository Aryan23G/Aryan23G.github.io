import re

import pytest

import db
from app import create_app


@pytest.fixture
def app(tmp_path):
    app = create_app({"TESTING": True, "DATABASE": str(tmp_path / "test.sqlite")})
    with app.app_context():
        db.init_db()
    return app


@pytest.fixture
def client(app):
    return app.test_client()


def csrf(client):
    html = client.get("/tasks/new").get_data(as_text=True)
    return re.search(r'name="csrf" value="(\w+)"', html).group(1)


# ---------------- JSON API ----------------

def test_api_full_crud_cycle(client):
    r = client.post("/api/tasks", json={"title": "Learn SQL", "priority": "high"})
    assert r.status_code == 201
    task = r.get_json()
    assert task["title"] == "Learn SQL" and task["done"] is False
    assert r.headers["Location"].endswith(f"/api/tasks/{task['id']}")

    assert client.get(f"/api/tasks/{task['id']}").get_json()["priority"] == "high"

    r = client.patch(f"/api/tasks/{task['id']}", json={"done": True})
    assert r.status_code == 200 and r.get_json()["done"] is True
    assert r.get_json()["title"] == "Learn SQL"         # PATCH leaves other fields alone

    assert client.delete(f"/api/tasks/{task['id']}").status_code == 204
    assert client.get(f"/api/tasks/{task['id']}").status_code == 404


def test_api_validation(client):
    r = client.post("/api/tasks", json={"title": "  ", "priority": "urgent"})
    assert r.status_code == 422
    assert set(r.get_json()["errors"]) == {"title", "priority"}
    assert client.post("/api/tasks", data="not json").status_code == 400
    assert client.post("/api/tasks", json=["a", "list"]).status_code == 400


def test_api_missing_task(client):
    assert client.patch("/api/tasks/999", json={"done": True}).status_code == 404
    assert client.delete("/api/tasks/999").status_code == 404


def test_api_filter_and_search(client):
    for title in ["buy milk", "read book", "buy stamps"]:
        client.post("/api/tasks", json={"title": title})
    client.patch("/api/tasks/1", json={"done": True})
    assert [t["title"] for t in client.get("/api/tasks?status=open").get_json()] == ["buy stamps", "read book"]
    assert len(client.get("/api/tasks?q=buy").get_json()) == 2


def test_sql_injection_is_just_text(client):
    evil = "x'); DROP TABLE tasks; --"
    client.post("/api/tasks", json={"title": evil})
    assert client.get("/api/tasks?q=" + evil).get_json()[0]["title"] == evil
    assert client.get("/api/tasks").status_code == 200   # table still exists


# ---------------- HTML pages ----------------

def test_html_create_and_list(client):
    r = client.post("/tasks", data={"title": "Write lesson", "notes": "", "priority": "low",
                                    "csrf": csrf(client)})
    assert r.status_code == 302                          # Post/Redirect/Get
    assert "Write lesson" in client.get("/").get_data(as_text=True)


def test_html_rejects_missing_csrf(client):
    assert client.post("/tasks", data={"title": "sneaky"}).status_code == 400
    assert client.get("/api/tasks").get_json() == []


def test_html_shows_validation_errors(client):
    r = client.post("/tasks", data={"title": "", "priority": "low", "csrf": csrf(client)})
    assert r.status_code == 400 and "Title is required" in r.get_data(as_text=True)


def test_html_escapes_user_content(client):
    client.post("/api/tasks", json={"title": "<script>alert(1)</script>"})
    html = client.get("/").get_data(as_text=True)
    assert "<script>alert(1)" not in html and "&lt;script&gt;" in html


def test_html_edit_and_delete(client):
    client.post("/api/tasks", json={"title": "old"})
    token = csrf(client)
    client.post("/tasks/1/edit", data={"title": "new", "notes": "", "priority": "medium",
                                       "done": "on", "csrf": token})
    task = client.get("/api/tasks/1").get_json()
    assert task["title"] == "new" and task["done"] is True
    client.post("/tasks/1/delete", data={"csrf": token})
    assert client.get("/api/tasks/1").status_code == 404
