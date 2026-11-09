import { beforeEach, describe, expect, it, vi } from "vitest";

const { request } = vi.hoisted(() => ({ request: vi.fn() }));
vi.mock("./api.client", () => ({ apiRequest: request }));

import { getAllPetMedicalRecords, getPetHistory } from "./medical-records.api";

beforeEach(() => request.mockReset());

describe("medical records pagination", () => {
  it("loads every page for a pet's history", async () => {
    request
      .mockResolvedValueOnce({ data: [{ idMedicalRecord: "r2", petId: "p1", createdAt: "2026-09-11T14:00:00Z" }], meta: { total: 2, page: 1, limit: 1, totalPages: 2 } })
      .mockResolvedValueOnce({ data: [{ idMedicalRecord: "r1", petId: "p1", createdAt: "2025-03-01T14:00:00Z" }], meta: { total: 2, page: 2, limit: 1, totalPages: 2 } });
    expect((await getPetHistory("p1")).map((event) => event.id)).toEqual(["r2", "r1"]);
    expect(request).toHaveBeenNthCalledWith(2, "/medical-records/pet/p1", expect.objectContaining({ query: { page: 2, limit: 100 } }));
  });

  it("does not report a partial history as complete when another page fails", async () => {
    request.mockResolvedValueOnce({ data: [], meta: { total: 101, page: 1, limit: 100, totalPages: 2 } });
    request.mockRejectedValueOnce(new Error("Network failure"));
    await expect(getAllPetMedicalRecords("p1")).rejects.toThrow("Network failure");
  });
});
