import { cx } from "@/lib/shared/cx";

import styles from "../AuthLayout.module.scss";
import type { AuthHeadingProps } from "../AuthLayout.types";

/**
 * Title (the only `h1` of the page) and the sentence under it.
 *
 * @param props Props of the component, see {@link AuthHeadingProps}.
 * @param props.title Title of the page.
 * @param props.subtitle Sentence under the title.
 * @param props.loose Puts 24px between the title and the sentence instead of 8px (verification and reset pages).
 * @returns The rendered element.
 */
export function AuthHeading({ title, subtitle, loose }: AuthHeadingProps) {
  return (
    <div className={cx(styles.heading, loose && styles.loose)}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
