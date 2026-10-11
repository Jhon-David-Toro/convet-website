import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterChips } from "./FilterChips";

const options = [
  { value: "all", label: "All", count: 148 },
  { value: "meds", label: "Medications", count: 96 },
];

describe("FilterChips", () => {
  it("marks the selected chip and shows the counts", () => {
    render(<FilterChips label="Type" options={options} value="all" onChange={() => undefined} />);
    expect(screen.getByRole("group", { name: "Type" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /All/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /Medications/ })).toHaveTextContent("96");
  });

  it("reports the chip the user picked", async () => {
    const onChange = vi.fn();
    render(<FilterChips label="Type" options={options} value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /Medications/ }));
    expect(onChange).toHaveBeenCalledWith("meds");
  });
});
