import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { StaffShell } from "./StaffShell";
import { SHELL_CONFIGS } from "./StaffShell.constants";
import { isActivePath, topBarFor } from "./StaffShell.utils";

const pathname = vi.fn();

vi.mock("next/navigation", () => ({ usePathname: () => pathname() }));

const { staff, admin } = SHELL_CONFIGS;

describe("StaffShell", () => {
  beforeEach(() => pathname.mockReturnValue("/staff/schedule"));

  it("renders the page with the navigation and marks the current section", () => {
    render(
      <StaffShell>
        <p>Page</p>
      </StaffShell>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page");
    expect(screen.getAllByRole("link", { name: "Schedule" })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("button", { name: /New appointment/ })[0]).toBeInTheDocument();
  });

  it("opens the menu with the same links on small screens", async () => {
    render(
      <StaffShell>
        <p>Page</p>
      </StaffShell>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument();
  });

  it("shows the administrator navigation, with the low stock count, in the admin variant", () => {
    pathname.mockReturnValue("/admin/inventory/receive");
    render(
      <StaffShell variant="admin">
        <p>Page</p>
      </StaffShell>,
    );
    expect(screen.getByText("Maria Kock")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Stock/ })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /Suppliers/ })).toBeInTheDocument();
  });
});

describe("staff shell utils", () => {
  it("marks the section of the current page", () => {
    expect(isActivePath("/staff", "/staff", "/staff")).toBe(true);
    expect(isActivePath("/staff", "/staff/schedule", "/staff")).toBe(false);
    expect(isActivePath("/staff/patients", "/staff/patients/luna", "/staff")).toBe(true);
  });

  it("gives record pages a back arrow to Today", () => {
    expect(topBarFor("/staff", staff).backHref).toBeUndefined();
    expect(topBarFor("/staff/visits/luna-today", staff)).toEqual({ title: "Today · Dr. Andreina", backHref: "/staff" });
    expect(topBarFor("/staff/schedule", staff).title).toBe("Appointments");
  });

  it("picks the most specific title in the admin area", () => {
    expect(topBarFor("/admin/inventory", admin).title).toBe("Stock · Main clinic");
    expect(topBarFor("/admin/inventory/receive", admin)).toEqual({ title: "Receive stock", backHref: "/admin/inventory" });
    expect(topBarFor("/admin/inventory/products/rabies", admin).backHref).toBe("/admin/inventory");
    expect(topBarFor("/nowhere", admin).title).toBe("CONVET");
  });
});
