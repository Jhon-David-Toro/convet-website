import type { ComponentPropsWithRef } from "react";

export type StackedCellProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  primary: string;
  secondary: string;
  mono?: boolean;
};
