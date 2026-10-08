import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Toast } from "./Toast";
import { useToast } from "./ToastContext";
import { ToastProvider } from "./ToastProvider";

describe("Toast", () => {
  it("shows the message and a labelled action", async () => {
    const onAction = vi.fn();
    render(
      <Toast tone="success" actionLabel="Undo" onAction={onAction}>
        Appointment cancelled
      </Toast>,
    );
    expect(screen.getByText("Appointment cancelled")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("has no action button without a label", () => {
    render(<Toast>Saved</Toast>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

function Trigger({ onUndo }: { onUndo?: () => void }) {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() => toast({ message: "Appointment cancelled", tone: "success", action: onUndo ? { label: "Undo", onClick: onUndo } : undefined })}
    >
      Cancel
    </button>
  );
}

describe("ToastProvider", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("announces toasts in a polite live region and removes them after 5 seconds", async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    expect(screen.getByRole("region", { name: "Notifications" })).toHaveAttribute("aria-live", "polite");
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.getByText("Appointment cancelled")).toBeInTheDocument();
    act(() => void vi.advanceTimersByTime(5100));
    expect(screen.queryByText("Appointment cancelled")).not.toBeInTheDocument();
  });

  it("runs the action and closes the toast", async () => {
    const onUndo = vi.fn();
    render(
      <ToastProvider>
        <Trigger onUndo={onUndo} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await userEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(onUndo).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Appointment cancelled")).not.toBeInTheDocument();
  });

  it("does not close while the pointer is over it", async () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await userEvent.hover(screen.getByText("Appointment cancelled"));
    act(() => void vi.advanceTimersByTime(10000));
    expect(screen.getByText("Appointment cancelled")).toBeInTheDocument();
    await userEvent.unhover(screen.getByText("Appointment cancelled"));
    act(() => void vi.advanceTimersByTime(5100));
    expect(screen.queryByText("Appointment cancelled")).not.toBeInTheDocument();
  });

  it("throws a helpful error outside the provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});
