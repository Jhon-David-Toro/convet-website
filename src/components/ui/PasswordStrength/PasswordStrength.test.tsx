import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PasswordStrength } from "./PasswordStrength";
import { scorePassword } from "./PasswordStrength.utils";

describe("PasswordStrength", () => {
  it("shows nothing for an empty password", () => {
    const { container } = render(<PasswordStrength password="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("labels a short password as weak", () => {
    render(<PasswordStrength password="abc" />);
    expect(screen.getByRole("status")).toHaveTextContent("Weak");
  });

  it("labels a password meeting the minimum requirements as strong", () => {
    render(<PasswordStrength password="Abc123" />);
    expect(screen.getByRole("status")).toHaveTextContent("Strong");
  });

  it("labels a password with both numbers and symbols as very strong", () => {
    render(<PasswordStrength password="Violet-Tiger-2026" />);
    expect(screen.getByRole("status")).toHaveTextContent("Very strong");
  });
});

describe("scorePassword", () => {
  it("scores passwords according to the updated strength criteria", () => {
    expect(scorePassword("")).toBe(0);
    expect(scorePassword("abc")).toBe(1);
    expect(scorePassword("Aa1!")).toBe(1);
    expect(scorePassword("abcdef")).toBe(1);
    expect(scorePassword("Abcdef")).toBe(2);
    expect(scorePassword("Abc123")).toBe(3);
    expect(scorePassword("Abc!xy")).toBe(3);
    expect(scorePassword("Abc123!")).toBe(4);
  });

  it("does not count whitespace as a symbol", () => {
    expect(scorePassword("Abc 12")).toBe(3);
  });
});