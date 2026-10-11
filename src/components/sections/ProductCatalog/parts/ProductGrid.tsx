import { ProductCard } from "@/components/ui/ProductCard";
import { productCategoryLine, productDetailHref, productWhatsappHref } from "@/lib/catalog/products.utils";

import { ASK_LABEL } from "../ProductCatalog.constants";
import styles from "../ProductCatalog.module.scss";
import type { ProductGridProps } from "../ProductCatalog.types";

/**
 * Grid of product cards; each card links to the detail page and asks about availability on WhatsApp.
 *
 * @param props Props of the component, see {@link ProductGridProps}.
 * @param props.products Products to show.
 * @returns The rendered element.
 */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.slug} className={styles.item}>
          <ProductCard
            category={productCategoryLine(product)}
            name={product.name}
            href={productDetailHref(product)}
            description={product.summary}
            prescription={product.prescription}
            askHref={productWhatsappHref(product)}
            askLabel={ASK_LABEL}
          />
        </li>
      ))}
    </ul>
  );
}
