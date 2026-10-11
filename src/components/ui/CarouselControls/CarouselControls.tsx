import { cx } from "@/lib/shared/cx";

import styles from "./CarouselControls.module.scss";
import type { CarouselControlsProps } from "./CarouselControls.types";
import { CarouselArrows } from "./parts/CarouselArrows";
import { CarouselIndicators } from "./parts/CarouselIndicators";

/**
 * Navigation/Carousel Controls: indicators and arrows (arrows are hidden on mobile, where users swipe).
 *
 * @param props Props of the component, see {@link CarouselControlsProps}.
 * @param props.count Number of slides.
 * @param props.index Current slide (0-based).
 * @param props.onPrevious Called when the user goes to the previous item.
 * @param props.onNext Called when the user goes to the next item.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function CarouselControls({ count, index, onPrevious, onNext, className, ...rest }: CarouselControlsProps) {
  return (
    <div {...rest} className={cx(styles.controls, className)}>
      <span className={styles.status} role="status">
        Slide {index + 1} of {count}
      </span>
      <CarouselIndicators count={count} index={index} />
      <CarouselArrows count={count} index={index} onPrevious={onPrevious} onNext={onNext} />
    </div>
  );
}
