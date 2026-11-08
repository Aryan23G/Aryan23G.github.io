/**
 * Layer 1 of the read-only guarantee: a static SQL guard.
 *
 * Works on a real tokenizer (not regexes over raw text), so keywords hidden in
 * string literals or comments are handled correctly and comment tricks like
 * `SEL/**\/ECT` or `--\nDROP` can't smuggle anything through.
 *
 * Rules:
 *   1. Exactly one statement (one optional trailing semicolon).
 *   2. Statement must start with SELECT or WITH.
 *   3. No write / DDL / transaction / pragma keywords anywhere.
 *   4. No dangerous functions (load_extension, readfile, ...).
 *   5. Every table referenced after FROM/JOIN must be an allowlisted table
 *      or a CTE defined in the same query; sqlite_* internals are blocked.
 *
 * This layer is deliberately strict and explainable. The authoritative check
 * is layer 2 (bytecode verification in engine.ts), which inspects what SQLite
 * would actually execute.
 */

export type TokenType = "word" | "quoted_ident" | "string" | "number" | "punct" | "param";

export interface Token {
  type: TokenType;
  value: string; // for words: original text; for quoted_ident: unquoted name
  upper: string;
  pos: number;
  /** Offset just past the token in the source (includes quotes). */
  end: number;
}

export class SqlLexError extends Error {}

export function tokenize(sql: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const n = sql.length;
  const push = (type: TokenType, value: string, pos: number) => out.push({ type, value, upper: value.toUpperCase(), pos, end: -1 });
  const seal = () => { const last = out[out.length - 1]; if (last && last.end < 0) last.end = i; };

  while (i < n) {
    seal();
    const ch = sql[i]!;
    const next = sql[i + 1];
    if (/\s/.test(ch)) { i++; continue; }
    if (ch === "-" && next === "-") { // line comment
      while (i < n && sql[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && next === "*") { // block comment
      const end = sql.indexOf("*/", i + 2);
      if (end === -1) throw new SqlLexError("Unterminated block comment");
      i = end + 2;
      continue;
    }
    if (ch === "'") { // string literal, '' escapes
      const start = i++;
      let val = "";
      for (;;) {
        if (i >= n) throw new SqlLexError("Unterminated string literal");
        if (sql[i] === "'") {
          if (sql[i + 1] === "'") { val += "'"; i += 2; continue; }
          i++;
          break;
        }
        val += sql[i++];
      }
      push("string", val, start);
      continue;
    }
    if (ch === '"' || ch === "`" || ch === "[") { // quoted identifier
      const close = ch === "[" ? "]" : ch;
      const start = i++;
      let val = "";
      for (;;) {
        if (i >= n) throw new SqlLexError("Unterminated quoted identifier");
        if (sql[i] === close) {
          if (close !== "]" && sql[i + 1] === close) { val += close; i += 2; continue; }
          i++;
          break;
        }
        val += sql[i++];
      }
      push("quoted_ident", val, start);
      continue;
    }
    if (/[0-9]/.test(ch) || (ch === "." && next !== undefined && /[0-9]/.test(next))) {
      const start = i;
      while (i < n && /[0-9a-fA-FxX._eE]/.test(sql[i]!)) {
        // allow exponent sign
        if ((sql[i] === "e" || sql[i] === "E") && (sql[i + 1] === "+" || sql[i + 1] === "-")) i++;
        i++;
      }
      push("number", sql.slice(start, i), start);
      continue;
    }
    if (/[A-Za-z_\u0080-￿]/.test(ch)) {
      const start = i;
      while (i < n && /[A-Za-z0-9_$\u0080-￿]/.test(sql[i]!)) i++;
      push("word", sql.slice(start, i), start);
      continue;
    }
    if (ch === "?" || ch === ":" || ch === "@" || ch === "$") {
      const start = i++;
      while (i < n && /[A-Za-z0-9_]/.test(sql[i]!)) i++;
      push("param", sql.slice(start, i), start);
      continue;
    }
    // multi-char operators
    const two = sql.slice(i, i + 2);
    if (["<=", ">=", "<>", "!=", "==", "||", "<<", ">>", "->"].includes(two)) {
      if (two === "->" && sql[i + 2] === ">") { push("punct", "->>", i); i += 3; continue; }
      push("punct", two, i); i += 2; continue;
    }
    push("punct", ch, i);
    i++;
  }
  seal();
  return out;
}

const FORBIDDEN_KEYWORDS = new Set([
  "INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "CREATE", "ATTACH", "DETACH",
  "PRAGMA", "VACUUM", "REINDEX", "ANALYZE", "BEGIN", "COMMIT", "ROLLBACK", "END",
  "SAVEPOINT", "RELEASE", "TRANSACTION", "TRUNCATE", "GRANT", "REVOKE", "MERGE",
  "UPSERT", "CONFLICT", "TRIGGER", "INTO",
]);

/** `REPLACE` is a forbidden statement but also a harmless string function `replace(x, y, z)`. */
const KEYWORD_OK_AS_FUNCTION = new Set(["REPLACE"]);

export const FORBIDDEN_FUNCTIONS = new Set([
  "LOAD_EXTENSION", "READFILE", "WRITEFILE", "EDIT", "FTS3_TOKENIZER", "ZEROBLOB",
  "RANDOMBLOB", "SQLITE_COMPILEOPTION_GET", "SQLITE_COMPILEOPTION_USED", "SQLITE_OFFSET",
]);

/** Keywords that end a FROM clause at the same nesting depth. */
const FROM_TERMINATORS = new Set([
  "WHERE", "GROUP", "ORDER", "LIMIT", "HAVING", "UNION", "INTERSECT", "EXCEPT", "WINDOW", "ON", "USING", "RETURNING", "SELECT", "VALUES",
]);

const JOIN_WORDS = new Set(["JOIN", "LEFT", "RIGHT", "FULL", "INNER", "OUTER", "CROSS", "NATURAL"]);

export interface GuardResult {
  ok: boolean;
  /** Human-readable reason when rejected. */
  reason?: string;
  /** Normalised SQL (trailing semicolon stripped) when accepted. */
  sql?: string;
  tables: string[];
  checks: { name: string; passed: boolean; detail?: string }[];
}

export function guardSql(sql: string, allowedTables: readonly string[]): GuardResult {
  const checks: GuardResult["checks"] = [];
  const allowed = new Set(allowedTables.map((t) => t.toLowerCase()));
  const fail = (name: string, reason: string): GuardResult => {
    checks.push({ name, passed: false, detail: reason });
    return { ok: false, reason, tables: [], checks };
  };

  if (sql.length > 8000) return fail("size", "Query is too long (max 8000 characters).");

  let tokens: Token[];
  try {
    tokens = tokenize(sql);
  } catch (e) {
    return fail("parse", (e as Error).message);
  }
  checks.push({ name: "parse", passed: true });

  // 1. single statement
  while (tokens.length && tokens[tokens.length - 1]!.value === ";") tokens.pop();
  if (tokens.length === 0) return fail("single statement", "Empty query.");
  if (tokens.some((t) => t.type === "punct" && t.value === ";")) {
    return fail("single statement", "Only one SQL statement is allowed per query.");
  }
  checks.push({ name: "single statement", passed: true });

  // 2. leading keyword
  const first = tokens[0]!;
  if (first.type !== "word" || (first.upper !== "SELECT" && first.upper !== "WITH")) {
    return fail("read-only statement", `Only SELECT (or WITH ... SELECT) queries are allowed; got "${first.value}".`);
  }

  // 3. forbidden keywords & 4. forbidden functions
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (t.type !== "word") continue;
    const nextIsParen = tokens[i + 1]?.value === "(";
    if (FORBIDDEN_KEYWORDS.has(t.upper) && !(KEYWORD_OK_AS_FUNCTION.has(t.upper) && nextIsParen)) {
      // `END` legitimately closes CASE expressions.
      if (t.upper === "END" && tokens.slice(0, i).some((x) => x.upper === "CASE")) continue;
      return fail("read-only statement", `Keyword "${t.upper}" is not allowed in a read-only query.`);
    }
    if (t.upper === "REPLACE" && !nextIsParen) {
      return fail("read-only statement", `Keyword "REPLACE" is not allowed in a read-only query.`);
    }
    if (nextIsParen && FORBIDDEN_FUNCTIONS.has(t.upper)) {
      return fail("safe functions", `Function ${t.value}() is not allowed.`);
    }
  }
  checks.push({ name: "read-only statement", passed: true });
  checks.push({ name: "safe functions", passed: true });

  // 5. table allowlist
  // Schema-qualified names like main.orders / temp.x are rejected outright.
  for (let i = 0; i + 2 < tokens.length; i++) {
    const a = tokens[i]!, dot = tokens[i + 1]!;
    if (dot.value === "." && (a.upper === "MAIN" || a.upper === "TEMP" || a.upper === "TEMPORARY")) {
      return fail("table allowlist", `Schema-qualified names (${a.value}.*) are not allowed.`);
    }
  }
  const ctes = collectCteNames(tokens);
  const referenced = collectTableRefs(tokens);
  for (const ref of referenced) {
    const lower = ref.toLowerCase();
    if (lower.startsWith("sqlite_") || lower.startsWith("pragma_")) {
      return fail("table allowlist", `Access to internal table "${ref}" is not allowed.`);
    }
    if (!allowed.has(lower) && !ctes.has(lower)) {
      return fail("table allowlist", `Unknown or disallowed table "${ref}". Allowed tables: ${allowedTables.join(", ")}.`);
    }
  }
  checks.push({ name: "table allowlist", passed: true, detail: [...new Set(referenced.map((r) => r.toLowerCase()))].join(", ") });

  const normalised = sql.trim().replace(/;\s*$/, "");
  return { ok: true, sql: normalised, tables: [...new Set(referenced.map((r) => r.toLowerCase()))], checks };
}

const isIdent = (t: Token | undefined): t is Token => !!t && (t.type === "word" || t.type === "quoted_ident");

function collectCteNames(tokens: Token[]): Set<string> {
  const names = new Set<string>();
  // pattern: <ident> [ ( cols ) ] AS [NOT] [MATERIALIZED] (
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (!isIdent(t)) continue;
    const prev = tokens[i - 1];
    if (!prev || !(prev.upper === "WITH" || prev.upper === "RECURSIVE" || prev.value === ",")) continue;
    let j = i + 1;
    if (tokens[j]?.value === "(") {
      let depth = 0;
      for (; j < tokens.length; j++) {
        if (tokens[j]!.value === "(") depth++;
        else if (tokens[j]!.value === ")" && --depth === 0) { j++; break; }
      }
    }
    if (tokens[j]?.upper === "AS") names.add(t.value.toLowerCase());
  }
  return names;
}

/** Collect identifiers in table position: after FROM / JOIN, and comma-joined inside a FROM clause. */
function collectTableRefs(tokens: Token[]): string[] {
  const refs: string[] = [];
  // fromDepth stack: depth at which a FROM clause is currently open
  const fromStack: number[] = [];
  let depth = 0;
  let expectTable = false;

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (t.value === "(") {
      depth++;
      expectTable = false;
      continue;
    }
    if (t.value === ")") {
      if (fromStack.length && fromStack[fromStack.length - 1]! >= depth) fromStack.pop();
      depth--;
      continue;
    }
    const inFrom = fromStack.length > 0 && fromStack[fromStack.length - 1] === depth;

    if (t.type === "word" && t.upper === "FROM") {
      // `FROM` inside e.g. EXTRACT/SUBSTRING(x FROM y) isn't SQLite syntax, so treat all as clauses.
      fromStack.push(depth);
      expectTable = true;
      continue;
    }
    if (t.type === "word" && t.upper === "JOIN") {
      if (!inFrom) fromStack.push(depth);
      expectTable = true;
      continue;
    }
    if (inFrom && t.type === "word" && FROM_TERMINATORS.has(t.upper) && t.upper !== "ON" && t.upper !== "USING") {
      fromStack.pop();
      expectTable = false;
      continue;
    }
    if (inFrom && t.value === ",") {
      expectTable = true;
      continue;
    }
    if (expectTable) {
      if (isIdent(t) && !JOIN_WORDS.has(t.upper)) {
        // Plain tables and table-valued functions (json_each(...), pragma_*(...)) both
        // land here, so table-valued functions must also pass the allowlist.
        refs.push(t.value);
      }
      expectTable = false;
    }
  }
  return refs;
}
