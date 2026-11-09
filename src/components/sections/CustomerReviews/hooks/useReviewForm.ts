import { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/auth/validation.utils";
import type { ReviewFormErrors, ReviewFormValues } from "@/lib/reviews/reviews.types";
import { pickReviewErrors, validateReviewForm } from "@/lib/reviews/reviews.utils";

import { EMPTY_FORM } from "../CustomerReviews.constants";
import type { ReviewFormState, ReviewFormTarget, UseReviewFormParams } from "./useReviewForm.types";

function getInitialValues(target: ReviewFormTarget): ReviewFormValues {
  if (target.mode === "edit") {
    return { rating: target.review.rating, comment: target.review.comment ?? "" };
  }
  return EMPTY_FORM;
}

function validateInput(values: ReviewFormValues, hadComment: boolean): ReviewFormErrors {
  const errors = validateReviewForm(values, { hadComment });
  return pickReviewErrors(errors);
}

function mapBackendErrors(
  fieldErrors: Record<string, string> | undefined,
  message: string | undefined,
): { displayErrors: ReviewFormErrors; displayMessage?: string } {
  const errors = pickReviewErrors(fieldErrors);
  const displayMessage = hasErrors(errors) ? undefined : message;
  return { displayErrors: errors, displayMessage };
}

/**
 * Manages review form state: values, client/server validation, and submission lifecycle.
 * @param target Review being edited or created, determines initial values and validation context.
 * @param onSave Backend submission callback; when resolved with error, displays field and general errors.
 * @param onDone Called when submission succeeds and form should close.
 * @returns Form state (values, errors, submitting flag, UI messages) and mutation handlers.
 */
export function useReviewForm({ target, onSave, onDone }: UseReviewFormParams): ReviewFormState {
  const hadComment = target.mode === "edit" && Boolean(target.review.comment);
  const [values, setValues] = useState<ReviewFormValues>(() => getInitialValues(target));
  const [errors, setErrors] = useState<ReviewFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  function setValue<Field extends keyof ReviewFormValues>(field: Field, value: ReviewFormValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const found = validateInput(values, hadComment);
    setErrors(found);
    setSubmitError(undefined);
    if (hasErrors(found)) return;

    setSubmitting(true);
    try {
      const result = await onSave(values);
      if (result.ok) {
        onDone();
        return;
      }
      const { displayErrors, displayMessage } = mapBackendErrors(result.fieldErrors, result.message);
      setErrors(displayErrors);
      setSubmitError(displayMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return {
    values,
    errors,
    submitting,
    submitError,
    setRating: (rating) => setValue("rating", rating),
    setComment: (comment) => setValue("comment", comment),
    handleSubmit,
  };
}
