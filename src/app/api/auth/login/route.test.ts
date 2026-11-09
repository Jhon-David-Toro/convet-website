import { beforeEach, describe, expect, it, vi } from "vitest";

const { apiRequest } = vi.hoisted(() => ({ apiRequest: vi.fn() }));
vi.mock("@/lib/api/api.client", () => ({ apiRequest }));

import { ApiError } from "@/lib/api/api.errors";

import { POST } from "./route";

const USER = { idUser: "u1", firstName: "Anna", lastName: "Lee", email: "anna@example.com", role: "CUSTOMER" };

/**
 * Posts credentials to the route.
 *
 * @param body Credentials.
 * @returns The response.
 */
function login(body: unknown) {
  return POST(new Request("http://localhost/api/auth/login", { method: "POST", body: JSON.stringify(body) }));
}

beforeEach(() => {
  apiRequest.mockReset();
});

describe("POST /api/auth/login", () => {
  it("rejects a malformed request without calling the backend", async () => {
    const response = await login({ email: "" });
    expect(response.status).toBe(400);
    expect(apiRequest).not.toHaveBeenCalled();
  });

  it("returns the user and keeps the token in an httpOnly cookie only", async () => {
    apiRequest.mockResolvedValue({ accessToken: "jwt", user: USER });
    const response = await login({ email: "anna@example.com", password: "secret" });
    expect(await response.json()).toEqual({ user: USER });
    expect(response.cookies.get("convet_access_token")).toMatchObject({ value: "jwt", httpOnly: true });
    expect(apiRequest).toHaveBeenCalledWith("/auth/login", expect.objectContaining({ method: "POST", auth: false }));
  });

  it("answers 401 for wrong credentials and sets no cookie", async () => {
    apiRequest.mockImplementation(async () => {
      throw new ApiError("unauthorized", { status: 401 });
    });
    const response = await login({ email: "anna@example.com", password: "nope" });
    expect(response.status).toBe(401);
    expect(response.cookies.get("convet_access_token")).toBeUndefined();
  });
});
