import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/server", () => ({ connection: vi.fn() }));
vi.mock("next/headers", () => ({ cookies: async () => ({ get: () => undefined }) }));

import { getPublicServiceContent } from "./catalog.api";

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
