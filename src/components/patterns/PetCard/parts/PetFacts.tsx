import type { PetFactsProps } from "../PetCard.types";
import styles from "../PetCard.module.scss";

/**
 * Key facts (microchip, weight, next visit) as a definition list.
 *
 * @param props Props of the component, see {@link PetFactsProps}.
 * @param props.facts Key facts, each with a label and a value.
 * @returns The rendered element.
 */
export function PetFacts({ facts }: PetFactsProps) {
  return (
    <dl className={styles.facts}>
      {facts.map(({ label, value, mono }) => (
        <div key={label} className={styles.fact}>
          <dt className={styles.factLabel}>{label}</dt>
          <dd className={mono ? styles.factMono : styles.factValue}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
