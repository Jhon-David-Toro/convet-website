import { StackedCell } from "@/components/patterns/StackedCell";
import { TableCell } from "@/components/patterns/Table";
import { More } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import { ACTIONS_LABEL_PREFIX, OPEN_LABEL_PREFIX } from "../StaffInventory.constants";
import type { InventoryRowProps } from "../StaffInventory.types";
import { InventoryStatusBadge } from "./InventoryStatusBadge";
import styles from "../StaffInventory.module.scss";

/**
 * Row of the inventory table: product, SKU, type, what is on hand, the next lot with its expiry, the status and the button that opens the product.
 *
 * @param props Props of the component, see {@link InventoryRowProps}.
 * @param props.product Product of the row.
 * @param props.onOpen Opens the product in the side panel.
 * @returns The rendered element.
 */
export function InventoryRow({ product, onOpen }: InventoryRowProps) {
  return (
    <tr>
      <TableCell>
        <button type="button" className={styles.productButton} aria-label={`${OPEN_LABEL_PREFIX} ${product.name}`} onClick={() => onOpen(product.id)}>
          <span className={styles.productName}>{product.name}</span>
          <span className={styles.productDescription}>{product.description}</span>
        </button>
      </TableCell>
      <TableCell type="mono">{product.sku}</TableCell>
      <TableCell>{product.type}</TableCell>
      <TableCell>
        <StackedCell primary={product.onHand} secondary={product.stockNote} />
      </TableCell>
      <TableCell>
        <StackedCell primary={product.lotCode} secondary={product.lotNote} mono />
      </TableCell>
      <TableCell type="badge">
        <InventoryStatusBadge status={product.status} statusLabel={product.statusLabel} />
      </TableCell>
      <TableCell className={styles.menuCell}>
        <IconButton icon={More} label={`${ACTIONS_LABEL_PREFIX} ${product.name}`} variant="ghost" onClick={() => onOpen(product.id)} />
      </TableCell>
    </tr>
  );
}
