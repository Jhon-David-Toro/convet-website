import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { AdminReviewDto } from "@/lib/api/reviews.contract";
import { ToastProvider } from "@/components/ui/Toast";

import { AdminReviews } from "./AdminReviews";
import type { ModerationActions } from "./AdminReviews.types";
import { moderationItems, reviewsPageHref } from "./AdminReviews.utils";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

/**
 * A review as the moderation list sends it.
 *
 * @param overrides Fields to change.
 * @returns The review.
 */
function reviewFixture(overrides: Partial<AdminReviewDto> = {}): AdminReviewDto {
  return {
    idReview: "11111111-1111-4111-8111-111111111111",
    rating: 5,
    comment: "Thorough and kind",
    status: "PENDING",
    createdAt: "2026-11-05T10:00:00.000Z",
    appointment: {
      idAppointment: "22222222-2222-4222-8222-222222222222",
      startsAt: "2026-11-04T14:00:00.000Z",
      completedAt: "2026-11-04T14:40:00.000Z",
      pet: { idPet: "33333333-3333-4333-8333-333333333333", name: "Luna", species: "DOG" },
      branch: { idBranch: "44444444-4444-4444-8444-444444444444", name: "Oranjestad", city: "Oranjestad" },
      branchService: { service: { idService: "55555555-5555-4555-8555-555555555555", name: "Vaccination" } },
      customer: { idUser: "66666666-6666-4666-8666-666666666666", firstName: "Anna", lastName: "Lee", email: "anna@example.com" },
    },
    ...overrides,
  };
}

/**
 * Server Actions of the moderation list, as stubs that succeed.
 *
 * @returns The actions.
 */
function actions(): ModerationActions {
  return { moderate: vi.fn().mockResolvedValue({ ok: true, data: undefined }) };
}

beforeEach(() => {
  push.mockReset();
});

describe("AdminReviews", () => {
  it("lists the reviews of the filter with the customer, the visit, the rating and the state", () => {
    render(
      <ToastProvider>
        <AdminReviews reviews={[reviewFixture()]} filter="PENDING" actions={actions()} />
      </ToastProvider>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Reviews" })).toBeInTheDocument();
    expect(screen.getByText("Anna Lee")).toBeInTheDocument();
    expect(screen.getByText("Vaccination · Luna · Oranjestad")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "5 of 5 stars" })).toBeInTheDocument();
    expect(screen.getByText("Waiting for approval")).toBeInTheDocument();
  });

  it("publishes a waiting review from its row menu and confirms it", async () => {
    const moderation = actions();
    render(
      <ToastProvider>
        <AdminReviews reviews={[reviewFixture()]} filter="PENDING" actions={moderation} />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Actions for the review of Anna Lee" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "Publish" }));

    expect(moderation.moderate).toHaveBeenCalledWith("11111111-1111-4111-8111-111111111111", "APPROVED");
    expect(await screen.findByText("Review updated.")).toBeInTheDocument();
  });

  it("hides a published review from its row menu", async () => {
    const moderation = actions();
    render(
      <ToastProvider>
        <AdminReviews reviews={[reviewFixture({ status: "APPROVED" })]} filter="APPROVED" actions={moderation} />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Actions for the review of Anna Lee" }));
    expect(screen.queryByRole("menuitem", { name: "Publish" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("menuitem", { name: "Hide" }));

    await waitFor(() => expect(moderation.moderate).toHaveBeenCalledWith("11111111-1111-4111-8111-111111111111", "HIDDEN"));
  });

  it("opens the list of another status when a filter chip is picked", async () => {
    render(
      <ToastProvider>
        <AdminReviews reviews={[]} filter="PENDING" actions={actions()} />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Hidden" }));
    expect(push).toHaveBeenCalledWith("/admin/reviews?status=HIDDEN");
  });

  it("shows the empty state and the load error", () => {
    const { unmount } = render(<AdminReviews reviews={[]} filter="PENDING" actions={actions()} />);
    expect(screen.getByText("No reviews here")).toBeInTheDocument();
    unmount();

    render(<AdminReviews reviews={[]} filter="PENDING" loadError="We could not reach the server." actions={actions()} />);
    expect(screen.getByText("We could not reach the server.")).toBeInTheDocument();
    expect(screen.queryByText("No reviews here")).not.toBeInTheDocument();
  });
});

describe("admin review utils", () => {
  it("offers only the state change a review does not have yet", () => {
    const moderate = vi.fn();
    const onlyHide = moderationItems("APPROVED", moderate);
    expect(onlyHide.map((item) => item.label)).toEqual(["Hide"]);
    const both = moderationItems("PENDING", moderate);
    expect(both.map((item) => item.label)).toEqual(["Publish", "Hide"]);
    both[0].onSelect?.();
    expect(moderate).toHaveBeenCalledWith("APPROVED");
  });

  it("links to a page of the list and keeps the filter; the first page has no page parameter", () => {
    expect(reviewsPageHref("HIDDEN", 1)).toBe("/admin/reviews?status=HIDDEN");
    expect(reviewsPageHref("ALL", 3)).toBe("/admin/reviews?status=ALL&page=3");
  });
});
