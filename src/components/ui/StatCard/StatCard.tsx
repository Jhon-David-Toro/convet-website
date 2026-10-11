import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./StatCard.module.scss";
import { STAT_CARD_ICON_SIZE } from "./StatCard.constants";
import type { StatCardProps } from "./StatCard.types";

/**
 * Card/Stat: indicator with label, icon, numeric value and footer.
 *
 * @param props Props of the component, see {@link StatCardProps}.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.value Current value.
 * @param props.caption Caption drawn over the illustration.
 * @param props.icon Icon component to draw.
 * @param props.tone `warning` and `critical` tint the icon and the footer; status never relies on color alone: the footer explains it.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function StatCard({ label, value, caption, icon, tone = "default", className, ...rest }: StatCardProps) {
  return (
    <div {...rest} className={cx(styles.card, styles[tone], className)}>
      <div className={styles.header}>
        <p className={styles.label}>{label}</p>
        <span className={styles.iconWrap}>
          <Icon icon={icon} size={STAT_CARD_ICON_SIZE} />
        </span>
      </div>
      <p className={styles.value}>{value}</p>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
