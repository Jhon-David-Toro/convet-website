import { Badge } from "@/components/ui/Badge";

import type { ProductTextProps } from "../ProductIdentity.types";
import styles from "../ProductIdentity.module.scss";

/**
 * Name with its kind badge, presentation and SKU / UUID line.
 *
 * @param props Props of the component, see {@link ProductTextProps}.
 * @param props.name Name to show.
 * @param props.kind Product type, e.g. "Medication".
 * @param props.presentation Presentation, e.g. "Tablets · 50 mg · box of 14 · Pain & inflammation".
 * @param props.sku Stock keeping unit of the product.
 * @param props.uuid Short identifier, e.g. "2c8e…91fa".
 * @returns The rendered element.
 */
export function ProductText({ name, kind, presentation, sku, uuid }: ProductTextProps) {
  return (
    <span className={styles.text}>
      <span className={styles.nameRow}>
        <span className={styles.name}>{name}</span>
        <Badge tone="brand">{kind}</Badge>
      </span>
      <span className={styles.presentation}>{presentation}</span>
      <span className={styles.ids}>
        <span className={styles.sku}>SKU {sku}</span>
        <span className={styles.uuid}>UUID {uuid}</span>
      </span>
    </span>
  );
}
