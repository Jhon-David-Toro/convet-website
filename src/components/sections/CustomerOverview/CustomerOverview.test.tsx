import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CUSTOMER_APPOINTMENTS, CUSTOMER_PETS, CUSTOMER_REMINDERS } from "@/lib/customer/customer.constants";
import { eventTitle, recentEvents } from "@/lib/customer/customer.utils";

import { CustomerOverview } from "./CustomerOverview";
import type { CustomerOverviewProps } from "./CustomerOverview.types";

const FULL: CustomerOverviewProps = {
  pets: CUSTOMER_PETS,
  appointment: CUSTOMER_APPOINTMENTS[0],
  reminders: CUSTOMER_REMINDERS,
  activity: recentEvents().map((event) => ({ ...event, title: eventTitle(event) })),
};

describe("CustomerOverview", () => {
  it("shows the next appointment and the reminders", () => {
    render(<CustomerOverview {...FULL} />);
    expect(screen.getByRole("heading", { name: "Next appointment" })).toBeInTheDocument();
    expect(screen.getByText("Rabies booster")).toBeInTheDocument();
    expect(screen.getByText("Luna's rabies booster is due Oct 20")).toBeInTheDocument();
    expect(screen.getByText("Luna's leptospirosis vaccine is overdue")).toBeInTheDocument();
  });

  it("dismisses a reminder", async () => {
    render(<CustomerOverview {...FULL} />);
    await userEvent.click(screen.getAllByRole("button", { name: "Dismiss reminder" })[0]);
    expect(screen.queryByText("Luna's rabies booster is due Oct 20")).not.toBeInTheDocument();
  });

  it("lists the pets with a way to add another and open each profile", () => {
    render(<CustomerOverview {...FULL} />);
    expect(screen.getAllByRole("link", { name: /View profile/ }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Add another pet" })).toHaveAttribute("href", "/app/pets?add=1");
  });

  it("shows the recent activity with a link to the full history", () => {
    render(<CustomerOverview {...FULL} />);
    expect(screen.getByRole("heading", { name: "Recent activity" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Full history/ })).toHaveAttribute("href", "/app/pets/luna/history");
    expect(screen.getByText("Luna · Carprofen 50 mg")).toBeInTheDocument();
  });

  it("leaves out the blocks that have no data instead of showing placeholders", () => {
    render(<CustomerOverview pets={CUSTOMER_PETS} />);
    expect(screen.queryByRole("heading", { name: "Next appointment" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Recent activity" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Your pets" })).toBeInTheDocument();
  });

  it("shows an error instead of the pets when they could not be loaded", () => {
    render(<CustomerOverview pets={[]} loadError="We could not reach the server." />);
    expect(screen.getByText("We could not load your pets")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /View profile/ })).not.toBeInTheDocument();
  });
});
