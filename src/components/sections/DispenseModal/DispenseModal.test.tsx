import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { STAFF_INVENTORY_ROWS } from "@/lib/staff/staff.inventory.constants";

import { DispenseModal } from "./DispenseModal";
import { dispensableLots, leftAfter, validateDispense } from "./DispenseModal.utils";

const CARPROFEN = STAFF_INVENTORY_ROWS[1];

describe("DispenseModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("shows the product, the first lot to expire and what is left after the quantity", async () => {
    render(
      <ToastProvider>
        <DispenseModal open onClose={() => {}} product={CARPROFEN} />
      </ToastProvider>,
    );
    expect(screen.getByRole("dialog", { name: "Dispense medication" })).toBeInTheDocument();
    expect(screen.getByText("Carprofen 50 mg")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Lot (FEFO)" })).toHaveTextContent("CP-7802 · exp Nov 30, 2026");
    await userEvent.clear(screen.getByLabelText("Quantity"));
    await userEvent.type(screen.getByLabelText("Quantity"), "10");
    expect(screen.getByText("Left after: 18 tablets")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dispense 10 tablets" })).toBeInTheDocument();
  });

  it("does not dispense more than the lot has", async () => {
    render(
      <ToastProvider>
        <DispenseModal open onClose={() => {}} product={CARPROFEN} />
      </ToastProvider>,
    );
    await userEvent.clear(screen.getByLabelText("Quantity"));
    await userEvent.type(screen.getByLabelText("Quantity"), "40");
    await userEvent.click(screen.getByRole("button", { name: "Dispense 40 tablets" }));
    expect(screen.getByText("Only 28 tablets left in this lot.")).toBeInTheDocument();
  });

  it("dispenses, tells it and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <DispenseModal open onClose={onClose} product={CARPROFEN} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Dispense 1 tablets" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Dispensed and recorded on the visit.")).toBeInTheDocument();
  });
});

describe("dispense utils", () => {
  it("lists lots, counts what is left and validates", () => {
    expect(dispensableLots(CARPROFEN)).toHaveLength(2);
    const values = { patient: "Rocky", lot: "CP-7802", quantity: "10", instructions: "x" };
    expect(leftAfter(CARPROFEN, values)).toBe(18);
    expect(validateDispense(CARPROFEN)(values)).toEqual({});
    expect(Object.keys(validateDispense(CARPROFEN)({ ...values, quantity: "0", patient: "" }))).toEqual(["patient", "quantity"]);
  });
});
