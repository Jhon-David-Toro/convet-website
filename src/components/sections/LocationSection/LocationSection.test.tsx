import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocationSection } from "./LocationSection";

describe("LocationSection", () => {
  it("is a labelled section with the map and the contact lines", () => {
    render(<LocationSection />);
    expect(screen.getByRole("region", { name: "Visit the clinic" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Visit the clinic" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("links to directions and WhatsApp", () => {
    render(<LocationSection />);
    expect(screen.getByRole("link", { name: "Get directions" })).toHaveAttribute("href", expect.stringContaining("google.com/maps/dir"));
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", expect.stringContaining("wa.me"));
  });
});
