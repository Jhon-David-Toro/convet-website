import type { PublicReviewDto } from "@/lib/api/reviews.contract";

/**
 * Average rating of the reviews, to one decimal.
 *
 * @param reviews Published reviews.
 * @returns The average, or `undefined` when there are no reviews.
 */
export function averageRating(reviews: Pick<PublicReviewDto, "rating">[]): number | undefined {
  if (reviews.length === 0) return undefined;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

/**
 * Sentence that sums up the published reviews above the list.
 *
 * @param reviews Published reviews.
 * @returns For example "Average 4.8 from 12 reviews", or "1 review".
 */
export function summaryLine(reviews: Pick<PublicReviewDto, "rating">[]): string {
  const average = averageRating(reviews);
  if (average === undefined) return "";
  const count = reviews.length === 1 ? "1 review" : `${reviews.length} reviews`;
  return `Average ${average.toFixed(1)} from ${count}`;
}

/**
 * Who wrote a published review, for the card: the first name, the pet and its species.
 *
 * @param review Published review.
 * @returns For example "Anna · Luna, dog".
 */
export function reviewerLine(review: PublicReviewDto): string {
  const { customer, pet } = review.appointment;
  return `${customer.firstName} · ${pet.name}, ${pet.species.toLowerCase()}`;
}

/**
 * Where a published review was written: the service and the branch.
 *
 * @param review Published review.
 * @returns For example "Vaccination · Oranjestad".
 */
export function serviceLine(review: PublicReviewDto): string {
  const { branch, branchService } = review.appointment;
  return `${branchService.service.name} · ${branch.city}`;
}
