import { Button } from "@/components/ui/Button";
import { shortDay } from "@/lib/booking/booking.utils";

import { ANY_VET_LABEL, SEE_DAY_LABEL } from "../DateTimePicker.constants";
import type { NoAvailabilityActionsProps } from "../DateTimePicker.types";

/**
 * Buttons of the "day is full" message: jump to the vet's next open day and switch to any available vet.
 *
 * @param props Props of the component, see {@link NoAvailabilityActionsProps}.
 * @param props.next Next open day, when there is one.
 * @param props.onDateChange Jumps to another day.
 * @param props.onAnyVet Switches to any available vet; the button is not shown without it.
 * @returns The rendered element.
 */
export function NoAvailabilityActions({ next, onDateChange, onAnyVet }: NoAvailabilityActionsProps) {
  return (
    <>
      {next && (
        <Button type="button" onClick={() => onDateChange(next)}>
          {`${SEE_DAY_LABEL} ${shortDay(next)}`}
        </Button>
      )}
      {onAnyVet && (
        <Button type="button" variant="secondary" onClick={onAnyVet}>
          {ANY_VET_LABEL}
        </Button>
      )}
    </>
  );
}
