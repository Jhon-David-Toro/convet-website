import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { sentMessage, validateResetEmail } from "./ForgotPasswordForm.utils";

describe("ForgotPasswordForm", () => {
  it("shows the heading and the link back to sign in", () => {
    render(<ForgotPasswordForm />);
    expect(screen.getByRole("heading", { level: 1, name: "Reset your password" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to sign in" })).toHaveAttribute("href", "/sign-in");
  });

  it("asks for a valid email before sending", async () => {
    const onSubmit = vi.fn();
    render(<ForgotPasswordForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText("Email"), "anna@example");
    await userEvent.click(screen.getByRole("button", { name: "Send reset link" }));
    expect(screen.getByText("Enter an email like name@example.com.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("sends the link, confirms it and can send it again", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ForgotPasswordForm onSubmit={onSubmit} />);
    await userEvent.type(screen.getByLabelText("Email"), "anna@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Send reset link" }));
    expect(await screen.findByText("Check your inbox")).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith("anna@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Resend link" }));
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});

describe("forgot password utils", () => {
  it("validates the email and writes a message that does not reveal the account", () => {
    expect(validateResetEmail("")).toBe("Enter your email.");
    expect(validateResetEmail("a@b.co")).toBeUndefined();
    expect(sentMessage("a@b.co")).toContain("If an account exists for a@b.co");
  });
});
