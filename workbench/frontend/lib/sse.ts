import type { AgentEvent } from "./types";

/**
 * Parse complete Server-Sent Event frames out of a text buffer.
 * Returns the parsed events and the unconsumed remainder (a partial frame still arriving).
 * Frames are separated by a blank line; multiple `data:` lines in one frame are joined with "\n".
 */
export function parseSseBuffer(buffer: string): { events: AgentEvent[]; rest: string } {
  const events: AgentEvent[] = [];
  let rest = buffer.replace(/\r\n/g, "\n");
  let boundary: number;
  while ((boundary = rest.indexOf("\n\n")) !== -1) {
    const frame = rest.slice(0, boundary);
    rest = rest.slice(boundary + 2);
    const data = frame
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).replace(/^ /, ""))
      .join("\n");
    if (data) events.push(JSON.parse(data) as AgentEvent);
  }
  return { events, rest };
}
