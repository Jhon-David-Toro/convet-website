import type { BookingDayState } from "./BookingDay.types";

/** Key of the stylesheet class for each state ("few-left" is camel-cased in the stylesheet). */
export const BOOKING_DAY_STATE_CLASS = {
  available: "available",
  "few-left": "fewLeft",
  selected: "selected",
  today: "today",
  unavailable: "unavailable",
} as const satisfies Record<BookingDayState, string>;

/** State of the day the user picked (`aria-pressed`). */
export const SELECTED_DAY_STATE: BookingDayState = "selected";

/** State of a day that cannot be chosen (the button is disabled). */
export const UNAVAILABLE_DAY_STATE: BookingDayState = "unavailable";

/** State of a day with few slots left (shows the dot marker). */
export const FEW_LEFT_DAY_STATE: BookingDayState = "few-left";
