import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

const cookieGet = vi.fn();
vi.mock("next/headers", () => ({ cookies: async () => ({ get: cookieGet }) }));

import { ApiError } from "./api.errors";
import { apiRequest, buildUrl } from "./api.client";

const fetchMock = vi.fn();

/**
 * Builds a fetch answer.
 *
 * @param status HTTP status.
 * @param body JSON body.
 * @returns A Response.
 */
function answer(status: number, body?: unknown) {
  return new Response(body === undefined ? null : JSON.stringify(body), { status });
}

beforeEach(() => {
  process.env.BACKEND_API_URL = "https://api.test/v1";
  cookieGet.mockReturnValue({ value: "jwt-token" });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  fetchMock.mockReset();
  delete process.env.BACKEND_API_URL;
});

describe("buildUrl", () => {
  it("joins the base URL, the path and the non-empty query values", () => {
    expect(buildUrl("/pets", { page: 2, q: "", skip: undefined, active: true }).toString()).toBe("https://api.test/v1/pets?page=2&active=true");
  });

  it("fails clearly when the base URL is missing", () => {
    delete process.env.BACKEND_API_URL;
    expect(() => buildUrl("/pets")).toThrowError(expect.objectContaining({ kind: "not-configured" }));
  });
});

describe("apiRequest", () => {
  it("sends the Bearer token and returns the validated answer", async () => {
    fetchMock.mockResolvedValue(answer(200, { id: "1" }));
    const data = await apiRequest("/pets/1", { schema: z.object({ id: z.string() }) });
    expect(data).toEqual({ id: "1" });
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("https://api.test/v1/pets/1");
    expect(init.headers.Authorization).toBe("Bearer jwt-token");
    expect(init.cache).toBe("no-store");
  });

  it("sends a JSON body and skips the token for public endpoints", async () => {
    fetchMock.mockResolvedValue(answer(200, []));
    await apiRequest("/services", { method: "POST", body: { a: 1 }, auth: false, schema: z.array(z.unknown()) });
    const init = fetchMock.mock.calls[0][1];
    expect(init.body).toBe('{"a":1}');
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(init.headers.Authorization).toBeUndefined();
    expect(cookieGet).not.toHaveBeenCalled();
  });

  it("does not call the backend when there is no session", async () => {
    cookieGet.mockReturnValue(undefined);
    await expect(apiRequest("/pets")).rejects.toMatchObject({ kind: "unauthorized" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    [401, "unauthorized"],
    [403, "forbidden"],
    [404, "not-found"],
    [422, "validation"],
    [500, "server"],
  ])("turns a %i answer into a %s error", async (status, kind) => {
    fetchMock.mockResolvedValue(answer(status, { message: ["name should not be empty"] }));
    await expect(apiRequest("/pets")).rejects.toMatchObject({ kind, status });
  });

  it("returns the field errors of a validation failure", async () => {
    fetchMock.mockResolvedValue(answer(400, { message: ["name should not be empty"] }));
    await expect(apiRequest("/pets", { method: "POST", body: {} })).rejects.toMatchObject({ fieldErrors: { name: "name should not be empty" } });
  });

  it("reports an answer that does not match the schema", async () => {
    fetchMock.mockResolvedValue(answer(200, { id: 5 }));
    await expect(apiRequest("/pets/1", { schema: z.object({ id: z.string() }) })).rejects.toMatchObject({ kind: "invalid-response" });
  });

  it("maps a network failure and a timeout", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("fetch failed"));
    await expect(apiRequest("/pets")).rejects.toMatchObject({ kind: "network" });
    fetchMock.mockRejectedValueOnce(new DOMException("timed out", "TimeoutError"));
    const error = await apiRequest("/pets").catch((caught) => caught);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.kind).toBe("timeout");
  });

  it("accepts an empty answer when there is no schema", async () => {
    fetchMock.mockResolvedValue(answer(204));
    await expect(apiRequest("/notifications/read-all", { method: "PATCH" })).resolves.toBeUndefined();
  });
});
