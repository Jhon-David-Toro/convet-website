import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { SERVICE_ROWS } from "@/lib/admin.constants";
import { pickOption } from "@/test/pickOption";

import { AdminServices } from "./AdminServices";
import { draftOf, durationLabel, flipSpecies } from "./AdminServices.utils";

/**
 * Renders the services page with the toasts it needs.
 *
 * @returns The Testing Library render result.
 */
function renderPage() {
  return render(
    <ToastProvider>
      <AdminServices />
    </ToastProvider>,
  );
}

describe("AdminServices", () => {
  it("lists the services and opens the booking rules of Vaccination", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: "Services" })).toBeInTheDocument();
    expect(screen.getByText("Staff only")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Vaccination" })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /Bookable online/ })).toBeChecked();
    expect(screen.getByLabelText(/Price shown on website/)).toHaveValue("From AWG 45");
  });

  it("selects another service", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "Treatment follow-up" }));
    expect(screen.getByRole("heading", { level: 2, name: "Treatment follow-up" })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: /Bookable online/ })).not.toBeChecked();
  });

  it("toggles a species, publishes and switches tabs", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "Birds" }));
    expect(screen.getByRole("button", { name: "Birds" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Save & publish" }));
    expect(await screen.findByText("Service published.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: "Vets" }));
    expect(screen.getAllByRole("checkbox")).toHaveLength(4);
  });
});

describe("admin services utils", () => {
  it("builds the draft of a service", () => {
    expect(draftOf(SERVICE_ROWS[1])).toEqual({ duration: "20", buffer: "10", online: true, species: ["Dogs", "Cats"], price: "From AWG 45" });
  });

  it("flips a species in the list", () => {
    expect(flipSpecies(["Dogs"], "Cats")).toEqual(["Dogs", "Cats"]);
    expect(flipSpecies(["Dogs", "Cats"], "Dogs")).toEqual(["Cats"]);
  });

  it("describes the duration", () => {
    expect(durationLabel(SERVICE_ROWS[0])).toBe("30 min");
  });
});

describe("AdminServices fields", () => {
  it("changes the duration and the buffer", async () => {
    renderPage();
    await pickOption("Duration", "30 min");
    await pickOption("Buffer after", "15 min");
    expect(screen.getByRole("combobox", { name: "Duration" })).toHaveTextContent("30 min");
    expect(screen.getByRole("combobox", { name: "Buffer after" })).toHaveTextContent("15 min");
  });

  it("turns off online booking, edits the price and discards both", async () => {
    renderPage();
    const toggle = screen.getByRole("switch", { name: /Bookable online/ });
    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    const price = screen.getByLabelText(/Price shown on website/);
    await userEvent.clear(price);
    await userEvent.type(price, "From AWG 50");
    expect(price).toHaveValue("From AWG 50");
    await userEvent.click(screen.getByRole("button", { name: "Discard" }));
    expect(screen.getByRole("switch", { name: /Bookable online/ })).toBeChecked();
    expect(screen.getByLabelText(/Price shown on website/)).toHaveValue("From AWG 45");
  });

  it("shows the public page of the service", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("tab", { name: "Public page" }));
    expect(screen.getByLabelText("Service name")).toHaveValue("Vaccination");
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });
});
