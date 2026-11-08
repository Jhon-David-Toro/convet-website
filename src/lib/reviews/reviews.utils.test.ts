import { describe, expect, it } from "vitest";

import { REVIEW_COMMENT_MAX } from "./reviews.constants";
import {
  COMMENT_REMOVE_MESSAGE,
  COMMENT_TOO_LONG_MESSAGE,
  RATING_MESSAGE,
  definedErrors,
  formatReviewDate,
  parsePage,
  parseReviewFilter,
  pickReviewErrors,
  starsLabel,
  toReviewBody,
  validateReviewForm,
  visitTitle,
} from "./reviews.utils";

describe("validateReviewForm", () => {
  it("accepts a rating from 1 to 5 with or without a comment", () => {
    expect(validateReviewForm({ rating: 1, comment: "" }, { hadComment: false })).toEqual({});
    expect(validateReviewForm({ rating: 5, comment: "  Lovely team  " }, { hadComment: false })).toEqual({});
  });

  it("asks for a rating when none is picked or the value is out of range", () => {
    expect(validateReviewForm({ rating: 0, comment: "" }, { hadComment: false })).toEqual({ rating: RATING_MESSAGE });
    expect(validateReviewForm({ rating: 6, comment: "" }, { hadComment: false })).toEqual({ rating: RATING_MESSAGE });
    expect(validateReviewForm({ rating: 3.5, comment: "" }, { hadComment: false })).toEqual({ rating: RATING_MESSAGE });
  });

  it("refuses a comment longer than the backend accepts", () => {
    const comment = "a".repeat(REVIEW_COMMENT_MAX + 1);
    expect(validateReviewForm({ rating: 4, comment }, { hadComment: false })).toEqual({ comment: COMMENT_TOO_LONG_MESSAGE });
  });

  it("does not let a comment be removed once it exists", () => {
    expect(validateReviewForm({ rating: 4, comment: "   " }, { hadComment: true })).toEqual({ comment: COMMENT_REMOVE_MESSAGE });
    expect(validateReviewForm({ rating: 4, comment: "" }, { hadComment: false })).toEqual({});
  });
});

describe("toReviewBody", () => {
  it("trims the comment and leaves it out when it is blank", () => {
    expect(toReviewBody({ rating: 4, comment: "  Gentle vet  " })).toEqual({ rating: 4, comment: "Gentle vet" });
    expect(toReviewBody({ rating: 2, comment: "   " })).toEqual({ rating: 2 });
  });
});

describe("error mapping", () => {
  it("keeps only the fields that have a message", () => {
    expect(definedErrors({ rating: "Choose a rating", comment: undefined })).toEqual({ rating: "Choose a rating" });
  });

  it("maps the backend field errors to the review fields only", () => {
    expect(pickReviewErrors({ rating: "rating must be an integer", appointmentId: "appointmentId is wrong" })).toEqual({ rating: "rating must be an integer" });
    expect(pickReviewErrors(undefined)).toEqual({});
  });
});

describe("query parsing", () => {
  it("shows the pending reviews unless the filter is known", () => {
    expect(parseReviewFilter(undefined)).toBe("PENDING");
    expect(parseReviewFilter("drafts")).toBe("PENDING");
    expect(parseReviewFilter("HIDDEN")).toBe("HIDDEN");
    expect(parseReviewFilter("ALL")).toBe("ALL");
  });

  it("reads a page from 1, falling back to the first page", () => {
    expect(parsePage("3")).toBe(3);
    expect(parsePage("0")).toBe(1);
    expect(parsePage("-2")).toBe(1);
    expect(parsePage("abc")).toBe(1);
    expect(parsePage(undefined)).toBe(1);
  });
});

describe("display helpers", () => {
  it("formats dates in the clinic's time zone and returns an empty string for a bad date", () => {
    expect(formatReviewDate("2026-11-08T15:30:00.000Z")).toBe("Nov 8, 2026");
    expect(formatReviewDate("not a date")).toBe("");
  });

  it("names a visit by its service and pet, and reads the rating out", () => {
    expect(visitTitle({ serviceName: "Vaccination", petName: "Luna" })).toBe("Vaccination · Luna");
    expect(starsLabel(4)).toBe("4 of 5 stars");
  });
});
