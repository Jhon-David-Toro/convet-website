import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScheduleEvent } from "./ScheduleEvent";

const props = { species: "dog" as const, title: "Luna · Vaccination", meta: "10:15 – 10:30 · Anna Lee" };

describe("ScheduleEvent", () => {
  it.each([
    ["scheduled", "Scheduled"],
    ["new-online", "Booked online"],
    ["arrived", "Arrived"],
    ["in-progress", "In progress"],
    ["completed", "Completed"],
    ["no-show", "No-show"],
  ] as const)("%s shows the %s label", (status, label) => {
    render(<ScheduleEvent status={status} {...props} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Luna · Vaccination" })).toBeInTheDocument();
  });

  it("shows the medical alert only when given", () => {
    const { rerender } = render(<ScheduleEvent status="scheduled" {...props} />);
    expect(screen.queryByText("Penicillin")).not.toBeInTheDocument();
    rerender(<ScheduleEvent status="scheduled" {...props} alert="Penicillin" />);
    expect(screen.getByText("Penicillin")).toBeInTheDocument();
  });
});
