import type { ComponentPropsWithRef, ReactNode } from "react";

export type PageHeaderProps = Omit<ComponentPropsWithRef<"header">, "title" | "children"> & {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  compactHidden?: boolean;
};
