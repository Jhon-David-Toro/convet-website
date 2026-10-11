import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CustomerOverview } from "./CustomerOverview";

describe("CustomerOverview", () => {
  it("shows the next appointment and the reminders", () => {
    render(<CustomerOverview />);
    expect(screen.getByRole("heading", { name: "Next appointment" })).toBeInTheDocument();
    expect(screen.getByText("Rabies booster")).toBeInTheDocument();
    expect(screen.getByText("Luna's rabies booster is due Oct 20")).toBeInTheDocument();
    expect(screen.getByText("Luna's leptospirosis vaccine is overdue")).toBeInTheDocument();
  });

  it("dismisses a reminder", async () => {
    render(<CustomerOverview />);
    await userEvent.click(screen.getAllByRole("button", { name: "Dismiss reminder" })[0]);
    expect(screen.queryByText("Luna's rabies booster is due Oct 20")).not.toBeInTheDocument();
  });

  it("lists the pets with a way to add another and open each profile", () => {
    render(<CustomerOverview />);
    expect(screen.getAllByRole("link", { name: /View profile/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Add another pet" })).toHaveAttribute("href", "/app/pets?add=1");
  });

  it("shows the recent activity with a link to the full history", () => {
    render(<CustomerOverview />);
    expect(screen.getByRole("heading", { name: "Recent activity" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Full history/ })).toHaveAttribute("href", "/app/pets/luna/history");
    expect(screen.getByText("Luna · Carprofen 50 mg")).toBeInTheDocument();
  });
});
