import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "./ProductCard";

const props = {
  category: "Medication · Vaccines",
  name: "Rabies vaccine, inactivated",
  description: "Single-dose vial for dogs and cats.",
  askHref: "https://wa.me/2975930404",
};

describe("ProductCard", () => {
  it("is an article with the product heading, category and description", () => {
    render(<ProductCard {...props} />);
    expect(screen.getByRole("heading", { level: 3, name: "Rabies vaccine, inactivated" })).toBeInTheDocument();
    expect(screen.getByText("Medication · Vaccines")).toBeInTheDocument();
  });

  it("shows the prescription badge only when needed", () => {
    const { rerender } = render(<ProductCard {...props} />);
    expect(screen.queryByText("Prescription only")).not.toBeInTheDocument();
    rerender(<ProductCard {...props} prescription />);
    expect(screen.getByText("Prescription only")).toBeInTheDocument();
  });

  it("links to ask about availability", () => {
    render(<ProductCard {...props} />);
    expect(screen.getByRole("link", { name: "Ask about availability" })).toHaveAttribute("href", "https://wa.me/2975930404");
  });

  it("uses the photo when there is one", () => {
    render(<ProductCard {...props} image={{ src: "/photos/rabies.jpg", alt: "Vial of rabies vaccine" }} />);
    expect(screen.getByRole("img", { name: "Vial of rabies vaccine" })).toBeInTheDocument();
  });
});
