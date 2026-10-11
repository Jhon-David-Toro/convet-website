import { VaccineRow } from "@/components/patterns/VaccineRow";
import { STAFF_VACCINES } from "@/lib/staff/staff.constants";

import { VACCINES_TITLE } from "../PatientRecord.constants";
import styles from "../PatientRecord.module.scss";

/**
 * Vaccines of the patient with their status: overdue, due soon or up to date.
 *
 * @returns The rendered element.
 */
export function VaccinesCard() {
  return (
    <section className={styles.card} aria-labelledby="patient-vaccines">
      <h2 id="patient-vaccines" className={styles.cardTitle}>
        {VACCINES_TITLE}
      </h2>
      <ul className={styles.vaccines}>
        {STAFF_VACCINES.map(({ id, ...vaccine }) => (
          <VaccineRow key={id} {...vaccine} />
        ))}
      </ul>
    </section>
  );
}
