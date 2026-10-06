import type { ComponentPropsWithRef } from "react";

/** Floating panel. The consumer defines the role (`menu`, `listbox`, `dialog`…) and the behavior. */
export type DropdownProps = ComponentPropsWithRef<"div"> & {
  /**
   * `menu`: list of items (Figma: padding 4/8, gap 2). `panel`: free content, such as a calendar
   * (padding 16, gap 8).
   */
  padding?: "menu" | "panel";
};

/** Props of the `MenuDivider` component. */
export type MenuDividerProps = Omit<ComponentPropsWithRef<"div">, "children">;
