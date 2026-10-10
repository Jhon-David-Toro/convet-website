import type { ComponentPropsWithRef, ReactNode } from "react";

export type CheckboxProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "checked" | "children" | "size"
> & {
  label: ReactNode;
  description?: ReactNode;
  checked?: boolean | "mixed";
};
