import { Button } from "@/components/ui/Button";
import { formatReviewDate, visitTitle } from "@/lib/reviews/reviews.utils";

import { REVIEW_LABEL } from "../CustomerReviews.constants";
import type { VisitCardProps } from "../CustomerReviews.types";
import styles from "../CustomerReviews.module.scss";

/**
 * A completed visit the customer has not reviewed yet, with the button that opens the review form.
 *
 * @param props Props of the component, see {@link VisitCardProps}.
 * @param props.visit Visit to review.
 * @param props.onReview Opens the review form for the visit.
 * @returns The rendered element.
 */
export function VisitCard({ visit, onReview }: VisitCardProps) {
  const title = visitTitle(visit);
  return (
    <article className={styles.card}>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{visit.serviceName}</h3>
        <p className={styles.meta}>
          {visit.petName} · {visit.branchName} · {formatReviewDate(visit.completedAt ?? visit.startsAt)}
        </p>
      </div>
      <Button type="button" variant="secondary" size="small" aria-label={`${REVIEW_LABEL} for ${title}`} onClick={() => onReview(visit)}>
        {REVIEW_LABEL}
      </Button>
    </article>
  );
}
