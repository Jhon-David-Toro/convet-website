import { DAYS_PER_WEEK, DAY_MS, FEW_LEFT_DAY, UNAVAILABLE_DAY } from "./MonthCalendar.constants";
import type { DayStateParams, MonthDayPresentation, MonthView } from "./MonthCalendar.types";

/**
 * Formats a timestamp as an ISO date, "YYYY-MM-DD" (UTC).
 *
 * @param time Timestamp in milliseconds.
 * @returns The timestamp as an ISO date, "YYYY-MM-DD" (UTC).
 */
const toIso = (time: number): string => new Date(time).toISOString().slice(0, 10);

/**
 * Builds the weeks (Monday to Sunday) that cover a month.
 *
 * @param year Full year, e.g. 2026.
 * @param month Month index, 0-11.
 * @returns One array of seven ISO dates per week, including the days of adjacent months.
 */
export function buildWeeks(year: number, month: number): string[][] {
  const first = Date.UTC(year, month, 1);
  const offset = (new Date(first).getUTCDay() + DAYS_PER_WEEK - 1) % DAYS_PER_WEEK;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const total = Math.ceil((offset + daysInMonth) / DAYS_PER_WEEK) * DAYS_PER_WEEK;
  return Array.from({ length: total / DAYS_PER_WEEK }, (_, week) =>
    Array.from({ length: DAYS_PER_WEEK }, (_, day) => toIso(first + (week * DAYS_PER_WEEK + day - offset) * DAY_MS)),
  );
}

/**
 * Parses "YYYY-MM" into a month view.
 *
 * @param value Value to convert or parse.
 * @returns The "YYYY-MM" into a month view.
 */
export function parseMonth(value: string): MonthView {
  const [year, month] = value.split("-").map(Number);
  return { year, month: month - 1 };
}

/**
 * Moves a month view by `delta` months.
 *
 * @param params Options, see {@link MonthView}.
 * @param params.year Full year, e.g. 2026.
 * @param params.month Month index, 0-11.
 * @param delta Number of months to move; negative goes back.
 * @returns The month view (year and 0-based month).
 */
export function shiftMonth({ year, month }: MonthView, delta: number): MonthView {
  const next = new Date(Date.UTC(year, month + delta, 1));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() };
}

/**
 * Timestamp (UTC) of the first day of a month view.
 *
 * @param params Options, see {@link MonthView}.
 * @param params.year Full year, e.g. 2026.
 * @param params.month Month index, 0-11.
 * @returns Timestamp (UTC) of the first day of the month.
 */
export const monthStart = ({ year, month }: MonthView): number => Date.UTC(year, month, 1);

/**
 * Index of a date in the Monday-first weekday list.
 *
 * @param date Date to convert or move.
 * @returns Index (0-6) of the date in the Monday-first weekday list.
 */
export const weekdayIndex = (date: Date): number => (date.getUTCDay() + DAYS_PER_WEEK - 1) % DAYS_PER_WEEK;

/**
 * Whether a day cannot be chosen: outside the month, in the past, or marked unavailable.
 *
 * @param params Options, see {@link DayStateParams}.
 * @param params.iso ISO date of the day.
 * @param params.inMonth Whether the day belongs to the visible month.
 * @param params.today Today, as ISO date (`YYYY-MM-DD`) or `Date`, so the calendar never depends on the clock.
 * @param params.explicit State given explicitly for this day.
 * @returns `true` when a day cannot be chosen: outside the month, in the past, or marked unavailable.
 */
const isUnavailable = ({ iso, inMonth, today, explicit }: DayStateParams): boolean =>
  !inMonth || iso < today || explicit === UNAVAILABLE_DAY;

/**
 * Resolves how a day is drawn. Priority: unavailable, selected, today, few slots left, available.
 *
 * @param params Options of the function.
 * @returns The how a day is drawn. Priority: unavailable, selected, today, few slots left, available.
 */
export function resolveDayState(params: DayStateParams): MonthDayPresentation {
  if (isUnavailable(params)) return "unavailable";
  if (params.iso === params.current) return "selected";
  if (params.iso === params.today) return "today";
  return params.explicit === FEW_LEFT_DAY ? "few-left" : "available";
}

/**
 * Accessible name of a day, mentioning when few slots are left.
 *
 * @param label Human readable label of the day.
 * @param explicit State given explicitly for the day, if any.
 * @returns The accessible name of the day, with the few-slots note when it applies.
 */
export const describeDay = (label: string, explicit?: string): string =>
  explicit === FEW_LEFT_DAY ? `${label}, few slots left` : label;
