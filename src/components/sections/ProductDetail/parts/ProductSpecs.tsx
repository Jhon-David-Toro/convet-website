import { productSpecs } from "@/lib/catalog/products.utils";

import type { ProductSpecsProps } from "../ProductDetail.types";
import styles from "../ProductDetail.module.scss";

/**
 * Card with the specs of the product as a list of label and value rows.
 *
 * @param props Props of the component, see {@link ProductSpecsProps}.
 * @param props.product Product to describe.
 * @returns The rendered element.
 */
export function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <dl className={styles.specs}>
      {productSpecs(product).map(({ label, value }) => (
        <div key={label} className={styles.spec}>
          <dt className={styles.specLabel}>{label}</dt>
          <dd className={styles.specValue}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
