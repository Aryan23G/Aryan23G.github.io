"""Settings, read from environment variables once. Everything here is local-only by design."""

from __future__ import annotations

import ipaddress
import os
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlparse


class LocalOnlyError(ValueError):
    """Raised when a setting would send data off this machine."""


def _loopback_ip(host: str) -> bool | None:
    """True/False for an IP literal, None when `host` is a name rather than an IP."""
    try:
        return ipaddress.ip_address(host).is_loopback
    except ValueError:
        return None


def assert_loopback_url(url: str) -> str:
    """Accept only http(s) URLs whose host is this machine; return it without a trailing slash.

    SentinelDesk never sends ticket data off the machine, so a model endpoint on another host
    (including a LAN box or a cloud proxy) is refused rather than silently used.
    """
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if parsed.scheme not in ("http", "https") or not host:
        raise LocalOnlyError(f"Model endpoint must be an http(s) URL, got {url!r}.")
    if host != "localhost":
        loopback = _loopback_ip(host)
        if loopback is None:
            raise LocalOnlyError(f"Model endpoint {host} is not a loopback address. Use localhost or 127.0.0.1.")
        if not loopback:
            raise LocalOnlyError(f"Model endpoint {host} is not this machine. SentinelDesk only talks to a local Ollama.")
    return url.rstrip("/")


def _int(name: str, default: int, minimum: int) -> int:
    raw = os.environ.get(name, "").strip()
    if not raw:
        return default
    try:
        value = int(raw)
    except ValueError as exc:
        raise ValueError(f"{name} must be an integer, got {raw!r}.") from exc
    if value < minimum:
        raise ValueError(f"{name} must be >= {minimum}, got {value}.")
    return value


@dataclass(frozen=True)
class Settings:
    ollama_url: str
    agent_model: str
    chairman_model: str
    db_path: Path
    host: str
    port: int
    request_timeout_s: int
    worker_poll_ms: int
    stale_after_s: int
    # Organisation profile + connector settings (TOML). None = bundled demo profile, no connectors.
    config_path: Path | None = None

    @staticmethod
    def from_env() -> "Settings":
        agent_model = os.environ.get("SENTINEL_AGENT_MODEL", "").strip() or "llama3.2"
        host = os.environ.get("SENTINEL_HOST", "").strip() or "127.0.0.1"
        if host != "localhost":
            loopback = _loopback_ip(host)
            if loopback is None:
                raise LocalOnlyError(f"SENTINEL_HOST must be a loopback address such as 127.0.0.1, got {host!r}.")
            if not loopback:
                raise LocalOnlyError(f"SENTINEL_HOST={host} would expose the dashboard to the network; use 127.0.0.1.")
        return Settings(
            ollama_url=assert_loopback_url(os.environ.get("SENTINEL_OLLAMA_URL", "").strip() or "http://localhost:11434"),
            agent_model=agent_model,
            chairman_model=os.environ.get("SENTINEL_CHAIRMAN_MODEL", "").strip() or agent_model,
            db_path=Path(os.environ.get("SENTINEL_DB", "").strip() or "sentineldesk.db"),
            host=host,
            port=_int("SENTINEL_PORT", 8765, 1),
            request_timeout_s=_int("SENTINEL_OLLAMA_TIMEOUT", 180, 5),
            worker_poll_ms=_int("SENTINEL_WORKER_POLL_MS", 500, 50),
            stale_after_s=_int("SENTINEL_STALE_AFTER_S", 900, 30),
            config_path=Path(os.environ["SENTINEL_CONFIG"]) if os.environ.get("SENTINEL_CONFIG", "").strip() else None,
        )

    def load_profile(self):
        from .profile import demo_profile, load_profile

        return load_profile(self.config_path) if self.config_path else demo_profile()
