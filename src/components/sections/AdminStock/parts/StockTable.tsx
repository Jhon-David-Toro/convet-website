import { DataTable } from "@/components/patterns/DataTable";

import { COLUMNS_AFTER_SORT, COLUMNS_BEFORE_SORT, ON_HAND_LABEL, TABLE_LABEL } from "../AdminStock.constants";
import type { StockTableProps } from "../AdminStock.types";
import { StockRow } from "./StockRow";
import styles from "../AdminStock.module.scss";

/**
 * Full stock table (desktop only). The on hand column can be sorted.
 *
 * @param props Props of the component, see {@link StockTableProps}.
 * @param props.rows Products to list.
 * @param props.sort Direction of the sort by on hand.
 * @param props.onSort Changes the sort.
 * @returns The rendered element.
 */
export function StockTable({ rows, sort, onSort }: StockTableProps) {
  const columns = [...COLUMNS_BEFORE_SORT, { label: ON_HAND_LABEL, align: "right" as const, sort, onSort }, ...COLUMNS_AFTER_SORT];

  return (
    <DataTable label={TABLE_LABEL} columns={columns} minWidth="56rem" className={styles.desktopOnly}>
      {rows.map((product) => (
        <StockRow key={product.id} product={product} />
      ))}
    </DataTable>
  );
}
