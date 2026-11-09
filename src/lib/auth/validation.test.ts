import { describe, expect, it } from "vitest";

import {
  onlyErrors,
  requireText,
  validateEmail,
  validateNewPassword,
} from "./validation.utils";

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
    expect(
      onlyErrors({ name: "Required", email: undefined }),
    ).toEqual({ name: "Required" });
  });
});

describe("validateNewPassword", () => {
  it("applies the backend rules: 6 characters, an uppercase letter, and a number or symbol", () => {
    expect(validateNewPassword("Abc123")).toBeUndefined();
    expect(validateNewPassword("Abc!xy")).toBeUndefined();
    expect(validateNewPassword("ABC123")).toBeUndefined();

    expect(validateNewPassword("Ab1!")).toBeDefined();
    expect(validateNewPassword("abcdef")).toBeDefined();
    expect(validateNewPassword("violet-tiger-2026!")).toBeDefined();
    expect(validateNewPassword("VioletTigerRocks")).toBeDefined();
  });
});