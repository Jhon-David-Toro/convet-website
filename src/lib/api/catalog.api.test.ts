import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/server", () => ({ connection: vi.fn() }));
vi.mock("next/headers", () => ({ cookies: async () => ({ get: () => ({ value: "jwt" }) }) }));

import { ApiError } from "./api.errors";
import { createService, createServiceCategory, getPublicServiceContent, updateServiceCategory } from "./catalog.api";

const fetchMock = vi.fn();

beforeEach(() => {
  process.env.BACKEND_API_URL = "https://api.test";
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  fetchMock.mockReset();
  delete process.env.BACKEND_API_URL;
});

describe("getPublicServiceContent", () => {
  it("reads the public, cached catalog without a session", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify([{ idService: "s1", name: "Consults", slug: "consultations", isPublished: true, isActive: true, categoryId: "c1" }])));
    expect(await getPublicServiceContent()).toEqual([{ slug: "consultations", title: "Consults", cardSummary: undefined, lead: undefined }]);
    expect(fetchMock.mock.calls[0][1].next).toMatchObject({ tags: ["catalog:services"] });
  });

  it("never fails, so the public pages fall back to their editorial copy", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ statusCode: 500 }), { status: 500 }));
    expect(await getPublicServiceContent()).toBeUndefined();
  });
});

/**
 * Answer of the backend with a 400 and the given message, as Nest writes it.
 *
 * @param message Plain text or the list of validation messages.
 * @returns The response.
 */
function badRequest(message: string | string[]) {
  return new Response(JSON.stringify({ statusCode: 400, message, error: "Bad Request" }), { status: 400 });
}

describe("slug conflicts of services and categories", () => {
  const SERVICE = { name: "Dental check", slug: "dental-check", categoryId: "c1" };

  it("turns the 400 of a taken service slug into a conflict on the slug", async () => {
    fetchMock.mockImplementation(async () => badRequest("A service with this slug already exists"));
    const error = await createService(SERVICE).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ kind: "conflict", status: 400, fieldErrors: { slug: expect.any(String) } });
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: "POST" });
  });

  it("turns the 400 of a taken category slug into a conflict, on create and on change", async () => {
    fetchMock.mockImplementation(async () => badRequest("A category with this slug already exists"));
    await expect(createServiceCategory({ name: "Prevention", slug: "prevention" })).rejects.toMatchObject({ kind: "conflict", fieldErrors: { slug: expect.any(String) } });
    await expect(updateServiceCategory("c1", { slug: "prevention" })).rejects.toMatchObject({ kind: "conflict", fieldErrors: { slug: expect.any(String) } });
  });

  it("keeps the other validation errors as they are", async () => {
    fetchMock.mockImplementation(async () => badRequest(["slug must be longer than or equal to 2 characters"]));
    await expect(createService({ ...SERVICE, slug: "a" })).rejects.toMatchObject({ kind: "validation", fieldErrors: { slug: "slug must be longer than or equal to 2 characters" } });
  });
});
