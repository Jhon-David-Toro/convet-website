import type { StepProps } from "../BookingFlow.types";
import { petOptions } from "../BookingFlow.utils";
import { OptionList } from "./OptionList";

/**
 * Step 1: which pet the visit is for.
 *
 * @param props Props of the component, see {@link StepProps}.
 * @param props.selection What is selected so far.
 * @param props.setField Changes one value of the selection.
 * @returns The rendered element.
 */
export function StepPet({ selection, setField }: StepProps) {
  return <OptionList name="pet" label="Pet" options={petOptions()} value={selection.petId} onChange={(id) => setField("petId", id)} />;
}
