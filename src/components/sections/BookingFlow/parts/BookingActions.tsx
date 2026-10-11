import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "@/components/ui/Icon";

import { BACK_LABEL, CANCEL_LABEL, EXIT_HREF } from "../BookingFlow.constants";
import type { BookingActionsProps } from "../BookingFlow.types";
import { PrimaryAction } from "./PrimaryAction";

/**
 * Buttons under the step on desktop: "Cancel" on the first step and "Back" on the rest, and the main action.
 *
 * @param props Props of the component, see {@link BookingActionsProps}.
 * @param props.step Step the customer is on.
 * @param props.canContinue Whether the step has what it needs.
 * @param props.confirming Whether the request is being sent.
 * @param props.back Goes back one step.
 * @param props.next Moves to the next step.
 * @param props.confirm Sends the request.
 * @returns The rendered element.
 */
export function BookingActions({ step, back, ...primary }: BookingActionsProps) {
  return (
    <>
      {step === "pet" ? (
        <Button variant="tertiary" href={EXIT_HREF} leadingIcon={ArrowLeft}>
          {CANCEL_LABEL}
        </Button>
      ) : (
        <Button type="button" variant="tertiary" leadingIcon={ArrowLeft} onClick={back}>
          {BACK_LABEL}
        </Button>
      )}
      <PrimaryAction step={step} {...primary} />
    </>
  );
}
