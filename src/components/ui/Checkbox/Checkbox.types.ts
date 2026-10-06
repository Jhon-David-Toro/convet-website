import type { ComponentPropsWithRef, ReactNode } from "react";

/** Props of the `Checkbox` component. */
export type CheckboxProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "checked" | "children" | "size"
> & {
  /** Visible text. For icons it becomes the accessible name. */
  label: ReactNode;
  /** Description text under the title. */
  description?: ReactNode;
  /** `true`, `false` or `"mixed"` (indeterminate). Omit it to use the checkbox uncontrolled with `defaultChecked`. */
  checked?: boolean | "mixed";
};
