// Signed webhooks. The sender computes HMAC-SHA256(secret, `${timestamp}.${rawBody}`) and sends:
//   X-SentinelDesk-Timestamp: <unix seconds>
//   X-SentinelDesk-Signature: sha256=<hex or base64>
// Hex is the common convention; base64 is what ServiceNow's GlideCertificateEncryption.generateMac
// returns, so both are accepted. Signing the timestamp lets old deliveries be rejected (replay).

import { createHmac, timingSafeEqual } from "node:crypto";

export const SIGNATURE_HEADER = "x-sentineldesk-signature";
export const TIMESTAMP_HEADER = "x-sentineldesk-timestamp";
export const DEFAULT_TOLERANCE_SEC = 300;

export function computeSignature(secret: string, timestamp: string, rawBody: Buffer | string): Buffer {
  return createHmac("sha256", secret).update(`${timestamp}.`).update(rawBody).digest();
}

/** Header value a sender should use; exported for tests, the CLI and docs. */
export function signatureHeader(secret: string, timestamp: string, rawBody: Buffer | string): string {
  return `sha256=${computeSignature(secret, timestamp, rawBody).toString("hex")}`;
}

function decodeSignature(value: string): Buffer | null {
  const v = value.trim().replace(/^sha256=/i, "");
  if (/^[0-9a-f]{64}$/i.test(v)) return Buffer.from(v, "hex");
  if (/^[A-Za-z0-9+/]{43}=$/.test(v)) return Buffer.from(v, "base64");
  return null;
}

export type VerifyResult = { ok: true } | { ok: false; reason: string };

export function verifyWebhook(input: {
  secret: string;
  signature: string | undefined;
  timestamp: string | undefined;
  rawBody: Buffer | undefined;
  nowMs?: number;
  toleranceSec?: number;
}): VerifyResult {
  const { secret, signature, timestamp, rawBody, nowMs = Date.now(), toleranceSec = DEFAULT_TOLERANCE_SEC } = input;
  if (!signature || !timestamp) return { ok: false, reason: "Missing signature or timestamp header." };
  if (!rawBody) return { ok: false, reason: "Missing request body." };
  if (!/^\d{9,11}$/.test(timestamp)) return { ok: false, reason: "Timestamp must be unix seconds." };
  if (Math.abs(nowMs / 1000 - Number(timestamp)) > toleranceSec) return { ok: false, reason: "Timestamp outside the allowed window." };
  const given = decodeSignature(signature);
  if (!given) return { ok: false, reason: "Malformed signature." };
  const expected = computeSignature(secret, timestamp, rawBody);
  // Lengths are equal here (both 32 bytes), so timingSafeEqual cannot throw.
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return { ok: false, reason: "Signature mismatch." };
  return { ok: true };
}
