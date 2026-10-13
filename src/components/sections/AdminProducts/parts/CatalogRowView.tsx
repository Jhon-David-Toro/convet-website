import { TableCell } from "@/components/patterns/Table";
import { CATALOG_MENU } from "@/lib/admin/admin.menus.constants";

import type { CatalogRowViewProps } from "../AdminProducts.types";
import { CatalogIdentityCells } from "./CatalogIdentityCells";
import { CatalogStateCells } from "./CatalogStateCells";

/**
 * Row of the catalog table: the product, its rules and the row actions.
 *
 * @param props Props of the component, see {@link CatalogRowViewProps}.
 * @param props.product Product of the row.
 * @returns The rendered element.
 */
export function CatalogRowView({ product }: CatalogRowViewProps) {
  return (
    <tr>
      <CatalogIdentityCells product={product} />
      <CatalogStateCells product={product} />
      <TableCell type="actions" actionLabel={`Actions for ${product.name}`} items={CATALOG_MENU} />
    </tr>
  );
}
