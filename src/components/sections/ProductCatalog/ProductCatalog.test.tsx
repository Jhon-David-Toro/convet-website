import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { PRODUCTS } from "@/lib/products.constants";

import { ProductCatalog } from "./ProductCatalog";
import { countKinds, filterProducts, productCountLabel, toggleValue } from "./ProductCatalog.utils";

describe("ProductCatalog", () => {
  it("shows the first page of products and the total", () => {
    render(<ProductCatalog products={PRODUCTS} />);
    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getByText("18 products")).toBeInTheDocument();
    expect(screen.getByText("Showing 1–6 of 18")).toBeInTheDocument();
  });

  it("links every card to its detail page and to WhatsApp", () => {
    render(<ProductCatalog products={PRODUCTS} />);
    expect(screen.getByRole("link", { name: "Rabies vaccine, inactivated" })).toHaveAttribute("href", "/products/rabies-vaccine-inactivated");
    expect(screen.getAllByRole("link", { name: "Ask about availability" })[0].getAttribute("href")).toContain("wa.me");
  });

  it("goes to the next page", async () => {
    render(<ProductCatalog products={PRODUCTS} />);
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText("Showing 7–12 of 18")).toBeInTheDocument();
  });

  it("filters by kind chip and returns to the first page", async () => {
    render(<ProductCatalog products={PRODUCTS} />);
    await userEvent.click(screen.getByRole("button", { name: /Veterinary products/ }));
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(screen.getByText("4 products")).toBeInTheDocument();
  });

  it("combines the search with the checkbox filters", async () => {
    render(<ProductCatalog products={PRODUCTS} />);
    await userEvent.click(screen.getByRole("checkbox", { name: "Cats" }));
    await userEvent.type(screen.getByRole("searchbox", { name: "Search products" }), "vaccine");
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("shows an empty state when nothing matches", async () => {
    render(<ProductCatalog products={PRODUCTS} />);
    await userEvent.type(screen.getByRole("searchbox", { name: "Search products" }), "zzz");
    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("focuses the search field with Ctrl K", async () => {
    render(<ProductCatalog products={PRODUCTS} />);
    await userEvent.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("searchbox", { name: "Search products" })).toHaveFocus();
  });
});

describe("catalog utils", () => {
  it("counts the products of every kind", () => {
    expect(countKinds(PRODUCTS)).toEqual({ medication: 9, supplement: 5, veterinary: 4 });
  });

  it("filters by species, category and text", () => {
    const filters = { query: "", kinds: [], categories: ["vaccines" as const], species: ["cats" as const] };
    expect(filterProducts(PRODUCTS, filters).map((product) => product.slug)).toEqual(["rabies-vaccine-inactivated", "fvrcp-vaccine"]);
  });

  it("toggles a value and writes the counter", () => {
    expect(toggleValue(["a"], "b")).toEqual(["a", "b"]);
    expect(toggleValue(["a", "b"], "a")).toEqual(["b"]);
    expect(productCountLabel(1)).toBe("1 product");
  });
});
