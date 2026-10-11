import { TimelineItem } from "@/components/patterns/TimelineItem";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { CUSTOMER_PETS } from "@/lib/customer/customer.constants";
import { eventTitle, petHref, recentEvents } from "@/lib/customer/customer.utils";

import { ACTIVITY_TITLE, HISTORY_LABEL } from "../CustomerOverview.constants";
import styles from "../CustomerOverview.module.scss";

/**
 * Recent activity of all the pets as a timeline, with a link to the full history (desktop and tablet).
 *
 * @returns The rendered element.
 */
export function OverviewActivity() {
  const events = recentEvents();
  const historyHref = petHref(CUSTOMER_PETS[0], "history");

  return (
    <section className={styles.activity} aria-labelledby="overview-activity">
      <div className={styles.activityHeader}>
        <h2 id="overview-activity" className={styles.blockTitle}>
          {ACTIVITY_TITLE}
        </h2>
        <Button variant="tertiary" size="small" href={historyHref} trailingIcon={ArrowRight}>
          {HISTORY_LABEL}
        </Button>
      </div>
      <ul className={styles.timeline}>
        {events.map((event, index) => (
          <TimelineItem
            key={event.id}
            type={event.type}
            title={eventTitle(event)}
            meta={event.meta}
            summary={event.summary}
            last={index === events.length - 1}
          />
        ))}
      </ul>
    </section>
  );
}
