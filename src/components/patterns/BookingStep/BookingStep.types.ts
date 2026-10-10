import type { ComponentPropsWithRef } from "react";

export type BookingStepState = "done" | "current" | "upcoming";

export type BookingStepProps = Omit<ComponentPropsWithRef<"li">, "children"> & {
  state: BookingStepState;
  number: number;
  label: string;
};
