import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "./Footer";

const props = {
  about: "Care and advanced medicine for many species of animals.",
  motto: { text: "Same heart. Same care.", highlight: "Always animals first." },
  columns: [
    { heading: "Clinic", items: [{ label: "Services", href: "/services" }, { label: "Book a visit", href: "/book" }] },
    { heading: "Contact", items: [{ label: "24/7 Emergency: 593-0404", href: "tel:+2975930404", highlight: true }, { label: "Sun closed" }] },
  ],
  copyright: "© 2026 Contreras Veterinary Services N.V. · Aruba",
  legalLinks: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }],
};

describe("Footer", () => {
  it("is a contentinfo landmark with the brand, motto and copyright", () => {
    render(<Footer {...props} />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("CONVET")).toBeInTheDocument();
    expect(screen.getByText("Always animals first.")).toBeInTheDocument();
    expect(screen.getByText("© 2026 Contreras Veterinary Services N.V. · Aruba")).toBeInTheDocument();
  });

  it("renders each column as a labelled navigation with links", () => {
    render(<Footer {...props} />);
    expect(screen.getByRole("navigation", { name: "Clinic" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: "24/7 Emergency: 593-0404" })).toHaveAttribute("href", "tel:+2975930404");
    expect(screen.getByText("Sun closed").closest("a")).toBeNull();
  });

  it("renders the legal links", () => {
    render(<Footer {...props} />);
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
  });
});
