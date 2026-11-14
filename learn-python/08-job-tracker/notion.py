"""A small Notion API client: just the three calls the tracker needs.

Docs: https://developers.notion.com/reference
"""

from __future__ import annotations

import time

import requests

API = "https://api.notion.com/v1"
NOTION_VERSION = "2022-06-28"     # pinned: Notion changes behavior between versions


class NotionError(Exception):
    pass


class NotionClient:
    def __init__(self, token: str, session=None, max_retries: int = 4, sleep=time.sleep):
        self.session = session or requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {token}",
            "Notion-Version": NOTION_VERSION,
            "Content-Type": "application/json",
        })
        self.max_retries = max_retries
        self.sleep = sleep

    def _request(self, method: str, path: str, body: dict | None = None) -> dict:
        for attempt in range(self.max_retries + 1):
            try:
                resp = self.session.request(method, f"{API}{path}", json=body, timeout=30)
            except requests.RequestException as err:
                if attempt == self.max_retries:
                    raise NotionError(f"network error: {err}")
                self.sleep(2 ** attempt)
                continue
            if resp.status_code == 429 or resp.status_code >= 500:
                # Rate limited (Notion allows ~3 requests/second) or server trouble.
                if attempt == self.max_retries:
                    raise NotionError(f"Notion kept failing ({resp.status_code})")
                wait = float(resp.headers.get("Retry-After", 2 ** attempt))
                self.sleep(wait)
                continue
            data = resp.json() if resp.content else {}
            if resp.status_code >= 400:
                msg = data.get("message", resp.text[:200])
                if resp.status_code in (401, 403):
                    msg += " (check NOTION_TOKEN, and share the database with your integration)"
                raise NotionError(f"{resp.status_code}: {msg}")
            return data
        raise NotionError("unreachable")

    def create_page(self, database_id: str, properties: dict) -> dict:
        return self._request("POST", "/pages",
                             {"parent": {"database_id": database_id}, "properties": properties})

    def update_page(self, page_id: str, properties: dict) -> dict:
        return self._request("PATCH", f"/pages/{page_id}", {"properties": properties})

    def query_database(self, database_id: str) -> list[dict]:
        """All pages, following pagination (Notion returns at most 100 per call)."""
        pages, cursor = [], None
        while True:
            body = {"page_size": 100}
            if cursor:
                body["start_cursor"] = cursor
            data = self._request("POST", f"/databases/{database_id}/query", body)
            pages += data.get("results", [])
            if not data.get("has_more"):
                return pages
            cursor = data["next_cursor"]
