import type { ClinicalFieldProps } from "../PatientRecord.types";
import styles from "../PatientRecord.module.scss";

/**
 * Block of the visit with an overline label and a paragraph (findings, diagnosis, plan).
 *
 * @param props Props of the component, see {@link ClinicalFieldProps}.
 * @param props.label Label of the block.
 * @param props.text Text of the block.
 * @returns The rendered element.
 */
export function ClinicalField({ label, text }: ClinicalFieldProps) {
  return (
    <div className={styles.clinical}>
      <p className={styles.clinicalLabel}>{label}</p>
      <p className={styles.clinicalText}>{text}</p>
    </div>
  );
}
