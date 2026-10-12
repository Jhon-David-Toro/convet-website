import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { SupplierModal } from "./SupplierModal";
import { errorTitle, validateSupplier } from "./SupplierModal.utils";

describe("SupplierModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("asks for what is missing", async () => {
    render(
      <ToastProvider>
        <SupplierModal open onClose={() => {}} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save supplier" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix 3 fields to save the supplier");
    expect(screen.getByText("Enter the company name.")).toBeInTheDocument();
  });

  it("saves a valid supplier, tells it in a toast and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <SupplierModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("Company name"), "Caribbean Vet Supply");
    await userEvent.type(screen.getByLabelText("Contact email"), "orders@cvs.example");
    await userEvent.type(screen.getByLabelText("Phone"), "582 0000");
    await userEvent.click(screen.getByRole("button", { name: "Save supplier" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Supplier saved.")).toBeInTheDocument();
  });

  it("renders nothing while it is closed", () => {
    render(
      <ToastProvider>
        <SupplierModal open={false} onClose={() => {}} />
      </ToastProvider>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("supplier utils", () => {
  it("validates and titles", () => {
    expect(validateSupplier({ company: "A", email: "a@b.co", phone: "+297 582 0000", notes: "" })).toEqual({});
    expect(errorTitle(1)).toBe("Fix 1 field to save the supplier");
  });
});
