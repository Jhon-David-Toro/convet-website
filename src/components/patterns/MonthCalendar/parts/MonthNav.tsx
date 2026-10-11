import { ChevronLeft, ChevronRight } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import type { MonthNavProps } from "../MonthCalendar.types";
import styles from "../MonthCalendar.module.scss";

/**
 * Month title with the previous / next month buttons.
 *
 * @param props Props of the component, see {@link MonthNavProps}.
 * @param props.title Title text.
 * @param props.onPrevious Called when the user goes to the previous item.
 * @param props.onNext Called when the user goes to the next item.
 * @returns The rendered element.
 */
export function MonthNav({ title, onPrevious, onNext }: MonthNavProps) {
  return (
    <div className={styles.nav}>
      <p className={styles.month} aria-live="polite">
        {title}
      </p>
      <IconButton icon={ChevronLeft} label="Previous month" variant="outline" onClick={onPrevious} />
      <IconButton icon={ChevronRight} label="Next month" variant="outline" onClick={onNext} />
    </div>
  );
}
