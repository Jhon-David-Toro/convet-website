import type { ComponentPropsWithRef } from "react";

export type BookingDayState = "available" | "few-left" | "selected" | "today" | "unavailable";

export type BookingDayProps = Omit<ComponentPropsWithRef<"button">, "children"> & {
  state?: BookingDayState;
  weekday: string;
  compact?: boolean;
  day: string | number;
};
