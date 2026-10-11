import type { BookingBarProps } from "../BookingFlow.types";
import { barSummaryLine, whenLine } from "../BookingFlow.utils";
import { PrimaryAction } from "./PrimaryAction";
import styles from "../BookingFlow.module.scss";

/**
 * Bar fixed to the bottom on small screens: what is booked so far (once there is a day and time) and the main action.
 *
 * @param props Props of the component, see {@link BookingBarProps}.
 * @param props.selection What is selected so far.
 * @param props.step Step the customer is on.
 * @param props.canContinue Whether the step has what it needs.
 * @param props.confirming Whether the request is being sent.
 * @param props.next Moves to the next step.
 * @param props.confirm Sends the request.
 * @returns The rendered element.
 */
export function BookingBar({ selection, step, canContinue, confirming, next, confirm }: BookingBarProps) {
  const when = whenLine(selection);

  return (
    <div className={styles.barContent}>
      {when && (
        <p className={styles.barSummary}>
          <span>{barSummaryLine(selection)}</span>
          <strong>{when}</strong>
        </p>
      )}
      <PrimaryAction step={step} canContinue={canContinue} confirming={confirming} next={next} confirm={confirm} />
    </div>
  );
}
