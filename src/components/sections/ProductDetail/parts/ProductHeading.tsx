import { productCategoryLine } from "@/lib/catalog/products.utils";

import type { ProductInfoProps } from "../ProductDetail.types";
import { ProductBadges } from "./ProductBadges";
import styles from "../ProductDetail.module.scss";

/**
 * Category, name and badges of the product.
 *
 * @param props Props of the component, see {@link ProductInfoProps}.
 * @param props.product Product to describe.
 * @returns The rendered element.
 */
export function ProductHeading({ product }: ProductInfoProps) {
  return (
    <>
      <p className={styles.category}>{productCategoryLine(product)}</p>
      <h1 className={styles.name}>{product.name}</h1>
      <ProductBadges product={product} />
    </>
  );
}
