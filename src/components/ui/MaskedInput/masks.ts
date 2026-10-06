import { DATE_MAX_DIGITS, DEFAULT_TIME_FROM, DEFAULT_TIME_STEP_MINUTES, DEFAULT_TIME_TO, HOURS_ON_CLOCK, MINUTES_PER_HOUR, PM_MERIDIEM, TIME_MINUTE_DIGITS } from "./masks.constants";

/**
 * Left-pads a number with zeros up to a fixed length.
 *
 * @param value Value to convert or parse.
 * @param length Total length of the result.
 * @returns The date, e.g. `"07 / 15 / 2023"`.
 */
const pad = (value: number, length = 2) => String(value).padStart(length, "0");

/**
 * Formats typed digits as a US date: "07152023" → "07 / 15 / 2023" (MM / DD / YYYY, as in Figma).
 *
 * @param raw Text exactly as the user typed it.
 * @returns The typed digits as a US date: "07152023" → "07 / 15 / 2023" (MM / DD / YYYY, as in Figma).
 */
export function formatDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, DATE_MAX_DIGITS);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join(" / ");
}

/**
 * Whether the first two digits form a valid 12-hour clock hour (1 to 12).
 *
 * @param digits Digits typed so far, without any separator.
 * @returns `true` when the first two digits form a valid 12-hour clock hour (1 to 12).
 */
const startsWithTwoDigitHour = (digits: string): boolean => {
  const hours = Number(digits.slice(0, 2));
  return digits.length >= 2 && hours >= 1 && hours <= HOURS_ON_CLOCK;
};

/**
 * Reads the meridiem the user typed ("a" or "p"); drops a half-deleted one while deleting.
 *
 * @param raw Text exactly as the user typed it.
 * @param deleting Whether the user is deleting, so half-deleted suffixes are removed entirely.
 * @returns The meridiem the user typed ("a" or "p"); drops a half-deleted one while deleting.
 */
const readMeridiem = (raw: string, deleting: boolean): "AM" | "PM" | "" => {
  if (deleting && !/m$/i.test(raw.trim())) return "";
  if (/p/i.test(raw)) return "PM";
  return /a/i.test(raw) ? "AM" : "";
};

/**
 * Formats typed text as a 12-hour time: "945a" → "9:45 AM".
 *
 * @param raw Text exactly as the user typed it.
 * @param deleting When true, a half-deleted meridiem ("9:45 A") is removed entirely so the user can keep deleting.
 * @returns The typed text as a 12-hour time: "945a" → "9:45 AM".
 */
export function formatTime(raw: string, deleting = false): string {
  const digits = raw.replace(/\D/g, "");
  const hourLength = startsWithTwoDigitHour(digits) ? 2 : 1;
  const hour = digits.slice(0, hourLength);
  if (!hour) return "";

  const minutes = digits.slice(hourLength, hourLength + TIME_MINUTE_DIGITS);
  const meridiem = readMeridiem(raw, deleting);

  return `${hour}${minutes ? `:${minutes}` : ""}${meridiem ? ` ${meridiem}` : ""}`;
}

/**
 * Parses "07 / 15 / 2023" into a `Date`; `null` if incomplete or nonexistent (e.g. 02 / 31 / 2023).
 *
 * @param value Value to convert or parse.
 * @returns The "07 / 15 / 2023" into a `Date`; `null` if incomplete or nonexistent (e.g. 02 / 31 / 2023).
 */
export function parseDate(value: string): Date | null {
  const match = /^(\d{2}) \/ (\d{2}) \/ (\d{4})$/.exec(value);
  if (!match) return null;
  const [month, day, year] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}

/**
 * Formats a `Date` as "07 / 15 / 2023".
 *
 * @param date Date to convert or move.
 * @returns The `Date` as "07 / 15 / 2023".
 */
export function dateToValue(date: Date): string {
  return `${pad(date.getMonth() + 1)} / ${pad(date.getDate())} / ${pad(date.getFullYear(), 4)}`;
}

/**
 * Parses "9:45 AM" into minutes since midnight; `null` if it is not a valid time.
 *
 * @param value Value to convert or parse.
 * @returns The "9:45 AM" into minutes since midnight; `null` if it is not a valid time.
 */
export function parseTime(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(value);
  if (!match) return null;
  const [hour, minute] = [Number(match[1]), Number(match[2])];
  if (hour < 1 || hour > HOURS_ON_CLOCK || minute >= MINUTES_PER_HOUR) return null;
  const hour24 = (hour % HOURS_ON_CLOCK) + (match[3] === PM_MERIDIEM ? HOURS_ON_CLOCK : 0);
  return hour24 * MINUTES_PER_HOUR + minute;
}

/**
 * Formats minutes since midnight as "9:45 AM".
 *
 * @param minutes Minutes since midnight.
 * @returns The minutes since midnight as "9:45 AM".
 */
export function minutesToTime(minutes: number): string {
  const hour24 = Math.floor(minutes / MINUTES_PER_HOUR);
  const minute = minutes % MINUTES_PER_HOUR;
  const hour12 = hour24 % HOURS_ON_CLOCK === 0 ? HOURS_ON_CLOCK : hour24 % HOURS_ON_CLOCK;
  return `${hour12}:${pad(minute)} ${hour24 < HOURS_ON_CLOCK ? "AM" : "PM"}`;
}

/**
 * Lists the times offered by the picker, from `from` to `to` (inclusive) every `step` minutes.
 *
 * @param from Start of the range.
 * @param to End of the range (inclusive).
 * @param step Distance between two consecutive items.
 * @returns The times offered by the picker, from `from` to `to` (inclusive) every `step` minutes.
 */
export function timeSlots(from = DEFAULT_TIME_FROM, to = DEFAULT_TIME_TO, step = DEFAULT_TIME_STEP_MINUTES): string[] {
  const start = parseTime(from) ?? parseTime(DEFAULT_TIME_FROM)!;
  const end = parseTime(to) ?? parseTime(DEFAULT_TIME_TO)!;
  const slots: string[] = [];
  for (let minutes = start; minutes <= end; minutes += step) slots.push(minutesToTime(minutes));
  return slots;
}
