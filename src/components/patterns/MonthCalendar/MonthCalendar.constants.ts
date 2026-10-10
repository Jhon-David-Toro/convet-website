import type { MonthDayState } from "./MonthCalendar.types";

export const DAY_MS = 86_400_000;

export const MONTH_CALENDAR_WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTH_TITLE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

export const DAY_LABEL_FORMAT = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeZone: "UTC" });

export const DEFAULT_LEGEND = ["Dot = few slots left", "Dashed = vet off / closed"];

export const DAYS_PER_WEEK = 7;

export const UNAVAILABLE_DAY: MonthDayState = "unavailable";

export const FEW_LEFT_DAY: MonthDayState = "few-left";
