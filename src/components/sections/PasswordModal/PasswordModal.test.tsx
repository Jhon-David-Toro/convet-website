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
    await userEvent.type(screen.getByLabelText("New password"), "a-much-longer-one");
    await userEvent.type(screen.getByLabelText("Repeat new password"), "a-much-longer-one");
    await userEvent.click(screen.getByRole("button", { name: "Update password" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Password updated. Other devices were signed out.")).toBeInTheDocument();
  });
});

describe("password utils", () => {
  it("does not accept the current password again", () => {
    expect(Object.keys(validatePasswords({ current: "samepassword1", next: "samepassword1", repeat: "samepassword1" }))).toEqual(["next"]);
  });
});
