"use client";

import { FormModal } from "@/components/patterns/FormModal";
import { Alert } from "@/components/ui/Alert";
import { DateInput } from "@/components/ui/DateInput";
import { TextInput } from "@/components/ui/TextInput";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  INITIAL_CLOSURE,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  REASON_HELPER,
  REASON_PLACEHOLDER,
  SAVED_MESSAGE,
  SUBMIT_LABEL,
  UNAFFECTED_TITLE,
} from "./ClosureModal.constants";
import type { ClosureDialogProps, ClosureModalProps } from "./ClosureModal.types";
import { buildClosure, errorTitle, unaffectedText, validateClosure } from "./ClosureModal.utils";

/**
 * Dialog that closes the location for a day: the day and the reason clients see. The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link ClosureModalProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the closure is saved.
 * @param props.onAdd Called with the closure when it is saved.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function ClosureModal({ open, onClose, onAdd }: ClosureModalProps) {
  return open ? <ClosureDialog onClose={onClose} onAdd={onAdd} /> : null;
}

/**
 * The open dialog of {@link ClosureModal}; it holds the state of the form.
 *
 * @param props Props of the component, see {@link ClosureDialogProps}.
 * @param props.onClose Closes the dialog.
 * @param props.onAdd Called with the closure when it is saved.
 * @returns The rendered element.
 */
function ClosureDialog({ onClose, onAdd }: ClosureDialogProps) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: INITIAL_CLOSURE,
    validate: validateClosure,
    onSaved: () => {
      onAdd(buildClosure(form.values));
      toast({ message: SAVED_MESSAGE, tone: "success" });
      onClose();
    },
  });
  const unaffected = unaffectedText(form.values.date);

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
      <DateInput label="Date" error={form.errors.date} value={form.values.date} onValueChange={(value) => form.setValue("date", value)} />
      <TextInput
        label="Reason shown to clients"
        placeholder={REASON_PLACEHOLDER}
        helper={REASON_HELPER}
        error={form.errors.reason}
        value={form.values.reason}
        onChange={(event) => form.setValue("reason", event.target.value)}
      />
      {unaffected && (
        <Alert tone="success" title={UNAFFECTED_TITLE}>
          {unaffected}
        </Alert>
      )}
    </FormModal>
  );
}
