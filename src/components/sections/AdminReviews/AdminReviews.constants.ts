import type { ReviewFilter } from "@/lib/reviews/reviews.types";

export const TITLE = "Reviews";

export const SUBTITLE = "Publish a review to show it on the website, or hide it to take it down. New reviews wait here until someone decides.";

export const FILTER_LABEL = "Filter reviews by status";

export const FILTER_LABELS: Record<ReviewFilter, string> = {
  PENDING: "Waiting",
  APPROVED: "Published",
  HIDDEN: "Hidden",
  ALL: "All",
};

export const TABLE_LABEL = "Reviews";

export const COLUMNS = ["Received", "Customer", "Visit", "Rating", "Comment", "Status"];

export const LOAD_ERROR_TITLE = "We could not load the reviews";

export const EMPTY_TITLE = "No reviews here";

export const EMPTY_TEXT = "Reviews appear here when a customer reviews a completed visit.";

export const NO_COMMENT = "No comment";

export const PUBLISH_LABEL = "Publish";

export const HIDE_LABEL = "Hide";

export const SAVED_MESSAGE = "Review updated.";

export const ROW_LABEL_PREFIX = "Actions for the review of";
