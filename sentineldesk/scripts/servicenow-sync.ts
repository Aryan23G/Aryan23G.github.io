// Pull new incidents from ServiceNow, triage each one, and write the result back as a work note.
//
//   SN_INSTANCE_URL=https://dev12345.service-now.com SN_USERNAME=admin SN_PASSWORD=... \
//   ANTHROPIC_API_KEY=... npm run sn:sync -- --limit 5 [--dry-run]
//
// Without ANTHROPIC_API_KEY the rules engine is used. Processed sys_ids are remembered in
// .servicenow-ledger.json so an incident is never annotated twice.

import Anthropic from "@anthropic-ai/sdk";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { runAgent } from "../src/server/agent.ts";
import { loadConfig } from "../src/server/config.ts";
import { formatWorkNote, incidentToTicket, ServiceNowClient } from "../src/server/servicenow.ts";
import { triageWithRules } from "../src/core/rules.ts";

const LEDGER = ".servicenow-ledger.json";
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const limitArg = args.indexOf("--limit");
const limit = limitArg >= 0 ? Number(args[limitArg + 1]) : 10;

const config = loadConfig();
if (!config.serviceNow) throw new Error("Set SN_INSTANCE_URL, SN_USERNAME and SN_PASSWORD.");
const sn = new ServiceNowClient(config.serviceNow);
const client = config.anthropicApiKey ? new Anthropic({ apiKey: config.anthropicApiKey }) : null;
const done = new Set<string>(existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, "utf8")) : []);

const incidents = (await sn.listNewIncidents(limit)).filter((i) => !done.has(i.sys_id));
console.log(`${incidents.length} new incident(s) on ${sn.instance}${dryRun ? " (dry run)" : ""}; engine: ${client ? config.model : "rules"}`);

for (const inc of incidents) {
  const ticket = incidentToTicket(inc);
  const result = client ? await runAgent(ticket, { client, model: config.model, effort: config.effort }) : triageWithRules(ticket);
  const note = formatWorkNote(result);
  console.log(`\n${inc.number}: ${result.securityFlag ? "SECURITY " : ""}${result.priority} -> ${result.escalateTo ?? "Service Desk"} (${result.overrides.length} guardrail overrides)`);
  if (dryRun) {
    console.log(note.replace(/^/gm, "  | "));
    continue;
  }
  await sn.addWorkNote(inc.sys_id, note);
  done.add(inc.sys_id);
  writeFileSync(LEDGER, JSON.stringify([...done], null, 2));
}
