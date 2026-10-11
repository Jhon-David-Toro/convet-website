import type { StatusView } from "@/components/patterns/StatusBadge";
import type { CatalogRow } from "@/lib/admin/admin.types";

import { PUBLISHED_VIEWS } from "./AdminProducts.constants";

/**
 * Badge of a product on the website: published or hidden.
 *
 * @param product Product of the catalog.
 * @returns The tone, icon and label of its state.
 */
export function publishedView(product: CatalogRow): StatusView {
  return PUBLISHED_VIEWS[product.published ? "published" : "hidden"];
}
