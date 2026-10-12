import type { DialogControlProps } from "@/components/patterns/FormModal";
import type { StaffPatientRow } from "@/lib/staff/staff.types";

export type ArchivePatientModalProps = DialogControlProps & {
  patient: StaffPatientRow;
};
