import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "../LocationSection.module.scss";
import { CONTACT_ICON_SIZE } from "../LocationSection.constants";
import type { ContactLineProps } from "../LocationSection.types";
import { ContactDetail } from "./ContactDetail";

/**
 * A line of contact information with its icon, main text and detail.
 *
 * @param props Props of the component, see {@link ContactLineProps}.
 * @param props.item Contact line to draw.
 * @returns The rendered element.
 */
export function ContactLine({ item }: ContactLineProps) {
  return (
    <li className={cx(styles.line, item.hiddenOnMobile && styles.hiddenOnMobile)}>
      <Icon icon={item.icon} size={CONTACT_ICON_SIZE} tone={item.iconTone} />
      <span className={styles.lineText}>
        <span className={styles.lineTitle}>{item.title}</span>
        <ContactDetail item={item} />
      </span>
    </li>
  );
}
