import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Icon";
import { WORKING_DAYS, WORKING_HOURS_OWNER } from "@/lib/admin.constants";
import { ADMIN_NAV_HREFS } from "@/lib/admin.paths.constants";

import { ADD_TIME_OFF_LABEL, HOURS_TITLE_PREFIX, TIME_OFF_ACTION, TIME_OFF_TEXT, TIME_OFF_TITLE } from "../AdminTeam.constants";
import styles from "../AdminTeam.module.scss";
import { DayTile } from "./DayTile";

/**
 * Working hours of a vet by day, with the button that adds time off and the warning about the appointments the time off affects.
 *
 * @returns The rendered element.
 */
export function WorkingHours() {
  return (
    <section className={styles.hours} aria-labelledby="team-hours">
      <header className={styles.hoursHeader}>
        <h2 id="team-hours" className={styles.hoursTitle}>
          {`${HOURS_TITLE_PREFIX} · ${WORKING_HOURS_OWNER}`}
        </h2>
        <Button type="button" variant="secondary" size="small" leadingIcon={Calendar}>
          {ADD_TIME_OFF_LABEL}
        </Button>
      </header>
      <ul className={styles.days}>
        {WORKING_DAYS.map((day) => (
          <DayTile key={day.day} day={day} />
        ))}
      </ul>
      <Alert tone="warning" title={TIME_OFF_TITLE} action={{ label: TIME_OFF_ACTION, href: ADMIN_NAV_HREFS.appointments }}>
        {TIME_OFF_TEXT}
      </Alert>
    </section>
  );
}
