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
 * Booking wizard: pet, service, vet, day and time, review and the confirmation. Each step shows what is chosen so far, and
 * the confirmation can be refused by `onConfirm` when the time was taken (the customer is then offered nearby times).
 *
 * @param props Props of the component, see {@link BookingFlowProps}.
 * @param props.initialServiceId Service chosen before the booking opens.
 * @param props.onConfirm Asks the clinic to book the visit; without it the booking is always accepted.
 * @returns The rendered element.
 */
export function BookingFlow({ initialServiceId, onConfirm }: BookingFlowProps) {
  const flow = useBookingFlow({ initialServiceId, onConfirm });
  const { mobileTitle, onBack, showSide, showActions } = frameChrome(flow.step, flow.back);
  const actions = { step: flow.step, canContinue: flow.canContinue, confirming: flow.confirming, back: flow.back, next: flow.next, confirm: flow.confirm };

  return (
    <BookingFrame
      steps={STEP_LABELS}
      current={stepperIndex(flow.step)}
      mobileTitle={mobileTitle}
      exitHref={EXIT_HREF}
      onBack={onBack}
      side={showWhen(showSide, <BookingSide selection={flow.selection} />)}
      footer={showWhen(showActions, <BookingActions {...actions} />)}
      bar={showWhen(showActions, <BookingBar selection={flow.selection} {...actions} />)}
    >
      <FlowContent flow={flow} />
    </BookingFrame>
  );
}
