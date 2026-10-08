import type { ComponentPropsWithRef } from "react";

/** Booking step state: `done`, `current`, `upcoming`. */
export type BookingStepState = "done" | "current" | "upcoming";

/** Props of the `BookingStep` component. */
export type BookingStepProps = Omit<ComponentPropsWithRef<"li">, "children"> & {
  /** Visual state. */
  state: BookingStepState;
  /** Step number, 1-based. */
  number: number;
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
};
