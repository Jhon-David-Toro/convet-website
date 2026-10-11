import { cx } from "@/lib/cx";

import styles from "./StackedCell.module.scss";
import type { StackedCellProps } from "./StackedCell.types";

/**
 * Stacked/Cell: content of a table cell with two lines, the main text and a smaller one under it.
 *
 * @param props Props of the component, see {@link StackedCellProps}.
 * @param props.primary Main line.
 * @param props.secondary Line under it.
 * @param props.mono Whether both lines are codes (SKU, UUID, staff ID), shown in the data font.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function StackedCell({ primary, secondary, mono = false, className, ...rest }: StackedCellProps) {
  return (
    <span {...rest} className={cx(styles.stack, className)}>
      <span className={cx(mono ? styles.mono : styles.primary)}>{primary}</span>
      <span className={cx(mono ? styles.monoSecondary : styles.secondary)}>{secondary}</span>
    </span>
  );
}
