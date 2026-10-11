import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { X } from "@/components/ui/Icon";

import { BOOKING_HOME_HREF, EXIT_LABEL, HOME_LABEL } from "../BookingFrame.constants";
import styles from "../BookingFrame.module.scss";
import type { BookingHeaderProps } from "../BookingFrame.types";
import { BookingStepper } from "./BookingStepper";

/**
 * Header of the booking on tablet and desktop: logo, the steps and the button that leaves the booking.
 *
 * @param props Props of the component, see {@link BookingHeaderProps}.
 * @param props.steps Names of the steps.
 * @param props.current Position of the current step, from 0.
 * @param props.exitHref Where the exit button leads.
 * @returns The rendered element.
 */
export function BookingHeader({ steps, current, exitHref }: BookingHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href={BOOKING_HOME_HREF} aria-label={HOME_LABEL}>
          <Logo />
        </Link>
        <BookingStepper steps={steps} current={current} />
        <Button variant="tertiary" size="small" href={exitHref} leadingIcon={X}>
          {EXIT_LABEL}
        </Button>
      </div>
    </header>
  );
}
