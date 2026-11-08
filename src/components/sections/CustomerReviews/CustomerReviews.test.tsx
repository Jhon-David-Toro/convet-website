import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { MyReviewDto } from "@/lib/api/reviews.contract";
import { ToastProvider } from "@/components/ui/Toast";
import type { CompletedVisit } from "@/lib/reviews/reviews.types";

import { CustomerReviews } from "./CustomerReviews";
import type { ReviewActions } from "./CustomerReviews.types";

const APPOINTMENT_ID = "22222222-2222-4222-8222-222222222222";
const REVIEW_ID = "11111111-1111-4111-8111-111111111111";

const visit: CompletedVisit = {
  appointmentId: APPOINTMENT_ID,
  petName: "Luna",
  serviceName: "Vaccination",
  branchName: "Oranjestad",
  startsAt: "2026-11-02T14:00:00.000Z",
  completedAt: "2026-11-02T14:40:00.000Z",
};

const review: MyReviewDto = {
  idReview: REVIEW_ID,
  rating: 4,
  comment: "Gentle vet",
  status: "PENDING",
  createdAt: "2026-11-03T10:00:00.000Z",
  appointment: {
    idAppointment: "33333333-3333-4333-8333-333333333333",
    startsAt: "2026-10-20T14:00:00.000Z",
    completedAt: "2026-10-20T14:40:00.000Z",
    pet: { idPet: "44444444-4444-4444-8444-444444444444", name: "Milo", species: "CAT" },
    branch: { idBranch: "55555555-5555-4555-8555-555555555555", name: "Oranjestad", city: "Oranjestad" },
    branchService: { service: { idService: "66666666-6666-4666-8666-666666666666", name: "Check-up" } },
  },
};

/**
 * Renders the reviews page with the given props and server actions.
 *
 * @param actions Server Actions the page calls.
 * @param props Visits and reviews to show.
 * @param props.visits Completed visits without a review.
 * @param props.reviews Reviews of the customer.
 * @returns The render result.
 */
function renderPage(actions: ReviewActions, props: { visits?: CompletedVisit[]; reviews?: MyReviewDto[] } = {}) {
  return render(
    <ToastProvider>
      <CustomerReviews visits={props.visits ?? []} reviews={props.reviews ?? []} actions={actions} />
    </ToastProvider>,
  );
}

/**
 * Server Actions that succeed, as stubs.
 *
 * @returns The actions.
 */
function okActions(): ReviewActions {
  return {
    create: vi.fn().mockResolvedValue({ ok: true, data: undefined }),
    update: vi.fn().mockResolvedValue({ ok: true, data: undefined }),
  };
}

describe("CustomerReviews", () => {
  it("lists the visits to review and the reviews already written, with their state", () => {
    renderPage(okActions(), { visits: [visit], reviews: [review] });

    expect(screen.getByRole("button", { name: "Leave a review for Vaccination · Luna" })).toBeInTheDocument();
    expect(screen.getByText("Oranjestad · Nov 2, 2026", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Gentle vet")).toBeInTheDocument();
    expect(screen.getByText("Waiting for approval")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "4 of 5 stars" })).toBeInTheDocument();
  });

  it("shows an empty state for each list when there is nothing to show", () => {
    renderPage(okActions());
    expect(screen.getByText("Once a visit is completed, you can review it here.")).toBeInTheDocument();
    expect(screen.getByText("You have not written any reviews yet.")).toBeInTheDocument();
  });

  it("shows the load error instead of the lists", () => {
    render(
      <ToastProvider>
        <CustomerReviews visits={[visit]} reviews={[review]} loadError="We could not reach the server." actions={okActions()} />
      </ToastProvider>,
    );
    expect(screen.getByText("We could not reach the server.")).toBeInTheDocument();
    expect(screen.queryByText("Gentle vet")).not.toBeInTheDocument();
  });

  it("sends a new review for a visit with the chosen rating and comment", async () => {
    const actions = okActions();
    renderPage(actions, { visits: [visit] });

    await userEvent.click(screen.getByRole("button", { name: "Leave a review for Vaccination · Luna" }));
    expect(screen.getByRole("dialog", { name: "Leave a review" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "4 of 5 stars" }));
    await userEvent.type(screen.getByRole("textbox", { name: /comment/i }), "Calm and kind");
    await userEvent.click(screen.getByRole("button", { name: "Send review" }));

    await waitFor(() => expect(actions.create).toHaveBeenCalledWith(APPOINTMENT_ID, { rating: 4, comment: "Calm and kind" }));
    expect(await screen.findByText("Thank you! Your review was sent for approval.")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("asks for a rating before sending", async () => {
    const actions = okActions();
    renderPage(actions, { visits: [visit] });

    await userEvent.click(screen.getByRole("button", { name: "Leave a review for Vaccination · Luna" }));
    await userEvent.click(screen.getByRole("button", { name: "Send review" }));

    expect(await screen.findByText("Choose a rating from 1 to 5 stars.")).toBeInTheDocument();
    expect(actions.create).not.toHaveBeenCalled();
  });

  it("shows the field error the backend reported and keeps the dialog open", async () => {
    const actions: ReviewActions = {
      ...okActions(),
      create: vi.fn().mockResolvedValue({ ok: false, kind: "validation", message: "Check the form.", fieldErrors: { comment: "Comment is too long" } }),
    };
    renderPage(actions, { visits: [visit] });

    await userEvent.click(screen.getByRole("button", { name: "Leave a review for Vaccination · Luna" }));
    await userEvent.click(screen.getByRole("radio", { name: "5 of 5 stars" }));
    await userEvent.click(screen.getByRole("button", { name: "Send review" }));

    expect(await screen.findByText("Comment is too long")).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Leave a review" })).toBeInTheDocument();
  });

  it("shows a general failure above the buttons when no field is to blame", async () => {
    const actions: ReviewActions = {
      ...okActions(),
      create: vi.fn().mockResolvedValue({ ok: false, kind: "conflict", message: "This appointment already has a review." }),
    };
    renderPage(actions, { visits: [visit] });

    await userEvent.click(screen.getByRole("button", { name: "Leave a review for Vaccination · Luna" }));
    await userEvent.click(screen.getByRole("radio", { name: "3 of 5 stars" }));
    await userEvent.click(screen.getByRole("button", { name: "Send review" }));

    expect(await screen.findByText("This appointment already has a review.")).toBeInTheDocument();
  });

  it("opens the edit form with the current values and saves the change", async () => {
    const actions = okActions();
    renderPage(actions, { reviews: [review] });

    await userEvent.click(screen.getByRole("button", { name: "Edit review of Check-up · Milo" }));
    const dialog = screen.getByRole("dialog", { name: "Edit your review" });
    expect(within(dialog).getByRole("radio", { name: "4 of 5 stars" })).toBeChecked();
    expect(within(dialog).getByRole("textbox", { name: /comment/i })).toHaveValue("Gentle vet");

    await userEvent.click(within(dialog).getByRole("radio", { name: "5 of 5 stars" }));
    await userEvent.click(within(dialog).getByRole("button", { name: "Save changes" }));

    await waitFor(() => expect(actions.update).toHaveBeenCalledWith(REVIEW_ID, { rating: 5, comment: "Gentle vet" }));
  });

  it("does not let an existing comment be removed while editing", async () => {
    const actions = okActions();
    renderPage(actions, { reviews: [review] });

    await userEvent.click(screen.getByRole("button", { name: "Edit review of Check-up · Milo" }));
    await userEvent.clear(screen.getByRole("textbox", { name: /comment/i }));
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));

    expect(await screen.findByText("A comment cannot be removed. Replace it with new text instead.")).toBeInTheDocument();
    expect(actions.update).not.toHaveBeenCalled();
  });
});
