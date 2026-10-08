import type { ComponentPropsWithRef, ReactNode } from "react";

/** Props of the `Toggle` component. */
export type ToggleProps = Omit<ComponentPropsWithRef<"input">, "type" | "role" | "children" | "size"> & {
  /** Visible text. For icons it becomes the accessible name. */
  label: ReactNode;
  /** Description text under the title. */
  description?: ReactNode;
};
