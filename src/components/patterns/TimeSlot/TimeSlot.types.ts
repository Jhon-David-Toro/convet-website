import type { ComponentPropsWithRef } from "react";

export type TimeSlotProps = Omit<ComponentPropsWithRef<"button">, "children"> & {
  time: string;
  capacity?: string;
  selected?: boolean;
  full?: boolean;
};
