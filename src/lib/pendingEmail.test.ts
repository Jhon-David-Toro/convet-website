import { beforeEach, describe, expect, it } from "vitest";

import { readPendingEmail, savePendingEmail } from "./pendingEmail";

describe("pending email", () => {
  beforeEach(() => window.sessionStorage.clear());

  it("remembers the address and reads it back", () => {
    expect(readPendingEmail()).toBeNull();
    savePendingEmail("anna@example.com");
    expect(readPendingEmail()).toBe("anna@example.com");
  });
});
