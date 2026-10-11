import { DateTimePicker } from "@/components/sections/DateTimePicker";
import { ANY_VET_ID } from "@/lib/booking.constants";
import { agendaVet } from "@/lib/booking.utils";

import type { StepDateTimeProps } from "../BookingFlow.types";
import { NextAvailableButton } from "./NextAvailableButton";

/**
 * Step 4: day and time with the chosen vet, plus a shortcut to the first free time.
 *
 * @param props Props of the component, see {@link StepDateTimeProps}.
 * @param props.selection What is selected so far.
 * @param props.loading Whether the times of the day are being looked up.
 * @param props.setField Changes one value of the selection.
 * @param props.chooseDate Picks a day and starts the loading placeholder.
 * @param props.goTo Moves to another step.
 * @returns The rendered element.
 */
export function StepDateTime({ selection, loading, setField, chooseDate, goTo }: StepDateTimeProps) {
  /**
   * Picks the first free day and time of the vet.
   *
   * @param iso Day as `YYYY-MM-DD`.
   * @param time Time such as "9:10 AM".
   */
  function pickNext(iso: string, time: string) {
    chooseDate(iso);
    setField("time", time);
  }

  return (
    <>
      <NextAvailableButton vetId={selection.vetId} onPick={pickNext} />
      <DateTimePicker
        vet={agendaVet(selection.vetId)}
        date={selection.date}
        time={selection.time}
        loading={loading}
        onDateChange={chooseDate}
        onTimeChange={(time) => setField("time", time)}
        onChangeVet={() => goTo("vet")}
        onAnyVet={() => setField("vetId", ANY_VET_ID)}
      />
    </>
  );
}
