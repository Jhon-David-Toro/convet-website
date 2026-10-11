import { More } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import type { StockCardTopProps } from "../AdminStock.types";
import styles from "../AdminStock.module.scss";

/**
 * Top of a stock card: the name, the SKU and the button with the actions of the product.
 *
 * @param props Props of the component, see {@link StockCardTopProps}.
 * @param props.product Product of the card.
 * @returns The rendered element.
 */
export function StockCardTop({ product }: StockCardTopProps) {
  return (
    <div className={styles.cardTop}>
      <div>
        <p className={styles.cardName}>{product.name}</p>
        <p className={styles.cardSku}>{product.sku}</p>
      </div>
      <IconButton variant="ghost" icon={More} label={`Actions for ${product.name}`} />
    </div>
  );
}
