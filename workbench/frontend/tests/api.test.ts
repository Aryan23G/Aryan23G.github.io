import { describe, expect, it } from "vitest";
import { authHeaders } from "@/lib/api";

describe("authHeaders", () => {
  it("sends a bearer token only when configured", () => {
    expect(authHeaders("abc")).toEqual({ Authorization: "Bearer abc" });
    expect(authHeaders("")).toEqual({});
    expect(authHeaders(undefined)).toEqual({});
  });
});
