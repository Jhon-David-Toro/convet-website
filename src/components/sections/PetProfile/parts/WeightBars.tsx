import type { WeightBarsProps } from "../PetProfile.types";
import { weightBars } from "../PetProfile.utils";
import styles from "../PetProfile.module.scss";

/**
 * Bars of the weight chart, the latest one solid.
 *
 * @param props Props of the component, see {@link WeightBarsProps}.
 * @param props.weights Weight points, oldest first.
 * @returns The rendered element.
 */
export function WeightBars({ weights }: WeightBarsProps) {
  return (
    <ul className={styles.bars}>
      {weightBars(weights).map(({ label, height, current }) => (
        <li key={label} className={styles.barItem}>
          <span className={styles.bar} data-current={current || undefined} style={{ height: `${height}%` }} />
          <span className={styles.barLabel}>{label}</span>
        </li>
      ))}
    </ul>
  );
}
