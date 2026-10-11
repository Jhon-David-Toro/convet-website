import { cx } from "@/lib/shared/cx";

import styles from "./Tooltip.module.scss";
import type { TooltipContentProps } from "./Tooltip.types";

/**
 * Overlay/Tooltip: navy box with a 12×7 arrow. Used inside `Tooltip` or on its own (documentation).
 *
 * @param props Props of the component, see {@link TooltipContentProps}.
 * @param props.placement Where the tooltip appears: `"top"` or `"bottom"`.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function TooltipContent({ placement = "top", className, children, ...rest }: TooltipContentProps) {
  return (
    <span {...rest} role="tooltip" data-placement={placement} className={cx(styles.tooltip, className)}>
      <span className={styles.body}>{children}</span>
      <span className={styles.arrow} aria-hidden="true" />
    </span>
  );
}
