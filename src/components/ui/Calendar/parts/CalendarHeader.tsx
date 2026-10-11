import { ChevronLeft, ChevronRight } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import type { CalendarHeaderProps } from "../Calendar.types";
import styles from "../Calendar.module.scss";

/**
 * Month title with the previous / next month buttons.
 *
 * @param props Props of the component, see {@link CalendarHeaderProps}.
 * @param props.titleId Id of the title element; the grid references it as its label.
 * @param props.title Visible month, e.g. "October 2026".
 * @param props.onPrevious Called when the user goes to the previous item.
 * @param props.onNext Called when the user goes to the next item.
 * @returns The rendered element.
 */
export function CalendarHeader({ titleId, title, onPrevious, onNext }: CalendarHeaderProps) {
  return (
    <div className={styles.header}>
      <IconButton icon={ChevronLeft} label="Previous month" onClick={onPrevious} />
      <p id={titleId} className={styles.title} aria-live="polite">
        {title}
      </p>
      <IconButton icon={ChevronRight} label="Next month" onClick={onNext} />
    </div>
  );
}
