"use client";

import { TableCell } from "@/components/patterns/Table";
import { stockMenu } from "@/lib/admin/admin.menus.constants";

import type { StockRowProps } from "../AdminStock.types";
import { StockIdentityCells } from "./StockIdentityCells";
import { StockLevelCells } from "./StockLevelCells";

/**
 * Row of the stock table: the product, its levels and the row actions.
 *
 * @param props Props of the component, see {@link StockRowProps}.
 * @param props.product Product of the row.
 * @returns The rendered element.
 */
export function StockRow({ product }: StockRowProps) {
  return (
    <tr>
      <StockIdentityCells product={product} />
      <StockLevelCells product={product} />
      <TableCell type="actions" actionLabel={`Actions for ${product.name}`} items={stockMenu(product.id)} />
    </tr>
  );
}
