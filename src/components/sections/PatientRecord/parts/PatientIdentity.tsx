import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, Clock } from "@/components/ui/Icon";

import styles from "../PatientRecord.module.scss";
import type { PatientIdentityProps } from "../PatientRecord.types";

/**
 * Name of the patient with the rabies status, its description and the allergy.
 *
 * @param props Props of the component, see {@link PatientIdentityProps}.
 * @param props.patient Patient of the record.
 * @returns The rendered element.
 */
export function PatientIdentity({ patient }: PatientIdentityProps) {
  return (
    <div className={styles.identity}>
      <div className={styles.nameRow}>
        <h1 id="patient-name" className={styles.name}>
          {patient.name}
        </h1>
        <Badge tone="warning" icon={Clock}>
          {patient.rabiesBadge}
        </Badge>
      </div>
      <p className={styles.description}>{patient.description}</p>
      <Badge tone="error" icon={AlertTriangle}>
        {patient.allergy}
      </Badge>
    </div>
  );
}
