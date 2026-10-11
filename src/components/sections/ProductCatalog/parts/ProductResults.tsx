import { EmptyState } from "@/components/ui/EmptyState";
import { Search } from "@/components/ui/Icon";
import { Pagination } from "@/components/ui/Pagination";
import { PRODUCTS_PAGE_SIZE } from "@/lib/catalog/products.constants";

import { EMPTY_MESSAGE, EMPTY_TITLE } from "../ProductCatalog.constants";
import type { ProductResultsProps } from "../ProductCatalog.types";
import { ProductGrid } from "./ProductGrid";
import { ProductToolbar } from "./ProductToolbar";
import styles from "../ProductCatalog.module.scss";

/**
 * Results column: toolbar, the grid of the current page (or an empty state) and the pagination when there are several pages.
 *
 * @param props Props of the component, see {@link ProductResultsProps}.
 * @param props.catalog State of the catalog hook.
 * @returns The rendered element.
 */
export function ProductResults({ catalog }: ProductResultsProps) {
  const { filters, visible, total, page, pageCount } = catalog;

  return (
    <div className={styles.results}>
      <ProductToolbar kinds={filters.kinds} kindCounts={catalog.kindCounts} total={total} onSelectKind={catalog.selectKind} />
      {total === 0 ? <EmptyState icon={Search} title={EMPTY_TITLE} message={EMPTY_MESSAGE} /> : <ProductGrid products={visible} />}
      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} total={total} pageSize={PRODUCTS_PAGE_SIZE} onPageChange={catalog.setPage} />}
    </div>
  );
}
