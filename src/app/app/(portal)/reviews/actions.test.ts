import { beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePath, createReview, updateReview } = vi.hoisted(() => ({ revalidatePath: vi.fn(), createReview: vi.fn(), updateReview: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath }));
vi.mock("@/lib/auth/auth.access", () => ({ requireRole: vi.fn().mockResolvedValue({}) }));
vi.mock("next/navigation", () => ({ redirect: vi.fn(() => { throw new Error("NEXT_REDIRECT"); }) }));
vi.mock("@/lib/api/reviews.api", () => ({ createReview, updateReview }));

import { ApiError } from "@/lib/api/api.errors";
import { requireRole } from "@/lib/auth/auth.access";

import { createReviewAction, updateReviewAction } from "./actions";

const APPOINTMENT_ID = "22222222-2222-4222-8222-222222222222";
const REVIEW_ID = "11111111-1111-4111-8111-111111111111";

beforeEach(() => {
  revalidatePath.mockReset();
  createReview.mockReset();
  updateReview.mockReset();
  vi.mocked(requireRole).mockClear();
});

describe("createReviewAction", () => {
  it("only lets a customer review", async () => {
    createReview.mockResolvedValue({});
    await createReviewAction(APPOINTMENT_ID, { rating: 5, comment: "" });
    expect(requireRole).toHaveBeenCalledWith(["CUSTOMER"]);
  });

  it("rejects an appointment id that is not a UUID without calling the backend", async () => {
    const result = await createReviewAction("not-a-uuid", { rating: 5, comment: "" });
    expect(result).toMatchObject({ ok: false, kind: "validation" });
    expect(createReview).not.toHaveBeenCalled();
  });

  it("rejects an invalid form on the server without calling the backend", async () => {
    const result = await createReviewAction(APPOINTMENT_ID, { rating: 0, comment: "" });
    expect(result).toMatchObject({ ok: false, kind: "validation", fieldErrors: { rating: expect.any(String) } });
    expect(createReview).not.toHaveBeenCalled();
  });

  it("sends the trimmed review and refreshes the customer's reviews", async () => {
    createReview.mockResolvedValue({ idReview: REVIEW_ID });
    await expect(createReviewAction(APPOINTMENT_ID, { rating: 4, comment: "  Calm and kind  " })).resolves.toEqual({ ok: true, data: undefined });
    expect(createReview).toHaveBeenCalledWith({ appointmentId: APPOINTMENT_ID, rating: 4, comment: "Calm and kind" });
    expect(revalidatePath).toHaveBeenCalledWith("/app/reviews");
  });

  it("returns the field errors the backend reported and does not refresh", async () => {
    createReview.mockRejectedValue(new ApiError("validation", { status: 400, fieldErrors: { comment: "comment must be shorter than 2000 characters" } }));
    const result = await createReviewAction(APPOINTMENT_ID, { rating: 4, comment: "Fine" });
    expect(result).toMatchObject({ ok: false, kind: "validation", fieldErrors: { comment: expect.any(String) } });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("sends the user to sign in when the session expired", async () => {
    createReview.mockRejectedValue(new ApiError("unauthorized", { status: 401 }));
    await expect(createReviewAction(APPOINTMENT_ID, { rating: 4, comment: "" })).rejects.toThrow("NEXT_REDIRECT");
  });
});

describe("updateReviewAction", () => {
  it("sends the new rating and comment of a review and refreshes the page", async () => {
    updateReview.mockResolvedValue({ idReview: REVIEW_ID });
    await expect(updateReviewAction(REVIEW_ID, { rating: 3, comment: "Better on a second visit" })).resolves.toEqual({ ok: true, data: undefined });
    expect(updateReview).toHaveBeenCalledWith(REVIEW_ID, { rating: 3, comment: "Better on a second visit" });
    expect(revalidatePath).toHaveBeenCalledWith("/app/reviews");
  });

  it("rejects a review id that is not a UUID", async () => {
    const result = await updateReviewAction("review-1", { rating: 3, comment: "" });
    expect(result).toMatchObject({ ok: false, kind: "validation" });
    expect(updateReview).not.toHaveBeenCalled();
  });
});
