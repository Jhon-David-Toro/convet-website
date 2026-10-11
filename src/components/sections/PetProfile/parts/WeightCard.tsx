import { WEIGHT_CHANGE, WEIGHT_TITLE } from "../PetProfile.constants";
import type { WeightCardProps } from "../PetProfile.types";
import { latestWeight } from "../PetProfile.utils";
import { WeightBars } from "./WeightBars";
import styles from "../PetProfile.module.scss";

/**
 * Weight card: the latest weight, how it changed and a bar for every recorded weight.
 *
 * @param props Props of the component, see {@link WeightCardProps}.
 * @param props.weights Weight points, oldest first.
 * @returns The rendered element.
 */
export function WeightCard({ weights }: WeightCardProps) {
  return (
    <section className={styles.weight} aria-labelledby="pet-weight">
      <h2 id="pet-weight" className={styles.cardTitle}>
        {WEIGHT_TITLE}
      </h2>
      <p className={styles.current}>
        <strong>{latestWeight(weights)}</strong>
        <span>{WEIGHT_CHANGE}</span>
      </p>
      <WeightBars weights={weights} />
    </section>
  );
}
