import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Photo } from "./Photo";

describe("Photo", () => {
  it("renders the photo with its alt text", () => {
    render(<Photo src="/photos/dr-shirley.jpg" alt="Dr. Shirley smiling" />);
    expect(screen.getByRole("img", { name: "Dr. Shirley smiling" })).toBeInTheDocument();
  });

  it("shows a decorative placeholder without a source", () => {
    const { container } = render(<Photo />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the requested ratio", () => {
    const { container } = render(<Photo ratio="314 / 300" />);
    expect((container.firstElementChild as HTMLElement).style.aspectRatio).toBe("314 / 300");
  });
});
