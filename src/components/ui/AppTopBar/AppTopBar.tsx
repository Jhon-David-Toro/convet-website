import { cx } from "@/lib/shared/cx";

import styles from "./AppTopBar.module.scss";
import type { AppTopBarProps } from "./AppTopBar.types";

/**
 * Navigation/App Top Bar: top bar of the private areas (72px). Content comes through slots.
 *
 * @param props Props of the component, see {@link AppTopBarProps}.
 * @param props.start Left side: a greeting (customers) or search (staff). Takes the remaining space.
 * @param props.end Right side: notifications and the primary action.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function AppTopBar({ start, end, className, ...rest }: AppTopBarProps) {
  return (
    <header {...rest} className={cx(styles.bar, className)}>
      <div className={styles.start}>{start}</div>
      <div className={styles.end}>{end}</div>
    </header>
  );
}
