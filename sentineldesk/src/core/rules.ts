// Offline, deterministic triage. It is the fallback when the Claude API is unavailable or over
// budget, the baseline the eval compares Claude against, and it runs in the browser too.

import { ANALYST_NOTE, assessIncident, gatherEvidence, groundedReply, ticketText } from "./policy.ts";
import { SOC_TEAM } from "./knowledge.ts";
import { executeTool, type InvestigationTool } from "./tools.ts";
import type { Priority, Ticket, ToolCall, TriageResult } from "./types.ts";

const CATEGORY_RULES: Array<[RegExp, string, Priority, string | null]> = [
  [/\b(vpn|wi-?fi|network|internet|gateway)\b/i, "Network", "P3", "Network Operations"],
  [/\b(install|software|license|figma|adobe|application)\b/i, "Software", "P4", "Application Support"],
  [/\b(print|printer|laptop|monitor|keyboard|screen|battery)\b/i, "Hardware", "P3", "Desktop Support"],
  [/\b(password|locked|log ?in|mfa|authenticator|access)\b/i, "Access & Accounts", "P3", null],
  [/\b(outlook|teams|sharepoint|calendar|mailbox)\b/i, "Email & Collaboration", "P3", "Collaboration Services"],
];

export function triageWithRules(ticket: Ticket): TriageResult {
  const text = ticketText(ticket);
  const toolCalls: ToolCall[] = [];
  const call = <T>(name: InvestigationTool, input: Record<string, unknown>): T => {
    const output = executeTool(name, input, ticket) as T;
    toolCalls.push({ name, input, output: JSON.stringify(output) });
    return output;
  };

  call("scan_security_indicators", {});
  call("check_sender_domain", {});
  const kb = call<Array<{ id: string }>>("search_knowledge_base", { query: text });
  call("list_escalation_teams", {});

  const evidence = gatherEvidence(ticket);
  const verdict = assessIncident(evidence);
  const now = new Date().toISOString();
  const base = { toolCalls, overrides: [], triagedAt: now, model: "offline-rules", mode: "rules" as const };

  let result: Omit<TriageResult, keyof typeof base>;
  if (verdict.incident) {
    result = {
      category: "Security Incident",
      priority: "P1",
      securityFlag: true,
      securityReasons: verdict.reasons,
      escalateTo: SOC_TEAM,
      suggestedResponse: ANALYST_NOTE,
      reasoning: `Rule-based scanner scored ${evidence.scan.score}/100 and the sender check found: ${evidence.sender.notes.join(" ")}`,
      confidence: Math.min(0.95, 0.5 + evidence.scan.score / 200),
      kbRefs: ["KB-201", "KB-701"],
    };
  } else {
    const match = CATEGORY_RULES.find(([re]) => re.test(text));
    const [category, initial, team] = match ? [match[1], match[2], match[3]] : ["Other", "P4" as Priority, null];
    let priority: Priority = initial;
    if (/\b(whole|entire|all of us|none of us|everyone|floor)\b/i.test(text)) priority = "P2";
    if (/\b(deadline|due at|client call|board|outage)\b/i.test(text) && priority === "P3") priority = "P2";
    const kbRefs = kb.map((a) => a.id);
    result = {
      category,
      priority,
      securityFlag: false,
      securityReasons: evidence.scan.reasons,
      escalateTo: team,
      suggestedResponse: groundedReply(ticket.requester, kbRefs, team),
      reasoning: `Matched ${category} keywords. ${kb.length} related KB article(s) found. Security scan was ${evidence.scan.level} (${evidence.scan.score}/100).`,
      confidence: match ? 0.6 : 0.3,
      kbRefs,
    };
  }

  toolCalls.push({
    name: "submit_triage",
    input: {
      category: result.category,
      priority: result.priority,
      security_flag: result.securityFlag,
      escalate_to: result.escalateTo,
      kb_refs: result.kbRefs,
      confidence: result.confidence,
    },
    output: JSON.stringify({ accepted: true }),
  });
  return { ...result, ...base };
}
