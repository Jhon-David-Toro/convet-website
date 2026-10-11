import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";
import { STOCK_STATUS_VIEWS } from "@/lib/admin.status.constants";

import type { StockCellsProps } from "../AdminStock.types";

/**
 * Last cells of a stock row: what is on hand, the minimum, the next expiry and the status.
 *
 * @param props Props of the component, see {@link StockCellsProps}.
 * @param props.product Product of the row.
 * @returns The rendered element.
 */
export function StockLevelCells({ product }: StockCellsProps) {
  return (
    <>
      <TableCell type="number">{product.onHand}</TableCell>
      <TableCell type="number">{product.minimum}</TableCell>
      <TableCell>{product.nextExpiry}</TableCell>
      <TableCell type="badge">
        <StatusBadge view={STOCK_STATUS_VIEWS[product.status]} />
      </TableCell>
    </>
  );
}
