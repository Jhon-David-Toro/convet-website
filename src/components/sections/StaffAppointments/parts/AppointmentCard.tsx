import { Avatar } from "@/components/ui/Avatar";
import { findStaffVet } from "@/lib/staff/staff.utils";

import type { AppointmentRowProps } from "../StaffAppointments.types";
import { StatusBadge } from "./StatusBadge";
import styles from "../StaffAppointments.module.scss";

/**
 * Card of one appointment on mobile: time and status, patient with the owner, and the service with the vet.
 *
 * @param props Props of the component, see {@link AppointmentRowProps}.
 * @param props.appointment Appointment of the card.
 * @returns The rendered element.
 */
export function AppointmentCard({ appointment }: AppointmentRowProps) {
  return (
    <li className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.cardTime}>{appointment.time}</span>
        <StatusBadge status={appointment.status} />
      </div>
      <div className={styles.cardPatient}>
        <Avatar subject={appointment.species} size="small" />
        <div className={styles.cardNames}>
          <span className={styles.cardName}>{appointment.patient}</span>
          <span className={styles.cardOwner}>{appointment.owner}</span>
        </div>
      </div>
      <p className={styles.cardMeta}>{`${appointment.service} · ${findStaffVet(appointment.vetId).name}`}</p>
    </li>
  );
}
