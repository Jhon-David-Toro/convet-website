import { Icon, Paw } from "@/components/ui/Icon";

import { FOOTER_MOTTO_ICON_SIZE } from "../Footer.constants";
import type { FooterMottoProps } from "../Footer.types";
import styles from "../Footer.module.scss";

/**
 * Brand motto with a paw icon and a highlighted phrase.
 *
 * @param props Props of the component, see {@link FooterMottoProps}.
 * @param props.text Text to show.
 * @param props.highlight Phrase drawn with the highlight style.
 * @returns The rendered element.
 */
export function FooterMotto({ text, highlight }: FooterMottoProps) {
  return (
    <p className={styles.motto}>
      <Icon icon={Paw} size={FOOTER_MOTTO_ICON_SIZE} className={styles.paw} />
      <span>{text}</span>
      <span className={styles.mottoHighlight}>{highlight}</span>
    </p>
  );
}
