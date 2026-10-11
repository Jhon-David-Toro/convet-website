import styles from "./BookingFrame.module.scss";
import type { BookingFrameProps } from "./BookingFrame.types";
import { BookingBody } from "./parts/BookingBody";
import { BookingHeader } from "./parts/BookingHeader";
import { MobileHeader } from "./parts/MobileHeader";
import { MobileProgress } from "./parts/MobileProgress";

/**
 * Frame of the booking pages: header with the steps (a back arrow, title and progress bar on mobile), the step content with an
 * optional summary card at its side, the buttons under it and a bar fixed to the bottom on small screens.
 *
 * @param props Props of the component, see {@link BookingFrameProps}.
 * @param props.steps Names of the steps.
 * @param props.current Position of the current step, from 0.
 * @param props.mobileTitle Title of the mobile header.
 * @param props.exitHref Where the exit and close buttons lead.
 * @param props.onBack Goes back one step on mobile.
 * @param props.side Summary card shown at the side of the content.
 * @param props.footer Buttons under the content on desktop.
 * @param props.bar Bar fixed to the bottom on small screens.
 * @param props.children Content of the step.
 * @returns The rendered element.
 */
export function BookingFrame({ steps, current, mobileTitle, exitHref, onBack, side, footer, bar, children }: BookingFrameProps) {
  return (
    <div className={styles.frame}>
      <BookingHeader steps={steps} current={current} exitHref={exitHref} />
      <MobileHeader mobileTitle={mobileTitle} exitHref={exitHref} onBack={onBack} />
      <MobileProgress steps={steps} current={current} />
      <BookingBody side={side} footer={footer}>
        {children}
      </BookingBody>
      {bar && <div className={styles.bar}>{bar}</div>}
    </div>
  );
}
