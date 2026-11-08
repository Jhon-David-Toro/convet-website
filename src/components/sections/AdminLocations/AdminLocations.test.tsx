import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { LOCATION } from "@/lib/admin/admin.constants";

import { AdminLocations } from "./AdminLocations";

const BRANCH = { ...LOCATION, id: "b1", name: "Oranjestad", subtitle: "Main street 1, Oranjestad, Aruba", active: true };

/**
 * Renders inside the toast provider the actions need.
 *
 * @param ui Element to render.
 * @returns The render result.
 */
function renderWithToasts(ui: ReactNode) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe("AdminLocations", () => {
  it("shows each branch, its phones and the opening hours", () => {
    renderWithToasts(<AdminLocations locations={[BRANCH]} />);
    expect(screen.getByRole("heading", { level: 1, name: "Locations" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Oranjestad" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add location (owner only)" })).toBeDisabled();
    expect(screen.getByLabelText("Phone")).toHaveValue("+297 593 0404");
    expect(screen.getByText("8:00 AM – 6:00 PM")).toBeInTheDocument();
  });

  it("shows the error of the backend and keeps the clinic hours", () => {
    renderWithToasts(<AdminLocations locations={[]} loadError="We could not reach the server." />);
    expect(screen.getByText("We could not reach the server.")).toBeInTheDocument();
    expect(screen.getByText("8:00 AM – 6:00 PM")).toBeInTheDocument();
  });

  it("says when there are no branches yet", () => {
    renderWithToasts(<AdminLocations locations={[]} />);
    expect(screen.getByText("No locations yet")).toBeInTheDocument();
  });

  it("removes and adds closures", async () => {
    renderWithToasts(<AdminLocations locations={[BRANCH]} />);
    expect(screen.getByText("Christmas Day")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove closure Dec 25, 2026" }));
    expect(screen.queryByText("Christmas Day")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Add closure" }));
    await userEvent.type(screen.getByLabelText("Reason shown to clients"), "Staff day");
    await userEvent.click(screen.getByRole("button", { name: "Save closure" }));
    expect(await screen.findByText("Staff day", {}, { timeout: 3000 })).toBeInTheDocument();
  });
});

describe("AdminLocations actions", () => {
  it("deactivates a branch through its action", async () => {
    const setActive = vi.fn().mockResolvedValue({ ok: true, data: undefined });
    renderWithToasts(<AdminLocations locations={[BRANCH]} actions={{ setActive }} />);
    await userEvent.click(screen.getByRole("button", { name: "Deactivate" }));
    expect(setActive).toHaveBeenCalledWith("b1", false);
    expect(await screen.findByText("Location saved.")).toBeInTheDocument();
  });

  it("saves a changed phone and shows the error the backend returns", async () => {
    const savePhone = vi.fn().mockResolvedValue({ ok: false, kind: "validation", message: "Some of the information is not valid." });
    renderWithToasts(<AdminLocations locations={[BRANCH]} actions={{ savePhone }} />);
    expect(screen.queryByRole("button", { name: "Save phone" })).not.toBeInTheDocument();
    const phone = screen.getByLabelText("Phone");
    await userEvent.clear(phone);
    await userEvent.type(phone, "+297 111 2222");
    await userEvent.click(screen.getByRole("button", { name: "Save phone" }));
    expect(savePhone).toHaveBeenCalledWith("b1", "+297 111 2222");
    expect(await screen.findByText("Some of the information is not valid.")).toBeInTheDocument();
  });

  it("edits the WhatsApp number locally", async () => {
    renderWithToasts(<AdminLocations locations={[BRANCH]} />);
    const whatsapp = screen.getByLabelText("WhatsApp");
    await userEvent.clear(whatsapp);
    await userEvent.type(whatsapp, "+297 333 4444");
    expect(whatsapp).toHaveValue("+297 333 4444");
  });
});
