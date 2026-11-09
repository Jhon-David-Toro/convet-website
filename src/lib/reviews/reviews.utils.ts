import type { CreateReviewDto } from "@/lib/api/reviews.contract";

import { CLINIC_TIME_ZONE, DEFAULT_REVIEW_FILTER, REVIEW_COMMENT_MAX, REVIEW_FILTERS, REVIEW_RATING_MAX, REVIEW_RATING_MIN } from "./reviews.constants";
import type { CompletedVisit, ReviewFilter, ReviewFormErrors, ReviewFormValues } from "./reviews.types";

export const RATING_MESSAGE = `Choose a rating from ${REVIEW_RATING_MIN} to ${REVIEW_RATING_MAX} stars.`;

export const COMMENT_TOO_LONG_MESSAGE = `Keep the comment to ${REVIEW_COMMENT_MAX} characters or fewer.`;

export const COMMENT_REMOVE_MESSAGE = "A comment cannot be removed. Replace it with new text instead.";

/** Body of `POST /reviews` without the appointment, and of `PATCH /reviews/:id`. */
export type ReviewBody = Omit<CreateReviewDto, "appointmentId">;

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: CLINIC_TIME_ZONE });

/**
 * Checks the review form the way the backend does, so the customer sees the problem before a request is sent.
 *
 * @param values Rating and comment.
 * @param options Whether the review being edited already has a comment: a comment can be replaced but not removed.
 * @param options.hadComment True when editing a review that has a comment.
 * @returns The message of each invalid field; an empty object when the form is valid.
 */
export function validateReviewForm(values: ReviewFormValues, { hadComment }: { hadComment: boolean }): ReviewFormErrors {
  const errors: ReviewFormErrors = {};
  if (!Number.isInteger(values.rating) || values.rating < REVIEW_RATING_MIN || values.rating > REVIEW_RATING_MAX) errors.rating = RATING_MESSAGE;
  const comment = values.comment.trim();
  if (comment.length > REVIEW_COMMENT_MAX) errors.comment = COMMENT_TOO_LONG_MESSAGE;
  else if (hadComment && comment === "") errors.comment = COMMENT_REMOVE_MESSAGE;
  return errors;
}

/**
 * Body sent to the backend: the comment is trimmed and left out when empty (the backend rejects blank comments).
 *
 * @param values Rating and comment of the form.
 * @returns The body of the request.
 */
export function toReviewBody(values: ReviewFormValues): ReviewBody {
  const comment = values.comment.trim();
  return comment === "" ? { rating: values.rating } : { rating: values.rating, comment };
}

/**
 * Field errors as a plain record, the shape a Server Action returns to the form.
 *
 * @param errors Messages of the review form.
 * @returns Only the fields that have a message.
 */
export function definedErrors(errors: ReviewFormErrors): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [field, message] of Object.entries(errors)) {
    if (message) result[field] = message;
  }
  return result;
}

/**
 * Field errors the backend reported for the review form, as the form's own error messages. Only the fields it reported are kept.
 *
 * @param fieldErrors Messages by field, from a failed request.
 * @returns The messages of the rating and the comment, when there are any.
 */
export function pickReviewErrors(fieldErrors: Record<string, string> | undefined): ReviewFormErrors {
  const errors: ReviewFormErrors = {};
  if (fieldErrors?.rating) errors.rating = fieldErrors.rating;
  if (fieldErrors?.comment) errors.comment = fieldErrors.comment;
  return errors;
}

/**
 * Reads the status filter of the admin list from the query string; anything unknown shows the pending reviews.
 *
 * @param value Value of the `status` parameter.
 * @returns A filter that the list accepts.
 */
export function parseReviewFilter(value: string | undefined): ReviewFilter {
  return (REVIEW_FILTERS as readonly string[]).includes(value ?? "") ? (value as ReviewFilter) : DEFAULT_REVIEW_FILTER;
}

/**
 * Reads the page of a list from the query string, from 1.
 *
 * @param value Value of the `page` parameter.
 * @returns The page number, 1 when the value is missing or not a positive integer.
 */
export function parsePage(value: string | undefined): number {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

/**
 * Date of a review or a visit, as the clinic writes it (e.g. "Nov 8, 2026").
 *
 * @param iso ISO date string from the backend.
 * @returns The formatted date, or an empty string when the date is not valid.
 */
export function formatReviewDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : DATE_FORMAT.format(date);
}

/**
 * Name of a visit for the lists: the service and the pet.
 *
 * @param visit Completed visit.
 * @returns For example "Vaccination · Luna".
 */
export function visitTitle(visit: Pick<CompletedVisit, "serviceName" | "petName">): string {
  return `${visit.serviceName} · ${visit.petName}`;
}

/**
 * Text read by screen readers for a rating.
 *
 * @param rating Rating from 1 to 5.
 * @returns For example "4 of 5 stars".
 */
export function starsLabel(rating: number): string {
  return `${rating} of ${REVIEW_RATING_MAX} stars`;
}
