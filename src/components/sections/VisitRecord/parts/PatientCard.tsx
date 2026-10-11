import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, Clock } from "@/components/ui/Icon";

import { PROFILE_HREF } from "../VisitRecord.constants";
import styles from "../VisitRecord.module.scss";
import type { PatientCardProps } from "../VisitRecord.types";
import { PatientCardHead } from "./PatientCardHead";
import { PatientFacts } from "./PatientFacts";
import { ProfileLink } from "./ProfileLink";

/**
 * Card of the patient next to the form: name and description, the allergy, the facts, the rabies status and the link to the record.
 *
 * @param props Props of the component, see {@link PatientCardProps}.
 * @param props.patient Patient of the visit.
 * @returns The rendered element.
 */
export function PatientCard({ patient }: PatientCardProps) {
  return (
    <section className={styles.card} aria-label={patient.name}>
      <PatientCardHead patient={patient} />
      <Badge tone="error" icon={AlertTriangle} className={styles.wide}>
        {patient.allergy}
      </Badge>
      <PatientFacts patient={patient} />
      <Badge tone="warning" icon={Clock}>
        {patient.rabiesBadge}
      </Badge>
      <ProfileLink href={`${PROFILE_HREF}/${patient.id}`} />
    </section>
  );
}
