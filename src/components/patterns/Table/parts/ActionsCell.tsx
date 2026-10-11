import { More } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { cx } from "@/lib/shared/cx";

import styles from "../Table.module.scss";
import type { ActionsCellProps } from "../Table.types";

/**
 * Cell with the row actions button.
 *
 * @param props Props of the component, see {@link ActionsCellProps}.
 * @param props.actionLabel Accessible name of the actions button.
 * @param props.onAction Called when the action is activated.
 * @param props.className Extra class name for the root element.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ActionsCell({ actionLabel, onAction, className, type, ...rest }: ActionsCellProps) {
  return (
    <td {...rest} className={cx(styles.cell, styles[type], className)}>
      <IconButton icon={More} label={actionLabel} variant="ghost" onClick={onAction} />
    </td>
  );
}
