import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CUSTOMER_PETS, CUSTOMER_EVENTS } from "@/lib/customer.constants";

import { PetProfile } from "./PetProfile";
import { filterEvents, groupByYear, weightBars } from "./PetProfile.utils";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const [luna] = CUSTOMER_PETS;

describe("PetProfile", () => {
  beforeEach(() => push.mockClear());

  it("shows the pet, its breadcrumbs and the tabs", () => {
    render(<PetProfile pet={luna} tab="vaccines" />);
    expect(screen.getByRole("heading", { level: 1, name: "Luna" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "My pets" })).toHaveAttribute("href", "/app/pets");
    expect(screen.getByRole("tab", { name: /Vaccines/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /Vaccines/ })).toHaveTextContent("3");
  });

  it("opens the page of the tab that is chosen", async () => {
    render(<PetProfile pet={luna} tab="vaccines" />);
    await userEvent.click(screen.getByRole("tab", { name: "History" }));
    expect(push).toHaveBeenCalledWith("/app/pets/luna/history");
  });

  it("lists the vaccines with their status and the overdue count", () => {
    render(<PetProfile pet={luna} tab="vaccines" />);
    const card = screen.getByRole("heading", { name: "Vaccination card" }).closest("section")!;
    expect(within(card).getByText("1 overdue")).toBeInTheDocument();
    expect(within(card).getByText("Leptospirosis")).toBeInTheDocument();
    expect(within(card).getByText("Up to date")).toBeInTheDocument();
  });

  it("filters the history by kind and groups it by year", async () => {
    render(<PetProfile pet={luna} tab="history" />);
    expect(screen.getByText("2025")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Vaccines/ }));
    expect(screen.queryByText("Consultation · limping")).not.toBeInTheDocument();
    expect(screen.getByText("DHPP vaccine")).toBeInTheDocument();
  });

  it("shows an empty state in the tabs that are not available yet", () => {
    render(<PetProfile pet={luna} tab="treatments" />);
    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
  });
});

describe("pet profile utils", () => {
  it("filters and groups events", () => {
    const luna_events = CUSTOMER_EVENTS.filter((event) => event.petId === "luna");
    expect(filterEvents(luna_events, "vaccine")).toHaveLength(2);
    expect(groupByYear(luna_events).map((group) => group.year)).toEqual(["2026", "2025"]);
  });

  it("draws the tallest bar for the heaviest weight", () => {
    const bars = weightBars([
      { label: "a", value: 10 },
      { label: "b", value: 12 },
    ]);
    expect(bars[0].height).toBe(40);
    expect(bars[1]).toEqual({ label: "b", height: 100, current: true });
  });
});

describe("PetProfile without an upcoming appointment", () => {
  it("shows the overview of a pet that has nothing scheduled", () => {
    render(<PetProfile pet={CUSTOMER_PETS[1]} tab="overview" />);
    expect(screen.getByRole("heading", { level: 1, name: CUSTOMER_PETS[1].name })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Upcoming appointment" })).not.toBeInTheDocument();
  });
});
