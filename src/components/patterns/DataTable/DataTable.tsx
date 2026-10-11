import { cx } from "@/lib/cx";

import styles from "./DataTable.module.scss";
import type { DataTableProps } from "./DataTable.types";
import { DataTableHead } from "./parts/DataTableHead";

/**
 * Data/Table: the frame of a table of records. It draws the rounded border, the header row and scrolls sideways on small screens;
 * the rows (`tr` with `TableCell`s) are its children.
 *
 * @param props Props of the component, see {@link DataTableProps}.
 * @param props.label Accessible name of the table.
 * @param props.columns Columns: a name, or a name with its alignment and sorting.
 * @param props.actions Whether the rows end with an actions cell; adds a last column named only for screen readers.
 * @param props.minWidth Width under which the table scrolls sideways, as a CSS length.
 * @param props.className Extra class name for the root element.
 * @param props.children Rows of the table.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function DataTable({ label, columns, actions = true, minWidth = "40rem", className, children, ...rest }: DataTableProps) {
  return (
    <div {...rest} className={cx(styles.wrap, className)}>
      <table className={styles.table} aria-label={label} style={{ minWidth }}>
        <DataTableHead columns={columns} actions={actions} />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
