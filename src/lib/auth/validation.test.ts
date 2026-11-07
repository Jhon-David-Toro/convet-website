import { describe, expect, it } from "vitest";

import { onlyErrors, requireText, validateEmail, validateNewPassword } from "./validation.utils";

describe("validation", () => {
  it("accepts a normal address and rejects an incomplete one", () => {
    expect(validateEmail("anna@example.com")).toBeUndefined();
    expect(validateEmail("anna@example")).toBeDefined();
  });

  it("requires some text", () => {
    expect(requireText("  ", "Required")).toBe("Required");
    expect(requireText("Anna", "Required")).toBeUndefined();
  });

  it("keeps only the fields with a message", () => {
    expect(onlyErrors({ name: "Required", email: undefined })).toEqual({ name: "Required" });
  });
});

describe("validateNewPassword", () => {
  it("applies the backend rules: 12 characters, both cases, a number and a symbol", () => {
    expect(validateNewPassword("Violet-Tiger-2026!")).toBeUndefined();
    expect(validateNewPassword("Short-1a")).toBeDefined();
    expect(validateNewPassword("violet-tiger-2026!")).toBeDefined();
    expect(validateNewPassword("VIOLET-TIGER-2026!")).toBeDefined();
    expect(validateNewPassword("Violet-Tiger-Rocks")).toBeDefined();
    expect(validateNewPassword("VioletTiger20261")).toBeDefined();
  });
});
