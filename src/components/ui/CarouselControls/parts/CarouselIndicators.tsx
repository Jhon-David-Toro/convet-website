import { cx } from "@/lib/shared/cx";

import type { CarouselIndicatorsProps } from "../CarouselControls.types";
import styles from "../CarouselControls.module.scss";

/**
 * One dot per slide; the current one is a pill. Decorative: the status text announces the position.
 *
 * @param props Props of the component, see {@link CarouselIndicatorsProps}.
 * @param props.count Number of slides.
 * @param props.index Current slide (0-based).
 * @returns The rendered element.
 */
export function CarouselIndicators({ count, index }: CarouselIndicatorsProps) {
  return (
    <ol className={styles.indicators} aria-hidden="true">
      {Array.from({ length: count }, (_, position) => (
        <li key={position} className={cx(styles.indicator, position === index && styles.active)} />
      ))}
    </ol>
  );
}
