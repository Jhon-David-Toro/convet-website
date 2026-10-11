import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";

import { ADD_PRODUCT_LABEL, PRODUCTS_TITLE } from "../ReceiveStock.constants";
import type { ProductsCardProps } from "../ReceiveStock.types";
import { expiryError } from "../ReceiveStock.utils";
import { ReceiptLineView } from "./ReceiptLineView";
import styles from "../ReceiveStock.module.scss";

/**
 * Products received: one block per line and the button that adds another product.
 *
 * @param props Props of the component, see {@link ProductsCardProps}.
 * @param props.receipt State of the receipt.
 * @returns The rendered element.
 */
export function ProductsCard({ receipt }: ProductsCardProps) {
  return (
    <section className={styles.card} aria-labelledby="receive-products">
      <h2 id="receive-products" className={styles.cardTitle}>
        {PRODUCTS_TITLE}
      </h2>
      <ul className={styles.lines}>
        {receipt.lines.map((line) => (
          <ReceiptLineView
            key={line.id}
            line={line}
            error={expiryError(line, receipt.header.receivedOn)}
            onChange={(patch) => receipt.setLine(line.id, patch)}
            onRemove={() => receipt.removeLine(line.id)}
          />
        ))}
      </ul>
      <Button type="button" variant="secondary" size="small" leadingIcon={Plus} onClick={receipt.addLine} className={styles.addProduct}>
        {ADD_PRODUCT_LABEL}
      </Button>
    </section>
  );
}
