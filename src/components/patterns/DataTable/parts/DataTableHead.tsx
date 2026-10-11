import { TableHeaderCell } from "@/components/patterns/Table";

import styles from "../DataTable.module.scss";
import { ACTIONS_COLUMN_LABEL } from "../DataTable.constants";
import type { DataTableHeadProps } from "../DataTable.types";
import { toColumn } from "../DataTable.utils";

/**
 * Header row of the table: one cell per column, plus a last one for the row actions that is only named for screen readers.
 *
 * @param props Props of the component, see {@link DataTableHeadProps}.
 * @param props.columns Columns of the table.
 * @param props.actions Whether the rows end with an actions cell.
 * @returns The rendered element.
 */
export function DataTableHead({ columns, actions }: DataTableHeadProps) {
  return (
    <thead>
      <tr>
        {columns.map(toColumn).map(({ label, ...column }) => (
          <TableHeaderCell key={label} {...column}>
            {label}
          </TableHeaderCell>
        ))}
        {actions && (
          <TableHeaderCell>
            <span className={styles.srOnly}>{ACTIONS_COLUMN_LABEL}</span>
          </TableHeaderCell>
        )}
      </tr>
    </thead>
  );
}
