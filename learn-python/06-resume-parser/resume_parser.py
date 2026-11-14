"""Turn a resume (.txt, .pdf, .docx) into structured JSON.

    python resume_parser.py samples/priya.txt
    python resume_parser.py my_resume.pdf --pretty

Pipeline:
    extract text -> normalize -> split into sections -> extract fields per section
PDF needs `pip install pypdf`; DOCX needs `pip install python-docx`.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from dataclasses import asdict, dataclass, field
from datetime import date
from pathlib import Path

# ------------------------------------------------------------ 1. extract text

def extract_text(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix in {".txt", ".md"}:
        return path.read_text(encoding="utf-8", errors="replace")
    if suffix == ".pdf":
        from pypdf import PdfReader
        return "\n".join(page.extract_text() or "" for page in PdfReader(path).pages)
    if suffix == ".docx":
        import docx
        return "\n".join(p.text for p in docx.Document(path).paragraphs)
    raise ValueError(f"unsupported file type {suffix!r} (use .txt, .pdf or .docx)")


# ---------------------------------------------------------------- 2. normalize

def normalize(text: str) -> str:
    text = unicodedata.normalize("NFKC", text)          # fancy ligatures/width -> plain
    text = text.replace("–", "-").replace("—", "-").replace("•", "•")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n\n", text)
    return text.strip()


# ---------------------------------------------------------- 3. split sections

SECTION_ALIASES = {
    "summary":    ["summary", "profile", "objective", "about me", "about"],
    "experience": ["experience", "work experience", "professional experience", "employment",
                   "work history", "internships", "internship"],
    "education":  ["education", "academic background", "academics", "qualifications"],
    "skills":     ["skills", "technical skills", "core skills", "technologies", "tech stack"],
    "projects":   ["projects", "personal projects", "academic projects"],
    "certifications": ["certifications", "certificates", "licenses"],
}
_HEADER_TO_SECTION = {alias: name for name, aliases in SECTION_ALIASES.items() for alias in aliases}


def detect_header(line: str) -> str | None:
    """A header is a short line that matches a known section name."""
    cleaned = re.sub(r"[^a-z ]", "", line.lower()).strip()
    if len(line.strip()) > 40 or not cleaned:
        return None
    return _HEADER_TO_SECTION.get(cleaned)


def split_sections(text: str) -> dict[str, str]:
    sections: dict[str, list[str]] = {"header": []}
    current = "header"
    for line in text.splitlines():
        name = detect_header(line)
        if name:
            current = name
            sections.setdefault(current, [])
        else:
            sections[current].append(line)
    return {k: "\n".join(v).strip() for k, v in sections.items() if "\n".join(v).strip()}


# ------------------------------------------------------- 4. extract fields

EMAIL_RE = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
PHONE_RE = re.compile(r"(?<!\w)(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,5}\)?[\s.-]?)\d{3,5}[\s.-]?\d{3,5}(?!\w)")
URL_RE = re.compile(r"(?:https?://)?(?:www\.)?(?:linkedin\.com|github\.com)/[\w\-/]+", re.I)

# Canonical skill -> spellings people use. Matching is on whole words, case-insensitive.
SKILLS: dict[str, list[str]] = {
    "Python": ["python"], "Java": ["java"], "JavaScript": ["javascript", "js"],
    "TypeScript": ["typescript", "ts"], "C++": ["c++", "cpp"], "C": ["c"], "Go": ["go", "golang"],
    "SQL": ["sql"], "PostgreSQL": ["postgresql", "postgres"], "MySQL": ["mysql"],
    "SQLite": ["sqlite"], "MongoDB": ["mongodb", "mongo"], "Redis": ["redis"],
    "Flask": ["flask"], "Django": ["django"], "FastAPI": ["fastapi"], "React": ["react", "react.js", "reactjs"],
    "Node.js": ["node.js", "nodejs", "node"], "HTML": ["html", "html5"], "CSS": ["css", "css3"],
    "Git": ["git"], "Docker": ["docker"], "Kubernetes": ["kubernetes", "k8s"],
    "AWS": ["aws", "amazon web services"], "GCP": ["gcp", "google cloud"], "Azure": ["azure"],
    "Linux": ["linux"], "REST APIs": ["rest", "rest api", "rest apis", "restful"],
    "Pandas": ["pandas"], "NumPy": ["numpy"], "scikit-learn": ["scikit-learn", "sklearn"],
    "TensorFlow": ["tensorflow"], "PyTorch": ["pytorch"], "Machine Learning": ["machine learning", "ml"],
    "Deep Learning": ["deep learning"], "NLP": ["nlp", "natural language processing"],
    "Data Analysis": ["data analysis"], "Tableau": ["tableau"], "Power BI": ["power bi", "powerbi"],
    "Excel": ["excel"], "Streamlit": ["streamlit"], "CI/CD": ["ci/cd", "github actions"],
}
# Short or ambiguous aliases only count inside the Skills section.
# ("C" appears in "Grade C"; "Go" in "go-to"; "node" in "Node of a graph".)
AMBIGUOUS = {"c", "js", "ts", "ml", "rest", "node", "go"}


def _alias_pattern(alias: str) -> re.Pattern:
    # \b fails next to symbols like "+" in "c++", so use explicit look-arounds.
    return re.compile(rf"(?<![\w+#.]){re.escape(alias)}(?![\w+#])", re.I)

_SKILL_PATTERNS = [(skill, alias, _alias_pattern(alias)) for skill, aliases in SKILLS.items()
                   for alias in aliases]


def extract_skills(full_text: str, skills_section: str) -> list[str]:
    found = set()
    for skill, alias, pattern in _SKILL_PATTERNS:
        haystack = skills_section if alias in AMBIGUOUS else full_text
        if haystack and pattern.search(haystack):
            found.add(skill)
    return sorted(found, key=str.lower)


def extract_name(header: str) -> str | None:
    """The name is usually the first short line of 2-4 capitalized words with no digits/@."""
    for line in header.splitlines()[:5]:
        line = line.strip().strip("•|-").strip()
        words = line.split()
        if (2 <= len(words) <= 4 and not re.search(r"[\d@/:]", line)
                and all(w[0].isupper() for w in words if w.isalpha())):
            return line
    return None


MONTHS = {m: i for i, m in enumerate(
    ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}
_DATE = r"(?:(?P<{p}m>[A-Za-z]{{3,9}})\.?\s+)?(?P<{p}y>(?:19|20)\d\d)"
DATE_RANGE_RE = re.compile(
    _DATE.format(p="s") + r"\s*(?:-|to|–)\s*(?:" + _DATE.format(p="e") + r"|(?P<present>present|current|now))",
    re.I,
)


def _to_month_index(month: str | None, year: str, default_month: int) -> int:
    """'Mar', '2024' -> a single number of months, so ranges are easy to compare."""
    m = MONTHS.get((month or "")[:3].lower(), default_month)
    return int(year) * 12 + (m - 1)


def _month_label(index: int) -> str:
    return f"{date(index // 12, index % 12 + 1, 1):%b %Y}"


@dataclass
class Job:
    title: str
    start: str           # "Jun 2023"
    end: str             # "Aug 2024" or "Present"
    months: int
    _range: tuple[int, int] = field(repr=False, compare=False, default=(0, 0))


def extract_jobs(experience: str, today: date | None = None) -> list[Job]:
    today = today or date.today()
    now = today.year * 12 + today.month - 1
    jobs = []
    lines = experience.splitlines()
    for i, line in enumerate(lines):
        match = DATE_RANGE_RE.search(line)
        if not match:
            continue
        start = _to_month_index(match["sm"], match["sy"], 1)        # "2021" alone = Jan 2021
        end = now if match["present"] else _to_month_index(match["em"], match["ey"], 12)
        if end < start or start > now:
            continue                                                # garbage, or a typo
        # Title: the text before the date on its line, else the line above.
        title = line[:match.start()].strip(" ,|-•(") or (lines[i - 1].strip(" •") if i else "")
        jobs.append(Job(title, _month_label(start),
                        "Present" if match["present"] else _month_label(end),
                        end - start + 1, (start, end)))
    return jobs


def total_experience_years(jobs: list[Job]) -> float:
    """Months worked, counting overlapping jobs once (classic interval merging)."""
    ranges = sorted(j._range for j in jobs)
    merged: list[list[int]] = []
    for start, end in ranges:
        if merged and start <= merged[-1][1] + 1:      # overlaps or touches the previous one
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return round(sum(e - s + 1 for s, e in merged) / 12, 1)


DEGREE_RE = re.compile(
    r"\b(B\.?\s?Tech|B\.?\s?E\.?|B\.?\s?Sc|BCA|B\.?\s?S\.?|Bachelor(?:'s)?|M\.?\s?Tech|M\.?\s?Sc|MCA|"
    r"M\.?\s?S\.?|MBA|Master(?:'s)?|Ph\.?\s?D|Diploma|High School|Class XII|12th)\b[^\n]*", re.I)
GPA_RE = re.compile(r"\b(?:CGPA|GPA)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:/\s*(\d+(?:\.\d+)?))?", re.I)


def extract_education(education: str) -> list[str]:
    return [m.group(0).strip(" ,|") for m in DEGREE_RE.finditer(education)]


# ------------------------------------------------------------------- output

@dataclass
class Resume:
    name: str | None
    email: str | None
    phone: str | None
    links: list[str]
    skills: list[str]
    education: list[str]
    gpa: str | None
    jobs: list[Job]
    experience_years: float
    sections_found: list[str] = field(default_factory=list)


def parse_text(raw: str, today: date | None = None) -> Resume:
    text = normalize(raw)
    sections = split_sections(text)
    header = sections.get("header", "")
    email = EMAIL_RE.search(text)
    phone = next((m.group(0).strip() for m in PHONE_RE.finditer(header or text)
                  if len(re.sub(r"\D", "", m.group(0))) >= 10), None)
    gpa = GPA_RE.search(sections.get("education", text))
    jobs = extract_jobs(sections.get("experience", ""), today)
    return Resume(
        name=extract_name(header),
        email=email.group(0) if email else None,
        phone=phone,
        links=sorted({m.group(0).rstrip("/") for m in URL_RE.finditer(text)}),
        skills=extract_skills(text, sections.get("skills", "")),
        education=extract_education(sections.get("education", "")),
        gpa=(f"{gpa[1]}/{gpa[2]}" if gpa and gpa[2] else gpa[1] if gpa else None),
        jobs=jobs,
        experience_years=total_experience_years(jobs),
        sections_found=[s for s in sections if s != "header"],
    )


def to_dict(resume: Resume) -> dict:
    d = asdict(resume)
    for job in d["jobs"]:
        job.pop("_range", None)          # internal detail, not part of the output
    return d


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Parse a resume into JSON.")
    p.add_argument("file", type=Path)
    p.add_argument("--pretty", action="store_true")
    args = p.parse_args(argv)
    try:
        resume = parse_text(extract_text(args.file))
    except (OSError, ValueError, ImportError) as err:
        print(f"error: {err}", file=sys.stderr)
        return 1
    print(json.dumps(to_dict(resume), indent=2 if args.pretty else None, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
