import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { PasswordModal } from "./PasswordModal";
import { validatePasswords } from "./PasswordModal.utils";

describe("PasswordModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("rejects a short password and one that does not match", async () => {
    render(
      <ToastProvider>
        <PasswordModal open onClose={() => {}} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("Current password"), "old-password-1");
    await userEvent.type(screen.getByLabelText("New password"), "short");
    await userEvent.type(screen.getByLabelText("Repeat new password"), "other");
    await userEvent.click(screen.getByRole("button", { name: "Update password" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix 2 fields to update the password");
    expect(screen.getByText("The passwords do not match.")).toBeInTheDocument();
  });

  it("updates a valid password and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <PasswordModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("Current password"), "old-password-1");
    await userEvent.type(screen.getByLabelText("New password"), "A-much-longer-1!");
    await userEvent.type(screen.getByLabelText("Repeat new password"), "A-much-longer-1!");
    await userEvent.click(screen.getByRole("button", { name: "Update password" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Password updated. Please sign in again.")).toBeInTheDocument();
  });
});

describe("PasswordModal saving through the backend", () => {
  /**
   * Fills the dialog with a valid new password and submits it.
   */
  async function fillAndSubmit() {
    await userEvent.type(screen.getByLabelText("Current password"), "old-password-1");
    await userEvent.type(screen.getByLabelText("New password"), "A-much-longer-1!");
    await userEvent.type(screen.getByLabelText("Repeat new password"), "A-much-longer-1!");
    await userEvent.click(screen.getByRole("button", { name: "Update password" }));
  }

  it("saves through onSave and closes only when it worked", async () => {
    const onClose = vi.fn();
    const onSave = vi.fn().mockResolvedValue({ ok: true });
    render(
      <ToastProvider>
        <PasswordModal open onClose={onClose} onSave={onSave} />
      </ToastProvider>,
    );
    await fillAndSubmit();
    expect(onSave).toHaveBeenCalledWith({ current: "old-password-1", next: "A-much-longer-1!", repeat: "A-much-longer-1!" });
    await vi.waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it("shows the server message and the field error and stays open when it is refused", async () => {
    const onClose = vi.fn();
    const onSave = vi.fn().mockResolvedValue({ ok: false, message: "Your current password is not correct.", fieldErrors: { current: "Your current password is not correct." } });
    render(
      <ToastProvider>
        <PasswordModal open onClose={onClose} onSave={onSave} />
      </ToastProvider>,
    );
    await fillAndSubmit();
    expect(await screen.findByRole("alert")).toHaveTextContent("Your current password is not correct.");
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByLabelText("New password")).toHaveValue("A-much-longer-1!");
  });
});

describe("password utils", () => {
  it("does not accept the current password again", () => {
    expect(Object.keys(validatePasswords({ current: "Same-password-1!", next: "Same-password-1!", repeat: "Same-password-1!" }))).toEqual(["next"]);
  });
});
