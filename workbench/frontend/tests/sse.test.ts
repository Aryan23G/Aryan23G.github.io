import { describe, expect, it } from "vitest";
import { parseSseBuffer } from "@/lib/sse";

const frame = (event: string, data: object) => `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;

describe("parseSseBuffer", () => {
  it("parses complete frames and keeps the partial remainder", () => {
    const a = frame("run_started", { type: "run_started", run_id: "r1", question: "q", model: "m", dialect: "sqlite" });
    const b = frame("step", { type: "step", node: "generate_sql", status: "running", label: "x" });
    const partial = 'event: step\ndata: {"type":"st';
    const { events, rest } = parseSseBuffer(a + b + partial);
    expect(events.map((e) => e.type)).toEqual(["run_started", "step"]);
    expect(rest).toBe(partial);
  });

  it("reassembles a frame split across chunks", () => {
    const full = frame("run_error", { type: "run_error", run_id: "r", message: "boom" });
    const first = parseSseBuffer(full.slice(0, 17));
    expect(first.events).toEqual([]);
    const second = parseSseBuffer(first.rest + full.slice(17));
    expect(second.events).toEqual([{ type: "run_error", run_id: "r", message: "boom" }]);
    expect(second.rest).toBe("");
  });

  it("joins multi-line data, tolerates CRLF and ignores comment/keep-alive frames", () => {
    const text = ': keep-alive\n\nevent: step\r\ndata: {"type":"step",\r\ndata: "node":"fail"}\r\n\r\n';
    const { events } = parseSseBuffer(text);
    expect(events).toEqual([{ type: "step", node: "fail" }]);
  });
});
