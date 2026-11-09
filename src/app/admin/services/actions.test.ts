import { beforeEach, describe, expect, it, vi } from "vitest";

const { createService } = vi.hoisted(() => ({ createService: vi.fn() }));
vi.mock("@/lib/api/catalog.api", () => ({ createService }));
vi.mock("@/lib/api/branches.api", () => ({ setBranchServiceActive: vi.fn(), setBranchServicePrice: vi.fn() }));
vi.mock("@/lib/auth/auth.access", () => ({ requireRole: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), updateTag: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

import { ApiError } from "@/lib/api/api.errors";
import { SLUG_TAKEN_MESSAGE } from "@/lib/api/catalog.mappers";
import { NAME_TAKEN_ERROR } from "@/components/sections/ServiceModal/ServiceModal.constants";

import { createServiceAction } from "./actions";

const VALUES = { name: "Dental check", category: "c1", duration: "30", buffer: "10", vets: ["Dr. Shirley"], online: true };

beforeEach(() => {
  createService.mockReset();
});

describe("createServiceAction", () => {
  it("creates the service with the slug built from its name", async () => {
    createService.mockResolvedValue({});
    await expect(createServiceAction(VALUES)).resolves.toEqual({ ok: true });
    expect(createService).toHaveBeenCalledWith({ name: "Dental check", slug: "dental-check", categoryId: "c1" });
  });

  it("puts a taken slug on the name, because the slug comes from it", async () => {
    createService.mockRejectedValue(new ApiError("conflict", { status: 400, fieldErrors: { slug: SLUG_TAKEN_MESSAGE } }));
    await expect(createServiceAction(VALUES)).resolves.toEqual({ ok: false, message: NAME_TAKEN_ERROR, fieldErrors: { name: NAME_TAKEN_ERROR } });
  });

  it("keeps the other backend errors on the field they belong to", async () => {
    createService.mockRejectedValue(new ApiError("validation", { status: 400, fieldErrors: { categoryId: "categoryId must be a UUID" } }));
    await expect(createServiceAction(VALUES)).resolves.toEqual({
      ok: false,
      message: "Some of the information is not valid. Please review it and try again.",
      fieldErrors: { name: undefined, category: "categoryId must be a UUID" },
    });
  });
});
