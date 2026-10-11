import { TextInput } from "@/components/ui/TextInput";

import type { AddPetFieldsProps } from "../MyPets.types";
import { SpeciesBreedFields } from "./SpeciesBreedFields";

/**
 * Name, species, breed and color of the pet.
 *
 * @param props Props of the component, see {@link AddPetFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function PetIdentityFields({ values, errors, setValue }: AddPetFieldsProps) {
  return (
    <>
      <TextInput label="Name" value={values.name} error={errors.name} onChange={(event) => setValue("name", event.target.value)} />
      <SpeciesBreedFields values={values} errors={errors} setValue={setValue} />
      <TextInput label="Color" value={values.color} onChange={(event) => setValue("color", event.target.value)} />
    </>
  );
}
