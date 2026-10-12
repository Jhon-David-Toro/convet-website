import { DIAGNOSES_TITLE } from "../HealthRecords.constants";
import type { RecordDiagnosesProps } from "../HealthRecords.types";
import styles from "../HealthRecords.module.scss";

/**
 * Diagnoses and observations of the vets, each with its date and author.
 *
 * @param props Props of the component, see {@link RecordDiagnosesProps}.
 * @param props.record Health record of the pet.
 * @returns The rendered element.
 */
export function RecordDiagnoses({ record }: RecordDiagnosesProps) {
  return (
    <section className={styles.card} aria-labelledby="record-diagnoses-title">
      <h2 id="record-diagnoses-title" className={styles.cardTitle}>
        {DIAGNOSES_TITLE}
      </h2>
      <ul className={styles.diagnoses}>
        {record.diagnoses.map((diagnosis) => (
          <li key={diagnosis.title} className={styles.diagnosis}>
            <p className={styles.diagnosisTitle}>{diagnosis.title}</p>
            <p className={styles.diagnosisMeta}>{diagnosis.meta}</p>
            <p className={styles.diagnosisText}>{diagnosis.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
