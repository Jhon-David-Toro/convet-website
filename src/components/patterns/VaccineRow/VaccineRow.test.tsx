import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VaccineRow } from "./VaccineRow";

const props = { vaccine: "Rabies", dates: "Given Oct 20, 2025 · Next Oct 20, 2026" };

describe("VaccineRow", () => {
  it.each([
    ["up-to-date", "Up to date"],
    ["due-soon", "Due soon"],
    ["overdue", "Overdue"],
  ] as const)("%s shows the %s label", (status, label) => {
    render(
      <ul>
        <VaccineRow status={status} {...props} />
      </ul>,
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText("Rabies")).toBeInTheDocument();
  });

  it("shows the lot only when given", () => {
    const { rerender } = render(
      <ul>
        <VaccineRow status="up-to-date" {...props} />
      </ul>,
    );
    expect(screen.queryByText(/Lot RB/)).not.toBeInTheDocument();
    rerender(
      <ul>
        <VaccineRow status="up-to-date" {...props} lot="Lot RB-24187 · exp Nov 30, 2026" />
      </ul>,
    );
    expect(screen.getByText(/Lot RB-24187/)).toBeInTheDocument();
  });
});
