// Executors for the agent's investigation tools. Used by the Claude agent on the server and by
// the offline rules engine, so both modes produce the same kind of trace.
//
// Security design: the two security tools take NO input from the model. They read the ticket
// that the server is investigating. A prompt injection therefore cannot get the model to scan a
// cleaned-up version of the text, or to check a different sender address.

import { listEscalationTeams, searchKnowledgeBase } from "./knowledge.ts";
import { scanForSecurityIndicators } from "./scanner.ts";
import { checkSenderDomain } from "./sender.ts";
import { ticketText } from "./policy.ts";
import type { Ticket } from "./types.ts";

export const INVESTIGATION_TOOLS = ["scan_security_indicators", "check_sender_domain", "search_knowledge_base", "list_escalation_teams"] as const;
export type InvestigationTool = (typeof INVESTIGATION_TOOLS)[number];

export class ToolInputError extends Error {}

export function isInvestigationTool(name: string): name is InvestigationTool {
  return (INVESTIGATION_TOOLS as readonly string[]).includes(name);
}

export function executeTool(name: InvestigationTool, input: unknown, ticket: Ticket): unknown {
  switch (name) {
    case "scan_security_indicators":
      return scanForSecurityIndicators(ticketText(ticket));
    case "check_sender_domain":
      return checkSenderDomain(ticket.requester);
    case "search_knowledge_base": {
      const query = (input as { query?: unknown } | null)?.query;
      if (typeof query !== "string" || !query.trim()) throw new ToolInputError("search_knowledge_base needs a non-empty 'query' string.");
      if (query.length > 500) throw new ToolInputError("Query is too long (max 500 characters).");
      return searchKnowledgeBase(query).map(({ id, title, content }) => ({ id, title, content }));
    }
    case "list_escalation_teams":
      return listEscalationTeams();
  }
}
