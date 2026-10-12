"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { TextInput } from "@/components/ui/TextInput";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  EMAIL_LABEL,
  EMPTY_SUPPLIER,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  NOTES_HELPER,
  NOTES_PLACEHOLDER,
  PHONE_LABEL,
  SAVED_MESSAGE,
  SUBMIT_LABEL,
} from "./SupplierModal.constants";
import { errorTitle, validateSupplier } from "./SupplierModal.utils";

/**
 * Dialog that adds a supplier of the clinic, used when receiving stock: company, contact email, phone and notes.
 * The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the supplier is saved.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function SupplierModal({ open, onClose }: DialogControlProps) {
  return open ? <SupplierDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link SupplierModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function SupplierDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: EMPTY_SUPPLIER,
    validate: validateSupplier,
    onSaved: () => {
      toast({ message: SAVED_MESSAGE, tone: "success" });
      onClose();
    },
  });

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
      <TextInput label="Company name" error={form.errors.company} value={form.values.company} onChange={(event) => form.setValue("company", event.target.value)} />
      <TextInput label={EMAIL_LABEL} type="email" autoComplete="email" error={form.errors.email} value={form.values.email} onChange={(event) => form.setValue("email", event.target.value)} />
      <TextInput label={PHONE_LABEL} type="tel" autoComplete="tel" error={form.errors.phone} value={form.values.phone} onChange={(event) => form.setValue("phone", event.target.value)} />
      <Textarea label="Notes" optional placeholder={NOTES_PLACEHOLDER} helper={NOTES_HELPER} value={form.values.notes} onChange={(event) => form.setValue("notes", event.target.value)} />
    </FormModal>
  );
}
