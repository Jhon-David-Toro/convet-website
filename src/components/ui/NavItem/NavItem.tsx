import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./NavItem.module.scss";
import type { NavItemProps } from "./NavItem.types";

/**
 * Navigation item of the sidebar and menus, with an icon and an optional counter.
 *
 * @param props Props of the component, see {@link NavItemProps}.
 * @param props.icon Icon component to draw.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.active Current page: light blue fill, bold text and `aria-current="page"`.
 * @param props.count Optional counter (e.g. pending items).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function NavItem({ icon, label, active = false, count, className, ...rest }: NavItemProps) {
  return (
    <Link {...rest} aria-current={active ? "page" : undefined} className={cx(styles.item, active && styles.active, className)}>
      {icon && <Icon icon={icon} />}
      <span className={styles.label}>{label}</span>
      {count !== undefined && <Badge tone="warning">{count}</Badge>}
    </Link>
  );
}
