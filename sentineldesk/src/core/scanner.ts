import type { RiskLevel, ScanResult } from "./types.ts";

// Deterministic phishing / social-engineering / prompt-injection scanner.
// It never calls a model, so a ticket cannot talk its way past it. The agent exposes it to
// Claude as a tool, and the guardrail (policy.ts) runs it again independently.

type Rule = readonly [RegExp, string];

const URL_RE = /\bhttps?:\/\/[^\s<>"')\]]+/gi;
const RAW_IP_RE = /^https?:\/\/(\d{1,3}\.){3}\d{1,3}/i;
const SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "cutt.ly"];
const RISKY_FILE_RE = /\.(exe|scr|bat|cmd|vbs|js|jar|iso|hta|ps1|zip|rar|7z)\b/i;
const BRANDS = ["microsoft", "office365", "outlook", "onedrive", "sharepoint", "google", "paypal", "docusign", "dropbox", "adobe"];

const CREDENTIAL: Rule[] = [
  [
    /\b(send|share|confirm|verify|provide|reply with)\b[^.\n]{0,40}\b(password|passcode|credentials|login|mfa code|otp|one[- ]time (code|password)|verification code)\b/i,
    "Asks the recipient to send or confirm a password / MFA code",
  ],
  [/\b(password|credentials)\b[^.\n]{0,30}\b(expire|expired|expiring|reset required|will be (locked|suspended|deactivated))\b/i, "Password-expiry lure"],
  [/\b(account|mailbox|access)\b[^.\n]{0,30}\b(suspended|locked|deactivated|terminated|closed)\b/i, "Account-suspension threat"],
];

const PRESSURE: Rule[] = [
  [/\b(urgent|immediately|right away|asap|within (the next )?\d+ (hours?|minutes?))\b/i, "Pressure / urgency language"],
  [/\b(do not (tell|inform|contact|mention)|keep this (private|confidential|between us))\b/i, "Requests secrecy"],
  [/\b(final|last) (notice|warning|reminder)\b/i, "Final-notice framing"],
];

const PAYMENT: Rule[] = [
  [/\b(gift ?cards?|itunes cards?|apple cards?|steam cards?|google play cards?)\b/i, "Gift card request (classic CEO-fraud pattern)"],
  [/\b(wire transfer|bank (details|account)|routing number|update (my|the) (direct deposit|payroll|banking))\b/i, "Payment / banking-detail change request"],
  [/\b(bitcoin|crypto|usdt|wallet address)\b/i, "Cryptocurrency payment request"],
];

const IMPERSONATION: Rule[] = [
  [/\b(this is|i am|i'm) (the )?(ceo|cfo|president|director|vp|head of)\b/i, "Claims executive identity in body text"],
  [/\b(on behalf of|from the desk of) (the )?(it|helpdesk|help desk|security) (team|department)\b/i, "Claims to be from IT / security"],
  [/\b(remote access|anydesk|teamviewer|quick assist)\b[^.\n]{0,40}\b(install|download|let me|allow)\b/i, "Requests remote access tool install"],
];

// Text that addresses an AI system instead of a human technician. A genuine help request has
// no reason to do this, so any match is treated as an attack on the triage agent itself.
const INJECTION: Rule[] = [
  [/\b(ignore|disregard|forget|override)\b[^.\n]{0,30}\b(previous|prior|above|earlier|all|your|system)\b[^.\n]{0,20}\b(instructions?|prompts?|rules?|guidelines?)\b/i, "Tries to override the AI's instructions"],
  [/\b(system|developer|admin)\s*(note|prompt|message|override|instruction)s?\b\s*(to|for)?\s*[^.\n]{0,20}\b(ai|assistant|agent|model|bot|llm|triage)\b/i, "Fake system message addressed to the AI"],
  [/<\/?\s*(system|instructions?|assistant|tool_result|ticket)\s*>|\[\/?(system|inst)\]/i, "Contains markup that imitates AI prompt structure"],
  [/\b(you are now|act as|pretend (to be|you are)|from now on you)\b[^.\n]{0,40}\b(ai|assistant|agent|model|bot|admin|developer|mode)\b/i, "Tries to change the AI's role"],
  [/\b(mark|classify|label|flag|set|treat)\b[^.\n]{0,25}\b(this|ticket|email|message|it)\b[^.\n]{0,25}\b(as )?(safe|legitimate|benign|not (a )?(phishing|scam|spam)|p4|low priority)\b/i, "Tells the triage system what verdict to give"],
  [/\b(ai|llm|language model|triage (agent|bot|system)|assistant)\b[^.\n]{0,30}\b(must|should|will|needs to|is instructed to)\b/i, "Gives orders to an AI reader"],
  [/\b(reveal|print|show|repeat|output)\b[^.\n]{0,30}\b(system prompt|your instructions|hidden instructions|api key|secret)\b/i, "Tries to extract the AI's instructions or secrets"],
];

function urlFindings(url: string): string[] {
  const out: string[] = [];
  let host = "";
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return ["Malformed URL"];
  }
  if (RAW_IP_RE.test(url)) out.push(`URL points to a raw IP address (${host})`);
  if (SHORTENERS.some((s) => host === s || host.endsWith("." + s))) out.push(`Link shortener hides destination (${host})`);
  if (RISKY_FILE_RE.test(url)) out.push(`Link to executable / archive file (${url.slice(0, 60)})`);
  const labels = host.split(".");
  if (labels.length >= 4) out.push(`Deeply nested subdomain (${host})`);
  const registrable = labels.slice(-2).join(".");
  for (const brand of BRANDS) {
    if (host.includes(brand) && !registrable.startsWith(brand)) {
      out.push(`Brand name "${brand}" appears in a non-official domain (${host})`);
      break;
    }
  }
  if (/[0-9]-?(login|secure|verify|account)/i.test(host) || /(login|secure|verify|account)-?[a-z0-9]+\.(xyz|top|click|info|ru|tk|cc)$/i.test(host)) {
    out.push(`Suspicious credential-themed domain (${host})`);
  }
  return out;
}

export const INJECTION_SCORE = 45;

export function scanForSecurityIndicators(text: string): ScanResult {
  const reasons: string[] = [];
  let score = 0;
  // Trailing sentence punctuation is not part of the link ("...see http://x.example/a.").
  const urls = Array.from(new Set((text.match(URL_RE) ?? []).map((u) => u.replace(/[.,;:!?]+$/, ""))));
  for (const url of urls) {
    const found = urlFindings(url);
    reasons.push(...found);
    score += found.length * 18;
  }

  const groups: Array<readonly [Rule[], number]> = [
    [CREDENTIAL, 30],
    [PAYMENT, 36],
    [IMPERSONATION, 22],
    [PRESSURE, 12],
  ];
  for (const [rules, weight] of groups) {
    for (const [re, reason] of rules) {
      if (re.test(text)) {
        reasons.push(reason);
        score += weight;
      }
    }
  }

  let injection = false;
  for (const [re, reason] of INJECTION) {
    if (re.test(text)) {
      reasons.push(`Prompt injection: ${reason}`);
      if (!injection) score += INJECTION_SCORE;
      injection = true;
    }
  }

  // Urgency on its own is normal for real tickets ("client call at 2pm"), so cap it.
  const pressureReasons = new Set(PRESSURE.map(([, r]) => r));
  if (reasons.length > 0 && reasons.every((r) => pressureReasons.has(r))) score = Math.min(score, 15);
  score = Math.min(100, score);

  const level: RiskLevel = score >= 60 ? "high" : score >= 35 ? "medium" : score > 0 ? "low" : "clean";
  return { score, level, reasons: Array.from(new Set(reasons)), urls, injection };
}
