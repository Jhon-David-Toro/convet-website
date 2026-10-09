import type { ComponentPropsWithRef } from "react";

/** Props of the `TimeSlot` component. */
export type TimeSlotProps = Omit<ComponentPropsWithRef<"button">, "children"> & {
  /** Time, e.g. "9:45 AM". */
  time: string;
  /** Capacity, e.g. "3 of 5 left". */
  capacity?: string;
  /** Whether the item is selected. */
  selected?: boolean;
  /** Fully booked time: cannot be chosen and is tinted soft red. */
  full?: boolean;
};
