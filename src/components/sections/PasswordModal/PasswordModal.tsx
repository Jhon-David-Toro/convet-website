"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { PasswordStrength } from "@/components/ui/PasswordStrength";
import { TextInput } from "@/components/ui/TextInput";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import { EMPTY_PASSWORDS, MODAL_DESCRIPTION, MODAL_TITLE, NEW_HELPER, SAVED_MESSAGE, SUBMIT_LABEL } from "./PasswordModal.constants";
import { errorTitle, validatePasswords } from "./PasswordModal.utils";

/**
 * Dialog that changes the password: the current one, the new one with its strength and the new one again. Other devices are signed out after the change.
 * The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the password is updated.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function PasswordModal({ open, onClose }: DialogControlProps) {
  return open ? <PasswordDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link PasswordModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function PasswordDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: EMPTY_PASSWORDS,
    validate: validatePasswords,
    onSaved: () => {
      toast({ message: SAVED_MESSAGE, tone: "success" });
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
      onClose={onClose}
      onSubmit={form.submit}
    >
      <TextInput label="Current password" type="password" autoComplete="current-password" error={form.errors.current} value={form.values.current} onChange={(event) => form.setValue("current", event.target.value)} />
      <TextInput label="New password" type="password" autoComplete="new-password" helper={NEW_HELPER} error={form.errors.next} value={form.values.next} onChange={(event) => form.setValue("next", event.target.value)} />
      <PasswordStrength password={form.values.next} />
      <TextInput label="Repeat new password" type="password" autoComplete="new-password" error={form.errors.repeat} value={form.values.repeat} onChange={(event) => form.setValue("repeat", event.target.value)} />
    </FormModal>
  );
}
