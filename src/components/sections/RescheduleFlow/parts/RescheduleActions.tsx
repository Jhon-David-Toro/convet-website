import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";

import { CONTINUE_LABEL, EXIT_HREF, KEEP_LABEL, MOVE_LABEL } from "../RescheduleFlow.constants";
import type { RescheduleActionsProps } from "../RescheduleFlow.types";
import { whenText } from "../RescheduleFlow.utils";

/**
 * Buttons of the reschedule: keep the current time, and the main action ("Continue", then "Move to <day> · <time>").
 *
 * @param props Props of the component, see {@link RescheduleActionsProps}.
 * @param props.step Step the customer is on.
 * @param props.canContinue Whether a day and a time are picked.
 * @param props.date New day.
 * @param props.time New time.
 * @param props.next Moves to the confirmation.
 * @param props.move Moves the visit.
 * @returns The rendered element.
 */
export function RescheduleActions({ step, canContinue, date, time, next, move }: RescheduleActionsProps) {
  return (
    <>
      <Button variant="tertiary" href={EXIT_HREF}>
        {KEEP_LABEL}
      </Button>
      {step === 0 ? (
        <Button type="button" trailingIcon={ArrowRight} disabled={!canContinue} onClick={next}>
          {CONTINUE_LABEL}
        </Button>
      ) : (
        <Button type="button" variant="accent" leadingIcon={Check} onClick={move}>
          {`${MOVE_LABEL} ${whenText(date, time)}`}
        </Button>
      )}
    </>
  );
}
