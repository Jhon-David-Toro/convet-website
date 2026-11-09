"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/Button";
import { Edit, Trash } from "@/components/ui/Icon";
import { useDisclosure } from "@/lib/shared/useDisclosure";

import { ACTIONS_LABEL, ARCHIVE_LABEL, EDIT_LABEL } from "../PetProfile.constants";
import type { PetActionsProps } from "../PetProfile.types";
import { useRestoreFocus } from "../hooks/useRestoreFocus";
import { ArchivePetModal } from "./ArchivePetModal";
import { EditPetModal } from "./EditPetModal";
import styles from "../PetProfile.module.scss";

/**
 * Buttons that change a pet: "Edit pet" opens the edit form and "Archive pet" opens the confirmation.
 * Only pets that come from the backend carry the values the edit form needs, so for any other pet nothing is shown.
 *
 * @param props Props of the component, see {@link PetActionsProps}.
 * @param props.pet Pet the buttons act on.
 * @param props.onSave Saves the edit form.
 * @param props.onArchive Archives the pet.
 * @returns The rendered element.
 */
export function PetActions({ pet, onSave, onArchive }: PetActionsProps) {
  const edit = useDisclosure();
  const archive = useDisclosure();
  const editButton = useRef<HTMLButtonElement>(null);
  const archiveButton = useRef<HTMLButtonElement>(null);
  useRestoreFocus(edit.open, editButton);
  useRestoreFocus(archive.open, archiveButton);

  if (!pet.form) return null;

  return (
    <div role="group" aria-label={ACTIONS_LABEL} className={styles.actions}>
      <Button ref={editButton} variant="secondary" leadingIcon={Edit} onClick={edit.show}>
        {EDIT_LABEL}
      </Button>
      <Button ref={archiveButton} variant="tertiary" leadingIcon={Trash} onClick={archive.show}>
        {ARCHIVE_LABEL}
      </Button>
      {edit.open && <EditPetModal idPet={pet.id} name={pet.name} initial={pet.form} onClose={edit.hide} onSave={onSave} />}
      {archive.open && <ArchivePetModal pet={pet} onClose={archive.hide} onArchive={onArchive} />}
    </div>
  );
}
