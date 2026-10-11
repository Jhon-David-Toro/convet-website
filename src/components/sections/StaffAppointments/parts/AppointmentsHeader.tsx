import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { STAFF_NEW_APPOINTMENT_HREF } from "@/lib/staff.paths.constants";

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
      <Button href={STAFF_NEW_APPOINTMENT_HREF} leadingIcon={Plus}>
        {NEW_APPOINTMENT_LABEL}
      </Button>
    </header>
  );
}
