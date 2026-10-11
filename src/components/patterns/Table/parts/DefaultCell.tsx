import { cx } from "@/lib/shared/cx";

import type { DefaultCellProps } from "../Table.types";
import styles from "../Table.module.scss";

/**
 * Plain data cell (text, strong, mono, number and badge types).
 *
 * @param props Props of the component, see {@link DefaultCellProps}.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function DefaultCell({ type = "text", className, children, ...rest }: DefaultCellProps) {
  return (
    <td {...rest} className={cx(styles.cell, styles[type], className)}>
      {children}
    </td>
  );
}
