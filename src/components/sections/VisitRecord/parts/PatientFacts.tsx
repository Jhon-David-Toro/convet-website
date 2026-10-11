import { cx } from "@/lib/shared/cx";

import type { PatientFactsProps } from "../VisitRecord.types";
import { patientFacts } from "../VisitRecord.utils";
import styles from "../VisitRecord.module.scss";

/**
 * Microchip, weight and next visit of the patient, as a list of label and value.
 *
 * @param props Props of the component, see {@link PatientFactsProps}.
 * @param props.patient Patient of the visit.
 * @returns The rendered element.
 */
export function PatientFacts({ patient }: PatientFactsProps) {
  return (
    <dl className={styles.facts}>
      {patientFacts(patient).map(({ label, value, mono }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd className={cx(mono && styles.mono)}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
