import { EmptyState } from "@/components/ui/EmptyState";
import { Star } from "@/components/ui/Icon";

import { EMPTY_TEXT, EMPTY_TITLE, SECTION_TITLE } from "./PublicReviews.constants";
import type { PublicReviewsProps } from "./PublicReviews.types";
import { PublicReviewCard } from "./parts/PublicReviewCard";
import { summaryLine } from "./PublicReviews.utils";
import styles from "./PublicReviews.module.scss";

/**
 * Published reviews of the clinic for the website: a summary line and the reviews as cards, or an empty state when none is
 * published (or the backend could not be reached).
 *
 * @param props Props of the component, see {@link PublicReviewsProps}.
 * @param props.reviews Published reviews, newest first.
 * @returns The rendered element.
 */
export function PublicReviews({ reviews }: PublicReviewsProps) {
  if (reviews.length === 0) {
    return (
      <section className={styles.section} aria-labelledby="public-reviews-heading">
        <h2 id="public-reviews-heading" className={styles.visuallyHidden}>
          {SECTION_TITLE}
        </h2>
        <EmptyState icon={Star} title={EMPTY_TITLE} message={EMPTY_TEXT} />
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="public-reviews-heading">
      <div className={styles.summary}>
        <h2 id="public-reviews-heading" className={styles.heading}>
          {SECTION_TITLE}
        </h2>
        <p className={styles.summaryLine}>{summaryLine(reviews)}</p>
      </div>
      <ul className={styles.grid}>
        {reviews.map((review) => (
          <li key={review.idReview}>
            <PublicReviewCard review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
}
