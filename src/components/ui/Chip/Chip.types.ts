import type { ComponentPropsWithRef } from "react";

export type ChipProps = Omit<ComponentPropsWithRef<"button">, "aria-pressed"> & {
  selected?: boolean;
  count?: number | string;
};
