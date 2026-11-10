"use client";

import { useState } from "react";

import type { PetItem } from "@/lib/customer/customer.types";
import { BookingFrame } from "@/components/sections/BookingFrame";
import { showWhen } from "@/lib/shared/showWhen";
import { AddPetModal } from "@/components/sections/MyPets/parts/AddPetModal";

import { EXIT_HREF, STEP_LABELS } from "./BookingFlow.constants";
import type { BookingFlowProps } from "./BookingFlow.types";
import { frameChrome, stepperIndex } from "./BookingFlow.utils";
import { useBookingFlow } from "./hooks/useBookingFlow";
import { BookingActions } from "./parts/BookingActions";
import { BookingBar } from "./parts/BookingBar";
import { BookingSide } from "./parts/BookingSide";
import { FlowContent } from "./parts/FlowContent";

/**
 * Booking wizard: pet, service, vet, day and time, review and confirmation.
 *
 * @param props Props of the component, see {@link BookingFlowProps}.
 * @returns The rendered element.
 */
export function BookingFlow({
  pets,
  initialServiceId,
  onConfirm,
  onAddPet,
}: BookingFlowProps) {
  const [bookingPets, setBookingPets] = useState(pets);
  const [addingPet, setAddingPet] = useState(false);

  const initialPetId = pets[0]?.id ?? "";

  const flow = useBookingFlow({
    initialPetId,
    initialServiceId,
    onConfirm,
  });

  function handlePetCreated(pet: PetItem) {
    setBookingPets((current) => [...current, pet]);
    flow.setField("petId", pet.id);
    setAddingPet(false);
  }

  const {
    mobileTitle,
    onBack,
    showSide,
    showActions,
  } = frameChrome(flow.step, flow.back);

  const actions = {
    step: flow.step,
    canContinue: flow.canContinue,
    confirming: flow.confirming,
    back: flow.back,
    next: flow.next,
    confirm: flow.confirm,
  };

  return (
    <>
      <BookingFrame
        steps={STEP_LABELS}
        current={stepperIndex(flow.step)}
        mobileTitle={mobileTitle}
        exitHref={EXIT_HREF}
        onBack={onBack}
        side={showWhen(
          showSide,
          <BookingSide
            selection={flow.selection}
            pets={bookingPets}
          />,
        )}
        footer={showWhen(showActions, <BookingActions {...actions} />)}
        bar={showWhen(
          showActions,
          <BookingBar
            selection={flow.selection}
            pets={bookingPets}
            {...actions}
          />,
        )}
      >
        <FlowContent
          flow={flow}
          pets={bookingPets}
          onAddPet={() => setAddingPet(true)}
        />
      </BookingFrame>

      <AddPetModal
        open={addingPet}
        onClose={() => setAddingPet(false)}
        onSave={onAddPet}
        onCreated={handlePetCreated}
      />
    </>
  );
}