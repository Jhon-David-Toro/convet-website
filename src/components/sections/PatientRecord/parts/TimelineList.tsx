import { TimelineItem } from "@/components/patterns/TimelineItem";

import type { TimelineListProps } from "../PatientRecord.types";
import styles from "../PatientRecord.module.scss";

/**
 * Entries of the clinical history in order, joined by the timeline line.
 *
 * @param props Props of the component, see {@link TimelineListProps}.
 * @param props.entries Entries to list.
 * @returns The rendered element.
 */
export function TimelineList({ entries }: TimelineListProps) {
  return (
    <ol className={styles.timeline}>
      {entries.map((entry, index) => (
        <TimelineItem key={entry.id} type={entry.type} title={entry.title} meta={entry.meta} summary={entry.summary} last={index === entries.length - 1} />
      ))}
    </ol>
  );
}
