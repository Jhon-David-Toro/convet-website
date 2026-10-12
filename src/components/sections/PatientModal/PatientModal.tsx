"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { DateInput } from "@/components/ui/DateInput";
import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  EMPTY_PATIENT,
  MICROCHIP_HELPER,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  NEW_CLIENT_LABEL,
  OWNER_CODE,
  OWNER_LABEL,
  SAVED_MESSAGE,
  SEX_OPTIONS,
  SPECIES_OPTIONS,
  SUBMIT_LABEL,
} from "./PatientModal.constants";
import { ageText, errorTitle, validatePatient } from "./PatientModal.utils";
import styles from "./PatientModal.module.scss";

/**
 * Dialog that creates a patient (the animal): its owner, name, species, breed, color, date of birth, sex and microchip. The age is worked out from the date of birth.
 * The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the patient is created.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function PatientModal({ open, onClose }: DialogControlProps) {
  return open ? <PatientDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link PatientModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function PatientDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: EMPTY_PATIENT,
    validate: validatePatient,
    onSaved: () => {
      toast({ message: SAVED_MESSAGE, tone: "success" });
      onClose();
    },
  });
  const age = ageText(form.values.birthDate);

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
      <TextInput
        label={OWNER_LABEL}
        helper={form.values.owner ? `Owner: ${form.values.owner} · ${OWNER_CODE} · ${NEW_CLIENT_LABEL}` : NEW_CLIENT_LABEL}
        error={form.errors.owner}
        value={form.values.owner}
        onChange={(event) => form.setValue("owner", event.target.value)}
      />
      <div className={styles.pair}>
        <TextInput label="Pet name" error={form.errors.name} value={form.values.name} onChange={(event) => form.setValue("name", event.target.value)} />
        <Select label="Species" options={SPECIES_OPTIONS} error={form.errors.species} value={form.values.species} onValueChange={(value) => form.setValue("species", value)} />
      </div>
      <div className={styles.pair}>
        <TextInput label="Breed" optional value={form.values.breed} onChange={(event) => form.setValue("breed", event.target.value)} />
        <TextInput label="Color" error={form.errors.color} value={form.values.color} onChange={(event) => form.setValue("color", event.target.value)} />
      </div>
      <div className={styles.pair}>
        <DateInput label="Date of birth" helper={age ? `Month / Day / Year · age ${age}` : "Month / Day / Year"} error={form.errors.birthDate} value={form.values.birthDate} onValueChange={(value) => form.setValue("birthDate", value)} />
        <Select label="Sex" options={SEX_OPTIONS} error={form.errors.sex} value={form.values.sex} onValueChange={(value) => form.setValue("sex", value)} />
      </div>
      <TextInput label="Microchip" optional inputMode="numeric" helper={MICROCHIP_HELPER} error={form.errors.microchip} value={form.values.microchip} onChange={(event) => form.setValue("microchip", event.target.value)} />
    </FormModal>
  );
}
