import { Icon, Star } from "@/components/ui/Icon";
import { REVIEW_RATINGS } from "@/lib/reviews/reviews.constants";
import { starsLabel } from "@/lib/reviews/reviews.utils";
import { cx } from "@/lib/shared/cx";

import type { ReviewStarsProps } from "./ReviewStars.types";
import styles from "./ReviewStars.module.scss";

/**
 * Review/Stars: the rating of a review as five stars, the filled ones counting the rating. The rating is also read out as text.
 *
 * @param props Props of the component, see {@link ReviewStarsProps}.
 * @param props.rating Rating from 1 to 5.
 * @returns The rendered element.
 */
export function ReviewStars({ rating }: ReviewStarsProps) {
  return (
    <span className={styles.stars} role="img" aria-label={starsLabel(rating)}>
      {REVIEW_RATINGS.map((value) => {
        const filled = value <= rating;
        return <Icon key={value} icon={Star} size="small" tone={filled ? "warning" : "disabled"} className={cx(styles.star, filled && styles.filled)} />;
      })}
    </span>
  );
}
