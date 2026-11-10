"""Organisation profile: everything that differs between service desks, loaded from one TOML file.

A customer edits a copy of profiles/template.toml (domains, teams, categories, priority rules,
knowledge base) and points SENTINEL_CONFIG at it. No code changes per customer.
The knowledge base can be inline ([[knowledge_base.articles]]) and/or a folder of Markdown files
(knowledge_base.dir), each optionally starting with front matter:

    ---
    id: KB-101
    title: Resetting a forgotten password
    tags: password, reset, locked
    ---
    Article text...
"""

from __future__ import annotations

import re
import tomllib
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path

PRIORITIES = ("P1", "P2", "P3", "P4")
SECURITY_CATEGORY = "Security Incident"
OTHER_CATEGORY = "Other"
DEMO_PATH = Path(__file__).parent / "profiles" / "demo.toml"

DEFAULT_FREE_MAIL = ("gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "proton.me", "protonmail.com", "icloud.com", "aol.com")


class ProfileError(ValueError):
    """The profile file is missing something or contradicts itself."""


@dataclass(frozen=True)
class Category:
    name: str
    pattern: re.Pattern[str]
    priority: str
    team: str | None


@dataclass(frozen=True, eq=False)  # identity equality: holds unhashable dicts
class OrgProfile:
    name: str
    internal_domains: tuple[str, ...]
    brand_tokens: tuple[str, ...]
    free_mail_domains: tuple[str, ...]
    teams: tuple[dict, ...]
    security_team: str
    security_kb: tuple[str, ...]
    analyst_note: str
    categories: tuple[Category, ...]
    team_wide: re.Pattern[str]
    deadline: re.Pattern[str]
    kb: tuple[dict, ...]
    source: str = "inline"
    kb_by_id: dict = field(default_factory=dict, compare=False, repr=False)

    @property
    def team_names(self) -> tuple[str, ...]:
        return tuple(t["name"] for t in self.teams)

    @property
    def category_names(self) -> tuple[str, ...]:
        names = [c.name for c in self.categories]
        return tuple(dict.fromkeys([*names, SECURITY_CATEGORY, OTHER_CATEGORY]))

    @property
    def primary_domain(self) -> str:
        return self.internal_domains[0]

    def is_internal(self, domain: str) -> bool:
        d = domain.lower()
        return any(d == x or d.endswith("." + x) for x in self.internal_domains)


def _words(items: list[str], what: str) -> re.Pattern[str]:
    if not items:
        return re.compile(r"(?!x)x")  # matches nothing
    try:
        return re.compile(r"\b(" + "|".join(items) + r")\b", re.I)
    except re.error as exc:
        raise ProfileError(f"Invalid keyword pattern in {what}: {exc}") from exc


def _parse_markdown_article(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    meta: dict[str, str] = {}
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end == -1:
            raise ProfileError(f"{path}: front matter starts with --- but never closes.")
        for line in text[3:end].strip().splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip().lower()] = v.strip()
        text = text[end + 4 :]
    body = text.strip()
    title = meta.get("title")
    if not title:
        first = body.splitlines()[0] if body else ""
        if first.startswith("#"):
            title = first.lstrip("#").strip()
            body = body[len(first) :].strip()
    if not title:
        raise ProfileError(f"{path}: give the article a 'title:' in front matter or a '# Heading' first line.")
    if not body:
        raise ProfileError(f"{path}: article has no content.")
    tags = [t.strip().lower() for t in meta.get("tags", "").split(",") if t.strip()]
    return {"id": meta.get("id") or path.stem, "title": title, "tags": tags, "content": " ".join(body.split())}


def load_profile(path: Path | str) -> OrgProfile:
    path = Path(path)
    try:
        data = tomllib.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise ProfileError(f"Profile file not found: {path}") from exc
    except tomllib.TOMLDecodeError as exc:
        raise ProfileError(f"{path} is not valid TOML: {exc}") from exc
    return profile_from_dict(data, base_dir=path.parent, source=str(path))


def profile_from_dict(data: dict, base_dir: Path = Path("."), source: str = "inline") -> OrgProfile:
    org = data.get("organization") or {}
    name = str(org.get("name") or "").strip()
    domains = tuple(str(d).lower().strip() for d in org.get("domains") or [] if str(d).strip())
    if not name or not domains:
        raise ProfileError("[organization] needs a name and at least one entry in domains.")

    teams = tuple({"name": str(t["name"]).strip(), "handles": str(t.get("handles", "")).strip()} for t in data.get("teams") or [] if t.get("name"))
    team_names = [t["name"] for t in teams]
    if len(set(team_names)) != len(team_names):
        raise ProfileError("Team names must be unique.")
    security_team = str(org.get("security_team") or "").strip()
    if security_team not in team_names:
        raise ProfileError(f"security_team {security_team!r} must be one of the [[teams]].")

    categories = []
    for c in data.get("categories") or []:
        team = c.get("team")
        if team is not None and team not in team_names:
            raise ProfileError(f"Category {c.get('name')!r} routes to unknown team {team!r}.")
        if c.get("priority", "P3") not in PRIORITIES:
            raise ProfileError(f"Category {c.get('name')!r} has priority {c.get('priority')!r}; use P1-P4.")
        if not c.get("name") or not c.get("keywords"):
            raise ProfileError("Every [[categories]] entry needs a name and keywords.")
        categories.append(Category(name=str(c["name"]), pattern=_words(list(c["keywords"]), f"category {c['name']}"), priority=c.get("priority", "P3"), team=team))

    kb_cfg = data.get("knowledge_base") or {}
    kb: list[dict] = [
        {"id": str(a["id"]), "title": str(a["title"]), "tags": [str(t).lower() for t in a.get("tags", [])], "content": str(a["content"])}
        for a in kb_cfg.get("articles") or []
    ]
    if kb_cfg.get("dir"):
        kb_dir = (base_dir / kb_cfg["dir"]).resolve()
        if not kb_dir.is_dir():
            raise ProfileError(f"knowledge_base.dir {kb_dir} is not a folder.")
        kb.extend(_parse_markdown_article(p) for p in sorted(kb_dir.glob("*.md")))
    ids = [a["id"] for a in kb]
    if len(set(ids)) != len(ids):
        dupes = sorted({i for i in ids if ids.count(i) > 1})
        raise ProfileError(f"Duplicate knowledge-base ids: {', '.join(dupes)}.")
    kb_by_id = {a["id"]: a for a in kb}
    security_kb = tuple(str(i) for i in org.get("security_kb") or [])
    missing = [i for i in security_kb if i not in kb_by_id]
    if missing:
        raise ProfileError(f"security_kb lists articles that do not exist: {', '.join(missing)}.")

    # Brand tokens drive look-alike detection: "acme" in acme-support.net. Short tokens would match
    # everything, so tokens under 4 characters must be listed explicitly to be used.
    tokens = org.get("brand_tokens")
    if tokens is None:
        tokens = [d.split(".")[0] for d in domains if len(d.split(".")[0]) >= 4]
    rules = data.get("priority_rules") or {}
    analyst_note = str(org.get("analyst_note") or "").strip() or (
        "Internal analyst note: Do not reply to the sender or act on this request. Quarantine the message, search for other "
        f"recipients, and block the sender domain and any linked URLs. Owner: {security_team}."
    )
    return OrgProfile(
        name=name,
        internal_domains=domains,
        brand_tokens=tuple(dict.fromkeys(str(t).lower() for t in tokens)),
        free_mail_domains=tuple(org.get("free_mail_domains") or DEFAULT_FREE_MAIL),
        teams=teams,
        security_team=security_team,
        security_kb=security_kb,
        analyst_note=analyst_note,
        categories=tuple(categories),
        team_wide=_words(list(rules.get("team_wide") or []), "priority_rules.team_wide"),
        deadline=_words(list(rules.get("deadline") or []), "priority_rules.deadline"),
        kb=tuple(kb),
        source=source,
        kb_by_id=kb_by_id,
    )


@lru_cache(maxsize=1)
def demo_profile() -> OrgProfile:
    return load_profile(DEMO_PATH)
