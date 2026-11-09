"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { CUSTOMER_PETS_HREF } from "@/lib/customer/customer.paths.constants";

import { ARCHIVE_ERROR_TITLE, ARCHIVE_LABEL, KEEP_PET_LABEL, UNEXPECTED_ERROR } from "../PetProfile.constants";
import type { ArchivePetModalProps } from "../PetProfile.types";
import { archiveDescription, archivedMessage, archiveTitle } from "../PetProfile.utils";

/**
 * Confirmation before a pet is archived. "Keep pet" closes it and changes nothing. The pet is archived only when the backend
 * answers with success; then the customer goes back to the list of their pets. A failure keeps the dialog open with the reason.
 * The dialog is mounted only while it is open, and its title and description are read by screen readers.
 *
 * @param props Props of the component, see {@link ArchivePetModalProps}.
 * @param props.pet Pet to archive.
 * @param props.onClose Closes the dialog without archiving.
 * @param props.onArchive Archives the pet through the backend.
 * @returns The rendered element.
 */
export function ArchivePetModal({ pet, onClose, onArchive }: ArchivePetModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  /**
   * Archives the pet. A call that throws counts as a failure, never as an archived pet.
   */
  async function confirm() {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(undefined);
    const result = await onArchive(pet.id).catch(() => undefined);
    if (result?.ok) {
      toast({ message: archivedMessage(pet.name), tone: "success" });
      router.push(CUSTOMER_PETS_HREF);
      return;
    }
    setSubmitting(false);
    setSubmitError(result && !result.ok ? result.message : UNEXPECTED_ERROR);
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={archiveTitle(pet.name)}
      description={archiveDescription(pet.name)}
      actions={
        <>
          <Button type="button" variant="tertiary" onClick={onClose} data-autofocus>
            {KEEP_PET_LABEL}
          </Button>
          <Button type="button" variant="destructive" onClick={confirm} loading={submitting} disabled={submitting}>
            {ARCHIVE_LABEL}
          </Button>
        </>
      }
    >
      {submitError && (
        <Alert tone="error" title={ARCHIVE_ERROR_TITLE}>
          {submitError}
        </Alert>
      )}
    </Modal>
  );
}
