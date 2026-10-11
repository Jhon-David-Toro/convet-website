import { StatusBadge } from "@/components/patterns/StatusBadge";
import { cx } from "@/lib/shared/cx";

import { MOVEMENT_VIEWS } from "../ProductLots.constants";
import type { MovementItemProps } from "../ProductLots.types";
import { signedQuantity } from "../ProductLots.utils";
import styles from "../ProductLots.module.scss";

/**
 * One stock movement: when, its type, what happened and the units that came in or went out.
 *
 * @param props Props of the component, see {@link MovementItemProps}.
 * @param props.movement Movement to show.
 * @returns The rendered element.
 */
export function MovementItem({ movement }: MovementItemProps) {
  return (
    <li className={styles.movement}>
      <span className={styles.when}>{movement.when}</span>
      <StatusBadge view={MOVEMENT_VIEWS[movement.type]} />
      <span className={styles.detail}>{movement.detail}</span>
      <span className={cx(styles.quantity, movement.quantity > 0 && styles.positive)}>{signedQuantity(movement.quantity)}</span>
    </li>
  );
}
