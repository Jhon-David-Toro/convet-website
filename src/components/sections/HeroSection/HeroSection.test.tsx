import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("has the brand headline as the only h1", () => {
    render(<HeroSection />);
    expect(screen.getByRole("heading", { level: 1, name: /same heart/i })).toBeInTheDocument();
  });

  it("offers booking and WhatsApp as the main actions", () => {
    render(<HeroSection />);
    expect(screen.getByRole("link", { name: "Book a visit" })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "Chat on WhatsApp" })).toHaveAttribute("href", expect.stringContaining("wa.me"));
  });

  it("shows the emergency number with a call link", () => {
    render(<HeroSection />);
    expect(screen.getByRole("region", { name: "Emergency" })).toHaveTextContent("593-0404");
    expect(screen.getByRole("link", { name: "Call 593-0404" })).toHaveAttribute("href", "tel:+2975930404");
  });
});
