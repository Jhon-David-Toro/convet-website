import { NotificationBell } from "@/components/sections/NotificationCenter";
import { Button } from "@/components/ui/Button";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { BOOK_LABEL } from "../CustomerShell.constants";
import styles from "../CustomerShell.module.scss";

/**
 * End of the top bar: the notifications bell and, from tablet, the booking button.
 *
 * @returns The rendered element.
 */
export function TopBarEnd() {
  return (
    <>
      <NotificationBell />
      <Button variant="accent" href={BOOKING_HREF} className={styles.book}>
        {BOOK_LABEL}
      </Button>
    </>
  );
}
