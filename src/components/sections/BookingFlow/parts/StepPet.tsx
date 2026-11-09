import type { StepPetProps } from "../BookingFlow.types";
import { petOptions } from "../BookingFlow.utils";
import { OptionList } from "./OptionList";

/**
 * Step 1: which pet the visit is for.
 *
 * @param props Props of the component, see {@link StepPetProps}.
 * @param props.selection What is selected so far.
 * @param props.setField Changes one value of the selection.
 * @param props.pets Customer's registered pets.
 * @returns The rendered element.
 */
export function StepPet({
  selection,
  setField,
  pets,
}: StepPetProps) {
  return (
    <OptionList
      name="pet"
      label="Pet"
      options={petOptions(pets)}
      value={selection.petId}
      onChange={(id) => setField("petId", id)}
    />
  );
}