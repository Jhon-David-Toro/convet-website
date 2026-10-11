import styles from "../AdminStock.module.scss";
import { CARDS_LABEL } from "../AdminStock.constants";
import type { StockCardsProps } from "../AdminStock.types";
import { StockCard } from "./StockCard";

/**
 * Products as cards for mobile.
 *
 * @param props Props of the component, see {@link StockCardsProps}.
 * @param props.rows Products to list.
 * @returns The rendered element.
 */
export function StockCards({ rows }: StockCardsProps) {
  return (
    <ul className={styles.mobileOnly} aria-label={CARDS_LABEL}>
      {rows.map((product) => (
        <StockCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
