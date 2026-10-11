import { Icon, Loader } from "@/components/ui/Icon";
import { shortDay } from "@/lib/booking.utils";

import { LOADING_ICON_SIZE, LOADING_ROWS } from "../DateTimePicker.constants";
import styles from "../DateTimePicker.module.scss";
import type { SlotsLoadingProps } from "../DateTimePicker.types";

/**
 * Placeholder shown while the times of a day are looked up: a status line and grey boxes where the times will go.
 *
 * @param props Props of the component, see {@link SlotsLoadingProps}.
 * @param props.date Day whose times are being looked up.
 * @returns The rendered element.
 */
export function SlotsLoading({ date }: SlotsLoadingProps) {
  return (
    <div className={styles.slots} aria-busy="true">
      <p role="status" className={styles.loading}>
        <Icon icon={Loader} size={LOADING_ICON_SIZE} tone="brand" className={styles.spinner} />
        {`Finding available times for ${shortDay(date)}...`}
      </p>
      <div className={styles.grid} aria-hidden="true">
        {Array.from({ length: LOADING_ROWS }, (_, index) => (
          <span key={index} className={styles.bone} />
        ))}
      </div>
    </div>
  );
}
