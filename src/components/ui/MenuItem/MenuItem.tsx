import { Check, Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./MenuItem.module.scss";
import { DESTRUCTIVE_TONE, MENU_ITEM_ICON_SIZE } from "./MenuItem.constants";
import type { MenuItemProps } from "./MenuItem.types";

/**
 * Item of a menu or listbox, with an optional leading icon and a check when selected.
 *
 * @param props Props of the component, see {@link MenuItemProps}.
 * @param props.icon Icon component to draw.
 * @param props.selected Highlights the item and shows the check. The consumer defines the role (`option`, `menuitem`…) and `aria-selected`.
 * @param props.tone Color tone.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function MenuItem({ icon, selected = false, tone = "default", className, children, ...rest }: MenuItemProps) {
  const classes = cx(styles.item, selected && styles.selected, tone === DESTRUCTIVE_TONE && styles.destructive, className);

  return (
    <div {...rest} className={classes}>
      {icon && <Icon icon={icon} size={MENU_ITEM_ICON_SIZE} />}
      <span className={styles.label}>{children}</span>
      {selected && <Icon icon={Check} size={MENU_ITEM_ICON_SIZE} className={styles.check} />}
    </div>
  );
}
