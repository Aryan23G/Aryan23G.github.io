"""The eval set is valid offline: every gold query compiles through the guard and returns rows,
and the comparator behaves. The live run itself (eval.run) needs an API key and is not part of CI."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import pytest

from eval.compare import results_match
from eval.run import evaluate, load_questions, run_gold
from tests.conftest import draft

QUESTIONS = json.loads((Path(__file__).resolve().parent.parent / "eval" / "questions.json").read_text())


def test_question_ids_unique_and_balanced() -> None:
    ids = [q["id"] for q in QUESTIONS]
    assert len(ids) == len(set(ids)) == 20
    assert {q["difficulty"] for q in QUESTIONS} == {"easy", "medium", "hard"}
    assert len(load_questions("h")) == 6


@pytest.mark.parametrize("q", QUESTIONS, ids=lambda q: q["id"])
def test_gold_sql_compiles_and_returns_rows(make_container, q: dict[str, Any]) -> None:  # type: ignore[no-untyped-def]
    container, _ = make_container([])
    rows = run_gold(container, q["gold"])
    assert rows, q["id"]


def test_compare_ignores_names_order_and_extra_columns() -> None:
    gold = [["a", 10.004], ["b", 20]]
    assert results_match(gold, [[20, "B", 1], [10, "a", 2]])[0]
    assert results_match([[0.2031]], [[20.31]])[0]  # fraction vs percent
    assert not results_match(gold, [["a", 11], ["b", 20]])[0]
    assert results_match(gold, [["a", 10]]) == (False, "row count 1 != gold 2")
    assert results_match(gold, [["b", 20], ["a", 10]], ordered=False)[0]
    assert not results_match(gold, [["b", 20], ["a", 10]], ordered=True)[0]


async def test_evaluate_scores_with_scripted_generator(make_container) -> None:  # type: ignore[no-untyped-def]
    qs = [q for q in QUESTIONS if q["id"] in ("e01", "e03")]
    container, _ = make_container([
        draft("SELECT COUNT(*) AS n FROM customers"),                       # correct
        draft("SELECT segment, COUNT(*) + 1 AS n FROM customers GROUP BY segment"),  # wrong numbers
    ])
    report = await evaluate(container, qs)
    assert report["accuracy"] == "1/2 (50.0%)"
    assert [r["match"] for r in report["rows"]] == [True, False]
