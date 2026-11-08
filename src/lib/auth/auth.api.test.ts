import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { signIn } from "./auth.api";

const fetchMock = vi.fn();

const VALUES = { email: "anna@example.com", password: "secret", remember: true };

beforeEach(() => vi.stubGlobal("fetch", fetchMock));

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe("signIn", () => {
  it("posts only the email and password and returns the role", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ user: { idUser: "u1", role: "STAFF" } })));
    await expect(signIn(VALUES)).resolves.toEqual({ ok: true, role: "STAFF" });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/auth/login");
    expect(JSON.parse(init.body)).toEqual({ email: "anna@example.com", password: "secret" });
  });

  it.each([
    [401, "credentials"],
    [400, "credentials"],
    [500, "unavailable"],
    [502, "unavailable"],
    [503, "unavailable"],
  ])("maps status %i to %s", async (status, reason) => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: "x" }), { status }));
    await expect(signIn(VALUES)).resolves.toEqual({ ok: false, reason });
  });

  it("treats a network failure or an unexpected answer as an outage", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    await expect(signIn(VALUES)).resolves.toEqual({ ok: false, reason: "unavailable" });
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ user: { role: "ROOT" } })));
    await expect(signIn(VALUES)).resolves.toEqual({ ok: false, reason: "unavailable" });
  });
});
