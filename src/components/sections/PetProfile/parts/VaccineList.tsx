import { VaccineRow } from "@/components/patterns/VaccineRow";

import type { VaccineListProps } from "../PetProfile.types";
import styles from "../PetProfile.module.scss";

/**
 * One row per vaccine with its dates and status.
 *
 * @param props Props of the component, see {@link VaccineListProps}.
 * @param props.vaccines Vaccines to list.
 * @returns The rendered element.
 */
export function VaccineList({ vaccines }: VaccineListProps) {
  return (
    <ul className={styles.vaccineList}>
      {vaccines.map(({ name, status, dates }) => (
        <VaccineRow key={name} vaccine={name} status={status} dates={dates} />
      ))}
    </ul>
  );
}
