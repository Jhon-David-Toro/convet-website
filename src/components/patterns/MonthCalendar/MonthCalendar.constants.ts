import type { MonthDayState } from "./MonthCalendar.types";

/** Milliseconds in one day. */
export const DAY_MS = 86_400_000;

/** Column headers of the month grid, Monday first. */
export const MONTH_CALENDAR_WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Formats a date as "October 2026". Uses UTC so the month never shifts with the viewer's time zone. */
export const MONTH_TITLE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

/** Formats a date as the full accessible day label, in UTC. */
export const DAY_LABEL_FORMAT = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeZone: "UTC" });

/** Legend entries shown below the grid when none are given. */
export const DEFAULT_LEGEND = ["Dot = few slots left", "Dashed = vet off / closed"];

/** Days in one week. */
export const DAYS_PER_WEEK = 7;

/** Explicit state of a day that cannot be chosen. */
export const UNAVAILABLE_DAY: MonthDayState = "unavailable";

/** Explicit state of a day with few slots left. */
export const FEW_LEFT_DAY: MonthDayState = "few-left";
