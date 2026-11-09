import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PublicReviewDto } from "@/lib/api/reviews.contract";

import { PublicReviews } from "./PublicReviews";
import { averageRating, reviewerLine, serviceLine, summaryLine } from "./PublicReviews.utils";

/**
 * A published review as the public list sends it.
 *
 * @param overrides Fields to change.
 * @returns The review.
 */
function publicReview(overrides: Partial<PublicReviewDto> = {}): PublicReviewDto {
  return {
    idReview: "11111111-1111-4111-8111-111111111111",
    rating: 5,
    comment: "Calm, careful and on time.",
    createdAt: "2026-11-05T10:00:00.000Z",
    appointment: {
      pet: { name: "Luna", species: "DOG" },
      branch: { name: "Oranjestad", city: "Oranjestad" },
      branchService: { service: { name: "Vaccination" } },
      customer: { firstName: "Anna" },
    },
    ...overrides,
  };
}

describe("PublicReviews", () => {
  it("shows the summary and one card per published review", () => {
    render(<PublicReviews reviews={[publicReview(), publicReview({ idReview: "2", rating: 4, comment: undefined })]} />);

    expect(screen.getByRole("heading", { level: 2, name: "Published reviews" })).toBeInTheDocument();
    expect(screen.getByText("Average 4.5 from 2 reviews")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByText("Calm, careful and on time.")).toBeInTheDocument();
    expect(screen.getAllByText("Anna · Luna, dog")).toHaveLength(2);
    expect(screen.getAllByText("Vaccination · Oranjestad", { exact: false })).toHaveLength(2);
    expect(screen.getByRole("img", { name: "4 of 5 stars" })).toBeInTheDocument();
  });

  it("shows an empty state when no review is published", () => {
    render(<PublicReviews reviews={[]} />);
    expect(screen.getByText("No published reviews yet")).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});

describe("public review utils", () => {
  it("averages the ratings to one decimal and describes the reviewer and the visit", () => {
    expect(averageRating([{ rating: 5 }, { rating: 4 }, { rating: 4 }])).toBe(4.3);
    expect(averageRating([])).toBeUndefined();
    expect(summaryLine([{ rating: 5 }])).toBe("Average 5.0 from 1 review");
    expect(reviewerLine(publicReview())).toBe("Anna · Luna, dog");
    expect(serviceLine(publicReview())).toBe("Vaccination · Oranjestad");
  });
});
