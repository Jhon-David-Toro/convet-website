import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { STAFF_PATIENT } from "@/lib/staff/staff.constants";

import { PatientRecord } from "./PatientRecord";
import { entriesFor, patientCrumbs } from "./PatientRecord.utils";

describe("PatientRecord", () => {
  it("shows the patient, the last signed visit and the owner", () => {
    render(<PatientRecord patient={STAFF_PATIENT} />);
    expect(screen.getByRole("heading", { level: 1, name: "Luna" })).toBeInTheDocument();
    expect(screen.getByText("Allergic to penicillin")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Consultation · limping" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Message on WhatsApp" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Start visit/ })).toHaveAttribute("href", "/staff/visits/luna-today");
  });

  it("switches the tab of the history", async () => {
    render(<PatientRecord patient={STAFF_PATIENT} />);
    await userEvent.click(screen.getByRole("tab", { name: "Treatments" }));
    expect(screen.getByText("Carprofen 50 mg · 5 days")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Consultation · limping" })).not.toBeInTheDocument();
  });
});

describe("patient record utils", () => {
  it("filters the history by tab", () => {
    expect(entriesFor("vaccines").map((entry) => entry.id)).toEqual(["dhpp"]);
    expect(entriesFor("appointments")).toHaveLength(2);
  });

  it("builds the path to the patient", () => {
    expect(patientCrumbs(STAFF_PATIENT).map((crumb) => crumb.label)).toEqual(["Patients", "Anna Lee", "Luna"]);
  });
});

describe("PatientRecord from the backend", () => {
  it("shows the backend visit, hides the sample owner and reports a records error", () => {
    const record = { lastVisit: { title: "Consultation", meta: "Sep 11, 2026", vitals: { weight: "—", temperature: "—", heartRate: "—" }, findings: "Limping", diagnosis: "Strain", plan: "Rest", internalNotes: "", sharedSummary: "" }, timeline: [] };
    const { unmount } = render(<PatientRecord patient={STAFF_PATIENT} record={record} />);
    expect(screen.getByText("Limping")).toBeInTheDocument();
    expect(screen.queryByText("Anna Lee")).not.toBeInTheDocument();
    unmount();
    render(<PatientRecord patient={STAFF_PATIENT} record={{ timeline: [], recordsError: "You do not have permission to do this." }} />);
    expect(screen.getByText("You do not have permission to do this.")).toBeInTheDocument();
    expect(screen.getByText("No visits yet.")).toBeInTheDocument();
  });
});
