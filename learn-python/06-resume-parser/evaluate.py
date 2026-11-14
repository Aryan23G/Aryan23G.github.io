"""Measure the parser against hand-labeled resumes in samples/labels.json.

    python evaluate.py

Change a rule, re-run this, and see whether the numbers went up or down.
"""

import json
from datetime import date
from pathlib import Path

from resume_parser import extract_text, parse_text

SAMPLES = Path(__file__).parent / "samples"
TODAY = date(2026, 11, 14)          # fixed, so "Present" means the same thing every run


def precision_recall(predicted: set, expected: set) -> tuple[float, float, float]:
    true_pos = len(predicted & expected)
    precision = true_pos / len(predicted) if predicted else 1.0   # of what we said, how much was right?
    recall = true_pos / len(expected) if expected else 1.0        # of what was there, how much did we find?
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return precision, recall, f1


def main() -> None:
    labels = json.loads((SAMPLES / "labels.json").read_text())
    exact = {"name": 0, "email": 0, "experience_years": 0}
    tp = fp = fn = 0
    for filename, expected in labels.items():
        got = parse_text(extract_text(SAMPLES / filename), today=TODAY)
        for key in exact:
            if getattr(got, key) == expected[key]:
                exact[key] += 1
            else:
                print(f"  {filename}: {key} expected {expected[key]!r}, got {getattr(got, key)!r}")
        pred, gold = set(got.skills), set(expected["skills"])
        tp, fp, fn = tp + len(pred & gold), fp + len(pred - gold), fn + len(gold - pred)
        for s in sorted(pred - gold):
            print(f"  {filename}: false positive skill {s!r}")
        for s in sorted(gold - pred):
            print(f"  {filename}: missed skill {s!r}")

    n = len(labels)
    print(f"\n{n} resumes")
    for key, hits in exact.items():
        print(f"  {key:<17} {hits}/{n} exact")
    p = tp / (tp + fp) if tp + fp else 1.0
    r = tp / (tp + fn) if tp + fn else 1.0
    print(f"  skills            precision {p:.2f}  recall {r:.2f}  F1 {2*p*r/(p+r) if p+r else 0:.2f}")


if __name__ == "__main__":
    main()
