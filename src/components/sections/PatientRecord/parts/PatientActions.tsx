import { ModalButton } from "@/components/sections/ModalButton";
import { Button } from "@/components/ui/Button";
import { Clipboard } from "@/components/ui/Icon";
import { STAFF_VISITS_HREF } from "@/lib/staff/staff.paths.constants";

import { NEW_APPOINTMENT_LABEL, START_VISIT_LABEL } from "../PatientRecord.constants";
import type { PatientHeaderProps } from "../PatientRecord.types";
import styles from "../PatientRecord.module.scss";

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
      <ModalButton modal="appointment" icon="plus" variant="secondary" size="small">
        {NEW_APPOINTMENT_LABEL}
      </ModalButton>
    </div>
  );
}
