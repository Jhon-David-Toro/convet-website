"use client";

import { useId } from "react";

import { BREEDS, BREEDS_LIST_ID } from "@/components/sections/MyPets/MyPets.constants";
import { BirthFields } from "@/components/sections/MyPets/parts/BirthFields";
import { PetIdentityFields } from "@/components/sections/MyPets/parts/PetIdentityFields";
import { SexField } from "@/components/sections/MyPets/parts/SexField";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";

import { CANCEL_LABEL, EDIT_DESCRIPTION, SAVE_CHANGES_LABEL, SAVE_ERROR_TITLE } from "../PetProfile.constants";
import type { EditPetModalProps } from "../PetProfile.types";
import { editTitle, updatedMessage } from "../PetProfile.utils";
import { useEditPet } from "../hooks/useEditPet";
import styles from "../PetProfile.module.scss";

/**
 * Dialog that changes the details of a pet: the same fields as "Add a pet", without the photo, which the backend does not take yet.
 * It is mounted only while it is open, so it always starts from the current values of the pet.
 *
 * @param props Props of the component, see {@link EditPetModalProps}.
 * @param props.idPet Id of the pet.
 * @param props.name Name of the pet, for the title.
 * @param props.initial Current values of the pet.
 * @param props.onClose Closes the dialog.
 * @param props.onSave Saves the changes through the backend.
 * @returns The rendered element.
 */
export function EditPetModal({ idPet, name, initial, onClose, onSave }: EditPetModalProps) {
  const { toast } = useToast();
  const formId = useId();
  const form = useEditPet({
    idPet,
    initial,
    onSave,
    onSaved: (saved) => {
      toast({ message: updatedMessage(saved.name.trim()), tone: "success" });
      onClose();
    },
  });

  return (
    <Modal
      open
      onClose={onClose}
      title={editTitle(name)}
      description={EDIT_DESCRIPTION}
      actions={
        <>
          <Button type="button" variant="tertiary" onClick={onClose}>
            {CANCEL_LABEL}
          </Button>
          <Button type="submit" form={formId} loading={form.submitting}>
            {SAVE_CHANGES_LABEL}
          </Button>
        </>
      }
    >
      <form id={formId} noValidate onSubmit={form.handleSubmit} className={styles.form} aria-busy={form.submitting}>
        {form.submitError && (
          <Alert tone="error" title={SAVE_ERROR_TITLE}>
            {form.submitError}
          </Alert>
        )}
        <PetIdentityFields values={form.values} errors={form.errors} setValue={form.setValue} />
        <SexField values={form.values} setValue={form.setValue} />
        <BirthFields values={form.values} errors={form.errors} setValue={form.setValue} age={form.age} />
        <datalist id={BREEDS_LIST_ID}>
          {BREEDS.map((breed) => (
            <option key={breed} value={breed} />
          ))}
        </datalist>
      </form>
    </Modal>
  );
}
