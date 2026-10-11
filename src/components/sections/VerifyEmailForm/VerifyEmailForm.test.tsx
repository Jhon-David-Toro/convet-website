import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { VerifyEmailForm } from "./VerifyEmailForm";
import { formatCountdown, verifySubtitle } from "./VerifyEmailForm.utils";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

describe("VerifyEmailForm", () => {
  beforeEach(() => push.mockClear());

  it("asks for the code sent to the address", () => {
    render(<VerifyEmailForm email="anna@example.com" />);
    expect(screen.getByRole("heading", { level: 1, name: "Check your email" })).toBeInTheDocument();
    expect(screen.getByText(/anna@example.com/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Verify email" })).toBeDisabled();
  });

  it("verifies a complete code and opens the home page", async () => {
    const onVerify = vi.fn().mockResolvedValue(true);
    render(<VerifyEmailForm email="anna@example.com" onVerify={onVerify} />);
    await userEvent.click(screen.getAllByRole("textbox")[0]);
    await userEvent.keyboard("481902");
    await userEvent.click(screen.getByRole("button", { name: "Verify email" }));
    expect(onVerify).toHaveBeenCalledWith("481902");
    expect(push).toHaveBeenCalledWith("/");
  });

  it("marks the code as invalid when it is rejected", async () => {
    render(<VerifyEmailForm email="anna@example.com" onVerify={vi.fn().mockResolvedValue(false)} />);
    await userEvent.click(screen.getAllByRole("textbox")[0]);
    await userEvent.keyboard("481902");
    await userEvent.click(screen.getByRole("button", { name: "Verify email" }));
    expect(await screen.findByText("That code is not right. Check it and try again.")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});

describe("resend countdown", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("counts down and then lets the visitor ask for a new code", () => {
    render(<VerifyEmailForm email="anna@example.com" />);
    expect(screen.getByRole("button", { name: "Resend in 0:42" })).toBeDisabled();
    act(() => {
      vi.advanceTimersByTime(42_000);
    });
    expect(screen.getByRole("button", { name: "Resend code" })).toBeEnabled();
  });
});

describe("verify email utils", () => {
  it("formats the countdown and builds the subtitle", () => {
    expect(formatCountdown(42)).toBe("0:42");
    expect(formatCountdown(65)).toBe("1:05");
    expect(verifySubtitle("a@b.co")).toContain("a@b.co");
  });
});

describe("VerifyEmailForm resend and storage", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("asks for a new code and starts the countdown again", async () => {
    const onResend = vi.fn();
    render(<VerifyEmailForm email="anna@example.com" onResend={onResend} />);
    act(() => {
      vi.advanceTimersByTime(42_000);
    });
    await userEvent.click(screen.getByRole("button", { name: "Resend code" }));
    expect(onResend).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Resend in 0:42" })).toBeDisabled();
  });

  it("does not verify an incomplete code", async () => {
    const onVerify = vi.fn();
    render(<VerifyEmailForm email="anna@example.com" onVerify={onVerify} />);
    const form = screen.getByRole("button", { name: "Verify email" }).closest("form") as HTMLFormElement;
    act(() => {
      form.requestSubmit();
    });
    expect(onVerify).not.toHaveBeenCalled();
  });

  it("uses the address saved by the sign up when none is given", () => {
    window.sessionStorage.setItem("convet:pending-email", "saved@example.com");
    render(<VerifyEmailForm />);
    expect(screen.getByText(/saved@example.com/)).toBeInTheDocument();
    window.sessionStorage.clear();
  });
});

describe("VerifyEmailForm without handlers", () => {
  it("accepts a complete code and opens the home page", async () => {
    render(<VerifyEmailForm email="anna@example.com" />);
    await userEvent.click(screen.getAllByRole("textbox")[0]);
    await userEvent.keyboard("481902");
    await userEvent.click(screen.getByRole("button", { name: "Verify email" }));
    expect(push).toHaveBeenCalledWith("/");
  });

  it("shows a generic text on the server, before the saved address can be read", () => {
    expect(renderToString(<VerifyEmailForm />)).toContain("your email");
  });
});
