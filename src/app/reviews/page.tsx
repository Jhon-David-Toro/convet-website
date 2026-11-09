import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/PageIntro";
import { PublicReviews } from "@/components/sections/PublicReviews";
import { SiteShell } from "@/components/sections/SiteShell";
import { getPublicReviews } from "@/lib/api/reviews.api";
import type { PublicReviewDto } from "@/lib/api/reviews.contract";
import { PUBLIC_REVIEWS_LIMIT } from "@/lib/reviews/reviews.constants";
import { pageMetadata } from "@/lib/site/seo.utils";

import { REVIEWS_INTRO, REVIEWS_PATH } from "./page.constants";

/** Metadata of the reviews page. */
export const metadata: Metadata = pageMetadata({ title: "Reviews", description: REVIEWS_INTRO.description, path: REVIEWS_PATH });

/**
 * Loads the published reviews. The public list is cached and refreshed in the background; when the backend cannot be reached the
 * page shows its empty state instead of failing.
 *
 * @returns The published reviews, newest first; none when they cannot be loaded.
 */
async function loadPublishedReviews(): Promise<PublicReviewDto[]> {
  try {
    const page = await getPublicReviews({ limit: PUBLIC_REVIEWS_LIMIT });
    return page.data;
  } catch {
    return [];
  }
}

/**
 * Reviews page: the published reviews of the clinic, shown as cards with their rating and the visit they are about.
 *
 * @returns The rendered element.
 */
export default async function ReviewsPage() {
  const reviews = await loadPublishedReviews();

  return (
    <SiteShell current={REVIEWS_PATH}>
      <PageIntro {...REVIEWS_INTRO} />
      <PublicReviews reviews={reviews} />
    </SiteShell>
  );
}
