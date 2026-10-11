import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Icon";
import { STAFF_TODAY_LABEL } from "@/lib/staff/staff.constants";

import { SUBTITLE, WEEK_VIEW_HREF, WEEK_VIEW_LABEL } from "../StaffToday.constants";
import styles from "../StaffToday.module.scss";

/**
 * Title of the day with how many appointments there are, and the link to the week view (desktop only).
 *
 * @returns The rendered element.
 */
export function TodayHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{STAFF_TODAY_LABEL}</h1>
        <p className={styles.subtitle}>{SUBTITLE}</p>
      </div>
      <Button href={WEEK_VIEW_HREF} variant="secondary" size="small" leadingIcon={Calendar}>
        {WEEK_VIEW_LABEL}
      </Button>
    </header>
  );
}
