import { describe, expect, it } from "vitest";

import { ApiError } from "@/lib/api/api.errors";

import { loginFailure, readCredentials, setSessionCookie } from "./auth.route";
import { NextResponse } from "next/server";

/**
 * Builds a login request.
 *
 * @param body Raw body.
 * @returns The request.
 */
function request(body: string) {
  return new Request("http://localhost/api/auth/login", { method: "POST", body });
}

describe("readCredentials", () => {
  it("trims the email and keeps the password as typed", async () => {
    await expect(readCredentials(request(JSON.stringify({ email: " a@b.co ", password: " secret " })))).resolves.toEqual({ email: "a@b.co", password: " secret " });
  });

  it.each([["not json"], [JSON.stringify({ email: "a@b.co" })], [JSON.stringify({ email: "  ", password: "x" })], [JSON.stringify([])]])("rejects %s", async (body) => {
    await expect(readCredentials(request(body))).resolves.toBeNull();
  });
});

describe("loginFailure", () => {
  it.each([
    [new ApiError("unauthorized", { status: 401 }), 401, "Invalid email or password"],
    [new ApiError("validation", { status: 400 }), 400, "Unable to authenticate"],
    [new ApiError("not-configured"), 500, "Authentication service is not configured"],
    [new ApiError("network"), 503, "Authentication service is unavailable"],
    [new ApiError("timeout"), 503, "Authentication service is unavailable"],
    [new ApiError("invalid-response"), 502, "Invalid authentication response"],
    [new ApiError("server", { status: 500 }), 502, "Unable to authenticate"],
    [new Error("boom"), 502, "Unable to authenticate"],
  ])("answers %s safely", async (error, status, message) => {
    const response = loginFailure(error);
    expect(response.status).toBe(status);
    await expect(response.json()).resolves.toEqual({ message });
  });
});

describe("setSessionCookie", () => {
  it("stores the token in an httpOnly cookie and clears it for an empty token", () => {
    const stored = setSessionCookie(NextResponse.json({}), "jwt").cookies.get("convet_access_token");
    expect(stored).toMatchObject({ value: "jwt", httpOnly: true, sameSite: "lax", path: "/", maxAge: 3600 });
    expect(setSessionCookie(NextResponse.json({}), "").cookies.get("convet_access_token")).toMatchObject({ value: "", maxAge: 0 });
  });
});
