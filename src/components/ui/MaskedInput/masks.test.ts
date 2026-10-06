import { describe, expect, it } from "vitest";

import { dateToValue, formatDate, formatTime, minutesToTime, parseDate, parseTime, timeSlots } from "./masks";

describe("formatDate", () => {
  it.each([
    ["", ""],
    ["0", "0"],
    ["07", "07"],
    ["071", "07 / 1"],
    ["0715", "07 / 15"],
    ["07152023", "07 / 15 / 2023"],
    ["07 / 15 / 2023 99", "07 / 15 / 2023"],
    ["ab07/15", "07 / 15"],
    ["07 / ", "07"],
  ])("%j → %j", (raw, expected) => {
    expect(formatDate(raw)).toBe(expected);
  });
});

describe("formatTime", () => {
  it.each([
    ["", ""],
    ["9", "9"],
    ["12", "12"],
    ["94", "9:4"],
    ["945", "9:45"],
    ["1245", "12:45"],
    ["9455", "9:45"],
    ["9:45 a", "9:45 AM"],
    ["9:45 PM", "9:45 PM"],
    ["a", ""],
  ])("%j → %j", (raw, expected) => {
    expect(formatTime(raw)).toBe(expected);
  });

  it("lets the user delete a partially removed meridiem", () => {
    expect(formatTime("9:45 A", true)).toBe("9:45");
    expect(formatTime("9:45 AM", true)).toBe("9:45 AM");
  });
});

describe("parseDate and dateToValue", () => {
  it("round-trips a valid date", () => {
    const date = parseDate("07 / 15 / 2023");
    expect(date).not.toBeNull();
    expect(dateToValue(date as Date)).toBe("07 / 15 / 2023");
  });

  it.each(["", "07 / 15", "02 / 31 / 2023", "13 / 01 / 2023", "07 / 15 / 20"])("rejects %j", (value) => {
    expect(parseDate(value)).toBeNull();
  });

  it("pads single digits", () => {
    expect(dateToValue(new Date(2026, 0, 5))).toBe("01 / 05 / 2026");
  });
});

describe("parseTime, minutesToTime and timeSlots", () => {
  it.each([
    ["12:00 AM", 0],
    ["9:45 AM", 585],
    ["12:30 PM", 750],
    ["7:00 PM", 1140],
  ])("%s ↔ %d", (text, minutes) => {
    expect(parseTime(text)).toBe(minutes);
    expect(minutesToTime(minutes)).toBe(text);
  });

  it.each(["", "9:45", "13:00 AM", "9:75 AM"])("rejects %j", (value) => {
    expect(parseTime(value)).toBeNull();
  });

  it("lists slots from 7:00 AM to 7:00 PM every 15 minutes by default", () => {
    const slots = timeSlots();
    expect(slots[0]).toBe("7:00 AM");
    expect(slots[1]).toBe("7:15 AM");
    expect(slots.at(-1)).toBe("7:00 PM");
    expect(slots).toHaveLength(49);
  });

  it("honours a custom range and step", () => {
    expect(timeSlots("9:00 AM", "10:00 AM", 30)).toEqual(["9:00 AM", "9:30 AM", "10:00 AM"]);
  });
});
