import { describe, expect, it } from "vitest";

import { STAFF_APPOINTMENTS } from "./staff.constants";
import { appointmentsOfVet, endTime, findStaffVet, toMinutes, toTime } from "./staff.utils";

describe("staff time helpers", () => {
  it("converts a time to minutes and back", () => {
    expect(toMinutes("10:15")).toBe(615);
    expect(toTime(615)).toBe("10:15");
    expect(toTime(480)).toBe("8:00");
  });

  it("adds the duration of an appointment to its start", () => {
    const toby = STAFF_APPOINTMENTS.find((appointment) => appointment.id === "toby");
    expect(toby && endTime(toby)).toBe("11:00");
  });
});

describe("staff vets", () => {
  it("finds a vet and falls back to the first one", () => {
    expect(findStaffVet("larry").name).toBe("Dr. Larry");
    expect(findStaffVet("nobody").id).toBe("shirley");
  });

  it("lists the appointments of a vet by start time", () => {
    const times = appointmentsOfVet("shirley").map((appointment) => toMinutes(appointment.time));
    expect(times).toEqual([...times].sort((a, b) => a - b));
    expect(times).toHaveLength(5);
  });

  it("keeps the counts the schedule shows: 5, 5 and 4 appointments", () => {
    expect(appointmentsOfVet("larry")).toHaveLength(5);
    expect(appointmentsOfVet("andreina")).toHaveLength(4);
  });
});
