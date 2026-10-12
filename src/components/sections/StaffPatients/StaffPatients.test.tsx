import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { pickOption } from "@/test/pickOption";

import { StaffPatients } from "./StaffPatients";
import { INITIAL_FILTERS } from "./StaffPatients.constants";
import { breedLine, filterPatients, rowMenuItems } from "./StaffPatients.utils";

describe("StaffPatients", () => {
  it("shows the figures, the filters and the first page of the table", () => {
    render(<StaffPatients />);
    expect(screen.getByRole("heading", { level: 1, name: "Patients" })).toBeInTheDocument();
    expect(screen.getByText("Overdue vaccines")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(7);
    expect(screen.getByText("Showing 1–6 of 214")).toBeInTheDocument();
  });

  it("lists the same patients as cards for mobile", () => {
    render(<StaffPatients />);
    const cards = within(screen.getByRole("list", { name: "Patients" })).getAllByRole("listitem");
    expect(cards).toHaveLength(6);
    expect(within(cards[0]).getByText("Rabies due Oct 20")).toBeInTheDocument();
  });

  it("filters by what is typed in the search", async () => {
    render(<StaffPatients />);
    await userEvent.type(screen.getByRole("searchbox", { name: "Pet name, owner, phone or microchip" }), "anna");
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("filters by the chips and by the lists", async () => {
    render(<StaffPatients />);
    await userEvent.click(screen.getByRole("button", { name: /Cats/ }));
    expect(screen.getAllByRole("row")).toHaveLength(3);
    await pickOption("Vaccine status", "Overdue");
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });

  it("offers to clear the filters when nothing matches", async () => {
    render(<StaffPatients />);
    await userEvent.type(screen.getByRole("searchbox", { name: "Pet name, owner, phone or microchip" }), "Rocki");
    expect(screen.getByText("No patients match “Rocki”")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getAllByRole("row")).toHaveLength(7);
  });

  it("asks to confirm before archiving a patient from the menu", async () => {
    render(
      <ToastProvider>
        <StaffPatients />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Actions for Luna" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "Archive patient" }));
    expect(screen.getByRole("dialog", { name: "Archive Luna?" })).toBeInTheDocument();
  });

  it("opens the new patient dialog", async () => {
    render(
      <ToastProvider>
        <StaffPatients />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "New patient" }));
    expect(screen.getByRole("dialog", { name: "New patient" })).toBeInTheDocument();
  });

  it("opens the menu of a row with its actions", async () => {
    render(<StaffPatients />);
    await userEvent.click(screen.getByRole("button", { name: "Actions for Luna" }));
    expect(screen.getByRole("menuitem", { name: "View patient record" })).toHaveAttribute("href", "/staff/patients/luna");
    expect(screen.getByRole("menuitem", { name: "Archive patient" })).toBeInTheDocument();
  });
});

describe("patients utils", () => {
  it("filters by the chip of other species and by the upcoming visit", () => {
    expect(filterPatients({ ...INITIAL_FILTERS, chip: "other" }).map((patient) => patient.name)).toEqual(["Kiwi", "Max"]);
    expect(filterPatients({ ...INITIAL_FILTERS, chip: "upcoming" })).toHaveLength(5);
  });

  it("writes the breed line and builds the menu of a row", () => {
    expect(breedLine({ species: "bird", breed: "Lovebird" } as Parameters<typeof breedLine>[0])).toBe("Bird · Lovebird");
    expect(rowMenuItems(() => {}, () => {}).at(-1)?.tone).toBe("destructive");
  });
});
