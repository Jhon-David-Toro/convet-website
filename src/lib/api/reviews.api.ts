import "server-only";

import { apiRequest } from "./api.client";
import {
  PUBLIC_REVIEWS_REVALIDATE_SECONDS,
  PUBLIC_REVIEWS_TAG,
  REVIEW_ENDPOINTS,
  adminReviewSchema,
  myReviewSchema,
  publicReviewSchema,
  reviewPageSchema,
  reviewSchema,
} from "./reviews.contract";
import type { CreateReviewDto, ReviewDto, ReviewQuery, ReviewStatus, UpdateReviewDto } from "./reviews.contract";

/**
 * Approved reviews for the public website, newest first. Public and cached.
 *
 * @param query Page and size.
 * @returns One page of reviews with its metadata.
 * @throws {ApiError} When the backend fails.
 */
export async function getPublicReviews(query: Omit<ReviewQuery, "status"> = {}) {
  return apiRequest(REVIEW_ENDPOINTS.public, { query, schema: reviewPageSchema(publicReviewSchema), revalidate: PUBLIC_REVIEWS_REVALIDATE_SECONDS, tags: [PUBLIC_REVIEWS_TAG] });
}

/**
 * Reviews written by the signed-in customer.
 *
 * @param query Page and size.
 * @returns One page of reviews with the appointment each one is about.
 * @throws {ApiError} When the backend fails.
 */
export async function getMyReviews(query: Omit<ReviewQuery, "status"> = {}) {
  return apiRequest(REVIEW_ENDPOINTS.mine, { query, schema: reviewPageSchema(myReviewSchema) });
}

/**
 * Every review, for moderation (admin).
 *
 * @param query Page, size and an optional status filter.
 * @returns One page of reviews with the customer and the appointment.
 * @throws {ApiError} `forbidden` for non-admins.
 */
export async function getReviewsForModeration(query: ReviewQuery = {}) {
  return apiRequest(REVIEW_ENDPOINTS.list, { query, schema: reviewPageSchema(adminReviewSchema) });
}

/**
 * One review (its customer or an admin).
 *
 * @param idReview Id of the review.
 * @returns The review with its appointment.
 * @throws {ApiError} `forbidden` when it is another customer's; `not-found` when it does not exist.
 */
export async function getReview(idReview: string) {
  return apiRequest(REVIEW_ENDPOINTS.detail(idReview), { schema: myReviewSchema });
}

/**
 * Reviews a completed appointment (customer). The review waits for moderation before it is public.
 *
 * @param dto Appointment, rating from 1 to 5 and an optional comment.
 * @returns The review, pending moderation.
 * @throws {ApiError} `validation` when the appointment is not completed; `conflict` when it already has a review.
 */
export async function createReview(dto: CreateReviewDto): Promise<ReviewDto> {
  return apiRequest(REVIEW_ENDPOINTS.create, { method: "POST", body: dto, schema: reviewSchema });
}

/**
 * Changes a review of the signed-in customer; the backend sends it back to moderation.
 *
 * @param idReview Id of the review.
 * @param dto New rating or comment.
 * @returns The review, pending moderation again.
 * @throws {ApiError} `forbidden` when it is another customer's.
 */
export async function updateReview(idReview: string, dto: UpdateReviewDto): Promise<ReviewDto> {
  return apiRequest(REVIEW_ENDPOINTS.detail(idReview), { method: "PATCH", body: dto, schema: reviewSchema });
}

/**
 * Approves or hides a review (admin).
 *
 * @param idReview Id of the review.
 * @param status `APPROVED` publishes it, `HIDDEN` takes it off the website.
 * @returns The moderated review.
 * @throws {ApiError} `forbidden` for non-admins.
 */
export async function moderateReview(idReview: string, status: Exclude<ReviewStatus, "PENDING">): Promise<ReviewDto> {
  return apiRequest(REVIEW_ENDPOINTS.moderation(idReview), { method: "PATCH", body: { status }, schema: reviewSchema });
}
