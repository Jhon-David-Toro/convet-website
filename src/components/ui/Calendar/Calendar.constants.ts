import { addDays, addMonths } from "./Calendar.dates";

/** Short and full weekday names, Sunday first. */
export const CALENDAR_WEEKDAYS = [
  ["Su", "Sunday"],
  ["Mo", "Monday"],
  ["Tu", "Tuesday"],
  ["We", "Wednesday"],
  ["Th", "Thursday"],
  ["Fr", "Friday"],
  ["Sa", "Saturday"],
] as const;

/** Formats a date as "October 2026" for the grid title. */
export const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

/** Formats a date as "Thursday, October 15, 2026" for each day's accessible name. */
export const DAY_FORMAT = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

/** Weeks drawn in the month grid (the grid always starts on Sunday). */
export const CALENDAR_WEEK_ROWS = 6;

/** Days in one week. */
export const DAYS_PER_WEEK = 7;

/** Months moved by PageUp / PageDown with Shift held (one year). */
export const MONTHS_PER_YEAR = 12;

/** Keyboard navigation: where each key moves the focused day, given the focused day and whether Shift is held. */
export const CALENDAR_KEY_STEPS: Record<string, (focused: Date, shiftKey: boolean) => Date> = {
  ArrowLeft: (focused) => addDays(focused, -1),
  ArrowRight: (focused) => addDays(focused, 1),
  ArrowUp: (focused) => addDays(focused, -DAYS_PER_WEEK),
  ArrowDown: (focused) => addDays(focused, DAYS_PER_WEEK),
  Home: (focused) => addDays(focused, -focused.getDay()),
  End: (focused) => addDays(focused, DAYS_PER_WEEK - 1 - focused.getDay()),
  PageUp: (focused, shiftKey) => addMonths(focused, shiftKey ? -MONTHS_PER_YEAR : -1),
  PageDown: (focused, shiftKey) => addMonths(focused, shiftKey ? MONTHS_PER_YEAR : 1),
};
