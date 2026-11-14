from datetime import date

import pytest

from resume_parser import (Job, detect_header, extract_jobs, extract_name, extract_skills,
                           normalize, parse_text, split_sections, total_experience_years)

TODAY = date(2026, 11, 14)


def test_normalize_cleans_unicode_and_spaces():
    assert normalize("ﬁle   name—x\n\n\n\nnext") == "file name-x\n\nnext"


@pytest.mark.parametrize("line, section", [
    ("EXPERIENCE", "experience"), ("Work Experience:", "experience"),
    ("Technical Skills", "skills"), ("Education", "education"),
    ("I gained experience leading a team of five engineers", None),   # too long: a sentence
    ("Python", None),
])
def test_detect_header(line, section):
    assert detect_header(line) == section


def test_split_sections():
    s = split_sections("Jane Doe\nSKILLS\nPython\nEDUCATION\nB.Tech")
    assert s == {"header": "Jane Doe", "skills": "Python", "education": "B.Tech"}


def test_ambiguous_skills_only_in_skills_section():
    body = "Got grade C. My go-to tool. Each node of the tree."
    assert extract_skills(body, "") == []
    assert extract_skills(body + "\nC, Go", "C, Go") == ["C", "Go"]


def test_skills_with_symbols_and_aliases():
    text = "Used C++, sklearn, Postgres and Node.js; not C#."
    assert extract_skills(text, "") == ["C++", "Node.js", "PostgreSQL", "scikit-learn"]


def test_name_heuristic():
    assert extract_name("Priya Sharma\npriya@example.com") == "Priya Sharma"
    assert extract_name("priya@example.com\n+91 99999 99999") is None


def test_jobs_and_present():
    jobs = extract_jobs("Intern, Acme   Jun 2024 - Aug 2024\nDev, Foo\nJan 2026 - Present", TODAY)
    assert [(j.title, j.start, j.end, j.months) for j in jobs] == [
        ("Intern, Acme", "Jun 2024", "Aug 2024", 3),
        ("Dev, Foo", "Jan 2026", "Present", 11),
    ]


def test_year_only_ranges_cover_whole_years():
    assert extract_jobs("Analyst (2019 to 2020)", TODAY)[0].months == 24


def test_overlapping_jobs_counted_once():
    jobs = extract_jobs("A Jan 2020 - Dec 2020\nB Jun 2020 - Dec 2021\nC Jan 2023 - Dec 2023", TODAY)
    assert sum(j.months for j in jobs) == 43          # naive sum double counts
    assert total_experience_years(jobs) == 3.0         # 24 + 12 months


def test_rejects_backwards_dates():
    assert extract_jobs("Oops Dec 2024 - Jan 2020", TODAY) == []


def test_full_parse_handles_empty_text():
    r = parse_text("", TODAY)
    assert r.name is None and r.skills == [] and r.experience_years == 0


def test_samples_meet_quality_bar():
    """Guard against regressions: the evaluation must stay perfect on our labeled set."""
    import evaluate
    import json
    labels = json.loads((evaluate.SAMPLES / "labels.json").read_text())
    for filename, expected in labels.items():
        got = parse_text((evaluate.SAMPLES / filename).read_text(), TODAY)
        assert got.name == expected["name"]
        assert set(got.skills) == set(expected["skills"])
        assert got.experience_years == expected["experience_years"]
