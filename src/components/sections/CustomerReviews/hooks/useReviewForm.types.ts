import type { SubmitEvent } from "react";

import type { ActionResult } from "@/lib/api/api.types";
import type { ReviewFormErrors, ReviewFormValues } from "@/lib/reviews/reviews.types";

/** Parameters of {@link useReviewForm}. */
export type UseReviewFormParams = {
  target: ReviewFormTarget;
  onSave: (values: ReviewFormValues) => Promise<ActionResult>;
  onDone: () => void;
};

/** State of the review form: values, errors, saving and the handlers that change them. */
export type ReviewFormState = {
  values: ReviewFormValues;
  errors: ReviewFormErrors;
  submitting: boolean;
  submitError?: string;
  setRating: (rating: number) => void;
  setComment: (comment: string) => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
};

/** What the form is open for: a new review of a visit, or a change to a review already written. */
export type ReviewFormTarget = { mode: "create"; visit: { appointmentId: string } } | { mode: "edit"; review: { rating: number; comment?: string } };
