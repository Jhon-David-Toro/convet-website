"use client";

import { useState } from "react";

import { TimelineItem } from "@/components/patterns/TimelineItem";
import { Chip } from "@/components/ui/Chip";

import { HISTORY_FILTERS, HISTORY_FILTERS_LABEL, HISTORY_TITLE } from "../HealthRecords.constants";
import type { RecordFilter, RecordHistoryProps } from "../HealthRecords.types";
import { filterRecordEvents, groupRecordsByYear } from "../HealthRecords.utils";
import styles from "../HealthRecords.module.scss";

/**
 * Clinical history of the pet: chips that filter by kind of event, each with its count, and the timeline grouped under its year.
 *
 * @param props Props of the component, see {@link RecordHistoryProps}.
 * @param props.events Every event of the pet, newest first.
 * @returns The rendered element.
 */
export function RecordHistory({ events }: RecordHistoryProps) {
  const [filter, setFilter] = useState<RecordFilter>("all");

  return (
    <section className={styles.card} aria-labelledby="record-history-title">
      <h2 id="record-history-title" className={styles.cardTitle}>
        {HISTORY_TITLE}
      </h2>
      <div role="group" aria-label={HISTORY_FILTERS_LABEL} className={styles.filters}>
        {HISTORY_FILTERS.map(({ value, label }) => (
          <Chip key={value} selected={filter === value} count={filterRecordEvents(events, value).length} onClick={() => setFilter(value)}>
            {label}
          </Chip>
        ))}
      </div>
      <div className={styles.timeline}>
        {groupRecordsByYear(filterRecordEvents(events, filter)).map(({ year, events: group }) => (
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
    </section>
  );
}
