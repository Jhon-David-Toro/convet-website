import Link from "next/link";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Icon, User } from "@/components/ui/Icon";

import { OWNER_PREFIX } from "../StaffPatients.constants";
import type { PatientRowProps } from "../StaffPatients.types";
import { breedLine, patientHref } from "../StaffPatients.utils";
import { VaccineBadge } from "./VaccineBadge";
import styles from "../StaffPatients.module.scss";

/**
 * Card of one patient on mobile: pet with breed, color, birth date and age, the owner, the vaccination status and the next appointment.
 *
 * @param props Props of the component, see {@link PatientRowProps}.
 * @param props.patient Patient of the card.
 * @returns The rendered element.
 */
export function PatientCard({ patient }: PatientRowProps) {
  return (
    <li className={styles.card}>
      <div className={styles.cardPatient}>
        <Avatar subject={patient.species} size="medium" />
        <div className={styles.cardNames}>
          <Link href={patientHref()} className={styles.cardName}>
            {patient.name}
          </Link>
          <span className={styles.cardMeta}>{`${breedLine(patient)} · ${patient.color}`}</span>
          <span className={styles.cardMeta}>{`Born ${patient.born} · ${patient.age}`}</span>
        </div>
      </div>
      <p className={styles.cardOwner}>
        <Icon icon={User} size="small" tone="tertiary" />
        {`${OWNER_PREFIX} ${patient.owner} · ${patient.phone}`}
      </p>
      <div className={styles.cardBadges}>
        <VaccineBadge vaccine={patient.vaccine} vaccineLabel={patient.vaccineLabel} />
        {patient.nextShort && (
          <Badge tone="info" icon={Calendar}>
            {`Next: ${patient.nextShort}`}
          </Badge>
        )}
      </div>
    </li>
  );
}
