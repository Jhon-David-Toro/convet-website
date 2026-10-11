import { cx } from "@/lib/shared/cx";

import styles from "./TimelineItem.module.scss";
import { TimelineRail } from "./parts/TimelineRail";
import type { TimelineItemProps } from "./TimelineItem.types";

/**
 * List/Timeline Item: entry of the clinical history. Use it inside an `<ol>`.
 *
 * @param props Props of the component, see {@link TimelineItemProps}.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.title Title text.
 * @param props.meta Date and author, e.g. "Sep 12, 2026 · Dr. Shirley".
 * @param props.summary Short summary of the entry.
 * @param props.last The last item does not draw the line going down.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function TimelineItem({ type, title, meta, summary, last = false, className, ...rest }: TimelineItemProps) {
  return (
    <li {...rest} className={cx(styles.item, styles[type], className)}>
      <TimelineRail type={type} last={last} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.meta}>{meta}</p>
        {summary && <p className={styles.summary}>{summary}</p>}
      </div>
    </li>
  );
}
