import type { ComponentPropsWithRef } from "react";

export type DropdownProps = ComponentPropsWithRef<"div"> & {
  padding?: "menu" | "panel";
};

export type MenuDividerProps = Omit<ComponentPropsWithRef<"div">, "children">;
