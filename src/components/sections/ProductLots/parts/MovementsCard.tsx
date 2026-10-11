import type { MovementsCardProps } from "../ProductLots.types";
import { LedgerLink } from "./LedgerLink";
import { MovementItem } from "./MovementItem";
import styles from "../ProductLots.module.scss";

/**
 * Card with the stock movements of the product, newest first, and a link to the full ledger.
 *
 * @param props Props of the component, see {@link MovementsCardProps}.
 * @param props.movements Movements to list.
 * @param props.title Title of the card.
 * @param props.showLedgerLink Whether the link to the full ledger is shown.
 * @returns The rendered element.
 */
export function MovementsCard({ movements, title, showLedgerLink }: MovementsCardProps) {
  return (
    <section className={styles.card} aria-labelledby="product-movements">
      <header className={styles.cardHeader}>
        <h2 id="product-movements" className={styles.cardTitle}>
          {title}
        </h2>
        {showLedgerLink && <LedgerLink />}
      </header>
      <ul className={styles.movements}>
        {movements.map((movement) => (
          <MovementItem key={movement.id} movement={movement} />
        ))}
      </ul>
    </section>
  );
}
