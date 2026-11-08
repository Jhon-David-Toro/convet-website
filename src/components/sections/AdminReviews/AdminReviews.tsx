"use client";

import { useRouter } from "next/navigation";

import { DataTable } from "@/components/patterns/DataTable";
import { FilterChips } from "@/components/patterns/FilterChips";
import { PageHeader } from "@/components/patterns/PageHeader";
import { PageStack } from "@/components/patterns/PageStack";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { Star } from "@/components/ui/Icon";
import { Pagination } from "@/components/ui/Pagination";
import { REVIEW_FILTERS } from "@/lib/reviews/reviews.constants";
import { parseReviewFilter } from "@/lib/reviews/reviews.utils";

import {
  COLUMNS,
  EMPTY_TEXT,
  EMPTY_TITLE,
  FILTER_LABEL,
  FILTER_LABELS,
  LOAD_ERROR_TITLE,
  SUBTITLE,
  TABLE_LABEL,
  TITLE,
} from "./AdminReviews.constants";
import type { AdminReviewsProps } from "./AdminReviews.types";
import { reviewsPageHref } from "./AdminReviews.utils";
import { ReviewRow } from "./parts/ReviewRow";

const FILTER_OPTIONS = REVIEW_FILTERS.map((value) => ({ value, label: FILTER_LABELS[value] }));

/**
 * Moderation page of the admin area: the reviews of one status (waiting by default), each with the publish or hide action, and
 * the paging. Changing the filter reloads the list from the first page.
 *
 * @param props Props of the component, see {@link AdminReviewsProps}.
 * @param props.reviews Reviews of the current page.
 * @param props.meta Paging of the list.
 * @param props.filter Status filter in use.
 * @param props.loadError Message shown instead of the list when it could not be loaded.
 * @param props.actions Server Actions that publish or hide a review.
 * @returns The rendered element.
 */
export function AdminReviews({ reviews = [], meta, filter, loadError, actions }: AdminReviewsProps) {
  const router = useRouter();

  return (
    <PageStack>
      <PageHeader title={TITLE} subtitle={SUBTITLE} />
      <FilterChips label={FILTER_LABEL} options={FILTER_OPTIONS} value={filter} onChange={(value) => router.push(reviewsPageHref(parseReviewFilter(value), 1))} />
      {loadError && (
        <Alert tone="error" title={LOAD_ERROR_TITLE}>
          {loadError}
        </Alert>
      )}
      {!loadError && reviews.length === 0 && <EmptyState icon={Star} title={EMPTY_TITLE} message={EMPTY_TEXT} />}
      {reviews.length > 0 && (
        <DataTable label={TABLE_LABEL} columns={COLUMNS} minWidth="64rem">
          {reviews.map((review) => (
            <ReviewRow key={review.idReview} review={review} actions={actions} />
          ))}
        </DataTable>
      )}
      {meta && meta.totalPages > 1 && (
        <Pagination page={meta.page} pageCount={meta.totalPages} total={meta.total} pageSize={meta.limit} hrefForPage={(page) => reviewsPageHref(filter, page)} />
      )}
    </PageStack>
  );
}
