import type { BookingDayState } from "./BookingDay.types";

export const BOOKING_DAY_STATE_CLASS = {
  available: "available",
  "few-left": "fewLeft",
  selected: "selected",
  today: "today",
  unavailable: "unavailable",
} as const satisfies Record<BookingDayState, string>;

export const SELECTED_DAY_STATE: BookingDayState = "selected";

export const UNAVAILABLE_DAY_STATE: BookingDayState = "unavailable";

export const FEW_LEFT_DAY_STATE: BookingDayState = "few-left";
