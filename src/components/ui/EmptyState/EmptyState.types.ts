import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";

export type EmptyStateProps = Omit<ComponentPropsWithRef<"div">, "title"> & {
  icon: LucideIcon;
  title: string;
  message?: string;
  action?: ReactNode;
};
