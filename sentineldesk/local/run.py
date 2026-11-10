#!/usr/bin/env python3
"""SentinelDesk local launcher.

    python run.py            check everything, init the database, start worker + dashboard
    python run.py --open     ...and open the dashboard in your browser
    python run.py --check    run the checks only, then exit (0 = ready)

Dashboard accounts (passwords are prompted, or read from SENTINEL_NEW_PASSWORD; never from argv):
    python run.py --add-user alice --role analyst
    python run.py --add-user boss --role admin
    python run.py --reset-password alice
    python run.py --list-users

Opt-in network actions (never done implicitly):
    --install   pip install -r requirements.txt   (downloads from PyPI)
    --pull      ollama pull <missing models>      (downloads model weights from the Ollama library)

Nothing here calls a paid service. The model runs in Ollama on this machine.
"""

from __future__ import annotations

import argparse
import getpass
import importlib.util
import os
import shutil
import signal
import socket
import subprocess
import sys
import time
import webbrowser
from pathlib import Path

HERE = Path(__file__).resolve().parent
REQUIRED = ("fastapi", "uvicorn", "requests", "pydantic")


def say(kind: str, msg: str) -> None:
    marks = {"ok": "\033[32m✓\033[0m", "warn": "\033[33m!\033[0m", "err": "\033[31m✗\033[0m", "info": "\033[36m›\033[0m"}
    print(f" {marks[kind]} {msg}", flush=True)


def check_python() -> bool:
    if sys.version_info < (3, 10):
        say("err", f"Python 3.10+ required, found {sys.version.split()[0]}.")
        return False
    say("ok", f"Python {sys.version.split()[0]}")
    return True


def check_deps(install: bool) -> bool:
    missing = [m for m in REQUIRED if importlib.util.find_spec(m) is None]
    if missing and install:
        say("info", f"Installing {', '.join(missing)} from requirements.txt…")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(HERE / "requirements.txt")], check=False)
        missing = [m for m in REQUIRED if importlib.util.find_spec(m) is None]
    if missing:
        say("err", f"Missing Python packages: {', '.join(missing)}. Run: {sys.executable} -m pip install -r requirements.txt  (or: python run.py --install)")
        return False
    say("ok", "Python packages installed")
    return True


def port_free(host: str, port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            s.bind((host, port))
            return True
        except OSError:
            return False


def check_ollama(settings, pull: bool) -> None:
    from sentineldesk_local.ollama_client import OllamaClient, OllamaError

    client = OllamaClient(settings.ollama_url, settings.request_timeout_s)
    try:
        models = client.list_models()
    except OllamaError as exc:
        say("warn", f"{exc} Start it with `ollama serve`. Until then tickets are decided by the offline rules engine.")
        return
    say("ok", f"Ollama online at {settings.ollama_url} ({len(models)} model(s) installed)")
    for model in dict.fromkeys([settings.agent_model, settings.chairman_model]):
        if client.has_model(models, model):
            say("ok", f"Model {model} ready")
            continue
        if pull and shutil.which("ollama"):
            say("info", f"Pulling {model} (one-time download from the Ollama library)…")
            subprocess.run(["ollama", "pull", model], check=False)
            if client.has_model(client.list_models(), model):
                say("ok", f"Model {model} ready")
                continue
        say("warn", f"Model {model} not installed. Run: ollama pull {model}  (or: python run.py --pull). Rules fallback until then.")


def check_profile_and_jira(settings) -> bool:
    from sentineldesk_local.config import LocalOnlyError
    from sentineldesk_local.jira import JiraClient, JiraCredentials, JiraError
    from sentineldesk_local.profile import ProfileError

    try:
        profile = settings.load_profile()
        jira_cfg = settings.load_jira()
    except (ProfileError, ValueError) as exc:
        say("err", f"Configuration: {exc}")
        return False
    say("ok", f"Profile: {profile.name} ({', '.join(profile.internal_domains)}; {len(profile.teams)} teams, {len(profile.kb)} KB articles)"
        + ("" if settings.config_path else "  [demo profile; set SENTINEL_CONFIG for a real desk]"))
    if jira_cfg is None:
        say("info", "Jira connector off (enable it in the [jira] section of your config).")
        return True
    try:
        client = JiraClient(jira_cfg, JiraCredentials.from_env(dict(os.environ)))
        me = client.myself()
        client.search(jira_cfg.jql, 1)
    except LocalOnlyError as exc:
        say("err", f"Jira: {exc}")
        return False
    except JiraError as exc:
        say("err", f"Jira: {exc}")
        return False
    say("ok", f"Jira {jira_cfg.deployment} at {jira_cfg.base_url} as {me.get('displayName', 'unknown')}; JQL works; mode {jira_cfg.mode}")
    if jira_cfg.mode == "shadow":
        say("info", "Shadow mode: triage is posted as INTERNAL comments only; no fields are changed.")
    return True


def read_new_password(username: str) -> str:
    env = os.environ.get("SENTINEL_NEW_PASSWORD")
    if env:
        return env
    if not sys.stdin.isatty():
        raise SystemExit(f"No terminal to prompt on: set SENTINEL_NEW_PASSWORD to the password for {username}.")
    first = getpass.getpass(f"Password for {username} (12+ characters): ")
    if first != getpass.getpass("Repeat password: "):
        raise SystemExit("Passwords did not match.")
    return first


def manage_users(args, db) -> int | None:
    """Handle the user-management flags. Returns an exit code, or None when none were given."""
    from sentineldesk_local.auth import Auth, AuthError

    auth = Auth(db)
    try:
        if args.list_users:
            users = auth.list_users()
            for u in users:
                print(f"  {u['username']:<20} {u['role']:<8} {'disabled' if u['disabled'] else 'active':<9} last login {u['last_login'] or 'never'}")
            if not users:
                print("  (no users yet)")
            return 0
        if args.add_user:
            user = auth.create_user(args.add_user, read_new_password(args.add_user), args.role)
            say("ok", f"Created {user.role} {user.username}.")
            return 0
        if args.reset_password:
            auth.set_password(args.reset_password, read_new_password(args.reset_password))
            say("ok", f"Password for {args.reset_password} changed; their sessions were signed out.")
            return 0
    except AuthError as exc:
        say("err", str(exc))
        return 1
    return None


def ensure_admin(db) -> bool:
    from sentineldesk_local.auth import Auth, AuthError

    auth = Auth(db)
    if auth.user_count() > 0:
        say("ok", f"{auth.user_count()} dashboard account(s)")
        return True
    if not sys.stdin.isatty() and not os.environ.get("SENTINEL_NEW_PASSWORD"):
        say("err", "No dashboard accounts yet. Create one: python run.py --add-user admin --role admin")
        return False
    say("info", "No dashboard accounts yet; creating the first admin.")
    name = os.environ.get("SENTINEL_ADMIN_USER") or (input("Admin username [admin]: ").strip() if sys.stdin.isatty() else "") or "admin"
    try:
        auth.create_user(name, read_new_password(name), "admin")
    except AuthError as exc:
        say("err", str(exc))
        return False
    say("ok", f"Created admin {name}.")
    return True


def wait_healthy(url: str, procs: list[subprocess.Popen], timeout_s: float = 30) -> bool:
    import requests

    session = requests.Session()
    session.trust_env = False  # localhost must never go through a proxy
    deadline = time.monotonic() + timeout_s
    while time.monotonic() < deadline:
        if any(p.poll() is not None for p in procs):
            return False
        try:
            if session.get(f"{url}/api/health", timeout=2).status_code == 200:
                return True
        except requests.RequestException:
            pass
        time.sleep(0.3)
    return False


def stop(procs: list[subprocess.Popen], grace_s: float) -> None:
    for p in procs:
        if p.poll() is None:
            p.terminate()
    deadline = time.monotonic() + grace_s
    for p in procs:
        try:
            p.wait(timeout=max(0.1, deadline - time.monotonic()))
        except subprocess.TimeoutExpired:
            p.kill()


def main() -> int:
    parser = argparse.ArgumentParser(description="Start SentinelDesk locally (worker + dashboard).")
    parser.add_argument("--open", action="store_true", help="open the dashboard in a browser")
    parser.add_argument("--check", action="store_true", help="run the checks and exit")
    parser.add_argument("--install", action="store_true", help="pip install missing packages (network)")
    parser.add_argument("--pull", action="store_true", help="ollama pull missing models (network)")
    parser.add_argument("--add-user", metavar="NAME", help="create a dashboard account")
    parser.add_argument("--role", choices=["analyst", "admin"], default="analyst", help="role for --add-user")
    parser.add_argument("--reset-password", metavar="NAME", help="set a new password for an account")
    parser.add_argument("--list-users", action="store_true", help="list dashboard accounts")
    args = parser.parse_args()

    os.chdir(HERE)
    sys.path.insert(0, str(HERE))
    print("\nSentinelDesk · local agentic council\n")
    if not (check_python() and check_deps(args.install)):
        return 1

    from sentineldesk_local.config import LocalOnlyError, Settings
    from sentineldesk_local.db import Database

    try:
        settings = Settings.from_env()
    except (LocalOnlyError, ValueError) as exc:
        say("err", str(exc))
        return 1

    db = Database(settings.db_path)
    existed = db.is_initialized()
    db.init()
    counts = db.counts()
    say("ok", f"Database {settings.db_path.resolve()} {'ready' if existed else 'created'} ({sum(counts.values())} ticket(s) logged)")
    code = manage_users(args, db)
    if code is not None:
        return code
    check_ollama(settings, args.pull)
    if not check_profile_and_jira(settings):
        return 1

    if not port_free(settings.host, settings.port):
        say("err", f"Port {settings.port} on {settings.host} is in use. Stop the other process or set SENTINEL_PORT.")
        return 1
    say("ok", f"Port {settings.port} free")
    if args.check:
        from sentineldesk_local.auth import Auth

        n = Auth(db).user_count()
        say("ok" if n else "warn", f"{n} dashboard account(s)" + ("" if n else "; create one with --add-user NAME --role admin"))
        print("\nAll checks done.\n")
        return 0

    if not ensure_admin(db):
        return 1
    env = {k: v for k, v in os.environ.items() if k != "SENTINEL_NEW_PASSWORD"}  # children never see it
    env.update({"PYTHONUNBUFFERED": "1", "SENTINEL_DB": str(settings.db_path.resolve())})
    worker = subprocess.Popen([sys.executable, "-m", "sentineldesk_local.worker"], cwd=HERE, env=env)
    web = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "sentineldesk_local.web:app_from_env", "--factory",
         "--host", settings.host, "--port", str(settings.port), "--log-level", "warning", "--no-access-log"],
        cwd=HERE, env=env,
    )
    procs = [worker, web]
    url = f"http://{settings.host}:{settings.port}"

    stopping = False

    def on_signal(signum, _frame):
        nonlocal stopping
        stopping = True

    signal.signal(signal.SIGINT, on_signal)
    signal.signal(signal.SIGTERM, on_signal)

    if not wait_healthy(url, procs):
        say("err", "The dashboard did not start. See the output above.")
        stop(procs, 5)
        return 1
    say("ok", f"Worker running (pid {worker.pid})")
    say("ok", f"Dashboard: {url}   (Ctrl+C to stop)\n")
    if args.open:
        webbrowser.open(url)

    code = 0
    while not stopping:
        for p, name in ((worker, "worker"), (web, "dashboard")):
            if p.poll() is not None:
                say("err", f"The {name} exited with code {p.returncode}; shutting down.")
                stopping, code = True, p.returncode or 1
        time.sleep(0.5)

    print()
    say("info", "Stopping (the worker finishes its current ticket first)…")
    stop(procs, grace_s=settings.request_timeout_s + 10)
    say("ok", "Stopped.")
    return code


if __name__ == "__main__":
    sys.exit(main())
