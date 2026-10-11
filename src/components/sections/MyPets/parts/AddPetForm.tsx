import { BREEDS, BREEDS_LIST_ID, FORM_ID } from "../MyPets.constants";
import type { AddPetState } from "../MyPets.types";
import { BirthFields } from "./BirthFields";
import { PetIdentityFields } from "./PetIdentityFields";
import { PetPhotoUpload } from "./PetPhotoUpload";
import { SexField } from "./SexField";
import styles from "../MyPets.module.scss";

/**
 * Form of the "Add a pet" modal: photo or document, identity, sex and date of birth. Its buttons live in the modal footer.
 *
 * @param props Props of the component, see {@link AddPetState}.
 * @param props.handleSubmit Validates and saves the pet.
 * @param props.state Values, errors, age and handlers of the form.
 * @returns The rendered element.
 */
export function AddPetForm({ handleSubmit, ...state }: AddPetState) {
  return (
    <form id={FORM_ID} noValidate onSubmit={handleSubmit} className={styles.form}>
      <PetPhotoUpload file={state.file} selectFile={state.selectFile} removeFile={state.removeFile} />
      <PetIdentityFields values={state.values} errors={state.errors} setValue={state.setValue} />
      <SexField values={state.values} setValue={state.setValue} />
      <BirthFields values={state.values} errors={state.errors} setValue={state.setValue} age={state.age} />
      <datalist id={BREEDS_LIST_ID}>
        {BREEDS.map((breed) => (
          <option key={breed} value={breed} />
        ))}
      </datalist>
    </form>
  );
}
