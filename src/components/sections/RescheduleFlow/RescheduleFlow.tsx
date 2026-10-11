"use client";

import { BookingSummary } from "@/components/patterns/BookingSummary";
import { BookingFrame } from "@/components/sections/BookingFrame";

import { EXIT_HREF, MOBILE_TITLE, STEP_LABELS } from "./RescheduleFlow.constants";
import styles from "./RescheduleFlow.module.scss";
import type { RescheduleFlowProps } from "./RescheduleFlow.types";
import { rescheduleSummary } from "./RescheduleFlow.utils";
import { useReschedule } from "./hooks/useReschedule";
import { RescheduleActions } from "./parts/RescheduleActions";
import { RescheduleBody } from "./parts/RescheduleBody";

/**
 * Reschedule: pick a new day and time with the same vet, then confirm the change. Keeping the current time leaves the visit as it was.
 *
 * @param props Props of the component, see {@link RescheduleFlowProps}.
 * @param props.appointment Appointment being moved.
 * @returns The rendered element.
 */
export function RescheduleFlow({ appointment }: RescheduleFlowProps) {
  const flow = useReschedule();
  const actions = <RescheduleActions step={flow.step} canContinue={flow.canContinue} date={flow.date} time={flow.time} next={flow.next} move={flow.move} />;

  return (
    <BookingFrame
      steps={STEP_LABELS}
      current={flow.step}
      mobileTitle={MOBILE_TITLE}
      exitHref={EXIT_HREF}
      onBack={flow.back}
      side={<BookingSummary {...rescheduleSummary(appointment, flow.date, flow.time)} />}
      footer={actions}
      bar={<div className={styles.bar}>{actions}</div>}
    >
      <RescheduleBody appointment={appointment} flow={flow} />
    </BookingFrame>
  );
}
