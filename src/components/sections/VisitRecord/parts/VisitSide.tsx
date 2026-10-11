import styles from "../VisitRecord.module.scss";
import type { VisitSideProps } from "../VisitRecord.types";
import { LastVisitCard } from "./LastVisitCard";
import { PatientCard } from "./PatientCard";

/**
 * Column next to the form (desktop only): the patient with its facts, and a reminder of the last visit.
 *
 * @param props Props of the component, see {@link VisitSideProps}.
 * @param props.visit Visit of the record.
 * @param props.patient Patient of the visit.
 * @returns The rendered element.
 */
export function VisitSide({ visit, patient }: VisitSideProps) {
  return (
    <aside className={styles.side}>
      <PatientCard patient={patient} />
      <LastVisitCard visit={visit} patient={patient} />
    </aside>
  );
}
