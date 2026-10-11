import { StatusBadge } from "@/components/patterns/StatusBadge";
import { STOCK_STATUS_VIEWS } from "@/lib/admin/admin.status.constants";

import type { StockCardProps } from "../AdminStock.types";
import { onHandLine } from "../AdminStock.utils";
import { StockCardTop } from "./StockCardTop";
import styles from "../AdminStock.module.scss";

/**
 * A product as a card for mobile: name, SKU, status and what is on hand against the minimum.
 *
 * @param props Props of the component, see {@link StockCardProps}.
 * @param props.product Product of the card.
 * @returns The rendered element.
 */
export function StockCard({ product }: StockCardProps) {
  return (
    <li className={styles.card}>
      <StockCardTop product={product} />
      <div className={styles.cardBottom}>
        <StatusBadge view={STOCK_STATUS_VIEWS[product.status]} />
        <p className={styles.cardStock}>{onHandLine(product)}</p>
      </div>
    </li>
  );
}
