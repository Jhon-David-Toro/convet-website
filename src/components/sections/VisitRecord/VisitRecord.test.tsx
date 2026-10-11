import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { STAFF_PATIENT, STAFF_VISIT } from "@/lib/staff.constants";

import { VisitRecord } from "./VisitRecord";
import { expiredLotMessage, lotDetail, lotLine, visitTitle } from "./VisitRecord.utils";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

/**
 * Renders the visit record with the toasts it needs.
 *
 * @returns The Testing Library render result.
 */
function renderVisit() {
  return render(
    <ToastProvider>
      <VisitRecord visit={STAFF_VISIT} patient={STAFF_PATIENT} />
    </ToastProvider>,
  );
}

describe("VisitRecord", () => {
  it("fills the form with the visit in progress", () => {
    renderVisit();
    expect(screen.getByRole("heading", { level: 1, name: "New visit · Luna" })).toBeInTheDocument();
    expect(screen.getByLabelText("Reason for visit")).toHaveValue("Limping has not improved after a week of rest");
    expect(screen.getByLabelText("Temperature (°C)")).toHaveValue("38.6");
    expect(screen.getByText("LP-25102 · exp Jan 31, 2027")).toBeInTheDocument();
  });

  it("lets the vet edit a field", async () => {
    renderVisit();
    const weight = screen.getByLabelText("Weight (kg)");
    await userEvent.clear(weight);
    await userEvent.type(weight, "18.6");
    expect(weight).toHaveValue("18.6");
  });

  it("removes the vaccination and adds it back", async () => {
    renderVisit();
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.queryByText("Vaccination given today")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Add vaccination" }));
    expect(screen.getByText("Vaccination given today")).toBeInTheDocument();
  });

  it("saves a draft and signs the visit", async () => {
    renderVisit();
    await userEvent.click(screen.getByRole("button", { name: "Save draft" }));
    expect(await screen.findByText("Draft saved.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Finish & sign" }));
    expect(push).toHaveBeenCalledWith("/staff");
  });
});

describe("visit record utils", () => {
  it("describes the suggested lot", () => {
    expect(lotLine(STAFF_VISIT.lot)).toBe("LP-25102 · exp Jan 31, 2027");
    expect(lotDetail(STAFF_VISIT.lot, "Suggested")).toBe("9 doses left · Suggested");
  });

  it("explains why an expired lot cannot be used", () => {
    expect(expiredLotMessage("LP-23877")).toBe("Lot LP-23877 is expired and can't be used.");
  });

  it("titles the visit with the patient", () => {
    expect(visitTitle("New visit", "Luna")).toBe("New visit · Luna");
  });
});
