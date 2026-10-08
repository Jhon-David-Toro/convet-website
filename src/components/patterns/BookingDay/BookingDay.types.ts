import type { ComponentPropsWithRef } from "react";

/** Booking day state: `available`, `few-left`, `selected`, `today`, `unavailable`. */
export type BookingDayState = "available" | "few-left" | "selected" | "today" | "unavailable";

/** Props of the `BookingDay` component. */
export type BookingDayProps = Omit<ComponentPropsWithRef<"button">, "children"> & {
  /** Visual state. */
  state?: BookingDayState;
  /** Abbreviated weekday, e.g. "Wed". With `compact` it is only used as the accessible name. */
  weekday: string;
  /** Month calendar variant: no weekday, fills its cell width and is 44px tall. */
  compact?: boolean;
  /** Day of the month. */
  day: string | number;
};
