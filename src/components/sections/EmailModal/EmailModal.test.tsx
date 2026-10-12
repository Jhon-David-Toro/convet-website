import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { EmailModal } from "./EmailModal";
import { formatCode, validateEmailChange } from "./EmailModal.utils";

describe("EmailModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("asks for a valid email and the whole code", async () => {
    render(
      <ToastProvider>
        <EmailModal open onClose={() => {}} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("New email"), "anna@");
    await userEvent.type(screen.getByLabelText("Code from the email"), "48");
    await userEvent.click(screen.getByRole("button", { name: "Confirm new email" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix 2 fields to change the email");
    expect(screen.getByText("Enter the 6-digit code from the email.")).toBeInTheDocument();
  });

  it("confirms the new email with its code and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <EmailModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("New email"), "anna.lee@example.com");
    await userEvent.type(screen.getByLabelText("Code from the email"), "482910");
    expect(screen.getByLabelText("Code from the email")).toHaveValue("482 910");
    await userEvent.click(screen.getByRole("button", { name: "Confirm new email" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("email utils", () => {
  it("formats the code and validates", () => {
    expect(formatCode("48a2910999")).toBe("482 910");
    expect(formatCode("48")).toBe("48");
    expect(validateEmailChange({ email: "a@b.co", code: "482 910" })).toEqual({});
  });
});
