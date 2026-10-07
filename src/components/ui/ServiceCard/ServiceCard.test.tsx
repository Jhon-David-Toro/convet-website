import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Syringe } from "@/components/ui/Icon";

import { ServiceCard } from "./ServiceCard";

const props = {
  icon: Syringe,
  title: "Vaccinations",
  description: "Core and lifestyle vaccines for dogs and cats.",
  duration: "15 min",
  species: "Dogs · Cats",
  detailsHref: "/services/vaccinations",
  bookHref: "/book?service=vaccinations",
};

describe("ServiceCard", () => {
  it("is an article with a heading and the description", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Vaccinations" })).toBeInTheDocument();
    expect(screen.getByText(/Core and lifestyle vaccines/)).toBeInTheDocument();
  });

  it("shows duration and species", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByText("15 min")).toBeInTheDocument();
    expect(screen.getByText("Dogs · Cats")).toBeInTheDocument();
  });

  it("has Details and Book links", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByRole("link", { name: "Details" })).toHaveAttribute("href", "/services/vaccinations");
    expect(screen.getByRole("link", { name: "Book" })).toHaveAttribute("href", "/book?service=vaccinations");
  });

  it("omits the meta row without duration or species", () => {
    render(<ServiceCard {...props} duration={undefined} species={undefined} />);
    expect(screen.queryByText("15 min")).not.toBeInTheDocument();
  });
});
