import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./BenefitCard.module.scss";
import type { BenefitCardProps } from "./BenefitCard.types";

/**
 * Card/Benefit: icon on a soft orange circle, title and description (no border).
 *
 * @param props Props of the component, see {@link BenefitCardProps}.
 * @param props.icon Icon component to draw.
 * @param props.title Title text.
 * @param props.description Description text under the title.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function BenefitCard({ icon, title, description, className, ...rest }: BenefitCardProps) {
  return (
    <article {...rest} className={cx(styles.card, className)}>
      <span className={styles.iconWrap}>
        <Icon icon={icon} size="large" tone="accent" />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
