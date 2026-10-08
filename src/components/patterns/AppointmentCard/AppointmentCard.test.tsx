import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppointmentCard } from "./AppointmentCard";

const props = {
  month: "OCT",
  day: "07",
  weekday: "Wed",
  service: "Rabies booster",
  time: "9:45 AM · 15 min",
  pet: "Luna",
  vet: "Dr. Shirley",
  location: "Main clinic",
  primaryHref: "/appointments/1",
  secondaryHref: "/appointments/1/cancel",
};

describe("AppointmentCard", () => {
  it("upcoming: scheduled badge with Reschedule and Cancel", () => {
    render(<AppointmentCard {...props} status="upcoming" />);
    expect(screen.getByRole("heading", { level: 3, name: "Rabies booster" })).toBeInTheDocument();
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reschedule" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cancel" })).toBeInTheDocument();
  });

  it("today: shows the Today badge", () => {
    render(<AppointmentCard {...props} status="today" />);
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("completed and cancelled offer a single action", () => {
    const { rerender } = render(<AppointmentCard {...props} status="completed" />);
    expect(screen.getByRole("link", { name: "View visit summary" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Cancel" })).not.toBeInTheDocument();
    rerender(<AppointmentCard {...props} status="cancelled" />);
    expect(screen.getByRole("link", { name: "Book again" })).toBeInTheDocument();
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  it("lists time, pet, vet and location", () => {
    render(<AppointmentCard {...props} status="upcoming" />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("9:45 AM · 15 min")).toBeInTheDocument();
  });
});
