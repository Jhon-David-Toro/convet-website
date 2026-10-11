"use client";

import type { ProductCatalogProps } from "./ProductCatalog.types";
import { useProductCatalog } from "./hooks/useProductCatalog";
import { useSearchShortcut } from "./hooks/useSearchShortcut";
import { ProductResults } from "./parts/ProductResults";
import { ProductSidebar } from "./parts/ProductSidebar";
import styles from "./ProductCatalog.module.scss";

/**
 * Products catalog: filters column and the results (kind chips, grid of cards and pagination).
 *
 * @param props Props of the component, see {@link ProductCatalogProps}.
 * @param props.products Products of the catalog, in display order.
 * @returns The rendered element.
 */
export function ProductCatalog({ products }: ProductCatalogProps) {
  const catalog = useProductCatalog({ products });
  const searchRef = useSearchShortcut();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ProductSidebar filters={catalog.filters} onQueryChange={catalog.setQuery} onToggle={catalog.toggle} searchRef={searchRef} />
        <ProductResults catalog={catalog} />
      </div>
    </section>
  );
}
