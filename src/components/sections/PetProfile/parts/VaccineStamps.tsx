import styles from "../PetProfile.module.scss";
import type { VaccineStampsProps } from "../PetProfile.types";
import { VaccineStamp } from "./VaccineStamp";

/**
 * Row of vaccine stamps, like the stamps of a paper vaccination card (hidden on mobile).
 *
 * @param props Props of the component, see {@link VaccineStampsProps}.
 * @param props.vaccines Vaccines to stamp.
 * @returns The rendered element.
 */
export function VaccineStamps({ vaccines }: VaccineStampsProps) {
  return (
    <ul className={styles.stamps} aria-hidden="true">
      {vaccines.map((vaccine) => (
        <VaccineStamp key={vaccine.name} vaccine={vaccine} />
      ))}
    </ul>
  );
}
