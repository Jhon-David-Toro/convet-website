/**
 * Returns a copy of `date` at local midnight.
 *
 * @param date Date to convert or move.
 * @returns The copy of `date` at local midnight.
 */
export const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

/**
 * Returns `date` moved by `days` days (negative goes back), at local midnight.
 *
 * @param date Date to convert or move.
 * @param days Number of days to move; negative goes back.
 * @returns The `date` moved by `days` days (negative goes back), at local midnight.
 */
export const addDays = (date: Date, days: number): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

/**
 * Returns `date` moved by `months` months, clamping the day to the last day of the target month.
 *
 * @param date Date to convert or move.
 * @param months Number of months to move; negative goes back.
 * @returns The `date` moved by `months` months, clamping the day to the last day of the target month.
 */
export const addMonths = (date: Date, months: number): Date => {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
};

/**
 * Whether two dates are the same instant (callers pass dates already normalized to midnight).
 *
 * @param a First date to compare.
 * @param b Second date to compare.
 * @returns `true` when two dates are the same instant (callers pass dates already normalized to midnight).
 */
export const sameDay = (a: Date, b: Date): boolean => a.getTime() === b.getTime();

/**
 * Stable key of a day, e.g. "2026-10-7", used for React keys and `data-day`.
 *
 * @param date Date to convert or move.
 * @returns The key, e.g. `"2026-10-7"`.
 */
export const dayKey = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
