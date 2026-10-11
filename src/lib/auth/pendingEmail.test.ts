import { beforeEach, describe, expect, it, vi } from "vitest";

import { readPendingEmail, savePendingEmail } from "./pendingEmail";

describe("pending email", () => {
  beforeEach(() => window.sessionStorage.clear());

  it("remembers the address and reads it back", () => {
    expect(readPendingEmail()).toBeNull();
    savePendingEmail("anna@example.com");
    expect(readPendingEmail()).toBe("anna@example.com");
  });
});

describe("pending email with blocked storage", () => {
  it("reads nothing when the storage cannot be used", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readPendingEmail()).toBeNull();
    spy.mockRestore();
  });
});
