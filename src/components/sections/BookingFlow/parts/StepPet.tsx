import type { StepPetProps } from "../BookingFlow.types";
import { NEW_PET_ID } from "../BookingFlow.constants";
import { petOptions } from "../BookingFlow.utils";
import { OptionList } from "./OptionList";

/**
 * Step 1: which pet the visit is for.
 *
 * @param props Props of the component, see {@link StepPetProps}.
 * @returns The rendered element.
 */
export function StepPet({
  selection,
  setField,
  pets,
  onAddPet,
}: StepPetProps) {
  function handleChange(id: string) {
    if (id === NEW_PET_ID) {
      onAddPet();
      return;
    }

    setField("petId", id);
  }

  return (
    <OptionList
      name="pet"
      label="Pet"
      options={petOptions(pets)}
      value={selection.petId}
      onChange={handleChange}
    />
  );
}