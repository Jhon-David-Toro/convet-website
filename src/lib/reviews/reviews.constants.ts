import type { ReviewStatus } from "@/lib/api/reviews.contract";

export const CUSTOMER_REVIEWS_HREF = "/app/reviews";

export const ADMIN_REVIEWS_HREF = "/admin/reviews";

export const PUBLIC_REVIEWS_HREF = "/reviews";

/** Lowest and highest rating the backend accepts. */
export const REVIEW_RATING_MIN = 1;

export const REVIEW_RATING_MAX = 5;

/** Every rating the customer can pick, lowest first. */
export const REVIEW_RATINGS = Array.from({ length: REVIEW_RATING_MAX - REVIEW_RATING_MIN + 1 }, (_, index) => REVIEW_RATING_MIN + index);

/** Longest comment the backend accepts, in characters after trimming. */
export const REVIEW_COMMENT_MAX = 2000;

/** Reviews per page of the admin moderation list. */
export const ADMIN_REVIEWS_PAGE_SIZE = 20;

/** Reviews the customer page loads; the backend accepts up to 100 per page. */
export const CUSTOMER_REVIEWS_LIMIT = 100;

/** Reviews the public page shows. */
export const PUBLIC_REVIEWS_LIMIT = 24;

/** Time zone of the clinic; dates of visits and reviews are shown in it. */
export const CLINIC_TIME_ZONE = "America/Aruba";

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  PENDING: "Waiting for approval",
  APPROVED: "Published",
  HIDDEN: "Hidden",
};

/** Filters of the admin moderation list; `ALL` lifts the status filter. */
export const REVIEW_FILTERS = ["PENDING", "APPROVED", "HIDDEN", "ALL"] as const;

export const DEFAULT_REVIEW_FILTER = "PENDING";
