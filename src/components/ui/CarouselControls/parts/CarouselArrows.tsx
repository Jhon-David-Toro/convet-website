import { ArrowLeft, ArrowRight } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import type { CarouselArrowsProps } from "../CarouselControls.types";
import styles from "../CarouselControls.module.scss";

/**
 * Previous / next buttons; each is disabled at its end of the carousel.
 *
 * @param props Props of the component, see {@link CarouselArrowsProps}.
 * @param props.count Number of slides.
 * @param props.index Current slide (0-based).
 * @param props.onPrevious Called when the user goes to the previous item.
 * @param props.onNext Called when the user goes to the next item.
 * @returns The rendered element.
 */
export function CarouselArrows({ count, index, onPrevious, onNext }: CarouselArrowsProps) {
  return (
    <div className={styles.arrows}>
      <IconButton icon={ArrowLeft} label="Previous slide" variant="outline" disabled={index <= 0} onClick={onPrevious} />
      <IconButton icon={ArrowRight} label="Next slide" variant="outline" disabled={index >= count - 1} onClick={onNext} />
    </div>
  );
}
