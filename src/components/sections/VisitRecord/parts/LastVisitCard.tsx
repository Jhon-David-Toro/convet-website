import Link from "next/link";

import { File, Icon } from "@/components/ui/Icon";

import { PROFILE_HREF } from "../VisitRecord.constants";
import styles from "../VisitRecord.module.scss";
import type { LastVisitCardProps } from "../VisitRecord.types";

/**
 * Reminder of the previous visit: when it was, what was found and a link to the paper record.
 *
 * @param props Props of the component, see {@link LastVisitCardProps}.
 * @param props.visit Visit of the record.
 * @param props.patient Patient of the visit.
 * @returns The rendered element.
 */
export function LastVisitCard({ visit, patient }: LastVisitCardProps) {
  return (
    <section className={styles.card} aria-labelledby="visit-last">
      <h2 id="visit-last" className={styles.cardTitle}>
        {visit.lastVisit.title}
      </h2>
      <p className={styles.patientText}>{visit.lastVisit.text}</p>
      <Link href={`${PROFILE_HREF}/${patient.id}`} className={styles.documentLink}>
        <Icon icon={File} size="small" />
        {visit.lastVisit.document}
      </Link>
    </section>
  );
}
