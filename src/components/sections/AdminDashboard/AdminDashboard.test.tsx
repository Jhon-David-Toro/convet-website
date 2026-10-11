import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AdminDashboard } from "./AdminDashboard";

describe("AdminDashboard", () => {
  it("greets the administrator and shows the figures of the day", () => {
    render(<AdminDashboard />);
    expect(screen.getByRole("heading", { level: 1, name: "Good morning, Maria" })).toBeInTheDocument();
    expect(screen.getByText("New clients this week")).toBeInTheDocument();
    expect(screen.getByText("Expired lots")).toBeInTheDocument();
  });

  it("lists the inventory alerts with their status", () => {
    render(<AdminDashboard />);
    expect(screen.getByRole("table", { name: "Inventory alerts" })).toBeInTheDocument();
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
    expect(screen.getByText("Expired · blocked")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Open inventory" })).toHaveAttribute("href", "/admin/inventory");
  });

  it("shows each vet's day and the online bookings", () => {
    render(<AdminDashboard />);
    expect(screen.getByRole("heading", { name: "Today by vet" })).toBeInTheDocument();
    expect(screen.getByText("5 appointments · 2 done · 1 in progress")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Review" })).toHaveAttribute("href", "/admin/appointments");
  });
});
