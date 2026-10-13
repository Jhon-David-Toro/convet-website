import { RowMenu } from "@/components/patterns/RowMenu";
import { More } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { cx } from "@/lib/shared/cx";

import type { ActionsCellProps } from "../Table.types";
import styles from "../Table.module.scss";

/**
 * Cell with the row actions: a menu when it gets `items`, otherwise a single button.
 *
 * @param props Props of the component, see {@link ActionsCellProps}.
 * @param props.actionLabel Accessible name of the actions button.
 * @param props.onAction Called when the action is activated (single button only).
 * @param props.items Actions of the row menu; each one leads to a page or runs a function.
 * @param props.className Extra class name for the root element.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ActionsCell({ actionLabel, onAction, items, className, type, ...rest }: ActionsCellProps) {
  return (
    <td {...rest} className={cx(styles.cell, styles[type], className)}>
      {items ? <RowMenu label={actionLabel} items={items} /> : <IconButton icon={More} label={actionLabel} variant="ghost" onClick={onAction} />}
    </td>
  );
}
