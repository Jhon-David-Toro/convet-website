import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SignUpForm } from "./SignUpForm";
import { readPendingEmail } from "@/lib/pendingEmail";

import { validateSignUp } from "./SignUpForm.utils";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

/**
 * Fills every required field with valid data and leaves the terms unchecked.
 */
async function fillForm() {
  await userEvent.type(screen.getByLabelText("First name"), "Anna");
  await userEvent.type(screen.getByLabelText("Last name"), "Lee");
  await userEvent.type(screen.getByLabelText("Email"), "anna@example.com");
  await userEvent.type(screen.getByLabelText("Password"), "Violet-Tiger-2026");
}

describe("SignUpForm", () => {
  beforeEach(() => push.mockClear());

  it("shows the heading, the helpers and the link back to sign in", () => {
    render(<SignUpForm />);
    expect(screen.getByRole("heading", { level: 1, name: "Create your account" })).toBeInTheDocument();
    expect(screen.getByText("We'll send a 6-digit code to verify it.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/sign-in");
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
  });

  it("measures the strength of the password while typing", async () => {
    render(<SignUpForm />);
    await userEvent.type(screen.getByLabelText("Password"), "abc");
    expect(screen.getByRole("status")).toHaveTextContent("Weak");
  });

  it("asks for what is missing and does not move on", async () => {
    render(<SignUpForm />);
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(screen.getByText("Enter your first name.")).toBeInTheDocument();
    expect(screen.getByText("Use at least 10 characters.")).toBeInTheDocument();
    expect(screen.getByText("Accept the Terms and Privacy Policy to continue.")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("creates the account and opens the email verification", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<SignUpForm onSubmit={onSubmit} />);
    await fillForm();
    await userEvent.click(screen.getByRole("checkbox", { name: /I accept the/ }));
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ firstName: "Anna", acceptTerms: true }));
    expect(push).toHaveBeenCalledWith("/verify-email");
    expect(readPendingEmail()).toBe("anna@example.com");
  });
});

describe("sign-up utils", () => {
  it("accepts a complete form", () => {
    const values = { firstName: "Anna", lastName: "Lee", email: "a@b.co", phone: "", password: "0123456789", acceptTerms: true, whatsappReminders: false };
    expect(validateSignUp(values)).toEqual({});
  });
});
