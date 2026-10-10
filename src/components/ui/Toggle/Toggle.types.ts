import type { ComponentPropsWithRef, ReactNode } from "react";

export type ToggleProps = Omit<ComponentPropsWithRef<"input">, "type" | "role" | "children" | "size"> & {
  label: ReactNode;
  description?: ReactNode;
};
