"""Where a desk's settings live, so they can be edited in the browser.

* Settings: `<data dir>/sentineldesk.toml` (same format as sentineldesk.example.toml), written by the
  setup wizard and the Settings tab. If SENTINEL_CONFIG points at a file, that file is used instead
  and the browser shows settings read-only ("managed by file").
* Secrets: `<data dir>/secrets.json`, readable only by the service account (mode 0600). Environment
  variables (JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PAT) override it. Secrets never go in the TOML.
* Changes are picked up without a restart: readers call profile()/jira(), which reload when either
  file's modification time changes.
"""

from __future__ import annotations

import json
import os
import re
import threading
import tomllib
from dataclasses import dataclass
from pathlib import Path

from .jira import JiraConfig, JiraCredentials
from .profile import OrgProfile, demo_profile, load_profile, profile_from_dict

_BARE_KEY = re.compile(r"^[A-Za-z0-9_-]+$")
SECRET_KEYS = ("jira_email", "jira_api_token", "jira_pat")

# Used when a desk is set up in the browser: keyword fallback without team routing, so the rules
# engine still sorts tickets if the model is down. Desks can refine these in the TOML.
DEFAULT_CATEGORIES = [
    {"name": "Access & Accounts", "keywords": ["password", "locked", "log ?in", "mfa", "authenticator", "access"], "priority": "P3"},
    {"name": "Network", "keywords": ["vpn", "wi-?fi", "network", "internet"], "priority": "P3"},
    {"name": "Hardware", "keywords": ["laptop", "printer", "print", "monitor", "keyboard", "screen", "dock"], "priority": "P3"},
    {"name": "Software", "keywords": ["install", "software", "licen[cs]e", "application"], "priority": "P4"},
    {"name": "Email & Collaboration", "keywords": ["outlook", "email", "teams", "calendar", "mailbox", "sharepoint"], "priority": "P3"},
]
DEFAULT_PRIORITY_RULES = {
    "team_wide": ["whole", "entire", "everyone", "all of us", "none of us", "floor", "site"],
    "deadline": ["deadline", "due at", "outage", "client call", "customer call", "board"],
}


def dump_toml(data: dict) -> str:
    """Write the subset of TOML this project uses: scalars, lists of scalars, tables, arrays of tables."""

    def key(k: str) -> str:
        return k if _BARE_KEY.match(k) else json.dumps(k, ensure_ascii=False)

    def scalar(v) -> str:
        if isinstance(v, bool):
            return "true" if v else "false"
        if isinstance(v, (int, float)):
            return repr(v)
        if isinstance(v, str):
            return json.dumps(v, ensure_ascii=False)  # JSON string escapes are valid TOML basic strings
        if isinstance(v, list):
            return "[" + ", ".join(scalar(x) for x in v) + "]"
        raise TypeError(f"Cannot write {type(v).__name__} to TOML.")

    def is_table_array(v) -> bool:
        return isinstance(v, list) and bool(v) and all(isinstance(x, dict) for x in v)

    lines: list[str] = ["# SentinelDesk settings. Written by the setup wizard; safe to edit by hand.", ""]

    def emit(table: dict, prefix: str) -> None:
        for k, v in table.items():
            if v is None or isinstance(v, dict) or is_table_array(v):
                continue
            lines.append(f"{key(k)} = {scalar(v)}")
        for k, v in table.items():
            name = f"{prefix}.{key(k)}" if prefix else key(k)
            if isinstance(v, dict):
                lines.extend(["", f"[{name}]"])
                emit(v, name)
            elif is_table_array(v):
                for item in v:
                    lines.extend(["", f"[[{name}]]"])
                    emit(item, name)

    emit(data, "")
    return "\n".join(lines) + "\n"


def _atomic_write(path: Path, text: str, mode: int | None = None) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(f".{path.name}.{os.getpid()}.tmp")
    fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, mode if mode is not None else 0o644)
    with os.fdopen(fd, "w", encoding="utf-8") as fh:
        fh.write(text)
    if mode is not None:
        os.chmod(tmp, mode)
    os.replace(tmp, path)


@dataclass(frozen=True)
class Loaded:
    profile: OrgProfile
    jira: JiraConfig | None
    credentials: JiraCredentials


class ConfigStore:
    def __init__(self, settings):
        self.settings = settings
        self.data_dir = settings.db_path.resolve().parent
        self.managed_by_file = settings.config_path is not None
        self.path = Path(settings.config_path) if settings.config_path else self.data_dir / "sentineldesk.toml"
        self.secrets_path = self.data_dir / "secrets.json"
        self.kb_dir = self.data_dir / "kb"
        self._lock = threading.Lock()
        self._key: tuple | None = None
        self._loaded: Loaded | None = None

    # ---------------------------------------------------------------- reading

    def configured(self) -> bool:
        return self.path.exists()

    def version(self) -> tuple:
        def mtime(p: Path):
            try:
                return p.stat().st_mtime_ns
            except FileNotFoundError:
                return None

        kb = mtime(self.kb_dir)
        return (mtime(self.path), mtime(self.secrets_path), kb)

    def raw(self) -> dict:
        if not self.path.exists():
            return {}
        return tomllib.loads(self.path.read_text(encoding="utf-8"))

    def secrets(self) -> dict:
        try:
            data = json.loads(self.secrets_path.read_text(encoding="utf-8"))
        except FileNotFoundError:
            return {}
        return {k: str(v) for k, v in data.items() if k in SECRET_KEYS and v}

    def credentials(self) -> JiraCredentials:
        s, env = self.secrets(), os.environ
        return JiraCredentials(
            email=env.get("JIRA_EMAIL") or s.get("jira_email"),
            api_token=env.get("JIRA_API_TOKEN") or s.get("jira_api_token"),
            pat=env.get("JIRA_PAT") or s.get("jira_pat"),
        )

    def load(self) -> Loaded:
        """Current profile, Jira settings and credentials; reloaded when the files change."""
        with self._lock:
            key = self.version()
            if self._loaded is None or key != self._key:
                if self.path.exists():
                    profile = load_profile(self.path)
                    jira = JiraConfig.from_dict(self.raw().get("jira") or {}, profile.team_names)
                else:
                    profile, jira = demo_profile(), None
                self._loaded = Loaded(profile, jira, self.credentials())
                self._key = key
            return self._loaded

    def profile(self) -> OrgProfile:
        return self.load().profile

    def jira(self) -> JiraConfig | None:
        return self.load().jira

    # ---------------------------------------------------------------- writing (setup wizard / Settings tab)

    def _check_editable(self) -> None:
        if self.managed_by_file:
            raise PermissionError(f"Settings are managed in {self.path} (SENTINEL_CONFIG); edit that file instead.")

    def write(self, data: dict) -> None:
        """Validate the whole configuration, then write it atomically. Raises ValueError on problems."""
        self._check_editable()
        profile = profile_from_dict(data, base_dir=self.path.parent, source=str(self.path))
        JiraConfig.from_dict(data.get("jira") or {}, profile.team_names)
        _atomic_write(self.path, dump_toml(data))

    def save_secrets(self, **values: str | None) -> None:
        self._check_editable()
        current = self.secrets()
        for k, v in values.items():
            if k not in SECRET_KEYS:
                raise KeyError(k)
            if v is None:
                continue
            if v == "":
                current.pop(k, None)
            else:
                current[k] = v
        _atomic_write(self.secrets_path, json.dumps(current, indent=1), mode=0o600)

    def masked_secrets(self) -> dict:
        """What the browser may see: whether each secret is set, and the last 4 characters of tokens."""
        creds = self.credentials()
        def mask(v: str | None) -> str | None:
            return None if not v else ("•" * 8 + v[-4:] if len(v) > 8 else "•" * 8)
        return {"jira_email": creds.email, "jira_api_token": mask(creds.api_token), "jira_pat": mask(creds.pat),
                "from_environment": any(os.environ.get(k) for k in ("JIRA_EMAIL", "JIRA_API_TOKEN", "JIRA_PAT"))}
