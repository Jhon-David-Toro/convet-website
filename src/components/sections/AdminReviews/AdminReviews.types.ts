import type { AdminReviewDto } from "@/lib/api/reviews.contract";
import type { ModerationStatus, ReviewFilter } from "@/lib/reviews/reviews.types";
import type { ServerAction } from "@/lib/shared/useActionToast.types";

/** Server Actions of the moderation list. */
export type ModerationActions = {
  moderate: ServerAction<[idReview: string, status: ModerationStatus], void>;
};

/** Paging of the moderation list, as the backend sends it. */
export type ReviewPageMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type AdminReviewsProps = {
  reviews?: AdminReviewDto[];
  meta?: ReviewPageMeta;
  filter: ReviewFilter;
  loadError?: string;
  actions: ModerationActions;
};

export type ReviewRowProps = {
  review: AdminReviewDto;
  actions: ModerationActions;
};
