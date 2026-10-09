import { Icon } from "@/components/ui/Icon";

import styles from "../TimelineItem.module.scss";
import { TIMELINE_ICON_SIZE, TIMELINE_ICONS } from "../TimelineItem.constants";
import type { TimelineRailProps } from "../TimelineItem.types";

/**
 * Icon dot of the entry and, unless it is the last one, the line going down.
 *
 * @param props Props of the component, see {@link TimelineRailProps}.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.last The last item does not draw the line going down.
 * @returns The rendered element.
 */
export function TimelineRail({ type, last }: TimelineRailProps) {
  return (
    <div className={styles.rail} aria-hidden="true">
      <span className={styles.dot}>
        <Icon icon={TIMELINE_ICONS[type]} size={TIMELINE_ICON_SIZE} />
      </span>
      {!last && <span className={styles.line} />}
    </div>
  );
}
