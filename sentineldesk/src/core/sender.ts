import type { SenderCheck } from "./types.ts";

/** The pretend company's real email domain. */
export const INTERNAL_DOMAIN = "company.example";

const FREE_MAIL = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "proton.me", "protonmail.com", "icloud.com", "aol.com"];

export function checkSenderDomain(email: string): SenderCheck {
  const domain = (email.split("@")[1] ?? "").toLowerCase().trim();
  const internal = domain === INTERNAL_DOMAIN;
  const freeMail = FREE_MAIL.includes(domain);
  const brand = INTERNAL_DOMAIN.split(".")[0]!;
  // Undo common look-alike substitutions (0 -> o, 1 -> l, hyphens) before comparing.
  const normalized = domain.replace(/0/g, "o").replace(/1/g, "l").replace(/[-_]/g, "");
  const lookalike = !internal && (normalized.includes(brand) || domain.includes(brand));

  const notes: string[] = [];
  if (internal) notes.push("Sender is on the internal company domain.");
  if (freeMail) notes.push("Sender uses a free personal email provider; cannot verify identity.");
  if (lookalike) notes.push(`Domain "${domain}" imitates the company domain "${INTERNAL_DOMAIN}". Strong impersonation indicator.`);
  if (!internal && !freeMail && !lookalike) notes.push("External sender domain.");
  return { domain, internal, freeMail, lookalike, notes };
}
