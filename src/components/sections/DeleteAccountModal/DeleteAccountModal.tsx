"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { Alert } from "@/components/ui/Alert";
import { TextInput } from "@/components/ui/TextInput";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  APPOINTMENT_NOTE,
  APPOINTMENT_TITLE,
  CONFIRM_HELPER,
  EMPTY_DELETION,
  KEEP_LABEL,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  SAVED_MESSAGE,
  SUBMIT_LABEL,
} from "./DeleteAccountModal.constants";
import { errorTitle, validateDeletion } from "./DeleteAccountModal.utils";

/**
 * Confirmation to delete the account: what will be lost, the appointment that will be cancelled, a word to type and the password.
 * The request is confirmed by email before the account is closed. The form is only mounted while the dialog is open.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the request is sent.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function DeleteAccountModal({ open, onClose }: DialogControlProps) {
  return open ? <DeleteAccountDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link DeleteAccountModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function DeleteAccountDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: EMPTY_DELETION,
    validate: validateDeletion,
    onSaved: () => {
      toast({ message: SAVED_MESSAGE, tone: "info" });
      onClose();
    },
  });

  return (
    <FormModal
      title={MODAL_TITLE}
      description={MODAL_DESCRIPTION}
      width="32.5rem"
      status={form.status}
      errorTitle={errorTitle(form.errorCount)}
      submitLabel={SUBMIT_LABEL}
      cancelLabel={KEEP_LABEL}
      destructive
      onClose={onClose}
      onSubmit={form.submit}
    >
      <Alert tone="warning" title={APPOINTMENT_TITLE}>
        {APPOINTMENT_NOTE}
      </Alert>
      <TextInput label="Type DELETE to confirm" helper={CONFIRM_HELPER} error={form.errors.confirmation} value={form.values.confirmation} onChange={(event) => form.setValue("confirmation", event.target.value)} />
      <TextInput label="Password" type="password" autoComplete="current-password" error={form.errors.password} value={form.values.password} onChange={(event) => form.setValue("password", event.target.value)} />
    </FormModal>
  );
}
