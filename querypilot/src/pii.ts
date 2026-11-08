/**
 * PII shield: customer names and emails never reach the model.
 *
 *  - Outbound (to Claude): every string cell in a query result that equals a
 *    known PII value is replaced by a stable placeholder (CUSTOMER_NAME_12),
 *    and email addresses embedded in longer strings are masked too. Masking is
 *    value-based, so it holds no matter how the model aliases or joins columns.
 *  - The user's question is tokenized the same way before it is sent.
 *  - Inbound (from Claude): placeholders in SQL are swapped back to real values
 *    just before execution, and in the answer text just before display.
 *
 * The user sees real data in charts and tables; the model only sees tokens.
 */
import type { SqlValue } from "sql.js";

export interface PiiValues {
  name: string[];
  email: string[];
}

const TOKEN_RE = /\bCUSTOMER_(NAME|EMAIL)_(\d+)\b/g;
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export class PiiShield {
  private toToken = new Map<string, string>(); // lowercased value -> token
  private toValue = new Map<string, string>(); // token -> original value
  private namePattern?: RegExp;

  constructor(values: PiiValues) {
    for (const kind of ["name", "email"] as const) {
      const uniq = [...new Set(values[kind])];
      uniq.forEach((v, i) => {
        const token = `CUSTOMER_${kind.toUpperCase()}_${i + 1}`;
        this.toToken.set(v.toLowerCase(), token);
        this.toValue.set(token, v);
      });
    }
    const names = [...new Set(values.name)].sort((a, b) => b.length - a.length).map(escapeRe);
    if (names.length) this.namePattern = new RegExp(`\\b(${names.join("|")})\\b`, "gi");
  }

  get size() {
    return this.toValue.size;
  }

  private maskString(s: string): { text: string; hits: number } {
    const exact = this.toToken.get(s.trim().toLowerCase());
    if (exact) return { text: exact, hits: 1 };
    let hits = 0;
    let text = s.replace(EMAIL_RE, (m) => { hits++; return this.toToken.get(m.toLowerCase()) ?? "[EMAIL]"; });
    if (this.namePattern) text = text.replace(this.namePattern, (m) => { hits++; return this.toToken.get(m.toLowerCase())!; });
    return { text, hits };
  }

  /** Mask result rows destined for the model. Returns new rows + how many cells were masked. */
  maskRows(rows: SqlValue[][]): { rows: SqlValue[][]; masked: number } {
    let masked = 0;
    const out = rows.map((r) => r.map((v) => {
      if (typeof v !== "string") return v;
      const m = this.maskString(v);
      if (m.hits) masked++;
      return m.text;
    }));
    return { rows: out, masked };
  }

  /** Tokenize free text (the user's question) before it is sent to the model. */
  maskText(text: string): string {
    return this.maskString(text).text;
  }

  /** Swap placeholders in model-written SQL back to real values (inside string literals they stay quoted). */
  restoreSql(sql: string): string {
    return sql.replace(TOKEN_RE, (t) => (this.toValue.get(t) ?? t).replace(/'/g, "''"));
  }

  /** Swap placeholders in model-written prose back to real values for display. */
  restoreText(text: string): string {
    return text.replace(TOKEN_RE, (t) => this.toValue.get(t) ?? t);
  }
}
