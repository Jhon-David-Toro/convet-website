import { cx } from "@/lib/shared/cx";

import type { ContactLineProps } from "../LocationSection.types";
import styles from "../LocationSection.module.scss";

/**
 * Secondary text of a contact line. When the line has a short text, the short one shows below desktop
 * and the full one from desktop.
 *
 * @param props Props of the component, see {@link ContactLineProps}.
 * @param props.item Contact line whose detail is drawn.
 * @returns The rendered element.
 */
export function ContactDetail({ item }: ContactLineProps) {
  if (!item.detailShort) return <span className={styles.lineDetail}>{item.detail}</span>;

  return (
    <>
      <span className={cx(styles.lineDetail, styles.short)}>{item.detailShort}</span>
      <span className={cx(styles.lineDetail, styles.full)}>{item.detail}</span>
    </>
  );
}
