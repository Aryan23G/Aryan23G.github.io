/**
 * QueryPilot browser app. Everything runs client-side:
 *   - SQLite (WASM) in a Web Worker holds the demo warehouse,
 *   - the agent loop calls the Claude API directly with the visitor's own key
 *     (kept in sessionStorage only, sent only to api.anthropic.com),
 *   - Chart.js renders the validated chart.
 */
import Anthropic from "@anthropic-ai/sdk";
import Chart from "chart.js/auto";
import type { SqlValue } from "sql.js";
import { DEFAULT_MODEL, MODELS, runAgent, type AgentEvent, type MessageParam } from "./agent.ts";
import { DbClient } from "./db/client.ts";
import type { ExecOutcome } from "./db/engine.ts";
import { TABLES } from "./db/schema.ts";
import { ATTACKS, DEMOS, type DemoScript } from "./demo.ts";
import { tokenize } from "./guard.ts";
import { PiiShield } from "./pii.ts";
import { formatValue, profile, resolveChart, toCsv, type ChartSpec } from "./viz.ts";

type Child = Node | string | null | undefined | false;
function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string> = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") el.className = v;
    else el.setAttribute(k, v);
  }
  for (const c of children) if (c !== null && c !== undefined && c !== false) el.append(c);
  return el;
}
const $ = <T extends HTMLElement>(sel: string) => document.querySelector(sel) as T;

const store = {
  get(k: string) { try { return sessionStorage.getItem(k) ?? ""; } catch { return ""; } },
  set(k: string, v: string) { try { v ? sessionStorage.setItem(k, v) : sessionStorage.removeItem(k); } catch { /* storage blocked */ } },
};

// ---------------------------------------------------------------- state
const db = new DbClient(new URL("./dist/worker.js", document.baseURI).href);
let history: MessageParam[] = [];
let pending: Anthropic.Beta.Messages.BetaToolResultBlockParam[] = [];
let busy = false;
let shield: PiiShield | undefined;
let controller: AbortController | undefined;
const charts = new Set<Chart>();

const els = {
  form: $<HTMLFormElement>("#ask"),
  input: $<HTMLTextAreaElement>("#question"),
  askBtn: $<HTMLButtonElement>("#ask-btn"),
  examples: $("#examples"),
  feed: $("#feed"),
  key: $<HTMLInputElement>("#api-key"),
  model: $<HTMLSelectElement>("#model"),
  mode: $("#mode"),
  keyStatus: $("#key-status"),
  schema: $("#schema"),
  console: $<HTMLTextAreaElement>("#console-sql"),
  consoleRun: $<HTMLButtonElement>("#console-run"),
  consoleOut: $("#console-out"),
  attacks: $("#attacks"),
  reset: $<HTMLButtonElement>("#reset"),
  dbStatus: $("#db-status"),
};

// ---------------------------------------------------------------- SQL highlighting (reuses the guard's tokenizer)
const KEYWORDS = new Set("SELECT FROM WHERE GROUP BY ORDER LIMIT JOIN LEFT INNER OUTER ON AS AND OR NOT IN IS NULL CASE WHEN THEN ELSE END WITH HAVING DISTINCT UNION ALL BETWEEN LIKE ASC DESC OVER PARTITION USING CROSS EXISTS DROP DELETE UPDATE INSERT TABLE SET INTO".split(" "));
function highlightSql(sql: string): HTMLElement {
  const pre = h("pre", { class: "sql" });
  let tokens;
  try { tokens = tokenize(sql); } catch { pre.textContent = sql; return pre; }
  let pos = 0;
  for (const t of tokens) {
    if (t.pos > pos) pre.append(sql.slice(pos, t.pos));
    const end = t.end;
    const text = sql.slice(t.pos, end);
    const cls = t.type === "string" ? "s" : t.type === "number" ? "n" : t.type === "word" && KEYWORDS.has(t.upper) ? "k" : t.type === "word" && sql[end] === "(" ? "f" : "";
    pre.append(cls ? h("span", { class: cls }, text) : text);
    pos = end;
  }
  if (pos < sql.length) pre.append(sql.slice(pos));
  return pre;
}

// ---------------------------------------------------------------- result rendering
const PALETTE = ["#9BE3F0", "#F5B76B", "#7CF0B0", "#B49CFF", "#FF7A85", "#6FA8FF", "#F0E39B", "#C9CFDF"];

function renderChecks(outcome: ExecOutcome): HTMLElement {
  const wrap = h("div", { class: "checks" });
  for (const c of outcome.checks) {
    wrap.append(h("span", { class: `check ${c.passed ? "pass" : "fail"}`, title: c.detail ?? "" }, `${c.passed ? "✓" : "✕"} ${c.name}`));
  }
  return wrap;
}

function renderTable(columns: string[], rows: SqlValue[][], limit = 200): HTMLElement {
  const kinds = profile(columns, rows);
  const table = h("table", {},
    h("thead", {}, h("tr", {}, ...columns.map((c, i) => h("th", { class: kinds[i] === "numeric" ? "num" : "" }, c)))),
    h("tbody", {}, ...rows.slice(0, limit).map((r) => h("tr", {}, ...r.map((v, i) => h("td", { class: kinds[i] === "numeric" ? "num" : v === null ? "null" : "" }, formatValue(v, columns[i])))))),
  );
  const wrap = h("div", { class: "table-wrap" }, table);
  if (rows.length > limit) wrap.append(h("p", { class: "muted small" }, `Showing ${limit} of ${rows.length} rows. Download CSV for all.`));
  return wrap;
}

function renderChart(spec: ChartSpec, columns: string[], rows: SqlValue[][]): HTMLElement {
  if (spec.type === "table") return renderTable(columns, rows);
  if (spec.type === "kpi") {
    return h("div", { class: "kpis" }, ...spec.y.map((c) => h("div", { class: "kpi" },
      h("b", {}, /revenue|spend|value|price|cost|margin|sales/i.test(c) ? "$" + formatValue(rows[0]![columns.indexOf(c)]!, c) : formatValue(rows[0]![columns.indexOf(c)]!, c)),
      h("span", {}, c.replace(/_/g, " ")))));
  }
  const canvas = h("canvas", { role: "img", "aria-label": spec.title || "Chart of query result" });
  const box = h("div", { class: `chart-box ${spec.type}` }, canvas);
  const xi = columns.indexOf(spec.x);
  const labels = rows.map((r) => String(r[xi]));
  const tick = "#8B93AC", grid = "rgba(155,227,240,.08)";
  const common = {
    responsive: true, maintainAspectRatio: false, animation: { duration: 500 },
    plugins: {
      legend: { display: spec.y.length > 1 || spec.type === "pie", labels: { color: "#C9CFDF", boxWidth: 10, font: { family: "Outfit" } } },
      tooltip: { backgroundColor: "rgba(8,12,28,.95)", borderColor: "rgba(155,227,240,.4)", borderWidth: 1, titleFont: { family: "Space Mono" }, bodyFont: { family: "Outfit" } },
    },
  };
  // Value-axis ticks follow the measure's format (e.g. 0.2 -> "20.0%" for rate columns).
  const measure = spec.y[0] ?? "";
  const valueTicks = { color: tick, font: { family: "Space Mono", size: 10 }, callback: (v: string | number) => formatValue(Number(v), measure) };
  const axes = {
    x: { ticks: { color: tick, maxRotation: 50, autoSkip: true, font: { family: "Space Mono", size: 10 } }, grid: { color: grid } },
    y: { ticks: valueTicks, grid: { color: grid }, beginAtZero: spec.type === "bar" },
  };
  let chart: Chart;
  if (spec.type === "scatter") {
    const yi = columns.indexOf(spec.y[0]!);
    chart = new Chart(canvas, {
      type: "scatter",
      data: { datasets: [{ label: spec.y[0]!, data: rows.map((r) => ({ x: Number(r[xi]), y: Number(r[yi]) })), backgroundColor: PALETTE[0], pointRadius: 4 }] },
      options: { ...common, scales: { ...axes, x: { ...axes.x, title: { display: true, text: spec.x, color: tick } }, y: { ...axes.y, title: { display: true, text: spec.y[0]!, color: tick } } } },
    });
  } else if (spec.type === "pie") {
    const yi = columns.indexOf(spec.y[0]!);
    chart = new Chart(canvas, {
      type: "doughnut",
      data: { labels, datasets: [{ data: rows.map((r) => Number(r[yi])), backgroundColor: PALETTE, borderColor: "#02030A", borderWidth: 2 }] },
      options: { ...common, cutout: "58%" },
    });
  } else {
    const horizontal = spec.type === "bar" && (rows.length > 8 || labels.some((l) => l.length > 14));
    chart = new Chart(canvas, {
      type: spec.type,
      data: {
        labels,
        datasets: spec.y.map((c, k) => {
          const yi = columns.indexOf(c);
          const color = PALETTE[k % PALETTE.length]!;
          return {
            label: c, data: rows.map((r) => Number(r[yi])),
            borderColor: color, backgroundColor: spec.type === "line" ? color + "22" : color + "cc",
            fill: spec.type === "line" && spec.y.length === 1, tension: 0.3, pointRadius: rows.length > 40 ? 0 : 2.5, borderWidth: 2, borderRadius: 4,
          };
        }),
      },
      options: { ...common, indexAxis: horizontal ? "y" : "x", scales: horizontal ? { x: { ...axes.y, beginAtZero: true }, y: { ...axes.x, ticks: { ...axes.x.ticks, autoSkip: false } } } : axes },
    });
    if (horizontal) box.style.height = `${Math.max(260, rows.length * 28 + 60)}px`;
  }
  charts.add(chart);
  return box;
}

function download(name: string, text: string) {
  const a = h("a", { href: URL.createObjectURL(new Blob([text], { type: "text/csv" })), download: name });
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}

function renderAnswer(card: HTMLElement, opts: { answer: string; sql: string; chart: ChartSpec; outcome: Extract<ExecOutcome, { ok: true }>; meta: string[] }) {
  const { columns, rows, truncated } = opts.outcome.result;
  const chart = resolveChart(opts.chart, columns, rows);
  const views: Record<string, () => HTMLElement> = {
    Chart: () => renderChart(chart, columns, rows),
    Table: () => renderTable(columns, rows),
    SQL: () => h("div", {}, highlightSql(opts.sql), renderChecks(opts.outcome)),
  };
  const body = h("div", { class: "view" });
  const tabs = h("div", { class: "tabs", role: "tablist" });
  const show = (name: string) => {
    body.replaceChildren(views[name]!());
    for (const b of tabs.querySelectorAll("button")) b.setAttribute("aria-selected", String(b.textContent === name));
  };
  for (const name of Object.keys(views)) {
    const b = h("button", { type: "button", role: "tab" }, name);
    b.onclick = () => show(name);
    tabs.append(b);
  }
  const csv = h("button", { type: "button", class: "ghost" }, "↓ CSV");
  csv.onclick = () => download("querypilot-result.csv", toCsv(columns, rows));
  tabs.append(h("span", { class: "spacer" }), csv);

  card.append(h("section", { class: "answer" },
    h("p", { class: "answer-text" }, opts.answer),
    chart.title ? h("h4", {}, chart.title) : null,
    tabs, body,
    h("p", { class: "meta mono" }, ...[...opts.meta, `${rows.length}${truncated ? "+" : ""} rows`, chart.source === "inferred" ? "chart auto-selected" : `${chart.type} chart`].map((m) => h("span", {}, m))),
  ));
  show(chart.type === "table" ? "Table" : "Chart");
}

// ---------------------------------------------------------------- trace
function traceItem(trace: HTMLElement, title: string, kind: string, ...children: Child[]) {
  const item = h("li", { class: `step ${kind}` }, h("div", { class: "step-title" }, title), ...children);
  trace.append(item);
  item.scrollIntoView({ block: "nearest", behavior: "smooth" });
  return item;
}

function renderToolResult(outcome: ExecOutcome): HTMLElement {
  if (!outcome.ok) {
    return h("div", {}, renderChecks(outcome), h("p", { class: "err mono" }, `${outcome.stage === "sqlite" ? "SQLite" : outcome.stage === "timeout" ? "Timeout" : "Blocked"}: ${outcome.error}`));
  }
  const { columns, rows, rowCount, truncated, elapsedMs } = outcome.result;
  return h("div", {}, renderChecks(outcome),
    h("details", {}, h("summary", { class: "mono small" }, `${rowCount}${truncated ? "+" : ""} rows · ${elapsedMs} ms · preview`), renderTable(columns, rows, 8)));
}

function newCard(question: string, badge: string) {
  for (const c of els.feed.querySelectorAll(".empty")) c.remove();
  const trace = h("ol", { class: "trace" });
  const details = h("details", { class: "trace-wrap", open: "" }, h("summary", { class: "mono" }, "Agent trace"), trace);
  const card = h("article", { class: "turn hud" },
    h("header", {}, h("span", { class: "badge" }, badge), h("h3", {}, question)),
    details);
  els.feed.append(card);
  card.scrollIntoView({ behavior: "smooth", block: "start" });
  return { card, trace, details };
}

// ---------------------------------------------------------------- live agent
async function askLive(question: string, apiKey: string) {
  const model = els.model.value || DEFAULT_MODEL;
  const { card, trace, details } = newCard(question, MODELS.find((m) => m.id === model)?.label ?? model);
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 2 });
  controller = new AbortController();
  const t0 = performance.now();
  let lastSql = "";
  let thinking: HTMLElement | undefined;
  const cancel = h("button", { type: "button", class: "ghost small" }, "Cancel");
  cancel.onclick = () => controller?.abort();
  card.querySelector("header")!.append(cancel);

  const onEvent = (e: AgentEvent) => {
    thinking?.remove();
    switch (e.type) {
      case "step":
        thinking = traceItem(trace, `Step ${e.step} · thinking…`, "thinking");
        break;
      case "note":
        traceItem(trace, "Model", "note", h("p", {}, e.text));
        break;
      case "tool_call":
        if (e.name === "run_sql") {
          lastSql = String(e.input.sql ?? "");
          traceItem(trace, `run_sql — ${String(e.input.purpose ?? "")}`, "tool", highlightSql(lastSql));
        } else if (e.name === "get_column_values") {
          traceItem(trace, `get_column_values — ${String(e.input.table)}.${String(e.input.column)}`, "tool");
        } else if (e.name === "submit_answer") {
          traceItem(trace, "submit_answer — re-running final SQL through the guard", "tool");
        }
        break;
      case "tool_result":
        trace.lastElementChild?.append(renderToolResult(e.outcome));
        break;
      case "error":
        card.append(h("p", { class: "err" }, e.message));
        break;
      case "answer":
      case "usage":
        break;
    }
  };

  const result = await runAgent({
    client, executor: db, question, history, pendingResults: pending, model, rowCounts: db.rowCounts, shield, onEvent, signal: controller.signal,
  });
  thinking?.remove();
  cancel.remove();
  pending = result.pendingResults;
  if (result.answer) {
    const u = result.usage;
    details.open = false;
    renderAnswer(card, {
      ...result.answer,
      meta: [
        `${result.answer.steps} step${result.answer.steps > 1 ? "s" : ""}`,
        `${((performance.now() - t0) / 1000).toFixed(1)}s`,
        `${(u.input + u.cacheRead + u.cacheWrite).toLocaleString()} in / ${u.output.toLocaleString()} out tokens`,
        u.cacheRead ? `${Math.round((u.cacheRead / (u.input + u.cacheRead + u.cacheWrite)) * 100)}% cached` : "",
      ].filter(Boolean),
    });
  } else if (lastSql && !card.querySelector(".err")) {
    card.append(h("p", { class: "err" }, result.error ?? "No answer."));
  }
}

// ---------------------------------------------------------------- demo mode
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function askDemo(demo: DemoScript) {
  const { card, trace, details } = newCard(demo.question, "Demo · scripted SQL");
  card.append();
  const t0 = performance.now();
  let n = 0;
  for (const s of demo.steps) {
    n++;
    await wait(350);
    if (s.tool === "get_column_values") {
      traceItem(trace, `get_column_values — ${s.table}.${s.column}`, "tool", renderToolResult(await db.sampleValues(s.table!, s.column!)));
    }
  }
  await wait(350);
  n++;
  traceItem(trace, "run_sql — draft and verify the query", "tool", highlightSql(demo.sql), renderToolResult(await db.execute(demo.sql)));
  await wait(350);
  traceItem(trace, "submit_answer — re-running final SQL through the guard", "tool");
  const outcome = await db.execute(demo.sql);
  trace.lastElementChild?.append(renderToolResult(outcome));
  if (!outcome.ok) return;
  details.open = false;
  renderAnswer(card, {
    answer: demo.answer(outcome.result.columns, outcome.result.rows),
    sql: demo.sql, chart: demo.chart, outcome,
    meta: [`${n + 1} steps`, `${((performance.now() - t0) / 1000).toFixed(1)}s`, "demo mode: no model call"],
  });
}

// ---------------------------------------------------------------- wiring
function setBusy(b: boolean) {
  busy = b;
  els.askBtn.disabled = b;
  els.askBtn.textContent = b ? "Working…" : "Ask";
  for (const chip of els.examples.querySelectorAll("button")) (chip as HTMLButtonElement).disabled = b;
}

function updateMode() {
  const live = els.key.value.trim().startsWith("sk-");
  els.mode.textContent = live ? "Live · Claude" : "Demo mode";
  els.mode.className = `mode ${live ? "live" : ""}`;
  els.keyStatus.textContent = live ? "Key set for this tab. Ask anything." : els.key.value ? "That doesn't look like an Anthropic key (sk-ant-…)." : "No key: sample questions run as scripted demos.";
  els.input.placeholder = live ? "Ask a question about the store's data…" : "Add an API key to ask your own questions, or pick a sample below.";
}

async function ask(question: string) {
  if (busy || !question.trim()) return;
  setBusy(true);
  try {
    const key = els.key.value.trim();
    if (key.startsWith("sk-")) await askLive(question.trim(), key);
    else {
      const demo = DEMOS.find((d) => d.question === question);
      if (demo) await askDemo(demo);
      else {
        const { card } = newCard(question, "Needs API key");
        card.append(h("p", { class: "err" }, "Free-form questions need your Anthropic API key (Settings panel). Without one, try a sample question: they run real SQL through the same safety pipeline."));
      }
    }
  } finally {
    setBusy(false);
    els.input.value = "";
  }
}

function buildSchema() {
  for (const t of TABLES) {
    els.schema.append(h("details", {},
      h("summary", {}, h("span", { class: "mono" }, t.name), h("span", { class: "muted small" }, (db.rowCounts[t.name] ?? 0).toLocaleString() + " rows")),
      h("p", { class: "small muted" }, t.description),
      h("ul", {}, ...t.columns.map((c) => h("li", { title: c.description }, h("code", {}, c.name), h("span", { class: "muted small" }, ` ${c.type}${c.pk ? " · PK" : ""}${c.references ? ` → ${c.references}` : ""}`)))),
    ));
  }
}

async function runConsole() {
  const sql = els.console.value;
  els.consoleOut.replaceChildren(h("p", { class: "muted small mono" }, "Running…"));
  const outcome = await db.execute(sql);
  els.consoleOut.replaceChildren(renderToolResult(outcome));
  const det = els.consoleOut.querySelector("details");
  if (det) det.open = true;
}

async function main() {
  for (const m of MODELS) els.model.append(h("option", { value: m.id }, m.label));
  els.key.value = store.get("qp.key");
  els.model.value = store.get("qp.model") || DEFAULT_MODEL;
  updateMode();
  els.key.addEventListener("input", () => { store.set("qp.key", els.key.value.trim()); updateMode(); });
  els.model.addEventListener("change", () => store.set("qp.model", els.model.value));

  for (const d of DEMOS) {
    const b = h("button", { type: "button", class: "chip" }, d.question);
    b.onclick = () => ask(d.question);
    els.examples.append(b);
  }
  for (const a of ATTACKS) {
    const b = h("button", { type: "button", class: "chip danger" }, a.label);
    b.onclick = () => { els.console.value = a.sql; runConsole(); };
    els.attacks.append(b);
  }
  els.form.addEventListener("submit", (e) => { e.preventDefault(); ask(els.input.value); });
  els.input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(els.input.value); } });
  els.consoleRun.onclick = runConsole;
  els.reset.onclick = () => {
    controller?.abort();
    history = []; pending = [];
    for (const c of charts) c.destroy();
    charts.clear();
    els.feed.replaceChildren(h("p", { class: "empty muted" }, "Conversation cleared. Follow-up questions start fresh."));
  };

  try {
    await db.init();
    const s = db.stats!;
    els.dbStatus.textContent = `SQLite (WASM) ready · ${s.orders.toLocaleString()} orders · ${s.order_items.toLocaleString()} line items · ${s.customers} customers`;
    els.dbStatus.classList.add("ok");
    shield = new PiiShield(db.pii);
    buildSchema();
  } catch (e) {
    els.dbStatus.textContent = `Database failed to load: ${(e as Error).message}`;
  }
}

main();
