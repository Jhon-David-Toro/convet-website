import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./TabBar.module.scss";
import { TAB_BAR_ICON_SIZE } from "./TabBar.constants";
import type { TabBarItemProps } from "./TabBar.types";

/**
 * Navigation/Tab Bar Item: 88×68, 56×32 pill with the icon and the label below.
 *
 * @param props Props of the component, see {@link TabBarItemProps}.
 * @param props.icon Icon component to draw.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.active Current section: light blue pill, brand color and `aria-current="page"`.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function TabBarItem({ icon, label, active = false, className, ...rest }: TabBarItemProps) {
  return (
    <Link {...rest} aria-current={active ? "page" : undefined} className={cx(styles.item, active && styles.active, className)}>
      <span className={styles.pill}>
        <Icon icon={icon} size={TAB_BAR_ICON_SIZE} />
      </span>
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
