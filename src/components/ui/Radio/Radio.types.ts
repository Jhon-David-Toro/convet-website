import type { ComponentPropsWithRef, ReactNode } from "react";

export type RadioProps = Omit<ComponentPropsWithRef<"input">, "type" | "children" | "size"> & {
  label: ReactNode;
  description?: ReactNode;
};
