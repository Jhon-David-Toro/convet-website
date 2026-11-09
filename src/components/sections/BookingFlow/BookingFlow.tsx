"use client";

import { BookingFrame } from "@/components/sections/BookingFrame";
import { showWhen } from "@/lib/shared/showWhen";

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
 * @param props.pets Customer's registered pets.
 * @param props.initialServiceId Service chosen before the booking opens.
 * @param props.onConfirm Sends the booking request to the clinic.
 * @returns The rendered element.
 */
export function BookingFlow({
  pets,
  initialServiceId,
  onConfirm,
}: BookingFlowProps) {
  const initialPetId = pets[0]?.id ?? "";

  const flow = useBookingFlow({
    initialPetId,
    initialServiceId,
    onConfirm,
  });

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
    <BookingFrame
      steps={STEP_LABELS}
      current={stepperIndex(flow.step)}
      mobileTitle={mobileTitle}
      exitHref={EXIT_HREF}
      onBack={onBack}
      side={showWhen(
        showSide,
        <BookingSide selection={flow.selection} pets={pets} />,
      )}
      footer={showWhen(showActions, <BookingActions {...actions} />)}
      bar={showWhen(
        showActions,
        <BookingBar selection={flow.selection} pets={pets} {...actions} />,
      )}
    >
      <FlowContent flow={flow} pets={pets} />
    </BookingFrame>
  );
}