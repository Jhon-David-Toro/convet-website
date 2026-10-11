import { cx } from "@/lib/shared/cx";

import type { BookingBodyProps } from "../BookingFrame.types";
import styles from "../BookingFrame.module.scss";

/**
 * Body of the booking: the step content with its buttons, and the summary card at its side on desktop.
 *
 * @param props Props of the component, see {@link BookingBodyProps}.
 * @param props.side Summary card shown at the side of the content.
 * @param props.footer Buttons under the content on desktop.
 * @param props.children Content of the step.
 * @returns The rendered element.
 */
export function BookingBody({ side, footer, children }: BookingBodyProps) {
  return (
    <main className={cx(styles.body, Boolean(side) && styles.withSide)}>
      <div className={styles.content}>
        {children}
        <div className={styles.footer}>{footer}</div>
      </div>
      {side && <aside className={styles.side}>{side}</aside>}
    </main>
  );
}
