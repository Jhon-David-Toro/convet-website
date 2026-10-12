"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { Checkbox } from "@/components/ui/Checkbox";
import { DateInput } from "@/components/ui/DateInput";
import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  INITIAL_APPOINTMENT,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  NOTES_HELPER,
  NOTES_PLACEHOLDER,
  NOTIFY_LABEL,
  PATIENT_PLACEHOLDER,
  SAVED_MESSAGE,
  SERVER_NOTE,
  SERVICE_OPTIONS,
  VET_OPTIONS,
} from "./AppointmentModal.constants";
import type { AppointmentDialogProps } from "./AppointmentModal.types";
import { errorTitle, submitLabel, validateAppointment } from "./AppointmentModal.utils";
import { SlotPicker } from "./parts/SlotPicker";
import styles from "./AppointmentModal.module.scss";

/**
 * Staff/Modal: New appointment. Books a visit on behalf of a client: patient, service, vet, date and one of the free ten-minute times.
 * The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the appointment is booked.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function AppointmentModal({ open, onClose }: DialogControlProps) {
  return open ? <AppointmentDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link AppointmentModal}; it holds the state of the form.
 *
 * @param props Props of the component, see {@link AppointmentDialogProps}.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function AppointmentDialog({ onClose }: AppointmentDialogProps) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: INITIAL_APPOINTMENT,
    validate: validateAppointment,
    onSaved: () => {
      toast({ message: SAVED_MESSAGE, tone: "success" });
      onClose();
    },
  });
  const { values, errors, setValue } = form;

  return (
    <FormModal
      title={MODAL_TITLE}
      description={MODAL_DESCRIPTION}
      width={MODAL_WIDTH}
      status={form.status}
      errorTitle={errorTitle(form.errorCount)}
      submitLabel={submitLabel(values)}
      onClose={onClose}
      onSubmit={form.submit}
    >
      <TextInput label="Patient & owner" placeholder={PATIENT_PLACEHOLDER} error={errors.patient} value={values.patient} onChange={(event) => setValue("patient", event.target.value)} />
      <div className={styles.pair}>
        <Select label="Service" options={SERVICE_OPTIONS} value={values.service} onValueChange={(value) => setValue("service", value)} />
        <Select label="Vet" options={VET_OPTIONS} value={values.vet} onValueChange={(value) => setValue("vet", value)} />
      </div>
      <DateInput label="Date" error={errors.date} value={values.date} onValueChange={(value) => setValue("date", value)} />
      <SlotPicker vetId={values.vet} date={values.date} time={values.time} error={errors.time} onPick={(time) => setValue("time", time)} />
      <Textarea label="Notes for the vet" placeholder={NOTES_PLACEHOLDER} helper={NOTES_HELPER} value={values.notes} onChange={(event) => setValue("notes", event.target.value)} />
      <Checkbox label={NOTIFY_LABEL} checked={values.notify} onChange={(event) => setValue("notify", event.target.checked)} />
      <p className={styles.note}>{SERVER_NOTE}</p>
    </FormModal>
  );
}
