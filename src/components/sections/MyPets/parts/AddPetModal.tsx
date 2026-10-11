import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

import { CANCEL_LABEL, FORM_ID, MODAL_DESCRIPTION, MODAL_TITLE, SAVE_LABEL } from "../MyPets.constants";
import type { AddPetModalProps } from "../MyPets.types";
import { useAddPet } from "../hooks/useAddPet";
import { AddPetForm } from "./AddPetForm";

/**
 * Modal with the form that adds a pet; Cancel closes it and Save validates the form.
 *
 * @param props Props of the component, see {@link AddPetModalProps}.
 * @param props.open Whether the modal is open.
 * @param props.onClose Called to close the modal.
 * @param props.onSave Receives the values of a valid form.
 * @returns The rendered element.
 */
export function AddPetModal({ open, onClose, onSave }: AddPetModalProps) {
  const state = useAddPet({ onClose, onSave });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={MODAL_TITLE}
      description={MODAL_DESCRIPTION}
      actions={
        <>
          <Button type="button" variant="tertiary" onClick={onClose}>
            {CANCEL_LABEL}
          </Button>
          <Button type="submit" form={FORM_ID}>
            {SAVE_LABEL}
          </Button>
        </>
      }
    >
      <AddPetForm {...state} />
    </Modal>
  );
}
