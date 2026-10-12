import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { pickOption } from "@/test/pickOption";

import { ServiceModal } from "./ServiceModal";
import { toggleVet, validateService } from "./ServiceModal.utils";

/**
 * Renders the dialog inside the provider of toasts it needs.
 *
 * @param onClose Called when the dialog closes.
 */
function renderDialog(onClose: () => void = () => {}) {
  render(
    <ToastProvider>
      <ServiceModal open onClose={onClose} />
    </ToastProvider>,
  );
}

describe("ServiceModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("asks for the name, the category and a vet", async () => {
    renderDialog();
    await userEvent.click(screen.getByRole("button", { name: "Create service" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix 3 fields to create the service");
    expect(screen.getByText("Enter the service name.")).toBeInTheDocument();
    expect(screen.getByText("Choose at least one vet.")).toBeInTheDocument();
  });

  it("creates a valid service and closes", async () => {
    const onClose = vi.fn();
    renderDialog(onClose);
    await userEvent.type(screen.getByLabelText("Service name"), "Dental check");
    await pickOption("Category", "Preventive care");
    await userEvent.click(screen.getByRole("checkbox", { name: "Dr. Shirley" }));
    await userEvent.click(screen.getByRole("button", { name: "Create service" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Service created.")).toBeInTheDocument();
  });
});

describe("service utils", () => {
  it("toggles a vet and validates", () => {
    expect(toggleVet(["A"], "B")).toEqual(["A", "B"]);
    expect(toggleVet(["A", "B"], "A")).toEqual(["B"]);
    expect(validateService({ name: "X", category: "preventive", duration: "30", buffer: "10", vets: ["A"], online: true })).toEqual({});
  });
});
