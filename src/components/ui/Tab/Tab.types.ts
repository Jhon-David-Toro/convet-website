import type { ComponentPropsWithRef } from "react";

/** Props of the `Tab` component. */
export type TabProps = Omit<ComponentPropsWithRef<"button">, "role" | "aria-selected"> & {
  /** Whether the item is selected. */
  selected?: boolean;
  /** Optional counter next to the label. */
  count?: number | string;
};
