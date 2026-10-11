import { Button } from "@/components/ui/Button";
import { Bell } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { BOOK_LABEL, NOTIFICATIONS_LABEL } from "../CustomerShell.constants";
import styles from "../CustomerShell.module.scss";

/**
 * End of the top bar: the notifications bell and, from tablet, the booking button.
 *
 * @returns The rendered element.
 */
export function TopBarEnd() {
  return (
    <>
      <IconButton variant="ghost" icon={Bell} label={NOTIFICATIONS_LABEL} />
      <Button variant="accent" href={BOOKING_HREF} className={styles.book}>
        {BOOK_LABEL}
      </Button>
    </>
  );
}
