import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";

import { CONFIRM_LABEL, CONTINUE_LABEL } from "../BookingFlow.constants";
import type { PrimaryActionProps } from "../BookingFlow.types";

/**
 * Main button of a step: "Continue", or "Confirm appointment" on the review. It waits until the step has what it needs.
 *
 * @param props Props of the component, see {@link PrimaryActionProps}.
 * @param props.step Step the customer is on.
 * @param props.canContinue Whether the step has what it needs.
 * @param props.confirming Whether the request is being sent.
 * @param props.next Moves to the next step.
 * @param props.confirm Sends the request.
 * @returns The rendered element.
 */
export function PrimaryAction({ step, canContinue, confirming, next, confirm }: PrimaryActionProps) {
  if (step === "review") {
    return (
      <Button type="button" variant="accent" leadingIcon={Check} loading={confirming} disabled={!canContinue} onClick={confirm}>
        {CONFIRM_LABEL}
      </Button>
    );
  }

  return (
    <Button type="button" trailingIcon={ArrowRight} disabled={!canContinue} onClick={next}>
      {CONTINUE_LABEL}
    </Button>
  );
}
