import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Map } from "./Map";

describe("Map", () => {
  it("draws the stylized map without key or location", () => {
    render(<Map />);
    expect(screen.getByRole("img", { name: "Map of the clinic" })).toBeInTheDocument();
    expect(screen.getByText("CONVET · Aruba")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("embeds Google Maps with key and location and offers a link out", () => {
    render(<Map apiKey="k" location="Oranjestad, Aruba" />);
    expect(screen.getByTitle("Map of the clinic")).toHaveAttribute("src", expect.stringContaining("key=k&q=Oranjestad%2C%20Aruba"));
    expect(screen.getByRole("link", { name: "Open in Google Maps" })).toHaveAttribute("href", expect.stringContaining("Oranjestad"));
  });
});
