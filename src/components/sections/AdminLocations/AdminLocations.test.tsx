import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { AdminLocations } from "./AdminLocations";

describe("AdminLocations", () => {
  it("shows the clinic, its phones and its opening hours", () => {
    render(<AdminLocations />);
    expect(screen.getByRole("heading", { level: 1, name: "Locations" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add location (owner only)" })).toBeDisabled();
    expect(screen.getByLabelText("Phone")).toHaveValue("+297 593 0404");
    expect(screen.getByText("8:00 AM – 6:00 PM")).toBeInTheDocument();
  });

  it("removes and adds closures", async () => {
    render(<AdminLocations />);
    expect(screen.getByText("Christmas Day")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove closure Dec 25, 2026" }));
    expect(screen.queryByText("Christmas Day")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Add closure" }));
    expect(screen.getByText("New closure")).toBeInTheDocument();
  });
});
