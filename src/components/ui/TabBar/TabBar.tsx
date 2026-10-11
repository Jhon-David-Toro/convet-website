import { cx } from "@/lib/shared/cx";

import styles from "./TabBar.module.scss";
import type { TabBarProps } from "./TabBar.types";

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
