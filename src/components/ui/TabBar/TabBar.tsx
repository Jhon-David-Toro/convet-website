import { cx } from "@/lib/shared/cx";

import type { TabBarProps } from "./TabBar.types";
import styles from "./TabBar.module.scss";

/**
 * Navigation/Tab Bar: bottom bar of the customer app on mobile.
 *
 * @param props Props of the component, see {@link TabBarProps}.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function TabBar({ className, ...rest }: TabBarProps) {
  return <nav aria-label="Main" {...rest} className={cx(styles.bar, className)} />;
}
