import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { PRODUCTS } from "@/lib/products.constants";

import { ProductDetail } from "./ProductDetail";

const [rabies, joint] = PRODUCTS;

describe("ProductDetail", () => {
  it("shows the product with its specs and the prescription notice", () => {
    render(<ProductDetail product={rabies} />);
    expect(screen.getByRole("heading", { level: 1, name: "Rabies vaccine, inactivated" })).toBeInTheDocument();
    expect(within(screen.getByRole("heading", { level: 1 }).parentElement!).getByText("Prescription only")).toBeInTheDocument();
    expect(screen.getByText("1 mL single-dose vial")).toBeInTheDocument();
    expect(screen.getByText(/dispensed only after a consultation/)).toBeInTheDocument();
  });

  it("asks about availability on WhatsApp and books the matching service", () => {
    render(<ProductDetail product={rabies} />);
    expect(screen.getAllByRole("link", { name: "Ask about availability" })[0].getAttribute("href")).toContain("wa.me");
    expect(screen.getByRole("link", { name: "Book vaccination" })).toHaveAttribute("href", "/book?service=vaccinations");
    expect(screen.getByText(/WhatsApp opens with:/)).toHaveTextContent("Is the Rabies vaccine, inactivated available?");
  });

  it("does not offer a booking for products without prescription", () => {
    render(<ProductDetail product={joint} />);
    const info = screen.getByRole("heading", { level: 1 }).parentElement!;
    expect(within(info).queryByText("Prescription only")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Book / })).not.toBeInTheDocument();
  });

  it("lists four related products and switches the gallery image", async () => {
    render(<ProductDetail product={rabies} />);
    const related = screen.getByRole("heading", { name: "Related products" }).closest("section")!;
    expect(within(related).getAllByRole("article")).toHaveLength(4);
    await userEvent.click(screen.getByRole("button", { name: /packaging/ }));
    expect(screen.getByText("Photo: packaging")).toBeInTheDocument();
  });
});
