import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SERVICE_ROWS } from "@/lib/admin.constants";
import { ToastProvider } from "@/components/ui/Toast";

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
