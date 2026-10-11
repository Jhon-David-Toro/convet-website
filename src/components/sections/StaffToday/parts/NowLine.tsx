import { NOW_LABEL } from "../StaffToday.constants";
import { nowOffset } from "../StaffToday.utils";
import styles from "../StaffToday.module.scss";

/**
 * Line across the grid that marks the current time, with the time on its left.
 *
 * @returns The rendered element.
 */
export function NowLine() {
  return (
    <div className={styles.now} style={{ top: nowOffset() }}>
      <span className={styles.nowLabel}>{NOW_LABEL}</span>
    </div>
  );
}
