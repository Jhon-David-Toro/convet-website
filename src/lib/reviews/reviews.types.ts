import type { MyReviewDto, ReviewStatus } from "@/lib/api/reviews.contract";

/** Values of the review form: a rating and a comment that may be empty. */
export type ReviewFormValues = {
  rating: number;
  comment: string;
};

/** Messages of the review form by field. */
export type ReviewFormErrors = {
  rating?: string;
  comment?: string;
};

/** A completed visit of one of the customer's pets, as the customer can review it. */
export type CompletedVisit = {
  appointmentId: string;
  petName: string;
  serviceName: string;
  branchName: string;
  /** Start of the visit, ISO string from the backend. */
  startsAt: string;
  /** When the clinic completed the visit; falls back to the start when the backend leaves it out. */
  completedAt?: string;
};

/** What the customer's review page shows: the reviews written and the visits still to review. */
export type ReviewOverview = {
  reviews: MyReviewDto[];
  visits: CompletedVisit[];
};

/** Filter of the admin moderation list. */
export type ReviewFilter = ReviewStatus | "ALL";

/** What a moderator can set: publish a review or hide it. Reviews go back to `PENDING` only when the customer changes them. */
export type ModerationStatus = Exclude<ReviewStatus, "PENDING">;
