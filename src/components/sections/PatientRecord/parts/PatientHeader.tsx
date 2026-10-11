import { Avatar } from "@/components/ui/Avatar";

import styles from "../PatientRecord.module.scss";
import type { PatientHeaderProps } from "../PatientRecord.types";
import { PatientActions } from "./PatientActions";
import { PatientFacts } from "./PatientFacts";
import { PatientIdentity } from "./PatientIdentity";

/**
 * Card at the top of the record: the patient with the rabies status, the allergy, the microchip and the weight, and the main actions.
 *
 * @param props Props of the component, see {@link PatientHeaderProps}.
 * @param props.patient Patient of the record.
 * @returns The rendered element.
 */
export function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <section className={styles.header} aria-labelledby="patient-name">
      <Avatar subject={patient.species} size="large" className={styles.avatar} />
      <PatientIdentity patient={patient} />
      <PatientFacts patient={patient} />
      <PatientActions patient={patient} />
    </section>
  );
}
