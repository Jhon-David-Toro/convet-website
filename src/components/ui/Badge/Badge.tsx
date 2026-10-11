import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./Badge.module.scss";
import type { BadgeProps } from "./Badge.types";

/**
 * Small colored label that shows a status, with an optional icon. Never rely on color alone: always include text.
 *
 * @param props Props of the component, see {@link BadgeProps}.
 * @param props.tone Color tone.
 * @param props.icon Status must never be conveyed by color alone: pair it with text (and optionally an icon).
 * @param props.iconTone Icon color when it differs from the label (e.g. the navy check of success states in Figma).
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Badge({ tone = "neutral", icon, iconTone, className, children, ...rest }: BadgeProps) {
  return (
    <span {...rest} className={cx(styles.badge, styles[tone], className)}>
      {icon && <Icon icon={icon} size="badge" tone={iconTone} />}
      {children}
    </span>
  );
}
