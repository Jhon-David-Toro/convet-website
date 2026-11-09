import { describe, expect, it } from "vitest";

import { ApiError, fieldErrorsFrom, kindFromStatus } from "./api.errors";

describe("kindFromStatus", () => {
  it.each([
    [401, "unauthorized"],
    [403, "forbidden"],
    [404, "not-found"],
    [400, "validation"],
    [409, "conflict"],
    [422, "validation"],
    [500, "server"],
    [503, "server"],
  ])("maps %i to %s", (status, kind) => {
    expect(kindFromStatus(status)).toBe(kind);
  });
});

describe("fieldErrorsFrom", () => {
  it("keys each class-validator message by its property", () => {
    expect(fieldErrorsFrom({ message: ["name should not be empty", "birthDate must be a valid ISO 8601 date string", "name must be a string"] })).toEqual({
      name: "name should not be empty",
      birthDate: "birthDate must be a valid ISO 8601 date string",
    });
  });

  it("accepts a single message and ignores bodies without one", () => {
    expect(fieldErrorsFrom({ message: "email must be an email" })).toEqual({ email: "email must be an email" });
    expect(fieldErrorsFrom(undefined)).toEqual({});
    expect(fieldErrorsFrom({ message: 4 })).toEqual({});
  });
});

describe("ApiError", () => {
  it("carries a safe message and keeps the technical detail apart", () => {
    const error = new ApiError("server", { status: 500, detail: "stack trace" });
    expect(error.message).not.toContain("stack trace");
    expect(error.detail).toBe("stack trace");
    expect(error.status).toBe(500);
  });
});
