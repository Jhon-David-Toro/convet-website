import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { AdminAppointments } from "./AdminAppointments";
import { appointmentsFor } from "./AdminAppointments.utils";

describe("AdminAppointments", () => {
  it("lists every appointment with the counts of each status", () => {
    render(<AdminAppointments />);
    expect(screen.getByRole("heading", { level: 1, name: "Appointments" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(6);
    expect(screen.getByRole("button", { name: /Scheduled/ })).toHaveTextContent("41");
  });

  it("filters by status", async () => {
    render(<AdminAppointments />);
    await userEvent.click(screen.getByRole("button", { name: /Cancelled/ }));
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });
});

describe("admin appointments utils", () => {
  it("returns everything for the all chip", () => {
    expect(appointmentsFor("all")).toHaveLength(5);
    expect(appointmentsFor("completed")).toHaveLength(0);
  });
});
