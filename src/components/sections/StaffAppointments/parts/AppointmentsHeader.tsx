import { ModalButton } from "@/components/sections/ModalButton";

import { NEW_APPOINTMENT_LABEL, SUBTITLE, TITLE } from "../StaffAppointments.constants";
import styles from "../StaffAppointments.module.scss";

/**
 * Title of the page with the clinic and the day, and the new appointment button (desktop only).
 *
 * @returns The rendered element.
 */
export function AppointmentsHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{TITLE}</h1>
        <p className={styles.subtitle}>{SUBTITLE}</p>
      </div>
      <ModalButton modal="appointment" icon="plus">
        {NEW_APPOINTMENT_LABEL}
      </ModalButton>
    </header>
  );
}
