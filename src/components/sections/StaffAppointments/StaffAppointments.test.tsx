import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { StaffAppointments } from "./StaffAppointments";
import { filterAppointments, pageCountFor, pageRows } from "./StaffAppointments.utils";
import { INITIAL_FILTERS } from "./StaffAppointments.constants";

describe("StaffAppointments", () => {
  it("shows the first page of the table with its summary", () => {
    render(<StaffAppointments />);
    expect(screen.getByRole("heading", { level: 1, name: "Appointments" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(9);
    expect(screen.getByText("Showing 1–8 of 14")).toBeInTheDocument();
  });

  it("filters by what is typed in the search", async () => {
    render(<StaffAppointments />);
    await userEvent.type(screen.getByRole("searchbox", { name: "Search pet, owner or phone" }), "luna");
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });

  it("shows an empty state for a day without appointments", async () => {
    render(<StaffAppointments />);
    await userEvent.click(screen.getByRole("button", { name: "Tomorrow" }));
    expect(screen.getByText("No appointments found")).toBeInTheDocument();
  });

  it("goes to the next page", async () => {
    render(<StaffAppointments />);
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getAllByRole("row")).toHaveLength(7);
  });
});

describe("staff appointments utils", () => {
  it("filters by vet and by status", () => {
    expect(filterAppointments({ ...INITIAL_FILTERS, vet: "larry" })).toHaveLength(5);
    expect(filterAppointments({ ...INITIAL_FILTERS, status: "completed" })).toHaveLength(3);
  });

  it("pages the rows eight at a time", () => {
    const rows = filterAppointments(INITIAL_FILTERS);
    expect(pageCountFor(rows.length)).toBe(2);
    expect(pageCountFor(0)).toBe(1);
    expect(pageRows(rows, 2)).toHaveLength(6);
  });
});
