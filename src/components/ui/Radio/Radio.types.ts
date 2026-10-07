import type { ComponentPropsWithRef, ReactNode } from "react";

/** Props of the `Radio` component. */
export type RadioProps = Omit<ComponentPropsWithRef<"input">, "type" | "children" | "size"> & {
  /** Visible text. For icons it becomes the accessible name. */
  label: ReactNode;
  /** Description text under the title. */
  description?: ReactNode;
};
