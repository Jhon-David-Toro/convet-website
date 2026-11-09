"use server";

import { revalidatePath } from "next/cache";

import { ApiError } from "@/lib/api/api.errors";
import { isUuid } from "@/lib/api/api.contract";
import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { createReview, updateReview } from "@/lib/api/reviews.api";
import { requireRole } from "@/lib/auth/auth.access";
import { CUSTOMER_REVIEWS_HREF } from "@/lib/reviews/reviews.constants";
import type { ReviewFormValues } from "@/lib/reviews/reviews.types";
import { definedErrors, toReviewBody, validateReviewForm } from "@/lib/reviews/reviews.utils";

function validationFailed(fieldErrors?: Record<string, string>): ActionResult {
  return { ok: false, kind: "validation", message: new ApiError("validation").message, fieldErrors };
}

function validateReviewInput(id: string, values: ReviewFormValues): ActionResult | null {
  if (!isUuid(id)) return validationFailed();

  const fieldErrors = definedErrors(validateReviewForm(values, { hadComment: false }));
  if (Object.keys(fieldErrors).length > 0) return validationFailed(fieldErrors);

  return null;
}

export async function createReviewAction(appointmentId: string, values: ReviewFormValues): Promise<ActionResult> {
  await requireRole(["CUSTOMER"]);

  const validation = validateReviewInput(appointmentId, values);
  if (validation) return validation;

  const result = await runAction(() => createReview({ appointmentId, ...toReviewBody(values) }));
  if (!result.ok) return result;

  revalidatePath(CUSTOMER_REVIEWS_HREF);
  return { ok: true, data: undefined };
}

export async function updateReviewAction(idReview: string, values: ReviewFormValues): Promise<ActionResult> {
  await requireRole(["CUSTOMER"]);

  const validation = validateReviewInput(idReview, values);
  if (validation) return validation;

  const result = await runAction(() => updateReview(idReview, toReviewBody(values)));
  if (!result.ok) return result;

  revalidatePath(CUSTOMER_REVIEWS_HREF);
  return { ok: true, data: undefined };
}
