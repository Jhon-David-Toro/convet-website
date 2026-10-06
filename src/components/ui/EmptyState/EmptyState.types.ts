import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

/** Props of the `EmptyState` component. */
export type EmptyStateProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Title text. */
  title: string;
  /** Message to show. */
  message?: string;
  /** Primary action (usually a `Button`). */
  action?: ReactNode;
};
