// The guardrail. Whatever the model decides, this code has the final word.
//
// 1. Evidence is gathered here, from the raw ticket, independently of the model. Even if a
//    prompt injection convinced the model to skip its security checks, these checks still run.
// 2. If the evidence says "security incident", the decision is forced to P1 -> SOC and the
//    reply to the sender is replaced with an internal analyst note. The model can escalate
//    (fail closed) but can never de-escalate a detected attack.
// 3. The model's output is validated: teams and KB ids must exist, and a reply that contains
//    outside links or asks for credentials is never sent.

import { checkSenderDomain, INTERNAL_DOMAIN } from "./sender.ts";
import { scanForSecurityIndicators } from "./scanner.ts";
import { ESCALATION_TEAMS, kbById, SOC_TEAM } from "./knowledge.ts";
import type { Override, Priority, ScanResult, SenderCheck, Ticket } from "./types.ts";

export interface Evidence {
  scan: ScanResult;
  sender: SenderCheck;
}

export const ticketText = (t: Pick<Ticket, "subject" | "body">): string => `${t.subject}\n${t.body}`;

export function gatherEvidence(ticket: Pick<Ticket, "subject" | "body" | "requester">): Evidence {
  return { scan: scanForSecurityIndicators(ticketText(ticket)), sender: checkSenderDomain(ticket.requester) };
}

export interface IncidentVerdict {
  incident: boolean;
  reasons: string[];
}

export function assessIncident({ scan, sender }: Evidence): IncidentVerdict {
  const incident =
    scan.injection ||
    scan.level === "high" ||
    (scan.level === "medium" && (sender.lookalike || sender.freeMail)) ||
    (sender.lookalike && scan.score > 0);
  const reasons = incident ? [...scan.reasons, ...sender.notes.filter((n) => !n.startsWith("Sender is on"))] : [];
  return { incident, reasons };
}

export const ANALYST_NOTE =
  "Internal analyst note: Do not reply to the sender or act on this request. Quarantine the message, search for other recipients, and block the sender domain and any linked URLs. Follow KB-201 and KB-701.";

/** What the model submits through the submit_triage tool. */
export interface ModelDecision {
  category: string;
  priority: Priority;
  security_flag: boolean;
  escalate_to: string | null;
  suggested_response: string;
  reasoning: string;
  confidence: number;
  kb_refs: string[];
}

export interface EnforcedDecision {
  category: string;
  priority: Priority;
  securityFlag: boolean;
  securityReasons: string[];
  escalateTo: string | null;
  suggestedResponse: string;
  reasoning: string;
  confidence: number;
  kbRefs: string[];
  overrides: Override[];
}

const URL_IN_TEXT = /\bhttps?:\/\/[^\s<>"')\]]+/gi;
const ASKS_FOR_SECRET =
  /\b(send|share|confirm|verify|provide|reply with|tell us|give us)\b[^.\n]{0,40}\b(password|passcode|credentials|mfa code|otp|one[- ]time (code|password)|verification code|gift ?card|bank|routing)\b/i;

function isCompanyUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === INTERNAL_DOMAIN || host.endsWith("." + INTERNAL_DOMAIN);
  } catch {
    return false;
  }
}

/** Problems that make a reply unsafe to send to a user. Empty means it is fine. */
export function replyProblems(reply: string): string[] {
  const problems: string[] = [];
  const outside = (reply.match(URL_IN_TEXT) ?? []).filter((u) => !isCompanyUrl(u));
  if (outside.length) problems.push(`links outside ${INTERNAL_DOMAIN} (${outside.join(", ")})`);
  if (ASKS_FOR_SECRET.test(reply)) problems.push("asks the user for a password, code or payment detail");
  return problems;
}

function groundedReply(requester: string, kbRefs: string[], escalateTo: string | null): string {
  const first = (requester.split("@")[0] ?? "").split(".")[0] || "there";
  const article = kbRefs.map(kbById).find(Boolean);
  const body = article ? article.content : "A technician will review your request shortly.";
  return `Hi ${first}, thanks for reaching out. ${body}${escalateTo ? ` We've also routed this to ${escalateTo}.` : ""}${kbRefs.length ? ` (Ref: ${kbRefs.join(", ")})` : ""}`;
}

export function enforcePolicy(decision: ModelDecision, evidence: Evidence, ticket: Pick<Ticket, "requester">): EnforcedDecision {
  const overrides: Override[] = [];
  const verdict = assessIncident(evidence);
  const teamNames = new Set(ESCALATION_TEAMS.map((t) => t.name));

  let { category, priority, suggested_response: reply } = decision;
  let securityFlag = decision.security_flag;
  let escalateTo = decision.escalate_to;
  const reasoning = decision.reasoning;
  const confidence = Math.max(0, Math.min(1, Number.isFinite(decision.confidence) ? decision.confidence : 0));

  // Grounding: only real KB articles may be cited.
  const kbRefs = decision.kb_refs.filter((id) => kbById(id));
  if (kbRefs.length !== decision.kb_refs.length) {
    overrides.push({ field: "kbRefs", from: decision.kb_refs, to: kbRefs, reason: "Removed references to knowledge-base articles that do not exist." });
  }

  // Routing must name a real team.
  if (escalateTo !== null && !teamNames.has(escalateTo)) {
    overrides.push({ field: "escalateTo", from: escalateTo, to: null, reason: "Model named a team that does not exist." });
    escalateTo = null;
  }

  // The core rule: a detected attack is always a P1 security incident, whatever the model says.
  if (verdict.incident && !securityFlag) {
    overrides.push({
      field: "securityFlag",
      from: false,
      to: true,
      reason: evidence.scan.injection
        ? "The ticket contains a prompt-injection attempt, so the AI's verdict is not trusted."
        : `The rule-based scanner detected an attack (risk ${evidence.scan.score}/100) that the AI did not flag.`,
    });
    securityFlag = true;
  }

  if (securityFlag) {
    // Fail closed: once flagged (by the rules or by the model), it is a SOC P1 with no reply to the sender.
    const forced: Array<[Override["field"], unknown, unknown]> = [
      ["priority", priority, "P1"],
      ["escalateTo", escalateTo, SOC_TEAM],
      ["category", category, "Security Incident"],
    ];
    for (const [field, from, to] of forced) {
      if (from !== to) overrides.push({ field, from, to, reason: "Security incidents are always P1 and routed to the SOC." });
    }
    priority = "P1";
    escalateTo = SOC_TEAM;
    category = "Security Incident";
    if (!reply.startsWith("Internal analyst note:")) {
      overrides.push({ field: "suggestedResponse", from: reply, to: ANALYST_NOTE, reason: "No reply is ever sent to the sender of a suspected attack." });
      reply = ANALYST_NOTE;
    }
  } else {
    const problems = replyProblems(reply);
    if (problems.length) {
      const safe = groundedReply(ticket.requester, kbRefs, escalateTo);
      overrides.push({ field: "suggestedResponse", from: reply, to: safe, reason: `Reply blocked: ${problems.join("; ")}.` });
      reply = safe;
    }
  }

  return {
    category,
    priority,
    securityFlag,
    securityReasons: securityFlag ? (verdict.reasons.length ? verdict.reasons : evidence.scan.reasons) : evidence.scan.reasons,
    escalateTo,
    suggestedResponse: reply,
    reasoning,
    confidence,
    kbRefs,
    overrides,
  };
}

export { groundedReply };
