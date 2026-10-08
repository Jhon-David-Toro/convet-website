import styles from "../BookingDay.module.scss";

/**
 * Dot plus screen-reader text that tell a day has few slots left.
 *
 * @returns The rendered element.
 */
export function FewLeftMarker() {
  return (
    <>
      <span className={styles.dot} aria-hidden="true" />{" "}
      <span className={styles.hidden}>few spots left</span>
    </>
  );
}
