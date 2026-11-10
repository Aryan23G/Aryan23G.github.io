// Shared domain types. Everything in src/core is pure TypeScript with no Node or DOM
// dependencies, so the same code runs on the server (Express + Claude agent) and in the
// browser (the offline rules engine used as a fallback by the demo page).

export interface Ticket {
  id: string;
  subject: string;
  body: string;
  /** Email address of the person (or attacker) who sent the request. */
  requester: string;
  createdAt?: string;
}

export type RiskLevel = "clean" | "low" | "medium" | "high";
export type Priority = "P1" | "P2" | "P3" | "P4";

export interface ScanResult {
  score: number;
  level: RiskLevel;
  reasons: string[];
  urls: string[];
  /** True when the ticket text tries to give instructions to an AI system. */
  injection: boolean;
}

export interface SenderCheck {
  domain: string;
  internal: boolean;
  freeMail: boolean;
  lookalike: boolean;
  notes: string[];
}

export interface KbArticle {
  id: string;
  title: string;
  tags: string[];
  content: string;
}

export interface Team {
  name: string;
  handles: string;
}

export interface ToolCall {
  name: string;
  input: unknown;
  /** JSON-encoded tool output (what the model saw). */
  output: string;
  isError?: boolean;
}

/** One change the guardrail made to the model's decision. */
export interface Override {
  field: "securityFlag" | "priority" | "escalateTo" | "category" | "suggestedResponse" | "kbRefs";
  from: unknown;
  to: unknown;
  reason: string;
}

export interface TriageResult {
  category: string;
  priority: Priority;
  securityFlag: boolean;
  securityReasons: string[];
  escalateTo: string | null;
  suggestedResponse: string;
  reasoning: string;
  confidence: number;
  /** KB article ids the reply is grounded in. */
  kbRefs: string[];
  toolCalls: ToolCall[];
  /** Changes the rules-based guardrail made to the AI's decision (empty for rules-only). */
  overrides: Override[];
  triagedAt: string;
  /** "offline-rules" or the Claude model id that served the request. */
  model: string;
  /** How the decision was made. */
  mode: "rules" | "claude";
  usage?: { inputTokens: number; outputTokens: number; cacheReadTokens: number; steps: number };
}
