"""The guardrail: whatever the council decides, this code has the final word (port of policy.ts).

1. Evidence is recomputed from the raw ticket, independently of every model.
2. A detected attack is forced to P1 -> SOC with no reply to the sender. Models may escalate
   (fail closed) but never de-escalate a detected attack.
3. The Chairman's output is validated: teams and KB ids must exist; a reply with outside links or
   a request for credentials is never sent.
"""

from __future__ import annotations

import re
from urllib.parse import urlparse

from .profile import SECURITY_CATEGORY, OrgProfile, demo_profile
from .rules import Evidence, assess_incident, grounded_reply

_URL_IN_TEXT = re.compile(r"\bhttps?://[^\s<>\"')\]]+", re.I)
_ASKS_FOR_SECRET = re.compile(
    r"\b(send|share|confirm|verify|provide|reply with|tell us|give us)\b[^.\n]{0,40}\b(password|passcode|credentials|mfa code|otp|one[- ]time (code|password)|verification code|gift ?card|bank|routing)\b",
    re.I,
)


def _is_company_url(url: str, profile: OrgProfile) -> bool:
    try:
        host = (urlparse(url).hostname or "").lower()
    except ValueError:
        return False
    return profile.is_internal(host)


def reply_problems(reply: str, profile: OrgProfile | None = None) -> list[str]:
    p = profile or demo_profile()
    problems: list[str] = []
    outside = [u for u in _URL_IN_TEXT.findall(reply) if not _is_company_url(u, p)]
    if outside:
        problems.append(f"links outside {p.primary_domain} ({', '.join(outside)})")
    if _ASKS_FOR_SECRET.search(reply):
        problems.append("asks the user for a password, code or payment detail")
    return problems


def enforce_policy(decision: dict, evidence: Evidence, requester: str, security_agent: dict | None = None, profile: OrgProfile | None = None) -> dict:
    """Return the final decision plus an `overrides` list explaining every change.

    `decision` is the Chairman's validated output. `security_agent` is the Security subagent's
    report; a confident attack verdict from it escalates (fail closed) even if the Chairman disagrees.
    """
    p = profile or demo_profile()
    overrides: list[dict] = []
    incident, incident_reasons = assess_incident(evidence)

    category = decision["category"]
    priority = decision["priority"]
    reply = decision["suggested_response"]
    security_flag = bool(decision["security_flag"])
    escalate_to = decision["escalate_to"]
    confidence = decision.get("confidence", 0)
    confidence = max(0.0, min(1.0, float(confidence))) if isinstance(confidence, (int, float)) and confidence == confidence else 0.0

    kb_refs = [i for i in decision["kb_refs"] if i in p.kb_by_id]
    if len(kb_refs) != len(decision["kb_refs"]):
        overrides.append({"field": "kb_refs", "from": decision["kb_refs"], "to": kb_refs, "reason": "Removed references to knowledge-base articles that do not exist."})

    if escalate_to is not None and escalate_to not in p.team_names:
        overrides.append({"field": "escalate_to", "from": escalate_to, "to": None, "reason": "The Chairman named a team that does not exist."})
        escalate_to = None

    if incident and not security_flag:
        reason = (
            "The ticket contains a prompt-injection attempt, so the council's verdict is not trusted."
            if evidence.scan.injection
            else f"The rule-based scanner detected an attack (risk {evidence.scan.score}/100) that the council did not flag."
        )
        overrides.append({"field": "security_flag", "from": False, "to": True, "reason": reason})
        security_flag = True

    if not security_flag and security_agent and security_agent.get("is_attack") and float(security_agent.get("confidence", 0)) >= 0.7:
        overrides.append({"field": "security_flag", "from": False, "to": True, "reason": "The Security subagent reported an attack with high confidence; the system fails closed."})
        security_flag = True

    if security_flag:
        for field, current, forced in (("priority", priority, "P1"), ("escalate_to", escalate_to, p.security_team), ("category", category, SECURITY_CATEGORY)):
            if current != forced:
                overrides.append({"field": field, "from": current, "to": forced, "reason": f"Security incidents are always P1 and routed to the {p.security_team}."})
        priority, escalate_to, category = "P1", p.security_team, SECURITY_CATEGORY
        if not reply.startswith("Internal analyst note:"):
            overrides.append({"field": "suggested_response", "from": reply, "to": p.analyst_note, "reason": "No reply is ever sent to the sender of a suspected attack."})
            reply = p.analyst_note
    else:
        problems = reply_problems(reply, p)
        if problems:
            safe = grounded_reply(requester, kb_refs, escalate_to, p)
            overrides.append({"field": "suggested_response", "from": reply, "to": safe, "reason": f"Reply blocked: {'; '.join(problems)}."})
            reply = safe

    if security_flag:
        security_reasons = incident_reasons or evidence.scan.reasons or [*(security_agent or {}).get("indicators", [])]
    else:
        security_reasons = evidence.scan.reasons
    return {
        "category": category,
        "priority": priority,
        "security_flag": security_flag,
        "security_reasons": security_reasons,
        "escalate_to": escalate_to,
        "suggested_response": reply,
        "reasoning": decision.get("reasoning", ""),
        "confidence": round(confidence, 2),
        "kb_refs": kb_refs,
        "overrides": overrides,
    }
