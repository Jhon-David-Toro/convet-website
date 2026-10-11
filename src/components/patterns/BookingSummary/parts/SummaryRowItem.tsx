import { Icon } from "@/components/ui/Icon";

import { BOOKING_SUMMARY_ICON_SIZE } from "../BookingSummary.constants";
import type { SummaryRowItemProps } from "../BookingSummary.types";
import styles from "../BookingSummary.module.scss";

/**
 * One detail of the ticket: icon, title and detail.
 *
 * @param props Props of the component, see {@link SummaryRowItemProps}.
 * @param props.icon Icon component to draw.
 * @param props.title Main text, e.g. "Vaccinations".
 * @param props.detail Detail, e.g. "Rabies booster".
 * @returns The rendered element.
 */
export function SummaryRowItem({ icon, title, detail }: SummaryRowItemProps) {
  return (
    <li className={styles.row}>
      <Icon icon={icon} size={BOOKING_SUMMARY_ICON_SIZE} tone="tertiary" />
      <span className={styles.textGroup}>
        <span className={styles.title}>{title}</span>
        <span className={styles.detail}>{detail}</span>
      </span>
    </li>
  );
}
