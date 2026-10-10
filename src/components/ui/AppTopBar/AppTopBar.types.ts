import type { ComponentPropsWithRef, ReactNode } from "react";

export type AppTopBarProps = Omit<ComponentPropsWithRef<"header">, "children"> & {
  start?: ReactNode;
  end?: ReactNode;
};
