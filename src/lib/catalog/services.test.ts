import { describe, expect, it } from "vitest";

import { SERVICES } from "./services.constants";
import { findService } from "./services.utils";

describe("findService", () => {
  it("finds a service by its slug and returns nothing for an unknown one", () => {
    expect(findService(SERVICES[0].slug)).toBe(SERVICES[0]);
    expect(findService("nobody")).toBeUndefined();
  });
});
