import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { InviteModal } from "./InviteModal";
import { emailIsTaken, errorTitle, roleOption, validateInvite } from "./InviteModal.utils";

/**
 * Renders the dialog inside the provider of toasts it needs.
 */
function renderDialog() {
  render(
    <ToastProvider>
      <InviteModal open onClose={() => {}} />
    </ToastProvider>,
  );
}

describe("InviteModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("shows the four roles and the number the chosen one needs", async () => {
    renderDialog();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(screen.getByLabelText("Vet number")).toHaveValue("VET-005");
    await userEvent.click(screen.getByRole("radio", { name: /Vet assistant/ }));
    expect(screen.getByLabelText("Assistant number")).toHaveValue("AST-002");
    await userEvent.click(screen.getByRole("radio", { name: /Receptionist/ }));
    expect(screen.queryByLabelText("Assistant number")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Vet number")).not.toBeInTheDocument();
  });

  it("says when the email already has an account", async () => {
    renderDialog();
    await userEvent.type(screen.getByLabelText("Full name"), "José Ruiz");
    await userEvent.type(screen.getByLabelText("Work email"), "jose.r@convet.aw");
    await userEvent.click(screen.getByRole("button", { name: "Send invitation" }));
    expect(screen.getByText("This email already has an account")).toBeInTheDocument();
    expect(screen.getByText("Already in use.")).toBeInTheDocument();
  });

  it("sends a valid invitation and shows what was assigned", async () => {
    renderDialog();
    await userEvent.type(screen.getByLabelText("Full name"), "Ana Tromp");
    await userEvent.type(screen.getByLabelText("Work email"), "ana.t@convet.aw");
    await userEvent.click(screen.getByRole("radio", { name: /Vet assistant/ }));
    await userEvent.click(screen.getByRole("button", { name: "Send invitation" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(screen.getByRole("dialog", { name: "Invitation sent" })).toBeInTheDocument();
    expect(screen.getByText("Email sent to ana.t@convet.aw")).toBeInTheDocument();
    expect(screen.getByText("STF-0007")).toBeInTheDocument();
    expect(screen.getByText("AST-002")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Copy invite link" }));
    expect(screen.getByText("Invite link copied.")).toBeInTheDocument();
  });
});

describe("invite utils", () => {
  it("validates and names", () => {
    const values = { name: "A", email: "a@b.co", role: "administrator" as const, number: "", location: "main" };
    expect(validateInvite(values)).toEqual({});
    expect(validateInvite({ ...values, role: "veterinarian" })).toEqual({ number: "Enter the number, e.g. VET-005." });
    expect(emailIsTaken({ email: "Already in use." })).toBe(true);
    expect(errorTitle(2, false)).toBe("Fix 2 fields to send the invitation");
    expect(roleOption("assistant").suggestion).toBe("AST-002");
  });
});
