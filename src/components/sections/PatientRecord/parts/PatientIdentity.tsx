import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, Clock, Icon } from "@/components/ui/Icon";

import type { PatientIdentityProps } from "../PatientRecord.types";
import styles from "../PatientRecord.module.scss";

/**
 * Name of the patient with the rabies status, its description and the allergy on a red background.
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
      <p className={styles.allergy}>
        <Icon icon={AlertTriangle} tone="error" />
        {patient.allergy}
      </p>
    </div>
  );
}
