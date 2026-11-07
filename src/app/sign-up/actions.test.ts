import { beforeEach, describe, expect, it, vi } from "vitest";

const { createUser } = vi.hoisted(() => ({ createUser: vi.fn() }));
vi.mock("@/lib/api/users.api", () => ({ createUser }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

import { ApiError } from "@/lib/api/api.errors";

import { signUpAction } from "./actions";

const VALID = { firstName: "Anna", lastName: "Lee", email: "anna@example.com", phone: "+297 560 1234", password: "Violet-Tiger-2026!", acceptTerms: true, whatsappReminders: false };

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
