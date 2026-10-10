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

  it("labels a long mixed password as strong", () => {
    render(<PasswordStrength password="Violet-Tiger-2026" />);
    expect(screen.getByRole("status")).toHaveTextContent("Very strong");
  });
});

describe("scorePassword", () => {
  it("scores by length, case, digit and symbol", () => {
    expect(scorePassword("")).toBe(0);
    expect(scorePassword("Aa1!")).toBe(1);
    expect(scorePassword("abcdefghij")).toBe(1);
    expect(scorePassword("Abcdefghij")).toBe(2);
    expect(scorePassword("Abcdefghi1")).toBe(3);
  });
});
