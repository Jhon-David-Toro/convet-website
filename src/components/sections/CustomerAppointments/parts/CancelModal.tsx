import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

import { CANCEL_MODAL } from "../CustomerAppointments.constants";
import type { CancelModalProps } from "../CustomerAppointments.types";
import { cancelDescription, rescheduleHref } from "../CustomerAppointments.utils";

/**
 * Dialog that offers to reschedule before cancelling: cancelling is always possible, rescheduling is free until 24 hours before.
 *
 * @param props Props of the component, see {@link CancelModalProps}.
 * @param props.appointment Appointment being cancelled; the dialog is closed without one.
 * @param props.onClose Closes the dialog without cancelling.
 * @param props.onConfirm Cancels the appointment.
 * @returns The rendered element.
 */
export function CancelModal({ appointment, onClose, onConfirm }: CancelModalProps) {
  return (
    <Modal
      open={Boolean(appointment)}
      onClose={onClose}
      icon={Calendar}
      iconTone="info"
      title={CANCEL_MODAL.title}
      description={appointment ? cancelDescription(appointment) : undefined}
      actions={
        <>
          <Button type="button" variant="tertiary" onClick={onConfirm}>
            {CANCEL_MODAL.confirm}
          </Button>
          {appointment && <Button href={rescheduleHref(appointment)}>{CANCEL_MODAL.reschedule}</Button>}
        </>
      }
    />
  );
}
