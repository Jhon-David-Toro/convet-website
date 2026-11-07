import { beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePath, createPet } = vi.hoisted(() => ({ revalidatePath: vi.fn(), createPet: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath }));
vi.mock("@/lib/auth/auth.access", () => ({ requireRole: vi.fn().mockResolvedValue({}) }));
vi.mock("next/navigation", () => ({ redirect: vi.fn(() => { throw new Error("NEXT_REDIRECT"); }) }));
vi.mock("@/lib/api/pets.api", () => ({ createPet }));

import { ApiError } from "@/lib/api/api.errors";

import { addPetAction } from "./actions";

const VALID = { name: "Bruno", species: "dog", breed: "", color: "", sex: "male" as const, birthDate: "" };

beforeEach(() => {
  revalidatePath.mockReset();
  createPet.mockReset();
});

describe("addPetAction", () => {
  it("rejects invalid data on the server without calling the backend", async () => {
    const result = await addPetAction({ ...VALID, name: "" });
    expect(result).toMatchObject({ ok: false, kind: "validation", fieldErrors: { name: expect.any(String) } });
    expect(createPet).not.toHaveBeenCalled();
  });

  it("creates the pet and refreshes the list", async () => {
    createPet.mockResolvedValue({ id: "p1" });
    await expect(addPetAction(VALID)).resolves.toEqual({ ok: true, data: undefined });
    expect(revalidatePath).toHaveBeenCalledWith("/app/pets");
  });

  it("returns a safe error and the backend field errors when the call fails", async () => {
    createPet.mockRejectedValue(new ApiError("validation", { status: 400, fieldErrors: { birthDate: "birthDate must be a date" } }));
    const result = await addPetAction(VALID);
    expect(result).toMatchObject({ ok: false, kind: "validation", fieldErrors: { birthDate: "birthDate must be a date" } });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("sends the user to sign in when the session expired", async () => {
    createPet.mockRejectedValue(new ApiError("unauthorized", { status: 401 }));
    await expect(addPetAction(VALID)).rejects.toThrow("NEXT_REDIRECT");
  });
});
