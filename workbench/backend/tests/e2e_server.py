"""API server for end-to-end tests: the real app with a scripted SQL generator instead of Claude.

    python -m tests.e2e_server            # http://127.0.0.1:8000  (QP_E2E_PORT to change)

Everything except the model is real: schema RAG, SQLGlot compilation, the read-only executor, SSE streaming.
The script is keyed by question so the browser tests are deterministic, and one preset deliberately
references a non-existent column first to exercise the self-correction loop.
"""

from __future__ import annotations

import asyncio
import os
import tempfile
from pathlib import Path

import uvicorn

from app.agent.llm import GenerationError, GenerationResult
from app.agent.state import SqlDraft, TokenUsage
from app.config import Settings
from app.container import build_container
from app.db import seed
from app.main import create_app

RETURN_RATE_BAD = """SELECT p.category, COUNT(r.return_id) * 1.0 / COUNT(oi.order_item_id) AS return_rate
FROM order_items oi JOIN products p ON p.product_id = oi.product_id
LEFT JOIN returns r ON r.order_item_id = oi.order_item_id GROUP BY p.category"""

RETURN_RATE_GOOD = """SELECT pc.name AS category,
       COUNT(DISTINCT oi.order_item_id) AS items_sold,
       COUNT(DISTINCT r.return_id) AS items_returned,
       ROUND(1.0 * COUNT(DISTINCT r.return_id) / COUNT(DISTINCT oi.order_item_id), 4) AS return_rate
FROM order_items oi
JOIN orders o ON o.order_id = oi.order_id
JOIN products p ON p.product_id = oi.product_id
JOIN product_categories pc ON pc.category_id = p.category_id
LEFT JOIN returns r ON r.order_item_id = oi.order_item_id
WHERE o.status = 'delivered'
GROUP BY pc.name
ORDER BY return_rate DESC"""

MONTHLY_REVENUE = """SELECT strftime('%Y-%m', o.order_date) AS month,
       ROUND(SUM(oi.quantity * oi.unit_price * (1 - oi.discount)), 2) AS revenue
FROM orders o JOIN order_items oi ON oi.order_id = o.order_id
WHERE o.status <> 'cancelled' AND strftime('%Y', o.order_date) = '2025'
GROUP BY month ORDER BY month"""


class ScriptedGenerator:
    model = "scripted-e2e"

    async def generate(self, *, dialect: str, user_prompt: str) -> GenerationResult:
        await asyncio.sleep(0.3)  # long enough for the UI to render running states
        retry = "<previous_attempts>" in user_prompt
        if "Return rate by product category" in user_prompt:
            sql = RETURN_RATE_GOOD if retry else RETURN_RATE_BAD
            reasoning = (["Previous attempt used products.category, which does not exist; use product_categories.name.",
                          "Return rate = distinct returned items / distinct delivered items per category."]
                         if retry else ["Return rate is returned lines over sold lines.", "Group by category."])
        elif "Monthly revenue" in user_prompt:
            sql, reasoning = MONTHLY_REVENUE, ["Revenue = quantity * unit_price * (1 - discount), excluding cancelled."]
        else:
            raise GenerationError("e2e script has no answer for this question")
        draft = SqlDraft(reasoning_chain=reasoning, sql_query=sql, tables_used=[], answerable=True, clarification="")
        return GenerationResult(draft=draft, model=self.model, latency_ms=300.0, request_id="req_e2e",
                                usage=TokenUsage(input_tokens=600, output_tokens=150, cache_read_input_tokens=1400))


def main() -> None:
    db = Path(tempfile.mkdtemp(prefix="qp-e2e-")) / "warehouse.db"
    seed.build(db)
    settings = Settings(
        database_url=f"sqlite:///{db}", embedder="hashing", qdrant_path=None, otel_exporter="none",
        rate_limit_per_min=600, api_token=os.environ.get("QP_E2E_API_TOKEN") or None,
        cors_origins=[os.environ.get("QP_E2E_WEB_ORIGIN", "http://localhost:3000")])
    app = create_app(settings=settings, container=build_container(settings, generator=ScriptedGenerator()))
    uvicorn.run(app, host="127.0.0.1", port=int(os.environ.get("QP_E2E_PORT", "8000")), log_level="warning")


if __name__ == "__main__":
    main()
