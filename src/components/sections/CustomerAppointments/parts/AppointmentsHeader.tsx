import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { BOOK_LABEL, SUBTITLE, TITLE } from "../CustomerAppointments.constants";
import styles from "../CustomerAppointments.module.scss";

/**
 * Title and sentence of the page with the booking button (desktop and tablet; the top bar and the bottom bar cover it on mobile).
 *
 * @returns The rendered element.
 */
export function AppointmentsHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{TITLE}</h1>
        <p className={styles.subtitle}>{SUBTITLE}</p>
      </div>
      <Button variant="accent" href={BOOKING_HREF} leadingIcon={Plus} className={styles.book}>
        {BOOK_LABEL}
      </Button>
    </header>
  );
}
