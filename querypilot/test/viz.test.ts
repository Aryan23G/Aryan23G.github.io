import { describe, expect, it } from "vitest";
import { columnKind, formatValue, inferChart, resolveChart, toCsv } from "../src/viz.ts";

describe("columnKind", () => {
  it("detects temporal, numeric and categorical columns", () => {
    const rows = [["2024-01", 10, "web", 2024], ["2024-02", 12, "mobile", 2025]];
    expect(columnKind(rows, 0)).toBe("temporal");
    expect(columnKind(rows, 1)).toBe("numeric");
    expect(columnKind(rows, 2)).toBe("categorical");
    expect(columnKind(rows, 3, "year")).toBe("temporal");
    expect(columnKind(rows, 3, "orders")).toBe("numeric");
    expect(columnKind([[null]], 0)).toBe("empty");
  });
});

describe("inferChart", () => {
  it("time series -> line", () => {
    expect(inferChart(["month", "revenue"], [["2024-01", 1], ["2024-02", 2]])).toMatchObject({ type: "line", x: "month", y: ["revenue"] });
  });
  it("single numeric row -> kpi", () => {
    expect(inferChart(["revenue", "orders"], [[100.5, 3]])).toMatchObject({ type: "kpi", y: ["revenue", "orders"] });
  });
  it("category + measure -> bar", () => {
    expect(inferChart(["category", "n"], [["a", 1], ["b", 2]])).toMatchObject({ type: "bar", x: "category" });
  });
  it("two numerics -> scatter", () => {
    expect(inferChart(["price", "rating"], [[1, 2], [3, 4], [5, 6]])).toMatchObject({ type: "scatter", x: "price", y: ["rating"] });
  });
  it("long-format time series or no rows -> table", () => {
    expect(inferChart(["month", "channel", "n"], [["2024-01", "web", 1], ["2024-01", "mobile", 2]]).type).toBe("table");
    expect(inferChart(["a"], []).type).toBe("table");
  });
});

describe("resolveChart (validating the model's proposal)", () => {
  const cols = ["month", "orders"];
  const rows = Array.from({ length: 24 }, (_, i) => [`2024-${String((i % 12) + 1).padStart(2, "0")}`, i]);

  it("keeps a proposal that fits", () => {
    expect(resolveChart({ type: "line", x: "month", y: ["orders"], title: "t" }, cols, rows)).toMatchObject({ type: "line", source: "model" });
  });
  it("rejects a pie with too many slices", () => {
    expect(resolveChart({ type: "pie", x: "month", y: ["orders"], title: "t" }, cols, rows)).toMatchObject({ type: "line", source: "inferred", title: "t" });
  });
  it("rejects hallucinated columns", () => {
    expect(resolveChart({ type: "bar", x: "month", y: ["revenue"], title: "" }, cols, rows).source).toBe("inferred");
  });
  it("rejects non-numeric measures", () => {
    expect(resolveChart({ type: "bar", x: "orders", y: ["month"], title: "" }, cols, rows).source).toBe("inferred");
  });
  it("rejects a kpi over many rows", () => {
    expect(resolveChart({ type: "kpi", x: "", y: ["orders"], title: "" }, cols, rows).source).toBe("inferred");
  });
});

describe("toCsv", () => {
  it("quotes and neutralises formula injection", () => {
    const csv = toCsv(["name", "n"], [["=HYPERLINK(\"x\")", 1], ["a,b", null]]);
    expect(csv).toBe('name,n\n"\'=HYPERLINK(""x"")",1\n"a,b",');
  });
});

describe("formatValue", () => {
  it("formats rates, ids and numbers", () => {
    expect(formatValue(0.2031, "return_rate")).toBe("20.3%");
    expect(formatValue(2025, "year")).toBe("2025");
    expect(formatValue(1234567.891, "revenue")).toBe("1,234,567.89");
    expect(formatValue(null)).toBe("NULL");
  });
});
