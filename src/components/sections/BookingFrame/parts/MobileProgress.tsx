import type { MobileProgressProps } from "../BookingFrame.types";
import { progressLabel, progressPercent } from "../BookingFrame.utils";
import styles from "../BookingFrame.module.scss";

/**
 * Progress of the booking on mobile: "Step 4 of 5 · Date & time" over a bar that fills as the steps go by.
 *
 * @param props Props of the component, see {@link MobileProgressProps}.
 * @param props.steps Names of the steps.
 * @param props.current Position of the current step, from 0.
 * @returns The rendered element.
 */
export function MobileProgress({ steps, current }: MobileProgressProps) {
  return (
    <div className={styles.progress}>
      <p className={styles.progressLabel}>{progressLabel(steps, current)}</p>
      <div className={styles.track} role="presentation">
        <span className={styles.fill} style={{ width: `${progressPercent(steps, current)}%` }} />
      </div>
    </div>
  );
}
