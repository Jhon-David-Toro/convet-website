import { Button } from "@/components/ui/Button";
import { Clipboard, Plus } from "@/components/ui/Icon";
import { STAFF_NEW_APPOINTMENT_HREF, STAFF_VISITS_HREF } from "@/lib/staff/staff.paths.constants";

import { NEW_APPOINTMENT_LABEL, START_VISIT_LABEL } from "../PatientRecord.constants";
import styles from "../PatientRecord.module.scss";
import type { PatientHeaderProps } from "../PatientRecord.types";

/**
 * Main actions of the record: start the visit of today and book a new appointment.
 *
 * @param props Props of the component, see {@link PatientHeaderProps}.
 * @param props.patient Patient of the record.
 * @returns The rendered element.
 */
export function PatientActions({ patient }: PatientHeaderProps) {
  return (
    <div className={styles.actions}>
      <Button href={`${STAFF_VISITS_HREF}/${patient.id}-today`} size="small" leadingIcon={Clipboard}>
        {START_VISIT_LABEL}
      </Button>
      <Button href={STAFF_NEW_APPOINTMENT_HREF} variant="secondary" size="small" leadingIcon={Plus}>
        {NEW_APPOINTMENT_LABEL}
      </Button>
    </div>
  );
}
