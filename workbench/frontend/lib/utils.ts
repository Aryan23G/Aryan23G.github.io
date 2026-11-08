import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const int = new Intl.NumberFormat("en-US");
const dec = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const small = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 });

export const fmt = {
  int: (n: number) => int.format(n),
  // Ratios / rates (|n| < 1) keep 4 decimals so 0.1154 is not shown as 0.12.
  num: (n: number) => (Number.isInteger(n) ? int.format(n) : Math.abs(n) < 1 ? small.format(n) : dec.format(n)),
  ms: (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(2)} s` : `${n.toFixed(n < 10 ? 1 : 0)} ms`),
  pct: (n: number) => `${(n * 100).toFixed(0)}%`,
};

/** RFC 4180 CSV with spreadsheet formula-injection neutralised. */
export function toCsv(columns: string[], records: Record<string, unknown>[]): string {
  const esc = (v: unknown): string => {
    if (v === null || v === undefined) return "";
    let s = String(v);
    if (typeof v === "string" && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [columns.map(esc).join(","), ...records.map((r) => columns.map((c) => esc(r[c])).join(","))].join("\n");
}

export function download(filename: string, content: string, mime = "text/csv"): void {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
