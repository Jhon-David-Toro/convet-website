import { describe, expect, it } from "vitest";

import { onlyErrors, requireText, validateEmail } from "./validation.utils";

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
