import styles from "../OptionCard.module.scss";
import type { OptionTextProps } from "../OptionCard.types";

/**
 * Title with an optional subtitle.
 *
 * @param props Props of the component, see {@link OptionTextProps}.
 * @param props.title Title text.
 * @param props.subtitle Secondary text under the title.
 * @returns The rendered element.
 */
export function OptionText({ title, subtitle }: OptionTextProps) {
  return (
    <span className={styles.text}>
      <span className={styles.title}>{title}</span>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
    </span>
  );
}
