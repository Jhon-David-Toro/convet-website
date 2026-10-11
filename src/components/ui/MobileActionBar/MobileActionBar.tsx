import { cx } from "@/lib/shared/cx";

import styles from "./MobileActionBar.module.scss";
import type { MobileActionBarProps } from "./MobileActionBar.types";

/**
 * Navigation/Mobile Action Bar: quick actions (Book · Chat · SOS 24/7). The buttons come as children.
 *
 * @param props Props of the component, see {@link MobileActionBarProps}.
 * @param props.fixed Sticks to the bottom edge of the screen and is hidden from tablet up (mobile-only bar).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function MobileActionBar({ fixed = false, className, ...rest }: MobileActionBarProps) {
  return <nav aria-label="Quick actions" {...rest} className={cx(styles.bar, fixed && styles.fixed, className)} />;
}
