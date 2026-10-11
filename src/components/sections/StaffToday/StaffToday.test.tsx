import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { STAFF_APPOINTMENTS } from "@/lib/staff.constants";

import { StaffToday } from "./StaffToday";
import { agendaGroups, eventStyle, gridTimes, rangeMeta } from "./StaffToday.utils";

describe("StaffToday", () => {
  it("shows the figures, the schedule by vet and what needs attention", () => {
    render(<StaffToday />);
    expect(screen.getByRole("heading", { level: 1, name: "Thursday, October 1" })).toBeInTheDocument();
    expect(screen.getByText("Appointments today")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Schedule of the day by vet" })).getByText("Dr. Larry")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Needs attention" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Record disposal" })).toBeInTheDocument();
  });

  it("groups the agenda into now, next and earlier and can show every vet", async () => {
    render(<StaffToday />);
    expect(screen.getByRole("heading", { name: "Now" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "My patients" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "All vets" }));
    expect(screen.getByRole("button", { name: "All vets" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("staff today utils", () => {
  it("lists a time for every half hour of the grid", () => {
    expect(gridTimes()).toEqual(["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00"]);
  });

  it("places an appointment where its time is and as tall as it lasts", () => {
    const toby = STAFF_APPOINTMENTS.find((appointment) => appointment.id === "toby");
    expect(toby && eventStyle(toby)).toEqual({ top: 403, height: 194 });
  });

  it("describes the time range of an appointment", () => {
    const toby = STAFF_APPOINTMENTS.find((appointment) => appointment.id === "toby");
    expect(toby && rangeMeta(toby)).toBe("10:00 – 11:00 · Anna Lee");
  });

  it("drops the groups without appointments", () => {
    const groups = agendaGroups(STAFF_APPOINTMENTS.filter((appointment) => appointment.status === "completed"));
    expect(groups.map((group) => group.heading)).toEqual(["Earlier"]);
  });
});
