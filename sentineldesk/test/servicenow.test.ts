import { describe, expect, it } from "vitest";
import { formatWorkNote, incidentToTicket, ServiceNowClient, ServiceNowError } from "../src/server/servicenow.ts";
import { triageWithRules } from "../src/core/rules.ts";
import { sample } from "./helpers.ts";

const SYS = "0123456789abcdef0123456789abcdef";

function mockFetch(responder: (url: string, init: RequestInit) => { status?: number; body?: unknown }) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const fn = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    const { status = 200, body = {} } = responder(url, init);
    return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
  }) as unknown as typeof fetch;
  return { fn, calls };
}

const client = (fetchImpl: typeof fetch) => new ServiceNowClient({ instanceUrl: "https://dev1.service-now.com/", username: "admin", password: "pw", fetchImpl });

describe("ServiceNow client", () => {
  it("lists new incidents through the Table API with basic auth", async () => {
    const { fn, calls } = mockFetch(() => ({ body: { result: [{ sys_id: SYS, number: "INC0010001", short_description: "VPN down", description: "gateway unreachable", "caller_id.email": "dev.patel@company.example", state: "1" }] } }));
    const rows = await client(fn).listNewIncidents(5);
    const url = new URL(calls[0]!.url);
    expect(url.pathname).toBe("/api/now/table/incident");
    expect(url.searchParams.get("sysparm_query")).toBe("active=true^state=1^ORDERBYDESCsys_created_on");
    expect(url.searchParams.get("sysparm_limit")).toBe("5");
    expect((calls[0]!.init.headers as Record<string, string>).Authorization).toBe("Basic " + Buffer.from("admin:pw").toString("base64"));
    expect(rows[0]).toMatchObject({ number: "INC0010001", caller_email: "dev.patel@company.example" });
  });

  it("writes the triage back as a work note with PATCH", async () => {
    const { fn, calls } = mockFetch(() => ({ body: { result: {} } }));
    await client(fn).addWorkNote(SYS, "hello");
    expect(calls[0]!.url).toBe(`https://dev1.service-now.com/api/now/table/incident/${SYS}`);
    expect(calls[0]!.init.method).toBe("PATCH");
    expect(JSON.parse(String(calls[0]!.init.body))).toEqual({ work_notes: "hello" });
  });

  it("validates sys_id before building a URL", async () => {
    const { fn, calls } = mockFetch(() => ({}));
    await expect(client(fn).addWorkNote("../../sys_user", "x")).rejects.toThrow(ServiceNowError);
    expect(calls).toHaveLength(0);
  });

  it("maps HTTP failures to clear errors without echoing the body", async () => {
    const { fn } = mockFetch(() => ({ status: 401, body: { error: { message: "secret detail" } } }));
    await expect(client(fn).listNewIncidents()).rejects.toThrow(/HTTP 401 \(check SN_USERNAME/);
  });

  it("refuses plain-http instances", () => {
    expect(() => new ServiceNowClient({ instanceUrl: "http://dev1.service-now.com", username: "a", password: "b" })).toThrow(/https/);
  });
});

describe("mapping", () => {
  it("turns an incident into a ticket and a triage into a work note", () => {
    const t = incidentToTicket({ sys_id: SYS, number: "INC1", short_description: "Mailbox", description: "", caller_email: "", priority: "3", state: "1", sys_created_on: "" });
    expect(t).toMatchObject({ id: "INC1", subject: "Mailbox", body: "Mailbox", requester: "unknown@unknown.invalid" });
    const note = formatWorkNote(triageWithRules(sample(1)));
    expect(note).toMatch(/^\[SentinelDesk AI triage\] SECURITY INCIDENT via offline rules/);
    expect(note).toContain("Priority: P1");
    expect(note).toContain("Tools used: scan_security_indicators -> check_sender_domain");
  });
});
