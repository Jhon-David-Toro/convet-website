import type { ComponentPropsWithRef, ReactNode } from "react";

/** Props of the `AppTopBar` component. */
export type AppTopBarProps = Omit<ComponentPropsWithRef<"header">, "children"> & {
  /** Left side: a greeting (customers) or search (staff). Takes the remaining space. */
  start?: ReactNode;
  /** Right side: notifications and the primary action. */
  end?: ReactNode;
};
