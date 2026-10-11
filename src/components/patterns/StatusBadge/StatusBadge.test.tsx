import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Check } from "@/components/ui/Icon";

import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("shows the label of the state", () => {
    render(<StatusBadge view={{ tone: "success", icon: Check, label: "In stock" }} />);
    expect(screen.getByText("In stock")).toBeInTheDocument();
  });
});
