import { Avatar } from "@/components/ui/Avatar";

import type { PatientCardHeadProps } from "../VisitRecord.types";
import styles from "../VisitRecord.module.scss";

/**
 * Avatar, name and short description of the patient.
 *
 * @param props Props of the component, see {@link PatientCardHeadProps}.
 * @param props.patient Patient of the visit.
 * @returns The rendered element.
 */
export function PatientCardHead({ patient }: PatientCardHeadProps) {
  return (
    <div className={styles.cardHead}>
      <Avatar subject={patient.species} size="large" />
      <div>
        <p className={styles.patientName}>{patient.name}</p>
        <p className={styles.patientText}>{patient.summary}</p>
      </div>
    </div>
  );
}
