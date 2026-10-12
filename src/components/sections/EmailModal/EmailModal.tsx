"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { TextInput } from "@/components/ui/TextInput";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import { CODE_HELPER, CODE_PLACEHOLDER, EMPTY_EMAIL, MODAL_DESCRIPTION, MODAL_TITLE, SAVED_MESSAGE, SUBMIT_LABEL } from "./EmailModal.constants";
import { errorTitle, formatCode, validateEmailChange } from "./EmailModal.utils";

/**
 * Dialog that changes the sign-in email: the new address and the 6-digit code that was sent to it. The email changes after the code is confirmed.
 * The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the email is confirmed.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function EmailModal({ open, onClose }: DialogControlProps) {
  return open ? <EmailDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link EmailModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function EmailDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: EMPTY_EMAIL,
    validate: validateEmailChange,
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
      <TextInput label="New email" type="email" autoComplete="email" error={form.errors.email} value={form.values.email} onChange={(event) => form.setValue("email", event.target.value)} />
      <TextInput
        label="Code from the email"
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder={CODE_PLACEHOLDER}
        helper={CODE_HELPER}
        error={form.errors.code}
        value={form.values.code}
        onChange={(event) => form.setValue("code", formatCode(event.target.value))}
      />
    </FormModal>
  );
}
