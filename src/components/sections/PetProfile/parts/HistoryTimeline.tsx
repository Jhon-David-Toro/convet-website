import { TimelineItem } from "@/components/patterns/TimelineItem";

import styles from "../PetProfile.module.scss";
import type { HistoryTimelineProps } from "../PetProfile.types";
import { groupByYear } from "../PetProfile.utils";

/**
 * Timeline of events grouped under their year.
 *
 * @param props Props of the component, see {@link HistoryTimelineProps}.
 * @param props.events Events to show, newest first.
 * @returns The rendered element.
 */
export function HistoryTimeline({ events }: HistoryTimelineProps) {
  return (
    <div className={styles.timeline}>
      {groupByYear(events).map(({ year, events: group }) => (
        <section key={year}>
          <p className={styles.year}>{year}</p>
          <ul className={styles.events}>
            {group.map((event, index) => (
              <TimelineItem key={event.id} type={event.type} title={event.title} meta={event.meta} summary={event.summary} last={index === group.length - 1} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
