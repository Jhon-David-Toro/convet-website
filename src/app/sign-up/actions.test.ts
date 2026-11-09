import { beforeEach, describe, expect, it, vi } from "vitest";

const { createUser } = vi.hoisted(() => ({ createUser: vi.fn() }));
vi.mock("@/lib/api/users.api", () => ({ createUser }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

import { ApiError } from "@/lib/api/api.errors";

import { signUpAction } from "./actions";

const VALID = { firstName: "Anna", lastName: "Lee", email: "anna@example.com", phone: "+297 560 1234", password: "Violet-Tiger-2026!", confirmPassword: "Violet-Tiger-2026!", acceptTerms: true, whatsappReminders: false };

beforeEach(() => {
  createUser.mockReset();
});

describe("signUpAction", () => {
  it("rejects invalid data on the server without calling the backend", async () => {
    const result = await signUpAction({ ...VALID, password: "weak" });
    expect(result).toMatchObject({ ok: false, kind: "validation", fieldErrors: { password: expect.any(String) } });
    expect(createUser).not.toHaveBeenCalled();
  });

  it("creates the account", async () => {
    createUser.mockResolvedValue(undefined);
    await expect(signUpAction(VALID)).resolves.toEqual({ ok: true, data: undefined });
  });

  it("reports a taken email as a conflict", async () => {
    createUser.mockImplementation(async () => {
      throw new ApiError("conflict", { status: 409 });
    });
    await expect(signUpAction(VALID)).resolves.toMatchObject({ ok: false, kind: "conflict" });
  });
});

describe("signUpAction with backend validation errors", () => {
  it("puts the DTO errors on the form fields with the form messages", async () => {
    createUser.mockImplementation(async () => {
      throw new ApiError("validation", { status: 400, fieldErrors: { mobileNumber: "mobileNumber should not be empty", acceptedTermsAndPrivacyPolicy: "acceptedTermsAndPrivacyPolicy must be equal to true", unknown: "x" } });
    });
    const result = await signUpAction(VALID);
    expect(result).toEqual({
      ok: false,
      kind: "validation",
      message: "Please review the highlighted fields.",
      fieldErrors: { phone: "Include the country code: +297 593 2211.", acceptTerms: "Accept the Terms and Privacy Policy to continue." },
    });
  });

  it("keeps the general message when no field can be matched", async () => {
    createUser.mockImplementation(async () => {
      throw new ApiError("validation", { status: 400, fieldErrors: { property: "property x should not exist" } });
    });
    await expect(signUpAction(VALID)).resolves.toMatchObject({ ok: false, message: "Some of the information is not valid. Please review it and try again.", fieldErrors: {} });
  });
});
