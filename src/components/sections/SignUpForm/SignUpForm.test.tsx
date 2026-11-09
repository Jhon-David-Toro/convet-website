import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SignUpForm } from "./SignUpForm";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

/**
 * Fills every required field with valid data and leaves the terms unchecked.
 */
async function fillForm() {
  await userEvent.type(screen.getByLabelText("First name"), "Anna");
  await userEvent.type(screen.getByLabelText("Last name"), "Lee");
  await userEvent.type(screen.getByLabelText("Email"), "anna@example.com");
  await userEvent.type(screen.getByLabelText("Password"), "Violet-Tiger-2026!");
  await userEvent.type(screen.getByLabelText("Confirm password"), "Violet-Tiger-2026!");
  await userEvent.type(screen.getByLabelText(/Mobile/), "+297 560 1234");
}

describe("SignUpForm", () => {
  beforeEach(() => push.mockClear());

  it("shows the heading, the helpers and the link back to sign in", () => {
    render(<SignUpForm />);
    expect(screen.getByRole("heading", { level: 1, name: "Create your account" })).toBeInTheDocument();
    expect(screen.getByText("You will use it to sign in.")).toBeInTheDocument();
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
    expect(screen.getByText("Use at least 12 characters with upper and lower case letters, a number and a symbol.")).toBeInTheDocument();
    expect(screen.getByText("Accept the Terms and Privacy Policy to continue.")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("creates the account and goes to sign in", async () => {
    const onSubmit = vi.fn().mockResolvedValue({ ok: true, data: undefined });
    render(<SignUpForm onSubmit={onSubmit} />);
    await fillForm();
    await userEvent.click(screen.getByRole("checkbox", { name: /I accept the/ }));
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ firstName: "Anna", phone: "+297 560 1234", acceptTerms: true }));
    expect(push).toHaveBeenCalledWith("/sign-in");
  });

  it("shows a taken email on its field and keeps the data", async () => {
    const onSubmit = vi.fn().mockResolvedValue({ ok: false, kind: "conflict", message: "taken" });
    render(<SignUpForm onSubmit={onSubmit} />);
    await fillForm();
    await userEvent.click(screen.getByRole("checkbox", { name: /I accept the/ }));
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(await screen.findByText("This email is already registered. Try signing in.")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toHaveValue("Anna");
    expect(push).not.toHaveBeenCalled();
  });

  it("shows a banner for any other failure and lets the visitor try again", async () => {
    const onSubmit = vi.fn().mockResolvedValue({ ok: false, kind: "server", message: "Something went wrong on our side." });
    render(<SignUpForm onSubmit={onSubmit} />);
    await fillForm();
    await userEvent.click(screen.getByRole("checkbox", { name: /I accept the/ }));
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));
    expect(await screen.findByText("We could not create your account")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create account" })).toBeEnabled();
  });
});
