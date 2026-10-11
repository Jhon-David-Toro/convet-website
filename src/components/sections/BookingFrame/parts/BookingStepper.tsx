import { BookingStep } from "@/components/patterns/BookingStep";

import { STEPS_LABEL } from "../BookingFrame.constants";
import styles from "../BookingFrame.module.scss";
import type { BookingStepperProps } from "../BookingFrame.types";
import { stepState } from "../BookingFrame.utils";

/**
 * The steps of the booking in a row: finished ones with a check, the current one filled and the rest outlined.
 *
 * @param props Props of the component, see {@link BookingStepperProps}.
 * @param props.steps Names of the steps.
 * @param props.current Position of the current step, from 0.
 * @returns The rendered element.
 */
export function BookingStepper({ steps, current }: BookingStepperProps) {
  return (
    <ol className={styles.stepper} aria-label={STEPS_LABEL}>
      {steps.map((label, index) => (
        <BookingStep key={label} number={index + 1} label={label} state={stepState(index, current)} />
      ))}
    </ol>
  );
}
