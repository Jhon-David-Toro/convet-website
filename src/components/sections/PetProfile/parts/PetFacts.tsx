import { cx } from "@/lib/shared/cx";

import styles from "../PetProfile.module.scss";
import type { PetProps } from "../PetProfile.types";
import { petFacts } from "../PetProfile.utils";

/**
 * Microchip, latest weight and vet of a pet as a row of labelled values.
 *
 * @param props Props of the component, see {@link PetProps}.
 * @param props.pet Pet to describe.
 * @returns The rendered element.
 */
export function PetFacts({ pet }: PetProps) {
  return (
    <dl className={styles.facts}>
      {petFacts(pet).map(({ label, value, mono }) => (
        <div key={label} className={styles.fact}>
          <dt>{label}</dt>
          <dd className={cx(mono && styles.mono)}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
