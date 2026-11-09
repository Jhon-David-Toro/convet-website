import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { TEAM_MEMBERS } from "@/lib/admin/admin.constants";

import { AdminTeam } from "./AdminTeam";
import { userIdLine } from "./AdminTeam.utils";

describe("AdminTeam", () => {
  it("lists the team with role, two-step state and status", () => {
    render(<ToastProvider><AdminTeam /></ToastProvider>);
    expect(screen.getByRole("heading", { level: 1, name: "Team" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(7);
    expect(screen.getByText("Administrator")).toBeInTheDocument();
    expect(screen.getByText("Not set up")).toBeInTheDocument();
    expect(screen.getByText("Invited")).toBeInTheDocument();
  });

  it("explains the four identifiers and shows the working hours", () => {
    render(<ToastProvider><AdminTeam /></ToastProvider>);
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

describe("AdminTeam with the backend", () => {
  it("shows the load error and the empty state", () => {
    const { unmount } = render(<AdminTeam members={[]} loadError="We could not reach the server." />);
    expect(screen.getByText("We could not reach the server.")).toBeInTheDocument();
    unmount();
    render(<AdminTeam members={[]} />);
    expect(screen.getByText("No team members yet")).toBeInTheDocument();
  });

  it("deactivates a member from the row menu", async () => {
    const setActive = vi.fn().mockResolvedValue({ ok: true, data: undefined });
    render(
      <ToastProvider>
        <AdminTeam members={[TEAM_MEMBERS[0]]} actions={{ setActive }} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Actions for Dr. Shirley" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "Deactivate" }));
    expect(setActive).toHaveBeenCalledWith("shirley", false);
    expect(await screen.findByText("Team member updated.")).toBeInTheDocument();
  });
});
