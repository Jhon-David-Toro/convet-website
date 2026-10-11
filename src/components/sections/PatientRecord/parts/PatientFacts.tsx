import { MICROCHIP_LABEL, WEIGHT_LABEL } from "../PatientRecord.constants";
import type { PatientFactsProps } from "../PatientRecord.types";
import styles from "../PatientRecord.module.scss";

/**
 * Microchip and weight of the patient.
 *
 * @param props Props of the component, see {@link PatientFactsProps}.
 * @param props.patient Patient of the record.
 * @returns The rendered element.
 */
export function PatientFacts({ patient }: PatientFactsProps) {
  return (
    <dl className={styles.facts}>
      <div className={styles.fact}>
        <dt>{MICROCHIP_LABEL}</dt>
        <dd className={styles.mono}>{patient.microchip}</dd>
      </div>
      <div className={styles.fact}>
        <dt>{WEIGHT_LABEL}</dt>
        <dd>{patient.weight}</dd>
      </div>
    </dl>
  );
}
