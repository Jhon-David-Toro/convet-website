import { DateTimePicker } from "@/components/sections/DateTimePicker";
import { agendaVet } from "@/lib/booking.utils";

import styles from "../RescheduleFlow.module.scss";
import { PICK_SUBTITLE, PICK_TITLE, REVIEW_SUBTITLE, REVIEW_TITLE } from "../RescheduleFlow.constants";
import type { RescheduleFlowProps, RescheduleState } from "../RescheduleFlow.types";
import { ChangeReview } from "./ChangeReview";

/**
 * Content of the current step: the day and time picker, then the confirmation of the change.
 *
 * @param props Props of the component.
 * @param props.appointment Appointment being moved.
 * @param props.flow State of the reschedule.
 * @returns The rendered element.
 */
export function RescheduleBody({ appointment, flow }: RescheduleFlowProps & { flow: RescheduleState }) {
  const picking = flow.step === 0;

  return (
    <>
      <div className={styles.heading}>
        <h1 className={styles.title}>{picking ? PICK_TITLE : REVIEW_TITLE}</h1>
        <p className={styles.subtitle}>{picking ? PICK_SUBTITLE : REVIEW_SUBTITLE}</p>
      </div>
      {picking ? (
        <DateTimePicker vet={agendaVet(appointment.vetId)} date={flow.date} time={flow.time} loading={flow.loading} onDateChange={flow.chooseDate} onTimeChange={flow.chooseTime} />
      ) : (
        <ChangeReview appointment={appointment} date={flow.date} time={flow.time} />
      )}
    </>
  );
}
