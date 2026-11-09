import type { RowMenuItem } from "@/components/patterns/RowMenu";
import { CheckCircle, XCircle } from "@/components/ui/Icon";
import type { AdminReviewDto, ReviewStatus } from "@/lib/api/reviews.contract";
import { ADMIN_REVIEWS_HREF } from "@/lib/reviews/reviews.constants";
import type { ModerationStatus, ReviewFilter } from "@/lib/reviews/reviews.types";

import { HIDE_LABEL, PUBLISH_LABEL } from "./AdminReviews.constants";

/**
 * Link to one page of the moderation list, with its status filter.
 *
 * @param filter Status filter to keep.
 * @param page Page to show, from 1.
 * @returns The path with the query string; the first page has no `page` parameter.
 */
export function reviewsPageHref(filter: ReviewFilter, page: number): string {
  const params = new URLSearchParams({ status: filter });
  if (page > 1) params.set("page", String(page));
  return `${ADMIN_REVIEWS_HREF}?${params.toString()}`;
}

/**
 * Row menu of a review: publish it or hide it, whichever changes its state. A review already in that state is not offered.
 *
 * @param status Current state of the review.
 * @param moderate Called with the state the moderator picked.
 * @returns The menu items.
 */
export function moderationItems(status: ReviewStatus, moderate: (next: ModerationStatus) => void): RowMenuItem[] {
  const items: RowMenuItem[] = [];
  if (status !== "APPROVED") items.push({ label: PUBLISH_LABEL, icon: CheckCircle, onSelect: () => moderate("APPROVED") });
  if (status !== "HIDDEN") items.push({ label: HIDE_LABEL, icon: XCircle, tone: "destructive", onSelect: () => moderate("HIDDEN") });
  return items;
}

/**
 * Name of the customer who wrote a review.
 *
 * @param review Review of the moderation list.
 * @returns The first and last name.
 */
export function customerName(review: AdminReviewDto): string {
  const { firstName, lastName } = review.appointment.customer;
  return `${firstName} ${lastName}`;
}

/**
 * Visit a review is about, for the list: the service, the pet and the branch.
 *
 * @param review Review of the moderation list.
 * @returns For example "Vaccination · Luna · Oranjestad".
 */
export function visitSummary(review: AdminReviewDto): string {
  const { branchService, pet, branch } = review.appointment;
  return `${branchService.service.name} · ${pet.name} · ${branch.name}`;
}
