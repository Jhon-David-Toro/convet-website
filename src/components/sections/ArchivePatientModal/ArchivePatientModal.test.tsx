import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { STAFF_PATIENT_ROWS } from "@/lib/staff/staff.patients.constants";

import { ArchivePatientModal } from "./ArchivePatientModal";
import { archiveDescription, archivedMessage, archiveTitle } from "./ArchivePatientModal.utils";

const ROCKY = STAFF_PATIENT_ROWS[2];
const KIWI = STAFF_PATIENT_ROWS[4];

describe("ArchivePatientModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("warns that the upcoming appointment is cancelled", () => {
    render(
      <ToastProvider>
        <ArchivePatientModal open onClose={() => {}} patient={ROCKY} />
      </ToastProvider>,
    );
    expect(screen.getByRole("dialog", { name: "Archive Rocky?" })).toBeInTheDocument();
    expect(screen.getByText("Upcoming appointment will be cancelled")).toBeInTheDocument();
    expect(screen.getByText(/Tue, Oct 13 · 10:20 AM with Dr. Larry/)).toBeInTheDocument();
  });

  it("has no warning for a patient without appointments", () => {
    render(
      <ToastProvider>
        <ArchivePatientModal open onClose={() => {}} patient={KIWI} />
      </ToastProvider>,
    );
    expect(screen.queryByText("Upcoming appointment will be cancelled")).not.toBeInTheDocument();
  });

  it("archives the patient, tells it and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <ArchivePatientModal open onClose={onClose} patient={ROCKY} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Archive patient" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Rocky was archived.")).toBeInTheDocument();
  });

  it("keeps the patient from the cancel button", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <ArchivePatientModal open onClose={onClose} patient={ROCKY} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Keep patient" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("archive utils", () => {
  it("writes the texts", () => {
    expect(archiveTitle("Rocky")).toBe("Archive Rocky?");
    expect(archiveDescription("Rocky")).toContain("The clinical history is kept (min. 5 years)");
    expect(archivedMessage("Rocky")).toBe("Rocky was archived.");
  });
});
