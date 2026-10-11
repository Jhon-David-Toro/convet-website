import { StackedCell } from "@/components/patterns/StackedCell";
import { TableCell } from "@/components/patterns/Table";

import type { CatalogCellsProps } from "../AdminProducts.types";

/**
 * First cells of a catalog row: the product with its detail, the SKU with the UUID, the category and the type.
 *
 * @param props Props of the component, see {@link CatalogCellsProps}.
 * @param props.product Product of the row.
 * @returns The rendered element.
 */
export function CatalogIdentityCells({ product }: CatalogCellsProps) {
  return (
    <>
      <TableCell>
        <StackedCell primary={product.name} secondary={product.detail} />
      </TableCell>
      <TableCell>
        <StackedCell primary={product.sku} secondary={`UUID ${product.uuid}`} mono />
      </TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{product.type}</TableCell>
    </>
  );
}
