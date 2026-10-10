import { addDays, addMonths } from "./Calendar.dates";

export const CALENDAR_WEEKDAYS = [
  ["Su", "Sunday"],
  ["Mo", "Monday"],
  ["Tu", "Tuesday"],
  ["We", "Wednesday"],
  ["Th", "Thursday"],
  ["Fr", "Friday"],
  ["Sa", "Saturday"],
] as const;

export const MONTH_FORMAT = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

export const DAY_FORMAT = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

export const CALENDAR_WEEK_ROWS = 6;

export const DAYS_PER_WEEK = 7;

export const MONTHS_PER_YEAR = 12;

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
