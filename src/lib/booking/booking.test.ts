import { describe, expect, it } from "vitest";

import { BOOKING_VETS } from "./booking.constants";
import {
  agendaVet,
  calendarStates,
  capacityLabel,
  dayAvailability,
  fullDay,
  fullDayMessage,
  findVet,
  labelToMinutes,
  longDay,
  minutesToLabel,
  nextAvailable,
  nextOpenDay,
  slotsFor,
  timeRange,
} from "./booking.utils";

const shirley = BOOKING_VETS[1];

describe("booking utils", () => {
  it("converts between clock times and minutes", () => {
    expect(minutesToLabel(570)).toBe("9:30 AM");
    expect(minutesToLabel(720)).toBe("12:00 PM");
    expect(labelToMinutes("12:10 PM")).toBe(730);
    expect(labelToMinutes("9:30 AM")).toBe(570);
  });

  it("writes the time range of a visit", () => {
    expect(timeRange("9:30 AM", 20)).toBe("9:30 – 9:50 AM");
    expect(timeRange("11:50 AM", 20)).toBe("11:50 AM – 12:10 PM");
  });

  it("writes days", () => {
    expect(longDay("2026-10-09")).toBe("Friday, October 9");
    expect(fullDay("2026-10-09")).toBe("Fri, Oct 9, 2026");
  });

  it("knows which days a vet works and which are full", () => {
    expect(dayAvailability(shirley, "2026-10-09")).toBe("open");
    expect(dayAvailability(shirley, "2026-10-14")).toBe("off");
    expect(dayAvailability(shirley, "2026-10-13")).toBe("full");
    expect(dayAvailability(shirley, "2026-10-05")).toBe("off");
  });

  it("lists the times of a day with their places", () => {
    const slots = slotsFor(shirley, "2026-10-09");
    expect(slots).toHaveLength(18);
    expect(slots[0]).toEqual({ time: "9:00 AM", left: 0, state: "full" });
    expect(slots[15].state).toBe("blocked");
    expect(capacityLabel(slots[1])).toBe("1 of 5 left");
    expect(capacityLabel(slots[0])).toBe("FULL · 5/5");
    expect(slotsFor(shirley, "2026-10-13")).toEqual([]);
  });

  it("finds the next free time and the next open day", () => {
    expect(nextAvailable(shirley)).toEqual({ iso: "2026-10-09", time: "9:10 AM" });
    expect(nextOpenDay(shirley, "2026-10-13")).toBe("2026-10-15");
  });

  it("marks the days a vet is off and the days with few places", () => {
    const states = calendarStates(shirley);
    expect(states["2026-10-14"]).toBe("unavailable");
    expect(states["2026-10-20"]).toBe("few-left");
    expect(agendaVet("any").id).toBe("shirley");
  });
});

describe("booking helpers edge cases", () => {
  it("falls back to the first vet for an unknown id", () => {
    expect(findVet("nobody").id).toBe(BOOKING_VETS[0].id);
  });

  it("has no open day for a vet who is away", () => {
    expect(nextOpenDay(agendaVet("andreina"), "2026-10-09")).toBeUndefined();
  });

  it("explains a full day without a next free day", () => {
    expect(fullDayMessage(agendaVet("andreina"))).not.toContain("next free day");
  });
});
