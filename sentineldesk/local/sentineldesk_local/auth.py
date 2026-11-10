"""Dashboard accounts, sessions and roles.

- Passwords: scrypt (n=2^14, r=8, p=1) with a per-user salt; minimum 12 characters.
- Sessions: random 32-byte tokens; only their SHA-256 is stored, so a copy of the database does not
  contain usable sessions. Cookie is HttpOnly + SameSite=Strict; 12-hour lifetime.
- Brute force: at most 5 failed logins per username per 15 minutes.
- Roles: "analyst" reviews tickets; "admin" also manages users.
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import re
import secrets
import sqlite3
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

from .db import Database, now_iso

SESSION_COOKIE = "sd_session"
SESSION_HOURS = 12
MIN_PASSWORD = 12
MAX_FAILURES = 5
FAILURE_WINDOW = timedelta(minutes=15)
ROLES = ("admin", "analyst")
_USERNAME = re.compile(r"^[a-z0-9][a-z0-9._-]{1,31}$")
_N, _R, _P = 2**14, 8, 1


class AuthError(ValueError):
    pass


@dataclass(frozen=True)
class User:
    id: int
    username: str
    role: str

    @property
    def is_admin(self) -> bool:
        return self.role == "admin"


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=_N, r=_R, p=_P, dklen=32)
    return f"scrypt${_N}${_R}${_P}${base64.b64encode(salt).decode()}${base64.b64encode(digest).decode()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        algo, n, r, p, salt, digest = stored.split("$")
        if algo != "scrypt":
            return False
        actual = hashlib.scrypt(password.encode(), salt=base64.b64decode(salt), n=int(n), r=int(r), p=int(p), dklen=32)
        return hmac.compare_digest(actual, base64.b64decode(digest))
    except (ValueError, TypeError):
        return False


def _token_hash(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


class Auth:
    def __init__(self, db: Database):
        self.db = db

    # ---------------------------------------------------------------- users

    def user_count(self) -> int:
        with self.db.connect() as c:
            return int(c.execute("SELECT COUNT(*) FROM users WHERE disabled = 0").fetchone()[0])

    def create_user(self, username: str, password: str, role: str = "analyst") -> User:
        username = username.strip().lower()
        if not _USERNAME.match(username):
            raise AuthError("Username: 2-32 characters, lowercase letters, digits, dot, dash or underscore.")
        if role not in ROLES:
            raise AuthError(f"Role must be one of {', '.join(ROLES)}.")
        if len(password) < MIN_PASSWORD:
            raise AuthError(f"Password must be at least {MIN_PASSWORD} characters.")
        if password.lower() == username or password.lower() in ("password1234", "sentineldesk1"):
            raise AuthError("Choose a password that is not your username or a common default.")
        try:
            with self.db.connect() as c:
                cur = c.execute("INSERT INTO users (username, pw_hash, role, created_at) VALUES (?, ?, ?, ?)", (username, hash_password(password), role, now_iso()))
                return User(id=int(cur.lastrowid), username=username, role=role)
        except sqlite3.IntegrityError as exc:
            raise AuthError(f"User {username!r} already exists.") from exc

    def set_password(self, username: str, password: str) -> None:
        if len(password) < MIN_PASSWORD:
            raise AuthError(f"Password must be at least {MIN_PASSWORD} characters.")
        with self.db.connect() as c:
            cur = c.execute("UPDATE users SET pw_hash = ?, disabled = 0 WHERE username = ?", (hash_password(password), username.lower()))
            if cur.rowcount == 0:
                raise AuthError(f"No user {username!r}.")
            # A password change ends every existing session for that user.
            c.execute("DELETE FROM sessions WHERE user_id = (SELECT id FROM users WHERE username = ?)", (username.lower(),))

    def disable_user(self, username: str) -> None:
        with self.db.connect() as c:
            cur = c.execute("UPDATE users SET disabled = 1 WHERE username = ?", (username.lower(),))
            if cur.rowcount == 0:
                raise AuthError(f"No user {username!r}.")
            c.execute("DELETE FROM sessions WHERE user_id = (SELECT id FROM users WHERE username = ?)", (username.lower(),))

    def list_users(self) -> list[dict]:
        with self.db.connect() as c:
            return [dict(r) for r in c.execute("SELECT username, role, created_at, disabled, last_login FROM users ORDER BY username")]

    # ---------------------------------------------------------------- first-run setup link

    def setup_token(self) -> str | None:
        """While no account exists, a one-time secret that lets whoever has it create the first admin
        in the browser. It is printed by the launcher (and in `docker compose logs`), so only someone
        with access to the server can use it. None once an account exists."""
        if self.user_count() > 0:
            self.db.set_meta("setup_token", "")
            return None
        token = self.db.get_meta("setup_token")
        if not token:
            token = secrets.token_urlsafe(18)
            self.db.set_meta("setup_token", token)
        return token

    def create_first_admin(self, token: str, username: str, password: str) -> User:
        expected = self.db.get_meta("setup_token") or ""
        if self.user_count() > 0 or not expected:
            raise AuthError("Setup is already complete. Sign in instead.")
        if not hmac.compare_digest(token.encode(), expected.encode()):
            raise AuthError("This setup link is not valid. Use the link printed when SentinelDesk started.")
        user = self.create_user(username, password, "admin")
        self.db.set_meta("setup_token", "")
        self.db.add_event(None, "auth", "info", f"First admin {user.username} created from the setup link.")
        return user

    # ---------------------------------------------------------------- sessions

    def login(self, username: str, password: str) -> tuple[User, str]:
        """Returns (user, session token). Raises AuthError with a deliberately generic message."""
        username = username.strip().lower()
        since = (datetime.now(timezone.utc) - FAILURE_WINDOW).isoformat(timespec="milliseconds")
        with self.db.connect() as c:
            failures = c.execute("SELECT COUNT(*) FROM login_failures WHERE username = ? AND at > ?", (username, since)).fetchone()[0]
            if failures >= MAX_FAILURES:
                raise AuthError("Too many failed attempts. Try again in 15 minutes.")
            row = c.execute("SELECT id, username, role, pw_hash, disabled FROM users WHERE username = ?", (username,)).fetchone()
            # Hash even for unknown users so response time does not reveal which usernames exist.
            valid = verify_password(password, row["pw_hash"] if row else hash_password("timing-equaliser-" + secrets.token_hex(4)))
            if not row or row["disabled"] or not valid:
                c.execute("INSERT INTO login_failures (username, at) VALUES (?, ?)", (username, now_iso()))
                raise AuthError("Wrong username or password.")
            c.execute("DELETE FROM login_failures WHERE username = ?", (username,))
            token = secrets.token_urlsafe(32)
            expires = (datetime.now(timezone.utc) + timedelta(hours=SESSION_HOURS)).isoformat(timespec="milliseconds")
            c.execute("INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)", (_token_hash(token), row["id"], now_iso(), expires))
            c.execute("UPDATE users SET last_login = ? WHERE id = ?", (now_iso(), row["id"]))
            c.execute("DELETE FROM sessions WHERE expires_at < ?", (now_iso(),))
        self.db.add_event(None, "auth", "info", f"{username} signed in.")
        return User(id=int(row["id"]), username=row["username"], role=row["role"]), token

    def user_for(self, token: str | None) -> User | None:
        if not token:
            return None
        with self.db.connect() as c:
            row = c.execute(
                """SELECT u.id, u.username, u.role FROM sessions s JOIN users u ON u.id = s.user_id
                   WHERE s.token_hash = ? AND s.expires_at > ? AND u.disabled = 0""",
                (_token_hash(token), now_iso()),
            ).fetchone()
        return User(id=int(row["id"]), username=row["username"], role=row["role"]) if row else None

    def logout(self, token: str | None) -> None:
        if token:
            with self.db.connect() as c:
                c.execute("DELETE FROM sessions WHERE token_hash = ?", (_token_hash(token),))
