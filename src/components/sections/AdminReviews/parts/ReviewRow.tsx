"use client";

import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";
import { ReviewStars } from "@/components/sections/ReviewStars";
import { formatReviewDate } from "@/lib/reviews/reviews.utils";
import { REVIEW_STATUS_VIEWS } from "@/lib/reviews/reviews.views";
import { useActionToast } from "@/lib/shared/useActionToast";

import { NO_COMMENT, ROW_LABEL_PREFIX, SAVED_MESSAGE } from "../AdminReviews.constants";
import type { ReviewRowProps } from "../AdminReviews.types";
import { customerName, moderationItems, visitSummary } from "../AdminReviews.utils";

/**
 * Row of the moderation table: when it was written, who wrote it, the visit, the rating, the comment, the state and the
 * publish/hide action.
 *
 * @param props Props of the component, see {@link ReviewRowProps}.
 * @param props.review Review of the row.
 * @param props.actions Server Actions of the list.
 * @returns The rendered element.
 */
export function ReviewRow({ review, actions }: ReviewRowProps) {
  const moderation = useActionToast(actions.moderate, SAVED_MESSAGE);
  const items = moderationItems(review.status, (next) => void moderation.run(review.idReview, next));

  return (
    <tr aria-busy={moderation.pending || undefined}>
      <TableCell type="mono">{formatReviewDate(review.createdAt)}</TableCell>
      <TableCell type="strong">{customerName(review)}</TableCell>
      <TableCell>{visitSummary(review)}</TableCell>
      <TableCell>
        <ReviewStars rating={review.rating} />
      </TableCell>
      <TableCell>{review.comment ?? NO_COMMENT}</TableCell>
      <TableCell>
        <StatusBadge view={REVIEW_STATUS_VIEWS[review.status]} />
      </TableCell>
      <TableCell type="actions" actionLabel={`${ROW_LABEL_PREFIX} ${customerName(review)}`} items={items} />
    </tr>
  );
}
