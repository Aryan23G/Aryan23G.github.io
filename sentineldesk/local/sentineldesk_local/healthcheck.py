"""Container health check: exit 0 when the dashboard answers on the configured port."""

import os
import sys
import urllib.request


def main() -> int:
    port = os.environ.get("SENTINEL_PORT", "8765")
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))  # never via a proxy
    try:
        return 0 if opener.open(f"http://127.0.0.1:{port}/api/health", timeout=4).status == 200 else 1
    except OSError:
        return 1


if __name__ == "__main__":
    sys.exit(main())
