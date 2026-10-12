import { DRAWER_MOVEMENTS_TITLE } from "../StaffInventory.constants";
import type { DrawerProductProps } from "../StaffInventory.types";
import styles from "../StaffInventory.module.scss";

/**
 * Latest stock movements of a product: what changed, and who did it and when.
 *
 * @param props Props of the component, see {@link DrawerProductProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function DrawerMovements({ product }: DrawerProductProps) {
  if (product.movements.length === 0) return null;

  return (
    <section className={styles.drawerSection}>
      <h3 className={styles.drawerHeading}>{DRAWER_MOVEMENTS_TITLE}</h3>
      <ul className={styles.movements}>
        {product.movements.map((movement) => (
          <li key={movement.id} className={styles.movement}>
            <span className={styles.movementText}>{movement.text}</span>
            <span className={styles.movementMeta}>{movement.meta}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
