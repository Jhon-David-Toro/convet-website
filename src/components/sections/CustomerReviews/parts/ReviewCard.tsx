import { StatusBadge } from "@/components/patterns/StatusBadge";
import { Button } from "@/components/ui/Button";
import { ReviewStars } from "@/components/sections/ReviewStars";
import { formatReviewDate, visitTitle } from "@/lib/reviews/reviews.utils";
import { REVIEW_STATUS_VIEWS } from "@/lib/reviews/reviews.views";

import { EDIT_LABEL } from "../CustomerReviews.constants";
import type { ReviewCardProps } from "../CustomerReviews.types";
import styles from "../CustomerReviews.module.scss";

/**
 * One review of the customer: its rating, moderation state, comment and the visit it is about, with the button that edits it.
 *
 * @param props Props of the component, see {@link ReviewCardProps}.
 * @param props.review Review to show.
 * @param props.onEdit Opens the form to change the review.
 * @returns The rendered element.
 */
export function ReviewCard({ review, onEdit }: ReviewCardProps) {
  const { appointment } = review;
  const title = visitTitle({ serviceName: appointment.branchService.service.name, petName: appointment.pet.name });
  return (
    <article className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <ReviewStars rating={review.rating} />
          <StatusBadge view={REVIEW_STATUS_VIEWS[review.status]} />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.meta}>
          {appointment.branch.name} · Reviewed {formatReviewDate(review.createdAt)}
        </p>
        {review.comment && <p className={styles.comment}>{review.comment}</p>}
      </div>
      <Button type="button" variant="tertiary" size="small" aria-label={`${EDIT_LABEL} review of ${title}`} onClick={() => onEdit(review)}>
        {EDIT_LABEL}
      </Button>
    </article>
  );
}
