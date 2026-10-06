import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MediaImage } from "./MediaImage";

describe("MediaImage", () => {
  it("renders the photo with its alt text when there is a source", () => {
    render(<MediaImage subject="dog" src="/photos/dog.jpg" alt="A vet examining a dog" />);
    expect(screen.getByRole("img", { name: "A vet examining a dog" })).toBeInTheDocument();
  });

  it("falls back to the illustration, hidden from assistive tech, with an optional caption", () => {
    const { container } = render(<MediaImage subject="product" caption="Photo coming soon" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Photo coming soon")).toBeInTheDocument();
  });
});
