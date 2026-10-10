import { ProductCard } from "@/components/ui/ProductCard";
import { productCategoryLine, productDetailHref, productWhatsappHref } from "@/lib/products.utils";

import { ASK_LABEL, RELATED_TITLE } from "../ProductDetail.constants";
import styles from "../ProductDetail.module.scss";
import type { RelatedProductsProps } from "../ProductDetail.types";

/**
 * Similar products as cards on the subtle background.
 *
 * @param props Props of the component, see {@link RelatedProductsProps}.
 * @param props.products Products to suggest.
 * @returns The rendered element.
 */
export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className={styles.related}>
      <div className={styles.relatedInner}>
        <h2 className={styles.relatedTitle}>{RELATED_TITLE}</h2>
        <ul className={styles.relatedGrid}>
          {products.map((product) => (
            <li key={product.slug} className={styles.relatedItem}>
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
      </div>
    </section>
  );
}
