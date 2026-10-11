import { vetOptions } from "../BookingFlow.utils";
import type { StepVetProps } from "../BookingFlow.types";
import { OptionList } from "./OptionList";

/**
 * Step 3: which vet will see the pet, or any available vet.
 *
 * @param props Props of the component, see {@link StepVetProps}.
 * @param props.selection What is selected so far.
 * @param props.chooseVet Picks a vet and clears the day and time.
 * @returns The rendered element.
 */
export function StepVet({ selection, chooseVet }: StepVetProps) {
  return <OptionList name="vet" label="Vet" options={vetOptions()} value={selection.vetId} onChange={chooseVet} />;
}
