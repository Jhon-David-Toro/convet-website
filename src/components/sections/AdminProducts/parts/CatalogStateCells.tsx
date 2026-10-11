import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";

import { PRESCRIPTION_VIEWS } from "../AdminProducts.constants";
import type { CatalogCellsProps } from "../AdminProducts.types";
import { publishedView } from "../AdminProducts.utils";

/**
 * Last cells of a catalog row: the prescription rule and whether the product is published on the website.
 *
 * @param props Props of the component, see {@link CatalogCellsProps}.
 * @param props.product Product of the row.
 * @returns The rendered element.
 */
export function CatalogStateCells({ product }: CatalogCellsProps) {
  return (
    <>
      <TableCell type="badge">
        <StatusBadge view={PRESCRIPTION_VIEWS[product.prescription]} />
      </TableCell>
      <TableCell type="badge">
        <StatusBadge view={publishedView(product)} />
      </TableCell>
    </>
  );
}
