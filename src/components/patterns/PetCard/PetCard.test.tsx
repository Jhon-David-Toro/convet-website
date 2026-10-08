import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PetCard } from "./PetCard";

const props = {
  subject: "dog" as const,
  name: "Luna",
  description: "Dog · Mixed breed · 3 yrs",
  alert: "Allergic to penicillin",
  facts: [
    { label: "Microchip", value: "900164001234567", mono: true },
    { label: "Weight", value: "18.4 kg" },
  ],
  vaccineStatus: { tone: "warning" as const, label: "Rabies due in 20 days" },
  href: "/pets/luna",
};

describe("PetCard", () => {
  it("card layout shows identity, alert, facts and a profile link", () => {
    render(<PetCard {...props} />);
    expect(screen.getByRole("heading", { level: 3, name: "Luna" })).toBeInTheDocument();
    expect(screen.getByText("Allergic to penicillin")).toBeInTheDocument();
    expect(screen.getByText("Microchip")).toBeInTheDocument();
    expect(screen.getByText("900164001234567")).toBeInTheDocument();
    expect(screen.getByText("Rabies due in 20 days")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View profile" })).toHaveAttribute("href", "/pets/luna");
  });

  it("row layout makes the name the link and exposes the alert to assistive tech", () => {
    render(<PetCard {...props} layout="row" />);
    expect(screen.getByRole("link", { name: "Luna" })).toHaveAttribute("href", "/pets/luna");
    expect(screen.getByRole("img", { name: "Allergic to penicillin" })).toBeInTheDocument();
    expect(screen.queryByText("Microchip")).not.toBeInTheDocument();
  });

  it("omits the optional parts", () => {
    render(<PetCard subject="cat" name="Mishi" description="Cat · 2 yrs" href="/pets/mishi" />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByText("Allergic to penicillin")).not.toBeInTheDocument();
  });
});
