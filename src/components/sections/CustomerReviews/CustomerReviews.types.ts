import type { ActionResult } from "@/lib/api/api.types";
import type { MyReviewDto } from "@/lib/api/reviews.contract";
import type { CompletedVisit, ReviewFormValues } from "@/lib/reviews/reviews.types";
import type { ServerAction } from "@/lib/shared/useActionToast.types";

/** Server Actions the page uses: a review for a visit, and a change to one of the customer's reviews. */
export type ReviewActions = {
  create: ServerAction<[appointmentId: string, values: ReviewFormValues], void>;
  update: ServerAction<[idReview: string, values: ReviewFormValues], void>;
};

export type CustomerReviewsProps = {
  visits?: CompletedVisit[];
  reviews?: MyReviewDto[];
  loadError?: string;
  actions: ReviewActions;
};

/** What the review form is open for: a new review of a visit, or a change to a review already written. */
export type ReviewFormTarget = { mode: "create"; visit: CompletedVisit } | { mode: "edit"; review: MyReviewDto };

export type VisitCardProps = {
  visit: CompletedVisit;
  onReview: (visit: CompletedVisit) => void;
};

export type ReviewCardProps = {
  review: MyReviewDto;
  onEdit: (review: MyReviewDto) => void;
};

export type RatingInputProps = {
  value: number;
  onChange: (rating: number) => void;
  error?: string;
};

export type ReviewFormModalProps = {
  target: ReviewFormTarget;
  onSave: (values: ReviewFormValues) => Promise<ActionResult>;
  onClose: () => void;
};
