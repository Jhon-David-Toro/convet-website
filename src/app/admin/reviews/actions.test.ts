import { beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePath, updateTag, moderateReview } = vi.hoisted(() => ({ revalidatePath: vi.fn(), updateTag: vi.fn(), moderateReview: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath, updateTag }));
vi.mock("@/lib/auth/auth.access", () => ({ requireRole: vi.fn().mockResolvedValue({}) }));
vi.mock("next/navigation", () => ({ redirect: vi.fn(() => { throw new Error("NEXT_REDIRECT"); }) }));
vi.mock("@/lib/api/reviews.api", () => ({ moderateReview }));

import { ApiError } from "@/lib/api/api.errors";
import { requireRole } from "@/lib/auth/auth.access";

import { moderateReviewAction } from "./actions";

const REVIEW_ID = "11111111-1111-4111-8111-111111111111";

beforeEach(() => {
  revalidatePath.mockReset();
  updateTag.mockReset();
  moderateReview.mockReset();
  vi.mocked(requireRole).mockClear();
});

describe("moderateReviewAction", () => {
  it("only lets an admin moderate", async () => {
    moderateReview.mockResolvedValue({});
    await moderateReviewAction(REVIEW_ID, "APPROVED");
    expect(requireRole).toHaveBeenCalledWith(["ADMIN"]);
  });

  it("publishes a review, expires the cached public reviews and refreshes the lists", async () => {
    moderateReview.mockResolvedValue({ idReview: REVIEW_ID, status: "APPROVED" });
    await expect(moderateReviewAction(REVIEW_ID, "APPROVED")).resolves.toEqual({ ok: true, data: undefined });
    expect(moderateReview).toHaveBeenCalledWith(REVIEW_ID, "APPROVED");
    expect(updateTag).toHaveBeenCalledWith("reviews:public");
    expect(revalidatePath).toHaveBeenCalledWith("/admin/reviews");
    expect(revalidatePath).toHaveBeenCalledWith("/reviews");
  });

  it("hides a review", async () => {
    moderateReview.mockResolvedValue({ idReview: REVIEW_ID, status: "HIDDEN" });
    await moderateReviewAction(REVIEW_ID, "HIDDEN");
    expect(moderateReview).toHaveBeenCalledWith(REVIEW_ID, "HIDDEN");
  });

  it("refuses a status that is not a moderation state, without calling the backend", async () => {
    const result = await moderateReviewAction(REVIEW_ID, "PENDING" as "APPROVED");
    expect(result).toMatchObject({ ok: false, kind: "validation" });
    expect(moderateReview).not.toHaveBeenCalled();
    expect(updateTag).not.toHaveBeenCalled();
  });

  it("refuses a review id that is not a UUID", async () => {
    const result = await moderateReviewAction("abc", "HIDDEN");
    expect(result).toMatchObject({ ok: false, kind: "validation" });
    expect(moderateReview).not.toHaveBeenCalled();
  });

  it("returns the safe error and keeps the cache when the backend refuses", async () => {
    moderateReview.mockRejectedValue(new ApiError("forbidden", { status: 403 }));
    const result = await moderateReviewAction(REVIEW_ID, "APPROVED");
    expect(result).toMatchObject({ ok: false, kind: "forbidden" });
    expect(updateTag).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
