import { Button } from "@/components/ui/Button";
import { Clock } from "@/components/ui/Icon";
import { agendaVet, nextAvailable, shortDay } from "@/lib/booking/booking.utils";

import { NEXT_AVAILABLE_PREFIX } from "../BookingFlow.constants";
import styles from "../BookingFlow.module.scss";
import type { NextAvailableButtonProps } from "../BookingFlow.types";

/**
 * Button that jumps to the first free time of the chosen vet.
 *
 * @param props Props of the component, see {@link NextAvailableButtonProps}.
 * @param props.vetId Id of the chosen vet.
 * @param props.onPick Called with the day and time of the first free place.
 * @returns The rendered element, or `null` when the vet has no free time this month.
 */
export function NextAvailableButton({ vetId, onPick }: NextAvailableButtonProps) {
  const next = nextAvailable(agendaVet(vetId));
  if (!next) return null;

  return (
    <Button type="button" variant="secondary" size="small" leadingIcon={Clock} onClick={() => onPick(next.iso, next.time)} className={styles.next}>
      {`${NEXT_AVAILABLE_PREFIX} ${shortDay(next.iso)} · ${next.time}`}
    </Button>
  );
}
