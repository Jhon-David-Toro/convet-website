import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BookingSummary } from "./BookingSummary";

describe("BookingSummary", () => {
  it("shows the date, time and the four detail rows", () => {
    render(
      <BookingSummary
        aria-label="Booking summary"
        eyebrow="Your visit"
        date="Wed, Oct 7"
        time="9:45 AM · 15 min"
        service={{ title: "Vaccinations", detail: "Rabies booster" }}
        pet={{ title: "Luna", detail: "Dog · 3 yrs" }}
        vet={{ title: "Any available vet", detail: "Dr. Shirley" }}
        location={{ title: "CONVET Aruba", detail: "Free cancellation up to 24 h before" }}
      />,
    );
    expect(screen.getByRole("region", { name: "Booking summary" })).toBeInTheDocument();
    expect(screen.getByText("Wed, Oct 7")).toBeInTheDocument();
    expect(screen.getByText("9:45 AM · 15 min")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("Free cancellation up to 24 h before")).toBeInTheDocument();
  });
});
