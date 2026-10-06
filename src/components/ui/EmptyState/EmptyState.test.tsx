import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/Button";
import { Paw } from "@/components/ui/Icon";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("shows the title, message and action", () => {
    render(
      <EmptyState
        icon={Paw}
        title="No pets yet"
        message="Add your companion so we can keep their vaccines and visits in one place."
        action={<Button>Add a pet</Button>}
      />,
    );
    expect(screen.getByRole("heading", { level: 3, name: "No pets yet" })).toBeInTheDocument();
    expect(screen.getByText(/keep their vaccines/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add a pet" })).toBeInTheDocument();
  });

  it("keeps the illustration out of the accessibility tree", () => {
    const { container } = render(<EmptyState icon={Paw} title="No pets yet" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
