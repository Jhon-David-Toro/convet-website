"use server";

import { revalidatePath, updateTag } from "next/cache";

import { isUuid } from "@/lib/api/api.contract";
import { ApiError } from "@/lib/api/api.errors";
import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { moderateReview } from "@/lib/api/reviews.api";
import { PUBLIC_REVIEWS_TAG } from "@/lib/api/reviews.contract";
import { requireRole } from "@/lib/auth/auth.access";
import { ADMIN_REVIEWS_HREF, PUBLIC_REVIEWS_HREF } from "@/lib/reviews/reviews.constants";
import type { ModerationStatus } from "@/lib/reviews/reviews.types";

const MODERATION_STATUSES: readonly string[] = ["APPROVED", "HIDDEN"];

/**
 * Server Action of the moderation list: publishes a review (`APPROVED`) or hides it (`HIDDEN`). The public reviews are cached, so
 * the tag is updated at once and the change shows on the website right away.
 *
 * @param idReview Id of the review.
 * @param status New state of the review.
 * @returns Success, or a safe error.
 */
function isValidModerationInput(idReview: string, status: unknown): boolean {
  return isUuid(idReview) && MODERATION_STATUSES.includes(String(status));
}

function invalidModerationInput(): ActionResult {
  return { ok: false, kind: "validation", message: new ApiError("validation").message };
}

function refreshModerationCache(): void {
  updateTag(PUBLIC_REVIEWS_TAG);
  revalidatePath(ADMIN_REVIEWS_HREF);
  revalidatePath(PUBLIC_REVIEWS_HREF);
}

export async function moderateReviewAction(idReview: string, status: ModerationStatus): Promise<ActionResult> {
  await requireRole(["ADMIN"]);

  if (!isValidModerationInput(idReview, status)) {
    return invalidModerationInput();
  }

  const result = await runAction(() => moderateReview(idReview, status));
  if (!result.ok) return result;

  refreshModerationCache();
  return { ok: true, data: undefined };
}
