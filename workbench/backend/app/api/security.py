"""Request guards: optional bearer-token auth, per-client rate limiting, and a cap on concurrent agent runs.

All three are in-process (single worker). Behind several workers or replicas, enforce rate limits and
concurrency at the gateway (or back these with Redis) - the interfaces stay the same.
"""

from __future__ import annotations

import math
import secrets
import threading
import time
from collections import defaultdict, deque
from typing import Annotated

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.config import Settings

_bearer = HTTPBearer(auto_error=False)


class SlidingWindowLimiter:
    """At most `limit` events per `window_s` seconds per key. limit <= 0 disables it."""

    def __init__(self, limit: int, window_s: float = 60.0) -> None:
        self.limit = limit
        self.window_s = window_s
        self._events: dict[str, deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def check(self, key: str, now: float | None = None) -> float:
        """Record an event. Returns 0 if allowed, else seconds until the next slot frees up."""
        if self.limit <= 0:
            return 0.0
        now = time.monotonic() if now is None else now
        with self._lock:
            q = self._events[key]
            while q and now - q[0] >= self.window_s:
                q.popleft()
            if len(q) >= self.limit:
                return self.window_s - (now - q[0])
            q.append(now)
            return 0.0


class RunSlots:
    """Non-blocking concurrency cap: reject instead of queueing, so latency stays predictable."""

    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.active = 0
        self._lock = threading.Lock()

    def try_acquire(self) -> bool:
        with self._lock:
            if self.capacity > 0 and self.active >= self.capacity:
                return False
            self.active += 1
            return True

    def release(self) -> None:
        with self._lock:
            self.active = max(0, self.active - 1)


class Guards:
    def __init__(self, settings: Settings) -> None:
        self.token = settings.api_token or None
        self.limiter = SlidingWindowLimiter(settings.rate_limit_per_min)
        self.slots = RunSlots(settings.max_concurrent_runs)


def get_guards(request: Request) -> Guards:
    guards: Guards = request.app.state.guards
    return guards


GuardsDep = Annotated[Guards, Depends(get_guards)]


def client_key(request: Request, credentials: HTTPAuthorizationCredentials | None) -> str:
    # Per token when auth is on (one key per client), else per remote address.
    if credentials is not None:
        return f"token:{credentials.credentials[:16]}"
    return f"ip:{request.client.host if request.client else 'unknown'}"


async def require_token(
    guards: GuardsDep,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> None:
    if guards.token is None:
        return
    if credentials is None or not secrets.compare_digest(credentials.credentials.encode(), guards.token.encode()):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid bearer token.",
                            headers={"WWW-Authenticate": "Bearer"})


async def rate_limited(
    request: Request,
    guards: GuardsDep,
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> None:
    wait = guards.limiter.check(client_key(request, credentials))
    if wait > 0:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                            detail=f"Rate limit exceeded ({guards.limiter.limit} requests/min).",
                            headers={"Retry-After": str(max(1, math.ceil(wait)))})


def acquire_run_slot(guards: Guards) -> None:
    """Take a run slot or raise 503. The caller must release it (`guards.slots.release()`)."""
    if not guards.slots.try_acquire():
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                            detail=f"Too many concurrent agent runs (max {guards.slots.capacity}). Retry shortly.",
                            headers={"Retry-After": "2"})
