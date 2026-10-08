import { Check, Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./BookingStep.module.scss";
import { BOOKING_STEP_CHECK_SIZE, CURRENT_STEP_STATE, DONE_STEP_STATE } from "./BookingStep.constants";
import type { BookingStepProps } from "./BookingStep.types";

/**
 * Booking/Step: step of the booking wizard. Use it inside an `<ol>`.
 *
 * @param props Props of the component, see {@link BookingStepProps}.
 * @param props.state Visual state.
 * @param props.number Step number, 1-based.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function BookingStep({ state, number, label, className, ...rest }: BookingStepProps) {
  return (
    <li
      {...rest}
      aria-current={state === CURRENT_STEP_STATE ? "step" : undefined}
      className={cx(styles.step, styles[state], className)}
    >
      <span className={styles.marker} aria-hidden="true">
        {state === DONE_STEP_STATE ? <Icon icon={Check} size={BOOKING_STEP_CHECK_SIZE} /> : number}
      </span>
      <span className={styles.label}>
        {label}
        {state === DONE_STEP_STATE && <span className={styles.hidden}> (completed)</span>}
      </span>
    </li>
  );
}
