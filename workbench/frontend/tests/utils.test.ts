import { describe, expect, it } from "vitest";
import { fmt, toCsv } from "@/lib/utils";

describe("toCsv", () => {
  it("quotes delimiters, quotes and newlines; renders null as empty", () => {
    const csv = toCsv(["name", "n"], [{ name: 'a,"b"', n: 1 }, { name: "line\nbreak", n: null }]);
    expect(csv).toBe('name,n\n"a,""b""",1\n"line\nbreak",');
  });

  it("neutralises spreadsheet formula injection in strings only", () => {
    const csv = toCsv(["v"], [{ v: "=HYPERLINK(1)" }, { v: "@cmd" }, { v: -5 }]);
    expect(csv.split("\n")).toEqual(["v", "'=HYPERLINK(1)", "'@cmd", "-5"]);
  });
});

describe("fmt", () => {
  it("formats integers, decimals and small ratios", () => {
    expect(fmt.int(1234567)).toBe("1,234,567");
    expect(fmt.num(1234.5678)).toBe("1,234.57");
    expect(fmt.num(0.1154)).toBe("0.1154");
    expect(fmt.num(42)).toBe("42");
  });

  it("formats durations and percentages", () => {
    expect(fmt.ms(4.25)).toBe("4.3 ms");
    expect(fmt.ms(901)).toBe("901 ms");
    expect(fmt.ms(1840)).toBe("1.84 s");
    expect(fmt.pct(0.347)).toBe("35%");
  });
});
