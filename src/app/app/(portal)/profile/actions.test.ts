import { beforeEach, describe, expect, it, vi } from "vitest";

const { getProfile, updateProfile, updateEmail, revalidatePath } = vi.hoisted(() => ({ getProfile: vi.fn(), updateProfile: vi.fn(), updateEmail: vi.fn(), revalidatePath: vi.fn() }));
vi.mock("@/lib/api/users.api", () => ({ getProfile, updateProfile, updateEmail }));
vi.mock("@/lib/auth/auth.access", () => ({ requireRole: vi.fn().mockResolvedValue({ idUser: "u1" }) }));
vi.mock("next/cache", () => ({ revalidatePath }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

import { ApiError } from "@/lib/api/api.errors";

import { saveProfileAction } from "./actions";

const STORED = { firstName: "Anna", lastName: "Lee", email: "anna@example.com", phone: "+297 560 1234", address: "" };

beforeEach(() => {
  getProfile.mockReset().mockResolvedValue(STORED);
  updateProfile.mockReset();
  updateEmail.mockReset();
  revalidatePath.mockReset();
});

describe("saveProfileAction", () => {
  it("rejects invalid data on the server without calling the backend", async () => {
    await expect(saveProfileAction({ ...STORED, phone: "123" })).resolves.toMatchObject({ ok: false, fieldErrors: { phone: expect.any(String) } });
    expect(updateProfile).not.toHaveBeenCalled();
  });

  it("sends only the fields that changed", async () => {
    await expect(saveProfileAction({ ...STORED, firstName: " Anne " })).resolves.toEqual({ ok: true, data: undefined });
    expect(updateProfile).toHaveBeenCalledWith("u1", { firstName: "Anne" });
    expect(updateEmail).not.toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith("/app/profile");
  });

  it("changes the email on its own endpoint and does not send an empty profile update", async () => {
    await saveProfileAction({ ...STORED, email: "New@Example.com" });
    expect(updateEmail).toHaveBeenCalledWith("u1", "new@example.com");
    expect(updateProfile).not.toHaveBeenCalled();
  });

  it("reports a taken email as a conflict", async () => {
    updateEmail.mockImplementation(async () => {
      throw new ApiError("conflict", { status: 409 });
    });
    await expect(saveProfileAction({ ...STORED, email: "taken@example.com" })).resolves.toMatchObject({ ok: false, kind: "conflict" });
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
