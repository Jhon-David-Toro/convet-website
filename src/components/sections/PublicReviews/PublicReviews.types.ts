import type { PublicReviewDto } from "@/lib/api/reviews.contract";

export type PublicReviewsProps = {
  /** Published reviews, newest first. */
  reviews: PublicReviewDto[];
};

export type PublicReviewCardProps = {
  review: PublicReviewDto;
};
