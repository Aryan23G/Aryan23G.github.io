"""Execution-accuracy comparison between a gold result set and a predicted one.

Column names and column order do not matter, and the prediction may carry extra
columns. Every gold column must match a distinct predicted column (as a multiset,
or in sequence for `ordered` questions), and row counts must be equal. Numbers
match with a small relative tolerance, and fraction-vs-percentage is accepted.
"""

from __future__ import annotations

import math
from collections.abc import Sequence

Value = str | int | float | bool | None


def _norm(v: Value) -> str | float:
    if v is None:
        return "null"
    if isinstance(v, bool):
        return float(v)
    if isinstance(v, int | float):
        return float(v)
    s = v.strip()
    try:
        return float(s)
    except ValueError:
        return s.lower()


def _column(rows: Sequence[Sequence[Value]], i: int, ordered: bool) -> list[str | float]:
    vals = [_norm(r[i]) for r in rows]
    if ordered:
        return vals
    return sorted(vals, key=lambda x: (isinstance(x, str), x))


def _close(a: float, b: float) -> bool:
    return math.isclose(a, b, rel_tol=1e-3, abs_tol=0.011)


def _same(gold: list[str | float], pred: list[str | float]) -> bool:
    if len(gold) != len(pred):
        return False
    for g, p in zip(gold, pred, strict=True):
        if g == p:
            continue
        if isinstance(g, float) and isinstance(p, float) and (_close(g, p) or _close(g * 100, p) or _close(g, p * 100)):
            continue
        return False
    return True


def results_match(
    gold_rows: Sequence[Sequence[Value]], pred_rows: Sequence[Sequence[Value]], *, ordered: bool = False
) -> tuple[bool, str | None]:
    if len(gold_rows) != len(pred_rows):
        return False, f"row count {len(pred_rows)} != gold {len(gold_rows)}"
    if not gold_rows:
        return True, None
    n_gold, n_pred = len(gold_rows[0]), len(pred_rows[0])
    used: set[int] = set()
    for gi in range(n_gold):
        g = _column(gold_rows, gi, ordered)
        match = next((pi for pi in range(n_pred) if pi not in used and _same(g, _column(pred_rows, pi, ordered))), None)
        if match is None:
            return False, f"no predicted column matches gold column {gi}"
        used.add(match)
    return True, None
