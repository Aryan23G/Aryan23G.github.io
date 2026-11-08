import type Anthropic from "@anthropic-ai/sdk";
import { beforeAll, describe, expect, it } from "vitest";
import { runAgent, type ModelClient, type QueryExecutor } from "../src/agent.ts";
import type { Engine } from "../src/db/engine.ts";
import { PiiShield } from "../src/pii.ts";
import { getEngine } from "./helpers.ts";

let engine: Engine;
let shield: PiiShield;
beforeAll(async () => {
  engine = await getEngine();
  shield = new PiiShield(engine.piiValues());
});

describe("PiiShield", () => {
  const small = () => new PiiShield({ name: ["Ava Patel", "Liam Chen", "Ava Patel"], email: ["ava.patel1@example.com"] });

  it("assigns stable tokens per unique value", () => {
    const s = small();
    const { rows, masked } = s.maskRows([["Ava Patel", 10], ["ava patel", 3], ["Liam Chen", null], ["Footwear", 1]]);
    expect(rows).toEqual([["CUSTOMER_NAME_1", 10], ["CUSTOMER_NAME_1", 3], ["CUSTOMER_NAME_2", null], ["Footwear", 1]]);
    expect(masked).toBe(3);
  });

  it("masks emails and names embedded in longer strings", () => {
    const s = small();
    expect(s.maskRows([["Ava Patel <ava.patel1@example.com>"]]).rows[0]![0]).toBe("CUSTOMER_NAME_1 <CUSTOMER_EMAIL_1>");
    expect(s.maskRows([["contact: someone@else.org"]]).rows[0]![0]).toBe("contact: [EMAIL]");
  });

  it("tokenizes questions and restores SQL and text", () => {
    const s = small();
    const q = s.maskText("What did Liam Chen buy?");
    expect(q).toBe("What did CUSTOMER_NAME_2 buy?");
    expect(s.restoreSql("SELECT * FROM customers WHERE name = 'CUSTOMER_NAME_2'")).toBe("SELECT * FROM customers WHERE name = 'Liam Chen'");
    expect(s.restoreText("CUSTOMER_NAME_2 spent the most.")).toBe("Liam Chen spent the most.");
    expect(s.restoreText("CUSTOMER_NAME_99 is unknown")).toBe("CUSTOMER_NAME_99 is unknown");
  });

  it("escapes quotes when restoring into SQL", () => {
    const s = new PiiShield({ name: ["Liam O'Neil"], email: [] });
    expect(s.restoreSql("WHERE name = 'CUSTOMER_NAME_1'")).toBe("WHERE name = 'Liam O''Neil'");
  });

  it("covers every customer in the demo database", () => {
    const all = engine.execute("SELECT name, email FROM customers");
    if (!all.ok) throw new Error(all.error);
    const masked = shield.maskRows(all.result.rows).rows;
    expect(masked.every((r) => /^CUSTOMER_NAME_\d+$/.test(String(r[0])) && /^CUSTOMER_EMAIL_\d+$/.test(String(r[1])))).toBe(true);
  });
});

describe("agent with PII shield", () => {
  it("never sends real names or emails to the model, but answers with them", async () => {
    const top = engine.execute(
      "SELECT c.name FROM customers c JOIN orders o USING (customer_id) GROUP BY c.customer_id ORDER BY count(*) DESC LIMIT 1",
    );
    if (!top.ok) throw new Error(top.error);
    const realName = String(top.result.rows[0]![0]);

    const requests: string[] = [];
    let n = 0;
    const replies = [
      () => [{ type: "tool_use", id: "a", name: "run_sql", input: { sql: "SELECT c.name, c.email, count(*) AS orders FROM customers c JOIN orders o USING (customer_id) GROUP BY c.customer_id ORDER BY orders DESC LIMIT 3", purpose: "top customers" } }],
      // The model refers to the customer only by placeholder, both in SQL and prose.
      () => {
        const token = shield.maskText(realName);
        return [{ type: "tool_use", id: "b", name: "submit_answer", input: { sql: `SELECT count(*) AS orders FROM orders o JOIN customers c USING (customer_id) WHERE c.name = '${token}'`, answer: `${token} placed the most orders.`, chart: { type: "kpi", x: "", y: ["orders"], title: `Orders by ${token}` } } }];
      },
    ];
    const client: ModelClient = {
      beta: {
        messages: {
          create: async (params) => {
            requests.push(JSON.stringify(params));
            return { id: "m", type: "message", role: "assistant", model: "x", content: replies[n++]!(), stop_reason: "tool_use", stop_sequence: null, usage: { input_tokens: 1, output_tokens: 1 } } as unknown as Anthropic.Beta.Messages.BetaMessage;
          },
        },
      },
    };
    const executor: QueryExecutor = { execute: async (s) => engine.execute(s), sampleValues: async (t, c) => engine.sampleValues(t, c) };
    const res = await runAgent({ client, executor, question: `How many orders did ${realName} place?`, history: [], shield });

    // Nothing the model received contains a real customer name or email.
    const pii = engine.piiValues();
    for (const body of requests) {
      for (const v of [...pii.name, ...pii.email]) expect(body.includes(v)).toBe(false);
    }
    expect(requests[0]).toContain("CUSTOMER_NAME_");
    expect(requests[1]).toContain("CUSTOMER_EMAIL_");

    // The SQL ran against the real value and the user sees the real name.
    expect(res.answer?.sql).toContain(`'${realName}'`);
    expect(res.answer?.outcome.result.rows[0]![0]).toBeGreaterThan(0);
    expect(res.answer?.answer).toBe(`${realName} placed the most orders.`);
    expect(res.answer?.chart.title).toBe(`Orders by ${realName}`);
  });
});
