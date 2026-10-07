import { cx } from "@/lib/cx";

import styles from "./SectionHeader.module.scss";
import { HeaderUnderline } from "./parts/HeaderUnderline";
import type { SectionHeaderProps } from "./SectionHeader.types";

/**
 * Section heading with an optional eyebrow, brush underline and description.
 *
 * @param props Props of the component, see {@link SectionHeaderProps}.
 * @param props.title Title text.
 * @param props.eyebrow Small text above the title.
 * @param props.description Description text under the title.
 * @param props.underline Orange stroke below the title.
 * @param props.align Horizontal alignment of the column.
 * @param props.titleAs Heading level of the title (defaults to h2).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function SectionHeader({
  title,
  eyebrow,
  description,
  underline = true,
  align = "left",
  titleAs: Title = "h2",
  className,
  ...rest
}: SectionHeaderProps) {
  return (
    <header {...rest} className={cx(styles.root, styles[align], className)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Title className={styles.title}>{title}</Title>
      {underline && <HeaderUnderline />}
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}
