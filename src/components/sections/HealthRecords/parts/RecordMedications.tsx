import { Badge } from "@/components/ui/Badge";
import { Icon, Pill } from "@/components/ui/Icon";

import { ACTIVE_LABEL, COMPLETED_LABEL, MEDICATIONS_TITLE } from "../HealthRecords.constants";
import type { RecordMedicationsProps } from "../HealthRecords.types";
import styles from "../HealthRecords.module.scss";

/**
 * Medications on record: name, how it is given and the status, active or completed.
 *
 * @param props Props of the component, see {@link RecordMedicationsProps}.
 * @param props.record Health record of the pet.
 * @returns The rendered element.
 */
export function RecordMedications({ record }: RecordMedicationsProps) {
  return (
    <section className={styles.card} aria-labelledby="record-medications-title">
      <h2 id="record-medications-title" className={styles.cardTitle}>
        {MEDICATIONS_TITLE}
      </h2>
      <ul className={styles.medications}>
        {record.medications.map((medication) => (
          <li key={medication.name} className={styles.medication}>
            <Icon icon={Pill} tone="brand" />
            <div className={styles.medicationText}>
              <p className={styles.medicationName}>{medication.name}</p>
              <p className={styles.medicationDetail}>{medication.detail}</p>
            </div>
            <Badge tone={medication.active ? "success" : "neutral"}>{medication.active ? ACTIVE_LABEL : COMPLETED_LABEL}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
