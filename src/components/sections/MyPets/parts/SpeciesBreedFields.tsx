import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";

import { BREEDS_LIST_ID, SPECIES_OPTIONS } from "../MyPets.constants";
import type { AddPetFieldsProps } from "../MyPets.types";
import styles from "../MyPets.module.scss";

/**
 * Species and breed side by side; the breed is typed or picked from suggestions.
 *
 * @param props Props of the component, see {@link AddPetFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SpeciesBreedFields({ values, errors, setValue }: AddPetFieldsProps) {
  return (
    <div className={styles.row}>
      <Select label="Species" options={SPECIES_OPTIONS} value={values.species} error={errors.species} placeholder="Choose" onValueChange={(species) => setValue("species", species)} />
      <TextInput label="Breed" optional list={BREEDS_LIST_ID} placeholder="Select or type" value={values.breed} onChange={(event) => setValue("breed", event.target.value)} />
    </div>
  );
}
