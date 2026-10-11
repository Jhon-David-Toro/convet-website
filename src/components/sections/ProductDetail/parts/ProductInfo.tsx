import { productAvailabilityMessage } from "@/lib/catalog/products.utils";

import { PREFILL_NOTE } from "../ProductDetail.constants";
import styles from "../ProductDetail.module.scss";
import type { ProductInfoProps } from "../ProductDetail.types";
import { ProductActions } from "./ProductActions";
import { ProductHeading } from "./ProductHeading";
import { ProductNotice } from "./ProductNotice";
import { ProductSpecs } from "./ProductSpecs";

/**
 * Text column of the product page: heading, description, specs, notice, actions and the WhatsApp note.
 *
 * @param props Props of the component, see {@link ProductInfoProps}.
 * @param props.product Product to describe.
 * @returns The rendered element.
 */
export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className={styles.info}>
      <ProductHeading product={product} />
      <p className={styles.description}>{product.description}</p>
      <ProductSpecs product={product} />
      <ProductNotice product={product} />
      <ProductActions product={product} />
      <p className={styles.note}>
        {PREFILL_NOTE} “{productAvailabilityMessage(product)}”
      </p>
    </div>
  );
}
