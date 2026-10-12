import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { ClosureModal } from "./ClosureModal";
import { buildClosure, unaffectedText, validateClosure } from "./ClosureModal.utils";

describe("ClosureModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("asks for the reason before saving", async () => {
    const onAdd = vi.fn();
    render(
      <ToastProvider>
        <ClosureModal open onClose={() => {}} onAdd={onAdd} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save closure" }));
    expect(screen.getByText("Write the reason clients will see.")).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("adds the closure and closes", async () => {
    const onAdd = vi.fn();
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <ClosureModal open onClose={onClose} onAdd={onAdd} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("Reason shown to clients"), "Christmas Day");
    await userEvent.click(screen.getByRole("button", { name: "Save closure" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ date: "Dec 25, 2026", note: "Christmas Day" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("closure utils", () => {
  it("validates, builds and describes a closure", () => {
    expect(validateClosure({ date: "12 / 25 / 2026", reason: "Holiday" })).toEqual({});
    expect(Object.keys(validateClosure({ date: "", reason: "" }))).toEqual(["date", "reason"]);
    expect(buildClosure({ date: "12 / 25 / 2026", reason: " Holiday " }).note).toBe("Holiday");
    expect(unaffectedText("12 / 25 / 2026")).toBe("Nothing is booked on Fri, Dec 25, 2026.");
    expect(unaffectedText("")).toBe("");
  });
});
