import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { DeleteAccountModal } from "./DeleteAccountModal";
import { validateDeletion } from "./DeleteAccountModal.utils";

describe("DeleteAccountModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("warns about the appointment and does not delete without the word and the password", async () => {
    render(
      <ToastProvider>
        <DeleteAccountModal open onClose={() => {}} />
      </ToastProvider>,
    );
    expect(screen.getByText("1 upcoming appointment will be cancelled")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Type DELETE to confirm"), "delete");
    await userEvent.click(screen.getByRole("button", { name: "Delete account" }));
    expect(screen.getByText("Fix 2 fields to delete the account")).toBeInTheDocument();
  });

  it("sends the request once confirmed and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <DeleteAccountModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("Type DELETE to confirm"), "DELETE");
    await userEvent.type(screen.getByLabelText("Password"), "secret-password");
    await userEvent.click(screen.getByRole("button", { name: "Delete account" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Check your email to confirm closing your account.")).toBeInTheDocument();
  });

  it("keeps the account from the cancel button", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <DeleteAccountModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Keep my account" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("deletion utils", () => {
  it("needs the exact word", () => {
    expect(validateDeletion({ confirmation: "DELETE", password: "x" })).toEqual({});
    expect(Object.keys(validateDeletion({ confirmation: "Delete", password: "" }))).toEqual(["confirmation", "password"]);
  });
});
