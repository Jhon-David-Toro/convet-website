import { CALENDAR_KEY_STEPS, CALENDAR_WEEK_ROWS, DAYS_PER_WEEK } from "./Calendar.constants";
import { addDays, dayKey, sameDay, startOfDay } from "./Calendar.dates";
import type { CalendarBounds, CalendarDayState, CalendarDayStateParams } from "./Calendar.types";

/**
 * Normalizes the dates a calendar receives to local midnight and resolves the default "today".
 *
 * @param params Options, see {@link CalendarBounds}.
 * @param params.value Selected day.
 * @param params.minDate Days before this date are disabled.
 * @param params.maxDate Days after this date are disabled.
 * @param params.today "Today" (defaults to the current date). Can be fixed for tests and screenshots.
 * @returns The dates a calendar receives to local midnight and resolves the default "today".
 */
export function normalizeBounds({ value, minDate, maxDate, today }: CalendarBounds): {
  today: Date;
  selected: Date | null;
  min: Date | null;
  max: Date | null;
} {
  return {
    today: startOfDay(today ?? new Date()),
    selected: value ? startOfDay(value) : null,
    min: minDate ? startOfDay(minDate) : null,
    max: maxDate ? startOfDay(maxDate) : null,
  };
}

/**
 * Whether `date` falls outside the allowed range.
 *
 * @param date Date to convert or move.
 * @param min Earliest allowed date, or `null` for no limit.
 * @param max Latest allowed date, or `null` for no limit.
 * @returns `true` when `date` falls outside the allowed range.
 */
export const isOutOfRange = (date: Date, min: Date | null, max: Date | null): boolean =>
  Boolean((min && date < min) || (max && date > max));

/**
 * Resolves the day a navigation key moves to, or `undefined` when the key does nothing.
 *
 * @param key Value of `KeyboardEvent.key`.
 * @param shiftKey Whether Shift is held.
 * @param focused Day that currently owns the roving tab stop.
 * @returns The day a navigation key moves to, or `undefined` when the key does nothing.
 */
export const resolveCalendarKey = (key: string, shiftKey: boolean, focused: Date): Date | undefined =>
  CALENDAR_KEY_STEPS[key]?.(focused, shiftKey);

/**
 * Builds the weeks shown for the month of `month`, Sunday first.
 * Weeks that contain no day of that month are dropped.
 *
 * @param month Month, as a 0-based index or as a date inside the month.
 * @returns The weeks shown for the month of `month`, Sunday first.
 */
export function buildMonthWeeks(month: Date): Date[][] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = addDays(first, -first.getDay());
  const weeks = Array.from({ length: CALENDAR_WEEK_ROWS }, (_, week) =>
    Array.from({ length: DAYS_PER_WEEK }, (_, day) => addDays(gridStart, week * DAYS_PER_WEEK + day)),
  );
  return weeks.filter((week) => week.some((date) => date.getMonth() === month.getMonth()));
}

/**
 * Resolves how a single day of the grid must be presented.
 *
 * @param params Options, see {@link CalendarDayStateParams}.
 * @param params.date Date to show or move.
 * @param params.focused Day that owns the roving tab stop.
 * @param params.selected Whether the item is selected.
 * @param params.today Today, as ISO date (`YYYY-MM-DD`) or `Date`, so the calendar never depends on the clock.
 * @param params.min Earliest allowed date, or `null` for no limit.
 * @param params.max Latest allowed date, or `null` for no limit.
 * @returns The how a single day of the grid must be presented.
 */
export function getDayState({ date, focused, selected, today, min, max }: CalendarDayStateParams): CalendarDayState {
  return {
    inMonth: date.getMonth() === focused.getMonth(),
    isSelected: selected !== null && sameDay(date, selected),
    isToday: sameDay(date, today),
    isFocusable: sameDay(date, focused),
    isDisabled: isOutOfRange(date, min, max),
  };
}

/**
 * Focuses the button of `focused` inside the grid, but only when a focus request is pending; clears the request.
 *
 * @param request Mutable flag; `true` means the next change of the active day must move real focus.
 * @param grid Element that contains the day buttons.
 * @param focused Day that currently owns the roving tab stop.
 */
export function focusDayIfRequested(request: { current: boolean }, grid: HTMLElement | null, focused: Date): void {
  if (!request.current) return;
  request.current = false;
  grid?.querySelector<HTMLButtonElement>(`[data-day="${dayKey(focused)}"]`)?.focus();
}
