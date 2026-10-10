import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SignInForm } from "./SignInForm";

/**
 * Types valid credentials and submits the form.
 */
async function signIn() {
  await userEvent.type(screen.getByLabelText("Email"), "anna@example.com");
  await userEvent.type(screen.getByLabelText("Password"), "secret-password");
  await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
}

describe("SignInForm", () => {
  it("shows the heading, the options and the links to the other auth pages", () => {
    render(<SignInForm />);
    expect(screen.getByRole("heading", { level: 1, name: "Welcome back" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Keep me signed in" })).toBeChecked();
    expect(screen.getByRole("link", { name: "Forgot password?" })).toHaveAttribute("href", "/forgot-password");
    expect(screen.getByRole("link", { name: "Create an account" })).toHaveAttribute("href", "/sign-up");
  });

  it("asks for the missing fields without submitting", async () => {
    const onSubmit = vi.fn();
    render(<SignInForm onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByText("Enter your email.")).toBeInTheDocument();
    expect(screen.getByText("Enter your password.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits valid credentials", async () => {
    const onSubmit = vi.fn().mockResolvedValue({ ok: true });
    render(<SignInForm onSubmit={onSubmit} />);
    await signIn();
    expect(onSubmit).toHaveBeenCalledWith({ email: "anna@example.com", password: "secret-password", remember: true });
  });

  it("shows the alert and the credential errors when they are rejected", async () => {
    render(<SignInForm onSubmit={vi.fn().mockResolvedValue({ ok: false })} />);
    await signIn();
    expect(await screen.findByText("Email or password is incorrect")).toBeInTheDocument();
    expect(screen.getByText("Check the email address.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reset password" })).toHaveAttribute("href", "/forgot-password");
  });

  it("disables the button and says it is signing in while waiting", async () => {
    render(<SignInForm onSubmit={() => new Promise(() => {})} />);
    await signIn();
    expect(await screen.findByRole("button", { name: /Signing in/ })).toBeDisabled();
  });
});
