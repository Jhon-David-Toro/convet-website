import { DataTable } from "@/components/patterns/DataTable";
import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";
import { STOCK_STATUS_VIEWS } from "@/lib/admin/admin.status.constants";

import { COMPACT_COLUMNS, COMPACT_TABLE_LABEL } from "../AdminStock.constants";
import type { StockCompactTableProps } from "../AdminStock.types";
import styles from "../AdminStock.module.scss";

/**
 * Short stock table for tablet: product, what is on hand and the status.
 *
 * @param props Props of the component, see {@link StockCompactTableProps}.
 * @param props.rows Products to list.
 * @returns The rendered element.
 */
export function StockCompactTable({ rows }: StockCompactTableProps) {
  return (
    <DataTable label={COMPACT_TABLE_LABEL} columns={COMPACT_COLUMNS} actions={false} minWidth="30rem" className={styles.tabletOnly}>
      {rows.map((product) => (
        <tr key={product.id}>
          <TableCell type="strong">{product.name}</TableCell>
          <TableCell type="number">{product.onHand}</TableCell>
          <TableCell type="badge">
            <StatusBadge view={STOCK_STATUS_VIEWS[product.status]} />
          </TableCell>
        </tr>
      ))}
    </DataTable>
  );
}
