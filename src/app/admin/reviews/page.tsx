import type { Metadata } from "next";

import { AdminReviews } from "@/components/sections/AdminReviews";
import { loadData } from "@/lib/api/api.guard";
import { getReviewsForModeration } from "@/lib/api/reviews.api";
import { ADMIN_REVIEWS_PAGE_SIZE } from "@/lib/reviews/reviews.constants";
import { parsePage, parseReviewFilter } from "@/lib/reviews/reviews.utils";

import { moderateReviewAction } from "./actions";
import type { AdminReviewsPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Reviews · CONVET admin",
};

/**
 * Moderation page of the admin area. The `status` parameter picks the reviews to list (waiting by default) and `page` the page of
 * the list. The reviews come from the backend; a failure shows an error state.
 *
 * @param props Props of the page, see {@link AdminReviewsPageProps}.
 * @param props.searchParams Query string.
 * @returns The rendered element.
 */
export default async function AdminReviewsPage({ searchParams }: AdminReviewsPageProps) {
  const query = await searchParams;
  const filter = parseReviewFilter(query.status);
  const page = parsePage(query.page);
  const status = filter === "ALL" ? undefined : filter;
  const { data, error } = await loadData(() => getReviewsForModeration({ page, limit: ADMIN_REVIEWS_PAGE_SIZE, status }));

  return (
    <AdminReviews
      reviews={data?.data ?? []}
      meta={data?.meta}
      filter={filter}
      loadError={error?.message}
      actions={{ moderate: moderateReviewAction }}
    />
  );
}
