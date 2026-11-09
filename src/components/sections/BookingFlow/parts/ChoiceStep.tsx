import type { StepContentProps } from "../BookingFlow.types";
import { StepPet } from "./StepPet";
import { StepService } from "./StepService";
import { StepVet } from "./StepVet";

/**
 * Steps where the customer picks one option: the pet, the service or the vet.
 *
 * @param props Props of the component, see {@link StepContentProps}.
 * @param props.flow State of the booking.
 * @param props.pets Customer's registered pets.
 * @returns The rendered element.
 */
export function ChoiceStep({ flow, pets }: StepContentProps) {
  const { step, selection, setField, chooseVet } = flow;

  if (step === "pet") {
    return (
      <StepPet
        selection={selection}
        setField={setField}
        pets={pets}
      />
    );
  }

  if (step === "service") {
    const selectedPet = pets.find(
      (pet) => pet.id === selection.petId,
    );

    // The service step requires a registered pet.
    if (!selectedPet) {
      return (
        <StepPet
          selection={selection}
          setField={setField}
          pets={pets}
        />
      );
    }

    return (
      <StepService
        selection={selection}
        setField={setField}
        pet={selectedPet}
      />
    );
  }

  return (
    <StepVet
      selection={selection}
      chooseVet={chooseVet}
    />
  );
}