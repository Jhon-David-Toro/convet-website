import { ReviewStars } from "@/components/sections/ReviewStars";
import { formatReviewDate } from "@/lib/reviews/reviews.utils";

import type { PublicReviewCardProps } from "../PublicReviews.types";
import { reviewerLine, serviceLine } from "../PublicReviews.utils";
import styles from "../PublicReviews.module.scss";

/**
 * A published review on the website: the rating, the comment, who wrote it and the visit it is about.
 *
 * @param props Props of the component, see {@link PublicReviewCardProps}.
 * @param props.review Published review.
 * @returns The rendered element.
 */
export function PublicReviewCard({ review }: PublicReviewCardProps) {
  return (
    <article className={styles.card}>
      <ReviewStars rating={review.rating} />
      {review.comment && <p className={styles.comment}>{review.comment}</p>}
      <footer className={styles.byline}>
        <p className={styles.reviewer}>{reviewerLine(review)}</p>
        <p className={styles.meta}>
          {serviceLine(review)} · <time dateTime={review.createdAt}>{formatReviewDate(review.createdAt)}</time>
        </p>
      </footer>
    </article>
  );
}
