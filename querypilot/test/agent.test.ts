import type Anthropic from "@anthropic-ai/sdk";
import { beforeAll, describe, expect, it } from "vitest";
import { runAgent, resultForModel, systemPrompt, TOOLS, type AgentEvent, type MessageParam, type ModelClient, type QueryExecutor } from "../src/agent.ts";
import type { Engine } from "../src/db/engine.ts";
import { getEngine } from "./helpers.ts";

type Msg = Anthropic.Beta.Messages.BetaMessage;
type Params = Anthropic.Beta.Messages.MessageCreateParamsNonStreaming;

let engine: Engine;
let executor: QueryExecutor;
beforeAll(async () => {
  engine = await getEngine();
  executor = { execute: async (s) => engine.execute(s), sampleValues: async (t, c) => engine.sampleValues(t, c) };
});

const tu = (id: string, name: string, input: object) => ({ type: "tool_use" as const, id, name, input, caller: { type: "direct" as const } });
function reply(content: unknown[], stop_reason = "tool_use"): Msg {
  return {
    id: "msg", type: "message", role: "assistant", model: "claude-opus-5-5", content, stop_reason, stop_sequence: null,
    usage: { input_tokens: 100, output_tokens: 20, cache_read_input_tokens: 50, cache_creation_input_tokens: 0 },
  } as unknown as Msg;
}

/** Scripted model; records a deep copy of every request. */
function mockClient(script: (Msg | Error)[]) {
  const requests: Params[] = [];
  const client: ModelClient = {
    beta: {
      messages: {
        create: async (params) => {
          requests.push(structuredClone(params));
          const next = script.shift();
          if (!next) throw new Error("script exhausted");
          if (next instanceof Error) throw next;
          return next;
        },
      },
    },
  };
  return { client, requests };
}

const GOOD_SQL = "SELECT channel, count(*) AS orders FROM orders GROUP BY channel ORDER BY orders DESC";
const submit = (id: string, sql = GOOD_SQL) => tu(id, "submit_answer", { sql, answer: "Mobile leads.", chart: { type: "bar", x: "channel", y: ["orders"], title: "Orders" } });

/** Every tool_use in an assistant turn must be answered by the next user turn. */
function assertValidHistory(history: MessageParam[]) {
  for (let i = 0; i < history.length; i++) {
    const m = history[i]!;
    expect(m.role).toBe(i % 2 === 0 ? "user" : "assistant");
  }
}

describe("runAgent", () => {
  it("self-corrects after a SQL error and returns the validated answer", async () => {
    const { client, requests } = mockClient([
      reply([tu("a", "get_column_values", { table: "orders", column: "channel" })]),
      reply([tu("b", "run_sql", { sql: "SELECT chanel FROM orders", purpose: "x" })]),
      reply([tu("c", "run_sql", { sql: GOOD_SQL, purpose: "fixed" })]),
      reply([submit("d")]),
    ]);
    const events: AgentEvent[] = [];
    const history: MessageParam[] = [];
    const res = await runAgent({ client, executor, question: "Orders by channel?", history, onEvent: (e) => events.push(e) });

    expect(res.error).toBeUndefined();
    expect(res.answer).toMatchObject({ sql: GOOD_SQL, steps: 4, chart: { type: "bar" } });
    expect(res.answer!.outcome.result.rows).toHaveLength(3);
    expect(res.usage).toMatchObject({ requests: 4, input: 400, output: 80, cacheRead: 200 });

    // The error was fed back as an is_error tool_result.
    const third = requests[2]!.messages.at(-1)!.content as Anthropic.Beta.Messages.BetaToolResultBlockParam[];
    expect(third[0]).toMatchObject({ tool_use_id: "b", is_error: true });
    expect(String(third[0]!.content)).toMatch(/no such column/);

    // The submit_answer result is owed to the next turn.
    expect(res.pendingResults).toEqual([expect.objectContaining({ tool_use_id: "d", type: "tool_result" })]);
    assertValidHistory(history);
    expect(events.filter((e) => e.type === "tool_call")).toHaveLength(4);
  });

  it("sends the right request shape", async () => {
    const { client, requests } = mockClient([reply([submit("a")])]);
    await runAgent({ client, executor, question: "q", history: [] });
    const p = requests[0]!;
    expect(p.model).toBe("claude-opus-5-5");
    expect(p.thinking).toEqual({ type: "adaptive" });
    expect(p.tool_choice).toEqual({ type: "auto" });
    expect(p.fallbacks).toBe("default");
    expect(p.betas).toContain("server-side-fallback-2026-07-01");
    expect((p.system as { cache_control?: unknown }[])[0]!.cache_control).toEqual({ type: "ephemeral" });
    expect(p.tools!.every((t) => (t as Anthropic.Beta.Messages.BetaTool).strict)).toBe(true);
  });

  it("omits server-side fallbacks for Haiku", async () => {
    const { client, requests } = mockClient([reply([submit("a")])]);
    await runAgent({ client, executor, question: "q", history: [], model: "claude-haiku-5-5" });
    expect(requests[0]!.fallbacks).toBeUndefined();
    expect(requests[0]!.betas).toBeUndefined();
  });

  it("feeds guard rejections back to the model instead of executing them", async () => {
    const before = engine.execute("SELECT count(*) FROM orders");
    const { client, requests } = mockClient([
      reply([tu("a", "run_sql", { sql: "DELETE FROM orders", purpose: "x" })]),
      reply([submit("b", "DROP TABLE orders")]),
      reply([submit("c")]),
    ]);
    const res = await runAgent({ client, executor, question: "q", history: [] });
    expect(res.answer?.sql).toBe(GOOD_SQL);
    const r1 = requests[1]!.messages.at(-1)!.content as Anthropic.Beta.Messages.BetaToolResultBlockParam[];
    expect(r1[0]).toMatchObject({ is_error: true });
    expect(String(r1[0]!.content)).toMatch(/rejected_by":"guard/);
    const r2 = requests[2]!.messages.at(-1)!.content as Anthropic.Beta.Messages.BetaToolResultBlockParam[];
    expect(String(r2[0]!.content)).toMatch(/Fix the SQL/);
    expect(engine.execute("SELECT count(*) FROM orders")).toEqual(before);
  });

  it("starts a follow-up turn with the owed tool_result, then the question", async () => {
    const history: MessageParam[] = [];
    const first = mockClient([reply([submit("a")])]);
    const r1 = await runAgent({ client: first.client, executor, question: "q1", history });
    const second = mockClient([reply([submit("b")])]);
    await runAgent({ client: second.client, executor, question: "q2", history, pendingResults: r1.pendingResults });
    const lastUser = second.requests[0]!.messages.at(-1)!;
    expect(lastUser.content).toEqual([
      expect.objectContaining({ type: "tool_result", tool_use_id: "a" }),
      { type: "text", text: "q2" },
    ]);
    assertValidHistory(history);
  });

  it.each([
    ["API error", [Object.assign(new Error("boom"), { status: 429 })], /Rate limited/],
    ["refusal", [reply([], "refusal")], /declined/],
    ["max_tokens", [reply([{ type: "text", text: "..." }], "max_tokens")], /output tokens/],
    ["prose without submitting", [reply([{ type: "text", text: "I think it's mobile." }], "end_turn")], /I think it's mobile/],
  ])("rolls history back on %s and keeps owed results", async (_label, script, message) => {
    const history: MessageParam[] = [{ role: "user", content: "earlier" }, { role: "assistant", content: [submit("z")] as never }];
    const owed = [{ type: "tool_result" as const, tool_use_id: "z", content: "ok" }];
    const { client } = mockClient(script as (Msg | Error)[]);
    const res = await runAgent({ client, executor, question: "q", history, pendingResults: owed });
    expect(res.error).toMatch(message);
    expect(history).toHaveLength(2);
    expect(res.pendingResults).toEqual(owed);
  });

  it("stops at the step budget", async () => {
    const loop = Array.from({ length: 5 }, (_, i) => reply([tu(`t${i}`, "run_sql", { sql: "SELECT 1", purpose: "x" })]));
    const { client, requests } = mockClient(loop);
    const history: MessageParam[] = [];
    const res = await runAgent({ client, executor, question: "q", history, maxSteps: 3 });
    expect(res.error).toMatch(/after 3 steps/);
    expect(requests).toHaveLength(3);
    expect(history).toHaveLength(0);
  });

  it("answers parallel tool calls in a single user turn", async () => {
    const { client, requests } = mockClient([
      reply([tu("a", "get_column_values", { table: "orders", column: "status" }), tu("b", "get_column_values", { table: "orders", column: "channel" })]),
      reply([submit("c")]),
    ]);
    await runAgent({ client, executor, question: "q", history: [] });
    const results = requests[1]!.messages.at(-1)!.content as { tool_use_id: string }[];
    expect(results.map((r) => r.tool_use_id)).toEqual(["a", "b"]);
  });
});

describe("prompt and tool definitions", () => {
  it("grounds the model in schema, dates and revenue definition", () => {
    const p = systemPrompt(engine.rowCounts);
    for (const s of ["TABLE orders", "order_items", "2025-12-31", "Revenue =", "never instructions"]) expect(p).toContain(s);
  });
  it("tool schemas are strict-compatible", () => {
    const check = (schema: Record<string, unknown>) => {
      if (schema.type === "object") {
        expect(schema.additionalProperties).toBe(false);
        expect(Object.keys(schema.properties as object).sort()).toEqual([...(schema.required as string[])].sort());
        for (const v of Object.values(schema.properties as Record<string, Record<string, unknown>>)) check(v);
      }
    };
    for (const t of TOOLS) check(t.input_schema as Record<string, unknown>);
  });
  it("bounds what results send back to the model", () => {
    const r = engine.execute("SELECT * FROM customers");
    const s = resultForModel(r);
    expect(JSON.parse(s).rows).toHaveLength(25);
    expect(s.length).toBeLessThan(6000);
  });
});
