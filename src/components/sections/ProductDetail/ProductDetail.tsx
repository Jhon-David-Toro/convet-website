import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { relatedProducts } from "@/lib/products.utils";

import { ProductGallery } from "./parts/ProductGallery";
import { ProductInfo } from "./parts/ProductInfo";
import { RelatedProducts } from "./parts/RelatedProducts";
import styles from "./ProductDetail.module.scss";
import type { ProductDetailProps } from "./ProductDetail.types";
import { productBreadcrumbs } from "./ProductDetail.utils";

/**
 * Detail page of a product: breadcrumbs, gallery, product information and related products.
 *
 * @param props Props of the component, see {@link ProductDetailProps}.
 * @param props.product Product to describe.
 * @returns The rendered element.
 */
export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <>
      <section className={styles.detail}>
        <div className={styles.inner}>
          <Breadcrumbs items={productBreadcrumbs(product)} />
          <div className={styles.columns}>
            <ProductGallery name={product.name} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>
      <RelatedProducts products={relatedProducts(product)} />
    </>
  );
}
