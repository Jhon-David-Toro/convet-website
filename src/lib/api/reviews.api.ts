import "server-only";

import { CUSTOMER_REVIEWS_LIMIT } from "@/lib/reviews/reviews.constants";
import type { CompletedVisit, ReviewOverview } from "@/lib/reviews/reviews.types";

import { apiRequest } from "./api.client";
import { ApiError } from "./api.errors";
import {
  PUBLIC_REVIEWS_REVALIDATE_SECONDS,
  PUBLIC_REVIEWS_TAG,
  REVIEW_ENDPOINTS,
  adminReviewSchema,
  completedVisitRecordsSchema,
  myReviewSchema,
  publicReviewSchema,
  reviewPageSchema,
  reviewSchema,
} from "./reviews.contract";
import type { CreateReviewDto, ReviewDto, ReviewQuery, ReviewStatus, UpdateReviewDto } from "./reviews.contract";
import { completedVisitsOf, visitsToReview } from "./reviews.mappers";
import { getMyPets } from "./pets.api";

/** Medical records requested per pet when looking for completed visits; the backend accepts up to 100. */
const VISITS_PER_PET = 100;

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
 * Completed visits of every pet of the signed-in customer. The backend has no list of appointments for customers, but a
 * medical record exists only for a completed visit, so the records of each pet give the visits. A pet whose records cannot be
 * read contributes no visits; an expired session still goes to sign-in.
 *
 * @returns The visits, in the order the backend sends them, pet by pet.
 * @throws {ApiError} `unauthorized` when the session expired; other failures of the pets list.
 */
export async function getCompletedVisits(): Promise<CompletedVisit[]> {
  const pets = await getMyPets();
  const pages = await Promise.allSettled(
    pets.map((pet) => apiRequest(REVIEW_ENDPOINTS.petRecords(pet.id), { query: { limit: VISITS_PER_PET }, schema: completedVisitRecordsSchema })),
  );
  const visits: CompletedVisit[] = [];
  pages.forEach((page, index) => {
    if (page.status === "fulfilled") {
      visits.push(...completedVisitsOf(pets[index].name, page.value));
    } else if (page.reason instanceof ApiError && page.reason.kind === "unauthorized") {
      throw page.reason;
    }
  });
  return visits;
}

/**
 * What the customer's review page shows: the reviews already written and the completed visits still to review.
 *
 * @returns The reviews and the visits without a review.
 * @throws {ApiError} When the reviews or the pets cannot be loaded.
 */
export async function getReviewOverview(): Promise<ReviewOverview> {
  const [mine, visits] = await Promise.all([getMyReviews({ limit: CUSTOMER_REVIEWS_LIMIT }), getCompletedVisits()]);
  return { reviews: mine.data, visits: visitsToReview(visits, mine.data) };
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
