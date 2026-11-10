import type { KbArticle, Team } from "./types.ts";

export const KNOWLEDGE_BASE: KbArticle[] = [
  {
    id: "KB-101",
    title: "Resetting a forgotten network password",
    tags: ["password", "reset", "login", "locked", "account", "access"],
    content:
      "Users can reset their password at the self-service portal after verifying MFA. If the account is locked after 5 failed attempts, it unlocks automatically after 15 minutes, or the Service Desk can unlock it after verifying identity with a callback to the number on file. IT will NEVER ask for your password by email or chat.",
  },
  {
    id: "KB-102",
    title: "Setting up or replacing an MFA device",
    tags: ["mfa", "authenticator", "2fa", "new phone", "verification", "code"],
    content:
      "If you got a new phone, sign in from a trusted computer and add the new device under Security Info. If you have no trusted device, open a ticket and the Service Desk will verify your identity by video call before issuing a temporary access pass. Never share MFA codes with anyone, including IT.",
  },
  {
    id: "KB-201",
    title: "Reporting a suspicious email",
    tags: ["phishing", "suspicious", "email", "scam", "link", "attachment", "spam"],
    content:
      "Do not click links or open attachments. Use the Report Phishing button in Outlook, or forward the message as an attachment to security@company.example. If you already clicked a link or entered credentials, reset your password immediately and contact the Security Operations Center (SOC) by phone.",
  },
  {
    id: "KB-202",
    title: "What to do if you think your account is compromised",
    tags: ["compromised", "hacked", "breach", "unauthorized", "sign-in", "suspicious activity"],
    content:
      "Reset your password, sign out of all sessions from the account portal, and contact the SOC immediately. Do not delete suspicious emails; the SOC may need them for investigation.",
  },
  {
    id: "KB-301",
    title: "Connecting to the corporate VPN",
    tags: ["vpn", "remote", "connect", "network", "home", "globalprotect", "gateway"],
    content:
      "Install GlobalProtect from the Software Center, connect to vpn.company.example, and sign in with your network credentials plus MFA. If it fails with 'gateway unreachable', check your home internet, then restart the GlobalProtect service.",
  },
  {
    id: "KB-302",
    title: "Wi-Fi drops or slow network in the office",
    tags: ["wifi", "wi-fi", "slow", "network", "internet", "disconnect"],
    content:
      "Forget and rejoin the CORP-SECURE network. If multiple people in the same area are affected, it is likely an access point issue and should be raised to Network Operations as a P2.",
  },
  {
    id: "KB-401",
    title: "Laptop won't turn on or is running slowly",
    tags: ["laptop", "hardware", "slow", "won't turn on", "battery", "screen", "computer"],
    content:
      "Hold the power button for 15 seconds, connect the charger, and try again. For slowness, restart and check that updates have finished. Physical damage or a device that will not power on requires a hardware swap from Desktop Support.",
  },
  {
    id: "KB-402",
    title: "Printer not working",
    tags: ["printer", "print", "printing", "queue", "toner", "jam"],
    content:
      "Check the printer display for jams or toner warnings. Remove and re-add the printer from Settings > Printers. If a whole floor cannot print, escalate to Desktop Support as a P2.",
  },
  {
    id: "KB-501",
    title: "Requesting new software",
    tags: ["software", "install", "installed", "license", "request", "application", "admin rights"],
    content:
      "Approved software is available in the Software Center. Anything else requires a Software Request in the service catalog with manager approval. Users do not receive local admin rights.",
  },
  {
    id: "KB-502",
    title: "Outlook or Teams not syncing",
    tags: ["outlook", "teams", "email", "calendar", "sync", "not loading"],
    content:
      "Sign out and back in, then clear the cache. For Outlook, run the repair tool from Control Panel. Mailbox-wide outages should be escalated to Collaboration Services.",
  },
  {
    id: "KB-601",
    title: "New hire onboarding and access requests",
    tags: ["new hire", "onboarding", "access", "permissions", "shared drive", "group"],
    content:
      "Access to shared drives and groups requires a catalog request approved by the data owner. New hire accounts are created from HR's onboarding record, not from email requests.",
  },
  {
    id: "KB-701",
    title: "Payroll and banking detail changes",
    tags: ["payroll", "direct deposit", "bank", "banking", "pay"],
    content:
      "Banking changes can ONLY be made by the employee in the HR portal after MFA. IT and HR will never change banking details from an email request. Treat any such request as suspicious and report it to the SOC.",
  },
];

export const SOC_TEAM = "Security Operations Center (SOC)";

export const ESCALATION_TEAMS: Team[] = [
  { name: SOC_TEAM, handles: "Phishing, credential theft, compromised accounts, malware, fraud or payment-change requests, any suspected security incident" },
  { name: "Identity & Access Management", handles: "Account lockouts that self-service cannot fix, MFA re-registration, permission and group access changes" },
  { name: "Network Operations", handles: "VPN outages, office Wi-Fi or wired network problems affecting multiple users, firewall requests" },
  { name: "Desktop Support", handles: "Hardware failures, laptop swaps, printers, peripherals, OS rebuilds" },
  { name: "Collaboration Services", handles: "Email, Teams, SharePoint and calendar outages or mailbox issues" },
  { name: "Application Support", handles: "Business application errors, software installs and licensing" },
];

export const listEscalationTeams = (): Team[] => ESCALATION_TEAMS;

export const kbById = (id: string): KbArticle | undefined => KNOWLEDGE_BASE.find((a) => a.id === id);

/** Keyword search: tag hits score 3, body hits score 1. Returns the top `limit` articles. */
export function searchKnowledgeBase(query: string, limit = 3): KbArticle[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9-]+/)
    .filter((t) => t.length > 2);
  return KNOWLEDGE_BASE.map((article) => {
    const haystack = `${article.title} ${article.content}`.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (article.tags.some((tag) => tag.includes(term) || term.includes(tag))) score += 3;
      if (haystack.includes(term)) score += 1;
    }
    return { article, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.article);
}
