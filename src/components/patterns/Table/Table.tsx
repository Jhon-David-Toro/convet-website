import { cx } from "@/lib/shared/cx";

import styles from "./Table.module.scss";
import { ActionsCell } from "./parts/ActionsCell";
import { AvatarCell } from "./parts/AvatarCell";
import { DefaultCell } from "./parts/DefaultCell";
import { HeaderContent } from "./parts/HeaderContent";
import { ACTIONS_CELL_TYPE, AVATAR_CELL_TYPE, RIGHT_ALIGN } from "./Table.constants";
import type { TableCellProps, TableHeaderCellProps } from "./Table.types";

/**
 * Table/Header Cell: column header in overline style, with optional sorting.
 *
 * @param props Props of the component, see {@link TableHeaderCellProps}.
 * @param props.align Horizontal alignment of the column.
 * @param props.sort Shows the sort icon and exposes `aria-sort`.
 * @param props.onSort When given, the header is a button that sorts the column.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function TableHeaderCell({ align = "left", sort, onSort, className, children, ...rest }: TableHeaderCellProps) {
  return (
    <th scope="col" aria-sort={sort} {...rest} className={cx(styles.header, align === RIGHT_ALIGN && styles.right, className)}>
      <HeaderContent sort={sort} onSort={onSort}>
        {children}
      </HeaderContent>
    </th>
  );
}

/**
 * Table/Cell: data cell. The type decides the typography and alignment (numbers and actions are right-aligned).
 *
 * @param props Properties of the component.
 * @returns The rendered element.
 */
export function TableCell(props: TableCellProps) {
  if (props.type === AVATAR_CELL_TYPE) return <AvatarCell {...props} />;
  if (props.type === ACTIONS_CELL_TYPE) return <ActionsCell {...props} />;
  return <DefaultCell {...props} />;
}
