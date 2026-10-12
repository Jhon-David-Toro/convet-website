import { DataTable } from "@/components/patterns/DataTable";

import { COLUMNS, TABLE_LABEL } from "../StaffInventory.constants";
import type { InventoryRowsProps } from "../StaffInventory.types";
import { InventoryCard } from "./InventoryCard";
import { InventoryRow } from "./InventoryRow";
import styles from "../StaffInventory.module.scss";

/**
 * The products of the page: cards on mobile and a table from tablet.
 *
 * @param props Props of the component, see {@link InventoryRowsProps}.
 * @param props.rows Products of the current page.
 * @param props.onOpen Opens a product in the side panel.
 * @returns The rendered element.
 */
export function InventoryList({ rows, onOpen }: InventoryRowsProps) {
  return (
    <>
      <ul className={styles.cards} aria-label={TABLE_LABEL}>
        {rows.map((product) => (
          <InventoryCard key={product.id} product={product} onOpen={onOpen} />
        ))}
      </ul>
      <div className={styles.tableOnly}>
        <DataTable label={TABLE_LABEL} columns={COLUMNS} minWidth="64rem">
          {rows.map((product) => (
            <InventoryRow key={product.id} product={product} onOpen={onOpen} />
          ))}
        </DataTable>
      </div>
    </>
  );
}
