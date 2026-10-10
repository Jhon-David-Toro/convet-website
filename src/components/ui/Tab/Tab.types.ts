import type { ComponentPropsWithRef } from "react";

export type TabProps = Omit<ComponentPropsWithRef<"button">, "role" | "aria-selected"> & {
  selected?: boolean;
  count?: number | string;
};
