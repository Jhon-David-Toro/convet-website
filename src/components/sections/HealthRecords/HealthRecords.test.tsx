import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { HealthRecords } from "./HealthRecords";
import { filterRecordEvents, groupRecordsByYear } from "./HealthRecords.utils";
import { HEALTH_RECORDS } from "@/lib/customer/customer.records.constants";

describe("HealthRecords", () => {
  it("shows the records of Luna: summary, figures, history, medications and diagnoses", () => {
    render(<HealthRecords />);
    expect(screen.getByRole("heading", { level: 1, name: "Health records" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Luna" })).toBeInTheDocument();
    expect(screen.getByText("Up to date")).toBeInTheDocument();
    expect(screen.getByText("Consultation · limping")).toBeInTheDocument();
    expect(screen.getByText("Flea & tick chewable")).toBeInTheDocument();
    expect(screen.getByText("Dental tartar, grade 1")).toBeInTheDocument();
    expect(screen.getByText("Sample design data — fictional records")).toBeInTheDocument();
  });

  it("filters the history by kind of event", async () => {
    render(<HealthRecords />);
    await userEvent.click(screen.getByRole("button", { name: /Vaccines/ }));
    const history = screen.getByRole("region", { name: "Clinical history" });
    expect(within(history).getByText("DHPP vaccine")).toBeInTheDocument();
    expect(within(history).queryByText("Consultation · limping")).not.toBeInTheDocument();
  });

  it("switches to a pet without records and shows what to expect", async () => {
    render(<HealthRecords />);
    await userEvent.click(screen.getByRole("button", { name: "Milo · Cat" }));
    expect(screen.getByRole("heading", { level: 2, name: "Milo" })).toBeInTheDocument();
    expect(screen.getByText("No health records yet")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View appointment" })).toHaveAttribute("href", "/app/appointments");
    expect(screen.queryByText("Clinical history")).not.toBeInTheDocument();
  });
});

describe("health records utils", () => {
  it("filters the events and groups them under their year", () => {
    const events = HEALTH_RECORDS[0].events;
    expect(filterRecordEvents(events, "vaccine")).toHaveLength(2);
    expect(filterRecordEvents(events, "all")).toHaveLength(6);
    expect(groupRecordsByYear(events).map((group) => [group.year, group.events.length])).toEqual([
      ["2026", 4],
      ["2025", 2],
    ]);
  });
});
