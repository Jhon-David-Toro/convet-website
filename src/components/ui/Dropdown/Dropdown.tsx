import { cx } from "@/lib/shared/cx";

import styles from "./Dropdown.module.scss";
import { PANEL_PADDING } from "./Dropdown.constants";
import type { DropdownProps, MenuDividerProps } from "./Dropdown.types";

/**
 * Floating panel for menus, listboxes and dialogs. The consumer defines the role and the behavior.
 *
 * @param props Props of the component, see {@link DropdownProps}.
 * @param props.padding `menu`: list of items (Figma: padding 4/8, gap 2). `panel`: free content, such as a calendar (padding 16, gap 8).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Dropdown({ padding = "menu", className, ...rest }: DropdownProps) {
  return <div {...rest} className={cx(styles.dropdown, padding === PANEL_PADDING && styles.panel, className)} />;
}

/**
 * Horizontal line that separates groups of items inside a menu.
 *
 * @param props Props of the component, see {@link MenuDividerProps}.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function MenuDivider({ className, ...rest }: MenuDividerProps) {
  return <div {...rest} role="separator" className={cx(styles.divider, className)} />;
}
