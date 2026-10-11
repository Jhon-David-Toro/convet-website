import { TableCell } from "@/components/patterns/Table";

import type { StockCellsProps } from "../AdminStock.types";

/**
 * First cells of a stock row: product, SKU and type.
 *
 * @param props Props of the component, see {@link StockCellsProps}.
 * @param props.product Product of the row.
 * @returns The rendered element.
 */
export function StockIdentityCells({ product }: StockCellsProps) {
  return (
    <>
      <TableCell type="strong">{product.name}</TableCell>
      <TableCell type="mono">{product.sku}</TableCell>
      <TableCell>{product.type}</TableCell>
    </>
  );
}
