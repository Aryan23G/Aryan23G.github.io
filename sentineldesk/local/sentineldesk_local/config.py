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


def assert_loopback_url(url: str, allowed_hosts: tuple[str, ...] = ()) -> str:
    """Accept only http(s) URLs whose host is this machine, or a host the operator explicitly listed
    in SENTINEL_MODEL_HOSTS (e.g. the `ollama` container in docker compose, or a GPU box on the LAN).
    Return the URL without a trailing slash.

    Ticket data only goes where the operator says: a model endpoint anywhere else is refused
    rather than silently used.
    """
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if parsed.scheme not in ("http", "https") or not host:
        raise LocalOnlyError(f"Model endpoint must be an http(s) URL, got {url!r}.")
    if host in allowed_hosts:
        return url.rstrip("/")
    if host != "localhost":
        loopback = _loopback_ip(host)
        if loopback is None:
            raise LocalOnlyError(f"Model endpoint {host} is not a loopback address. Use localhost or 127.0.0.1, or list it in SENTINEL_MODEL_HOSTS.")
        if not loopback:
            raise LocalOnlyError(f"Model endpoint {host} is not this machine. SentinelDesk only talks to a local Ollama unless the host is listed in SENTINEL_MODEL_HOSTS.")
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
    # Extra model hosts the operator allows (e.g. "ollama" in docker compose). Empty = loopback only.
    model_hosts: tuple[str, ...] = ()
    # True when the dashboard may bind to a non-loopback address (SENTINEL_ALLOW_NETWORK=1).
    allow_network: bool = False
    # Reverse-proxy addresses whose X-Forwarded-* headers are trusted (uvicorn --forwarded-allow-ips).
    forwarded_allow_ips: str | None = None
    # Remove ticket bodies and model outputs after this many days; 0 keeps them.
    retention_days: int = 0

    @staticmethod
    def from_env() -> "Settings":
        agent_model = os.environ.get("SENTINEL_AGENT_MODEL", "").strip() or "llama3.2"
        host = os.environ.get("SENTINEL_HOST", "").strip() or "127.0.0.1"
        allow_network = os.environ.get("SENTINEL_ALLOW_NETWORK", "").strip() == "1"
        if host != "localhost" and not allow_network:
            loopback = _loopback_ip(host)
            if loopback is None:
                raise LocalOnlyError(f"SENTINEL_HOST must be a loopback address such as 127.0.0.1, got {host!r}.")
            if not loopback:
                raise LocalOnlyError(
                    f"SENTINEL_HOST={host} would expose the dashboard to the network; use 127.0.0.1, "
                    "or set SENTINEL_ALLOW_NETWORK=1 and put it behind an HTTPS reverse proxy."
                )
        model_hosts = tuple(h.strip().lower() for h in os.environ.get("SENTINEL_MODEL_HOSTS", "").split(",") if h.strip())
        return Settings(
            ollama_url=assert_loopback_url(os.environ.get("SENTINEL_OLLAMA_URL", "").strip() or "http://localhost:11434", model_hosts),
            agent_model=agent_model,
            chairman_model=os.environ.get("SENTINEL_CHAIRMAN_MODEL", "").strip() or agent_model,
            db_path=Path(os.environ.get("SENTINEL_DB", "").strip() or "sentineldesk.db"),
            host=host,
            port=_int("SENTINEL_PORT", 8765, 1),
            request_timeout_s=_int("SENTINEL_OLLAMA_TIMEOUT", 180, 5),
            worker_poll_ms=_int("SENTINEL_WORKER_POLL_MS", 500, 50),
            stale_after_s=_int("SENTINEL_STALE_AFTER_S", 900, 30),
            config_path=Path(os.environ["SENTINEL_CONFIG"]) if os.environ.get("SENTINEL_CONFIG", "").strip() else None,
            model_hosts=model_hosts,
            allow_network=allow_network,
            forwarded_allow_ips=os.environ.get("SENTINEL_FORWARDED_ALLOW_IPS", "").strip() or None,
            retention_days=_int("SENTINEL_RETENTION_DAYS", 0, 0),
        )

    def ollama_client(self):
        from .ollama_client import OllamaClient

        return OllamaClient(self.ollama_url, self.request_timeout_s, allowed_hosts=self.model_hosts)

    def store(self):
        from .config_store import ConfigStore

        return ConfigStore(self)

    def load_profile(self):
        """SENTINEL_CONFIG, else <data dir>/sentineldesk.toml written by the setup wizard, else the demo."""
        return self.store().profile()

    def load_jira(self):
        """The [jira] settings as a JiraConfig, or None when not enabled."""
        return self.store().jira()
