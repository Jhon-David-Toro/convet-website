import { findPet } from "@/lib/customer.utils";
import { CUSTOMER_PETS } from "@/lib/customer.constants";

import type { StepContentProps } from "../BookingFlow.types";
import { StepPet } from "./StepPet";
import { StepService } from "./StepService";
import { StepVet } from "./StepVet";

/**
 * Steps where the customer picks one option: the pet, the service or the vet.
 *
 * @param props Props of the component, see {@link StepContentProps}.
 * @param props.flow State of the booking.
 * @returns The rendered element.
 */
export function ChoiceStep({ flow }: StepContentProps) {
  const { step, selection, setField, chooseVet } = flow;
  if (step === "pet") return <StepPet selection={selection} setField={setField} />;
  if (step === "service") return <StepService selection={selection} setField={setField} pet={findPet(selection.petId) ?? CUSTOMER_PETS[0]} />;
  return <StepVet selection={selection} chooseVet={chooseVet} />;
}
