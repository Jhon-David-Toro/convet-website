import type { Metadata } from "next";

import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { loadData } from "@/lib/api/api.guard";
import { getReviewOverview } from "@/lib/api/reviews.api";

import { createReviewAction, updateReviewAction } from "./actions";

export const metadata: Metadata = {
  title: "Reviews · CONVET",
};

/**
 * Reviews page of the customer area: the completed visits to review and the reviews already written. The data comes from the
 * backend; a failure shows an error state instead of empty lists.
 *
 * @returns The rendered element.
 */
export default async function CustomerReviewsPage() {
  const { data, error } = await loadData(getReviewOverview);

  return (
    <CustomerReviews
      visits={data?.visits ?? []}
      reviews={data?.reviews ?? []}
      loadError={error?.message}
      actions={{ create: createReviewAction, update: updateReviewAction }}
    />
  );
}
