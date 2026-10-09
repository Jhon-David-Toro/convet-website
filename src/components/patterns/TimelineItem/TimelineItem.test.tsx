import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TimelineItem } from "./TimelineItem";

const props = {
  title: "Consultation · limping",
  meta: "Sep 12, 2026 · Dr. Shirley",
  summary: "Mild strain in the right front leg. Rest for a week.",
};

describe("TimelineItem", () => {
  it("shows title, meta and summary as a list item", () => {
    render(
      <ol>
        <TimelineItem type="visit" {...props} />
      </ol>,
    );
    expect(screen.getByRole("listitem")).toBeInTheDocument();
    expect(screen.getByText("Consultation · limping")).toBeInTheDocument();
    expect(screen.getByText("Sep 12, 2026 · Dr. Shirley")).toBeInTheDocument();
    expect(screen.getByText(/Mild strain/)).toBeInTheDocument();
  });

  it("keeps the rail decorative and drops the line on the last item", () => {
    const { container, rerender } = render(
      <ol>
        <TimelineItem type="vaccine" {...props} />
      </ol>,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    const withLine = container.querySelectorAll("span").length;
    rerender(
      <ol>
        <TimelineItem type="vaccine" {...props} last />
      </ol>,
    );
    expect(container.querySelectorAll("span").length).toBe(withLine - 1);
  });
});
