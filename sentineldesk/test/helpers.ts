import type Anthropic from "@anthropic-ai/sdk";
import type { MessagesClient } from "../src/server/agent.ts";
import type { Ticket } from "../src/core/types.ts";
import { SAMPLE_TICKETS } from "../src/core/samples.ts";

type Params = Anthropic.Beta.Messages.MessageCreateParamsNonStreaming;
type Block = { type: "text"; text: string } | { type: "tool_use"; id: string; name: string; input: unknown };

let seq = 0;
export const toolUse = (name: string, input: unknown = {}): Block => ({ type: "tool_use", id: `toolu_${++seq}`, name, input });
export const text = (t: string): Block => ({ type: "text", text: t });

export function message(content: Block[], stop_reason: string = content.some((b) => b.type === "tool_use") ? "tool_use" : "end_turn") {
  return {
    id: `msg_${++seq}`,
    type: "message",
    role: "assistant",
    model: "claude-opus-5-5",
    content,
    stop_reason,
    stop_details: null,
    usage: { input_tokens: 100, output_tokens: 20, cache_read_input_tokens: 50, cache_creation_input_tokens: 0 },
  } as unknown as Anthropic.Beta.Messages.BetaMessage;
}

/** A scripted stand-in for the Claude API. Each call returns the next scripted turn. */
export class FakeClient implements MessagesClient {
  readonly requests: Params[] = [];
  constructor(private readonly script: Array<(p: Params) => Anthropic.Beta.Messages.BetaMessage>) {}
  beta = {
    messages: {
      create: async (params: Params) => {
        // Snapshot: the agent keeps mutating its messages array.
        this.requests.push(structuredClone(params));
        const next = this.script[this.requests.length - 1];
        if (!next) throw new Error(`FakeClient: no scripted response for call ${this.requests.length}`);
        return next(params);
      },
    },
  };
}

export const decision = (over: Record<string, unknown> = {}) => ({
  category: "Access & Accounts",
  priority: "P3",
  security_flag: false,
  escalate_to: null,
  suggested_response: "Hi Jordan, your account unlocks automatically after 15 minutes, or reset it at the self-service portal. (Ref: KB-101)",
  reasoning: "Locked account after vacation; no security indicators.",
  confidence: 0.8,
  kb_refs: ["KB-101"],
  ...over,
});

/** A well-behaved model: investigate, then submit `final`. */
export function honestScript(final: Record<string, unknown>) {
  return [
    () => message([toolUse("scan_security_indicators"), toolUse("check_sender_domain")]),
    () => message([toolUse("search_knowledge_base", { query: "password locked" })]),
    () => message([toolUse("submit_triage", final)]),
  ];
}

export const sample = (i: number): Ticket => ({ id: `S${i}`, ...SAMPLE_TICKETS[i]! });
