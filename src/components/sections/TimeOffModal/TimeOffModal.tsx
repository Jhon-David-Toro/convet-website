"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { Alert } from "@/components/ui/Alert";
import { DateInput } from "@/components/ui/DateInput";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  INITIAL_TIME_OFF,
  MEMBER_OPTIONS,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  REASON_OPTIONS,
  REVIEW_HREF,
  REVIEW_LABEL_PREFIX,
  SAVED_MESSAGE,
  SUBMIT_LABEL,
} from "./TimeOffModal.constants";
import { affectedAppointments, affectedTitle, errorTitle, validateTimeOff } from "./TimeOffModal.utils";
import styles from "./TimeOffModal.module.scss";

/**
 * Dialog that adds time off for a team member: who, the first and last day and the reason. It lists the appointments the time off affects so they can be rescheduled first.
 * The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the time off is saved.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function TimeOffModal({ open, onClose }: DialogControlProps) {
  return open ? <TimeOffDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link TimeOffModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function TimeOffDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: INITIAL_TIME_OFF,
    validate: validateTimeOff,
    onSaved: () => {
      toast({ message: SAVED_MESSAGE, tone: "success" });
      onClose();
    },
  });
  const affected = affectedAppointments(form.values.member);

  return (
    <FormModal
      title={MODAL_TITLE}
      description={MODAL_DESCRIPTION}
      width={MODAL_WIDTH}
      status={form.status}
      errorTitle={errorTitle(form.errorCount)}
      submitLabel={SUBMIT_LABEL}
      onClose={onClose}
      onSubmit={form.submit}
    >
      <Select label="Team member" options={MEMBER_OPTIONS} value={form.values.member} onValueChange={(value) => form.setValue("member", value)} />
      <div className={styles.pair}>
        <DateInput label="From" error={form.errors.from} value={form.values.from} onValueChange={(value) => form.setValue("from", value)} />
        <DateInput label="To" error={form.errors.to} value={form.values.to} onValueChange={(value) => form.setValue("to", value)} />
      </div>
      <Select label="Reason (internal)" options={REASON_OPTIONS} value={form.values.reason} onValueChange={(value) => form.setValue("reason", value)} />
      {affected.length > 0 && (
        <Alert tone="warning" title={affectedTitle(affected.length)} action={{ label: `${REVIEW_LABEL_PREFIX} ${affected.length} appointments`, href: REVIEW_HREF }}>
          {`${affected.map((item) => `${item.when} — ${item.pet}`).join(" · ")}. Clients are offered Reschedule first.`}
        </Alert>
      )}
    </FormModal>
  );
}
