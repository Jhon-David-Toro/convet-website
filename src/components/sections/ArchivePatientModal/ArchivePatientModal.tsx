"use client";

import { FormModal } from "@/components/patterns/FormModal";
import { Alert } from "@/components/ui/Alert";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import { KEEP_LABEL, SUBMIT_LABEL } from "./ArchivePatientModal.constants";
import type { ArchivePatientModalProps } from "./ArchivePatientModal.types";
import { archiveDescription, archivedMessage, archiveTitle } from "./ArchivePatientModal.utils";

/**
 * Confirmation to archive a patient: it is hidden from lists and booking, its history is kept, and the upcoming appointment, if any, is cancelled.
 * The dialog is only mounted while it is open.
 *
 * @param props Props of the component, see {@link ArchivePatientModalProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the patient is archived.
 * @param props.patient The patient to archive.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function ArchivePatientModal({ open, ...dialog }: ArchivePatientModalProps) {
  return open ? <ArchiveDialog {...dialog} /> : null;
}

/**
 * The open dialog of {@link ArchivePatientModal}; it holds the state of the confirmation.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @param props.patient The patient to archive.
 * @returns The rendered element.
 */
function ArchiveDialog({ onClose, patient }: Omit<ArchivePatientModalProps, "open">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: {},
    validate: () => ({}),
    onSaved: () => {
      toast({ message: archivedMessage(patient.name), tone: "success" });
      onClose();
    },
  });

  return (
    <FormModal
      title={archiveTitle(patient.name)}
      description={archiveDescription(patient.name)}
      width="30rem"
      status={form.status}
      submitLabel={SUBMIT_LABEL}
      cancelLabel={KEEP_LABEL}
      destructive
      onClose={onClose}
      onSubmit={form.submit}
    >
      {patient.nextWhen !== "—" && (
        <Alert tone="warning" title="Upcoming appointment will be cancelled">
          {`${patient.nextWhen} with ${patient.nextWhat.split("· ").at(-1)}. The owner is notified.`}
        </Alert>
      )}
    </FormModal>
  );
}
