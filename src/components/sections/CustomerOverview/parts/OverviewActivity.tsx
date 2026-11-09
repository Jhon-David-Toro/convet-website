import { TimelineItem } from "@/components/patterns/TimelineItem";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";

import { ACTIVITY_TITLE, HISTORY_LABEL } from "../CustomerOverview.constants";
import type { OverviewActivityProps } from "../CustomerOverview.types";
import styles from "../CustomerOverview.module.scss";

/**
 * Recent activity of all the pets as a timeline, with a link to the full history (desktop and tablet).
 *
 * @param props Props of the component, see {@link OverviewActivityProps}.
 * @param props.events Events to show, newest first.
 * @param props.historyHref Link to the full history.
 * @returns The rendered element.
 */
export function OverviewActivity({ events, historyHref }: OverviewActivityProps) {

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
            title={event.title}
            meta={event.meta}
            summary={event.summary}
            last={index === events.length - 1}
          />
        ))}
      </ul>
    </section>
  );
}
