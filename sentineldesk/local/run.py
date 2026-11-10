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

    client = settings.ollama_client()
    try:
        models = client.list_models()
    except OllamaError as exc:
        say("warn", f"The AI engine (Ollama) isn't running at {settings.ollama_url}, so requests are sorted by built-in rules for now. Start Ollama to use AI.")
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
        say("warn", f"The AI model {model} isn't downloaded yet, so built-in rules are used for now. Download it with: ollama pull {model}")


def check_profile_and_jira(settings) -> bool:
    from sentineldesk_local.config import LocalOnlyError
    from sentineldesk_local.jira import JiraClient, JiraError
    from sentineldesk_local.profile import ProfileError

    store = settings.store()
    try:
        profile = store.profile()
        jira_cfg = store.jira()
    except (ProfileError, ValueError) as exc:
        say("err", f"Configuration ({store.path}): {exc}")
        return False
    if not store.configured():
        say("info", "Not set up yet: the setup page in the browser walks you through it (demo data until then).")
    else:
        say("ok", f"Organisation: {profile.name} ({', '.join(profile.internal_domains)}; {len(profile.teams)} teams, {len(profile.kb)} help articles)")
    if jira_cfg is None:
        say("info", "Jira isn't connected yet (connect it in Settings in the browser).")
        return True
    try:
        client = JiraClient(jira_cfg, store.credentials())
        me = client.myself()
        client.search(jira_cfg.jql, 1)
    except LocalOnlyError as exc:
        say("err", f"Jira: {exc}")
        return False
    except JiraError as exc:
        say("err", f"Jira: {exc}")
        return False
    say("ok", f"Jira connected ({jira_cfg.base_url}) as {me.get('displayName', 'unknown')}: "
        + ("adding internal notes only; requests are never changed." if jira_cfg.mode == "shadow" else "read-only, nothing is written to Jira."))
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


def ensure_admin(db) -> str | None:
    """Returns the one-time setup token when the first admin still has to be created in the browser.
    Headless installs can instead set SENTINEL_ADMIN_USER + SENTINEL_NEW_PASSWORD."""
    from sentineldesk_local.auth import Auth, AuthError

    auth = Auth(db)
    if auth.user_count() == 0 and os.environ.get("SENTINEL_NEW_PASSWORD"):
        name = os.environ.get("SENTINEL_ADMIN_USER") or "admin"
        try:
            auth.create_user(name, os.environ["SENTINEL_NEW_PASSWORD"], "admin")
            say("ok", f"Created admin {name} from SENTINEL_NEW_PASSWORD (remove it from your environment now).")
        except AuthError as exc:
            say("err", str(exc))
    if auth.user_count() > 0:
        say("ok", f"{auth.user_count()} dashboard account(s)")
        return None
    return auth.setup_token()


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
    print("\nSentinelDesk\n")
    if not (check_python() and check_deps(args.install)):
        return 1

    from sentineldesk_local.config import LocalOnlyError, Settings
    from sentineldesk_local.db import Database

    try:
        settings = Settings.from_env()
    except (LocalOnlyError, ValueError) as exc:
        say("err", str(exc))
        return 1

    db_dir = settings.db_path.resolve().parent
    if db_dir.exists() and not os.access(db_dir, os.W_OK):
        say("err", f"The database folder {db_dir} is not writable by this user (uid {os.getuid()}). "
            f"With a Docker bind mount, run on the host: sudo chown -R {os.getuid()} <that folder>")
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
    if settings.allow_network and settings.host not in ("127.0.0.1", "localhost", "::1"):
        say("warn", f"Dashboard binds to {settings.host} (network access allowed). Serve it only through an HTTPS reverse proxy"
            + ("" if settings.forwarded_allow_ips else " and set SENTINEL_FORWARDED_ALLOW_IPS to the proxy's address") + ".")
    if settings.model_hosts:
        say("info", f"Model hosts allowed besides this machine: {', '.join(settings.model_hosts)}")
    if settings.retention_days:
        say("info", f"Retention: ticket text and model output are removed after {settings.retention_days} days.")
    if args.check:
        from sentineldesk_local.auth import Auth

        n = Auth(db).user_count()
        say("ok" if n else "warn", f"{n} dashboard account(s)" + ("" if n else "; create one with --add-user NAME --role admin"))
        print("\nAll checks done.\n")
        return 0

    setup_token = ensure_admin(db)
    env = {k: v for k, v in os.environ.items() if k != "SENTINEL_NEW_PASSWORD"}  # children never see it
    env.update({"PYTHONUNBUFFERED": "1", "SENTINEL_DB": str(settings.db_path.resolve())})
    worker = subprocess.Popen([sys.executable, "-m", "sentineldesk_local.worker"], cwd=HERE, env=env)
    uvicorn_args = [sys.executable, "-m", "uvicorn", "sentineldesk_local.web:app_from_env", "--factory",
                    "--host", settings.host, "--port", str(settings.port), "--log-level", "warning", "--no-access-log"]
    if settings.forwarded_allow_ips:
        # Behind a TLS reverse proxy: trust its X-Forwarded-Proto so session cookies get the Secure flag.
        uvicorn_args += ["--proxy-headers", "--forwarded-allow-ips", settings.forwarded_allow_ips]
    web = subprocess.Popen(uvicorn_args, cwd=HERE, env=env)
    procs = [worker, web]
    url = f"http://{'127.0.0.1' if settings.host in ('0.0.0.0', '::') else settings.host}:{settings.port}"

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
    open_url = url
    if setup_token:
        open_url = f"{url}/#setup={setup_token}"
        print("\n  First time? Open this link to create your account and set SentinelDesk up:\n")
        print(f"      \033[1m{open_url}\033[0m\n")
        print("  (The link works once. Anyone with it can create the first admin, so keep it to yourself.)\n", flush=True)
    else:
        say("ok", f"Dashboard: {url}   (Ctrl+C to stop)\n")
    if args.open:
        webbrowser.open(open_url)

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
