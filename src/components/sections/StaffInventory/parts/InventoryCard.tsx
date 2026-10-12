import { OPEN_LABEL_PREFIX } from "../StaffInventory.constants";
import type { InventoryRowProps } from "../StaffInventory.types";
import { InventoryStatusBadge } from "./InventoryStatusBadge";
import styles from "../StaffInventory.module.scss";

/**
 * Card of one product on mobile: name and status, description and type, the SKU with what is on hand, and the next lot; the whole card opens the product.
 *
 * @param props Props of the component, see {@link InventoryRowProps}.
 * @param props.product Product of the card.
 * @param props.onOpen Opens the product in the side panel.
 * @returns The rendered element.
 */
export function InventoryCard({ product, onOpen }: InventoryRowProps) {
  return (
    <li>
      <button type="button" className={styles.card} aria-label={`${OPEN_LABEL_PREFIX} ${product.name}`} onClick={() => onOpen(product.id)}>
        <span className={styles.cardTop}>
          <span className={styles.cardName}>{product.name}</span>
          <InventoryStatusBadge status={product.status} statusLabel={product.statusLabel} />
        </span>
        <span className={styles.cardMeta}>{`${product.description} · ${product.type}`}</span>
        <span className={styles.cardStock}>
          <span className={styles.cardSku}>{product.sku}</span>
          <span className={styles.cardOnHand}>{`${product.onHand} ${product.stockNote}`}</span>
        </span>
        <span className={styles.cardLot}>{`${product.lotCode} · ${product.lotNote}`}</span>
      </button>
    </li>
  );
}
