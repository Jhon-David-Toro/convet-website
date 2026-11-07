import { beforeEach, describe, expect, it, vi } from "vitest";

const { changePassword, cookieDelete, redirect } = vi.hoisted(() => ({
  changePassword: vi.fn(),
  cookieDelete: vi.fn(),
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));
vi.mock("@/lib/api/users.api", () => ({ changePassword }));
vi.mock("@/lib/auth/auth.access", () => ({ requireRole: vi.fn().mockResolvedValue({ idUser: "u1" }) }));
vi.mock("next/headers", () => ({ cookies: async () => ({ delete: cookieDelete }) }));
vi.mock("next/navigation", () => ({ redirect }));

import { ApiError } from "@/lib/api/api.errors";

import { changePasswordAction } from "./actions";

const VALUES = { current: "Old-password-1!", next: "New-password-2!", repeat: "New-password-2!" };

beforeEach(() => {
  changePassword.mockReset();
  cookieDelete.mockReset();
});

describe("changePasswordAction", () => {
  it("rejects a weak password on the server without calling the backend", async () => {
    await expect(changePasswordAction({ ...VALUES, next: "weak" })).resolves.toMatchObject({ ok: false, fieldErrors: { next: expect.any(String) } });
    expect(changePassword).not.toHaveBeenCalled();
  });

  it("clears the session cookie and sends the customer to sign in after a change", async () => {
    changePassword.mockResolvedValue(undefined);
    await expect(changePasswordAction(VALUES)).rejects.toThrow("NEXT_REDIRECT");
    expect(changePassword).toHaveBeenCalledWith("u1", { currentPassword: "Old-password-1!", newPassword: "New-password-2!" });
    expect(cookieDelete).toHaveBeenCalledWith("convet_access_token");
    expect(redirect).toHaveBeenCalledWith("/sign-in");
  });

  it("blames the current password when the backend refuses with a validation error", async () => {
    changePassword.mockImplementation(async () => {
      throw new ApiError("validation", { status: 400 });
    });
    await expect(changePasswordAction(VALUES)).resolves.toMatchObject({ ok: false, fieldErrors: { current: "Your current password is not correct." } });
    expect(cookieDelete).not.toHaveBeenCalled();
  });

  it("keeps the session when the backend fails for another reason", async () => {
    changePassword.mockImplementation(async () => {
      throw new ApiError("server", { status: 500 });
    });
    await expect(changePasswordAction(VALUES)).resolves.toMatchObject({ ok: false, message: expect.stringContaining("our side") });
    expect(cookieDelete).not.toHaveBeenCalled();
  });
});
