import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TEAM_MEMBERS } from "@/lib/admin.constants";

import { AdminTeam } from "./AdminTeam";
import { userIdLine } from "./AdminTeam.utils";

describe("AdminTeam", () => {
  it("lists the team with role, two-step state and status", () => {
    render(<AdminTeam />);
    expect(screen.getByRole("heading", { level: 1, name: "Team" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(7);
    expect(screen.getByText("Administrator")).toBeInTheDocument();
    expect(screen.getByText("Not set up")).toBeInTheDocument();
    expect(screen.getByText("Invited")).toBeInTheDocument();
  });

  it("explains the four identifiers and shows the working hours", () => {
    render(<AdminTeam />);
    expect(screen.getByText("Four separate identifiers")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Working hours · Dr. Shirley" })).toBeInTheDocument();
    expect(screen.getByText("Off")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Review 4 appointments" })).toBeInTheDocument();
  });
});

describe("admin team utils", () => {
  it("shows the user ID, or that the invitation is pending", () => {
    expect(userIdLine(TEAM_MEMBERS[0])).toBe("User ID USR-1a7f");
    expect(userIdLine(TEAM_MEMBERS[5])).toBe("User ID — (invite pending)");
  });
});
