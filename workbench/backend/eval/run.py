"""Live execution-accuracy evaluation of the agent against the sample warehouse.

    ANTHROPIC_API_KEY=... python -m eval.run                          # all questions, configured model
    ANTHROPIC_API_KEY=... python -m eval.run --model claude-haiku-5-5 --only h

Runs every question through the real agent (real Claude API, schema RAG, SQLGlot,
read-only executor), executes the gold SQL through the same guard and executor,
and compares result sets with `eval.compare.results_match`. Writes a JSON report
to eval/results/. This makes real API calls and costs tokens.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import time
from pathlib import Path
from typing import Any

from app.config import Settings
from app.container import Container, build_container
from app.db import seed
from app.sql.executor import execute_readonly
from app.sql.guard import compile_sql
from eval.compare import results_match

HERE = Path(__file__).resolve().parent


def load_questions(only: str | None = None) -> list[dict[str, Any]]:
    questions: list[dict[str, Any]] = json.loads((HERE / "questions.json").read_text())
    return [q for q in questions if not only or q["id"].startswith(only)]


def run_gold(container: Container, sql: str) -> list[list[Any]]:
    """Execute gold SQL through the same guard + executor the agent uses."""
    report = compile_sql(sql, schema=container.schema, dialect=container.settings.sql_dialect,
                         max_rows=container.settings.max_rows)
    if not report.ok or report.compiled_sql is None:
        raise ValueError(f"gold SQL does not compile: {report.compiler_log()}")
    result = execute_readonly(container.engine, report.compiled_sql, max_rows=container.settings.max_rows,
                              timeout_ms=container.settings.statement_timeout_ms)
    if not result.ok:
        raise ValueError(f"gold SQL failed: {result.error_message}")
    return result.rows


async def evaluate(container: Container, questions: list[dict[str, Any]]) -> dict[str, Any]:
    rows: list[dict[str, Any]] = []
    for q in questions:
        gold = run_gold(container, q["gold"])
        started = time.perf_counter()
        trace = await container.runner.run(q["question"])
        elapsed = round(time.perf_counter() - started, 2)
        if trace.result is not None:
            pred = [[rec[c.name] for c in trace.result.columns] for rec in trace.result.records]
            match, reason = results_match(gold, pred, ordered=bool(q.get("ordered")))
        else:
            match, reason = False, trace.error or trace.outcome
        rows.append({"id": q["id"], "difficulty": q["difficulty"], "match": match, "reason": reason,
                     "seconds": elapsed, "llm_calls": trace.llm_calls, "static_retries": trace.static_retries,
                     "runtime_retries": trace.runtime_retries, "tokens": trace.usage.model_dump(), "sql": trace.sql})
        print(f"{'PASS' if match else 'FAIL'}  {q['id']:4s} {elapsed:6.1f}s  {q['question']}"
              + ("" if match else f"\n      -> {reason}"))

    by_difficulty = {
        d: f"{sum(r['match'] for r in rows if r['difficulty'] == d)}/{sum(r['difficulty'] == d for r in rows)}"
        for d in ("easy", "medium", "hard")
    }
    correct = sum(r["match"] for r in rows)
    return {
        "model": container.generator.model,
        "accuracy": f"{correct}/{len(rows)} ({100 * correct / max(len(rows), 1):.1f}%)",
        "by_difficulty": by_difficulty,
        "avg_seconds": round(sum(r["seconds"] for r in rows) / max(len(rows), 1), 2),
        "self_corrections": sum(r["static_retries"] + r["runtime_retries"] for r in rows),
        "rows": rows,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--model", help="Override QP_ANTHROPIC_MODEL")
    parser.add_argument("--only", help="Only question ids with this prefix (e.g. 'h' or 'm03')")
    args = parser.parse_args()

    db = seed.ensure()
    overrides: dict[str, Any] = {"database_url": f"sqlite:///{db}", "qdrant_path": None}
    if args.model:
        overrides["anthropic_model"] = args.model
    settings = Settings().model_copy(update=overrides)
    container = build_container(settings)
    try:
        report = asyncio.run(evaluate(container, load_questions(args.only)))
    finally:
        container.close()
    out = HERE / "results" / f"{report['model']}-{int(time.time())}.json"
    out.parent.mkdir(exist_ok=True)
    out.write_text(json.dumps(report, indent=2))
    print(json.dumps({k: v for k, v in report.items() if k != "rows"}, indent=2))
    print(f"report: {out}")


if __name__ == "__main__":
    main()
