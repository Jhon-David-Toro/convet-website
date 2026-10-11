import Link from "next/link";

import { ChevronRight, Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { QUICK_ACTION_ICON_SIZE } from "./QuickActionCard.constants";
import type { QuickActionCardProps } from "./QuickActionCard.types";
import styles from "./QuickActionCard.module.scss";

/**
 * Card/Quick Action: shortcut (book, WhatsApp, emergencies). The whole card is the link.
 *
 * @param props Props of the component, see {@link QuickActionCardProps}.
 * @param props.tone Color tone.
 * @param props.icon Icon component to draw.
 * @param props.title Title text.
 * @param props.description Description text under the title.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function QuickActionCard({ tone = "default", icon, title, description, className, ...rest }: QuickActionCardProps) {
  return (
    <Link {...rest} className={cx(styles.card, styles[tone], className)}>
      <span className={styles.circle}>
        <Icon icon={icon} size={QUICK_ACTION_ICON_SIZE} tone="inherit" />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>
      <Icon icon={ChevronRight} size="medium" tone="inherit" className={styles.chevron} />
    </Link>
  );
}
