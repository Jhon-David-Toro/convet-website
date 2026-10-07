import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Calendar, Home } from "@/components/ui/Icon";

import { Sidebar } from "./Sidebar";

const groups = [
  {
    heading: "Main",
    items: [
      { href: "/", icon: Home, label: "Overview", active: true },
      { href: "/appointments", icon: Calendar, label: "Appointments", count: 2 },
    ],
  },
];

describe("Sidebar", () => {
  it("renders the groups as a labelled navigation and marks the current page", () => {
    render(<Sidebar groups={groups} user={{ name: "Anna Lee", role: "Client" }} signOutHref="/logout" />);
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /Appointments/ })).toHaveTextContent("2");
    expect(screen.getByText("Main")).toBeInTheDocument();
  });

  it("shows the user and a sign out link", () => {
    render(<Sidebar groups={groups} user={{ name: "Anna Lee", role: "Client" }} signOutHref="/logout" />);
    expect(screen.getByText("Anna Lee")).toBeInTheDocument();
    expect(screen.getByText("Client")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign out" })).toHaveAttribute("href", "/logout");
  });

  it("only shows the branch selector when there is a branch", async () => {
    const onBranchClick = vi.fn();
    const { rerender } = render(<Sidebar groups={groups} user={{ name: "A", role: "B" }} signOutHref="/logout" />);
    expect(screen.queryByRole("button", { name: /Branch/ })).not.toBeInTheDocument();
    rerender(<Sidebar groups={groups} branch="Main clinic" onBranchClick={onBranchClick} user={{ name: "A", role: "B" }} signOutHref="/logout" />);
    await userEvent.click(screen.getByRole("button", { name: "Branch: Main clinic" }));
    expect(onBranchClick).toHaveBeenCalledTimes(1);
  });
});
