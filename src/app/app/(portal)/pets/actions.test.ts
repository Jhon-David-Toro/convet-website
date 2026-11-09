import { beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePath, createPet, updatePet, deactivatePet, requireRole } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  createPet: vi.fn(),
  updatePet: vi.fn(),
  deactivatePet: vi.fn(),
  requireRole: vi.fn(),
}));
vi.mock("next/cache", () => ({ revalidatePath }));
vi.mock("@/lib/auth/auth.access", () => ({ requireRole }));
vi.mock("next/navigation", () => ({ redirect: vi.fn(() => { throw new Error("NEXT_REDIRECT"); }) }));
vi.mock("@/lib/api/pets.api", () => ({ createPet, updatePet, deactivatePet }));

import { ApiError } from "@/lib/api/api.errors";

import { addPetAction, archivePetAction, updatePetAction } from "./actions";

const VALID = { name: "Bruno", species: "dog", breed: "", color: "", sex: "male" as const, birthDate: "" };
const PET_ID = "7d1b6e0a-1f2e-4c3d-9a8b-000000000001";

beforeEach(() => {
  revalidatePath.mockReset();
  createPet.mockReset();
  updatePet.mockReset();
  deactivatePet.mockReset();
  requireRole.mockReset().mockResolvedValue({});
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
    createPet.mockRejectedValue(new ApiError("validation", { status: 400, fieldErrors: { dateOfBirth: "dateOfBirth must be a date" } }));
    const result = await addPetAction(VALID);
    expect(result).toMatchObject({ ok: false, kind: "validation", fieldErrors: { dateOfBirth: "dateOfBirth must be a date" } });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("sends the user to sign in when the session expired", async () => {
    createPet.mockRejectedValue(new ApiError("unauthorized", { status: 401 }));
    await expect(addPetAction(VALID)).rejects.toThrow("NEXT_REDIRECT");
  });
});

describe("updatePetAction", () => {
  it("rejects invalid data on the server without calling the backend", async () => {
    const result = await updatePetAction(PET_ID, { ...VALID, name: "" });
    expect(result).toMatchObject({ ok: false, kind: "validation", fieldErrors: { name: expect.any(String) } });
    expect(updatePet).not.toHaveBeenCalled();
  });

  it("checks the session before anything else", async () => {
    requireRole.mockRejectedValue(new Error("NEXT_REDIRECT"));
    await expect(updatePetAction(PET_ID, VALID)).rejects.toThrow("NEXT_REDIRECT");
    expect(updatePet).not.toHaveBeenCalled();
  });

  it("sends every field of the pet to the backend and refreshes the pet pages", async () => {
    updatePet.mockResolvedValue({ idPet: PET_ID });
    const values = { name: " Bruno ", species: "dog", breed: "", color: "Brown", sex: "male" as const, birthDate: "06 / 15 / 2022" };
    await expect(updatePetAction(PET_ID, values)).resolves.toEqual({ ok: true, data: undefined });
    expect(updatePet).toHaveBeenCalledWith(PET_ID, { name: "Bruno", species: "DOG", sex: "MALE", breed: "", color: "Brown", dateOfBirth: "2022-06-15" });
    expect(revalidatePath).toHaveBeenCalledWith("/app/pets", "layout");
  });

  it("clears the date of birth when the customer empties it", async () => {
    updatePet.mockResolvedValue({ idPet: PET_ID });
    await updatePetAction(PET_ID, VALID);
    expect(updatePet).toHaveBeenCalledWith(PET_ID, expect.objectContaining({ dateOfBirth: null }));
  });

  it("returns the backend field errors and does not refresh when the backend refuses the change", async () => {
    updatePet.mockRejectedValue(new ApiError("validation", { status: 400, fieldErrors: { dateOfBirth: "dateOfBirth must be a date" } }));
    const result = await updatePetAction(PET_ID, VALID);
    expect(result).toMatchObject({ ok: false, kind: "validation", fieldErrors: { dateOfBirth: "dateOfBirth must be a date" } });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("returns a safe not-found error when the pet is no longer the customer's", async () => {
    updatePet.mockRejectedValue(new ApiError("not-found", { status: 404 }));
    const result = await updatePetAction(PET_ID, VALID);
    expect(result).toMatchObject({ ok: false, kind: "not-found" });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("sends the user to sign in when the session expired", async () => {
    updatePet.mockRejectedValue(new ApiError("unauthorized", { status: 401 }));
    await expect(updatePetAction(PET_ID, VALID)).rejects.toThrow("NEXT_REDIRECT");
  });
});

describe("archivePetAction", () => {
  it("archives the pet on the backend and refreshes the pet pages", async () => {
    deactivatePet.mockResolvedValue({ idPet: PET_ID, name: "Bruno", isActive: false });
    await expect(archivePetAction(PET_ID)).resolves.toEqual({ ok: true, data: undefined });
    expect(deactivatePet).toHaveBeenCalledWith(PET_ID);
    expect(revalidatePath).toHaveBeenCalledWith("/app/pets", "layout");
  });

  it("returns a safe error and does not refresh when the backend refuses", async () => {
    deactivatePet.mockRejectedValue(new ApiError("not-found", { status: 404 }));
    const result = await archivePetAction(PET_ID);
    expect(result).toMatchObject({ ok: false, kind: "not-found" });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("sends the user to sign in when the session expired", async () => {
    deactivatePet.mockRejectedValue(new ApiError("unauthorized", { status: 401 }));
    await expect(archivePetAction(PET_ID)).rejects.toThrow("NEXT_REDIRECT");
  });
});
