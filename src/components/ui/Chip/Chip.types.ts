import type { ComponentPropsWithRef } from "react";

/** Props of the `Chip` component. */
export type ChipProps = Omit<ComponentPropsWithRef<"button">, "aria-pressed"> & {
  /** Selection state. The parent controls the value and updates it in onClick. */
  selected?: boolean;
  /** Optional count shown after the label. */
  count?: number | string;
};
