import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { PetItem } from "@/lib/customer/customer.types";
import { CUSTOMER_PETS, CUSTOMER_EVENTS } from "@/lib/customer/customer.constants";
import { UNEXPECTED_ERROR } from "@/lib/shared/ui.constants";
import { renderWithToast } from "@/test/renderWithToast";

import { PetProfile } from "./PetProfile";
import { filterEvents, groupByYear, weightBars } from "./PetProfile.utils";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const [luna] = CUSTOMER_PETS;
const LUNA_EVENTS = CUSTOMER_EVENTS.filter((event) => event.petId === "luna");

/** Luna as the backend sends her: she has the values the edit form needs. */
const BACKEND_LUNA: PetItem = {
  ...luna,
  form: { name: "Luna", species: "dog", breed: "Mixed", color: "Black", sex: "female", birthDate: "06 / 15 / 2022" },
};

/** Handlers the page connects to the server actions; each test sets what they answer. */
const HANDLERS = { onSave: vi.fn(), onArchive: vi.fn() };

describe("PetProfile", () => {
  beforeEach(() => {
    push.mockClear();
    HANDLERS.onSave.mockReset().mockResolvedValue({ ok: true, data: undefined });
    HANDLERS.onArchive.mockReset().mockResolvedValue({ ok: true, data: undefined });
  });

  it("shows the pet, its breadcrumbs and the tabs", () => {
    renderWithToast(<PetProfile pet={luna} tab="vaccines" history={{ events: [] }} {...HANDLERS} />);
    expect(screen.getByRole("heading", { level: 1, name: "Luna" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "My pets" })).toHaveAttribute("href", "/app/pets");
    expect(screen.getByRole("tab", { name: /Vaccines/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /Vaccines/ })).toHaveTextContent("3");
  });

  it("opens the page of the tab that is chosen", async () => {
    renderWithToast(<PetProfile pet={luna} tab="vaccines" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("tab", { name: "History" }));
    expect(push).toHaveBeenCalledWith("/app/pets/luna/history");
  });

  it("lists the vaccines with their status and the overdue count", () => {
    renderWithToast(<PetProfile pet={luna} tab="vaccines" history={{ events: [] }} {...HANDLERS} />);
    const card = screen.getByRole("heading", { name: "Vaccination card" }).closest("section")!;
    expect(within(card).getByText("1 overdue")).toBeInTheDocument();
    expect(within(card).getByText("Leptospirosis")).toBeInTheDocument();
    expect(within(card).getByText("Up to date")).toBeInTheDocument();
  });

  it("filters the history by kind and groups it by year", async () => {
    renderWithToast(<PetProfile pet={luna} tab="history" history={{ events: LUNA_EVENTS }} {...HANDLERS} />);
    expect(screen.getByText("2025")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Vaccines/ }));
    expect(screen.queryByText("Consultation · limping")).not.toBeInTheDocument();
    expect(screen.getByText("DHPP vaccine")).toBeInTheDocument();
  });

  it("shows an empty state in the tabs that are not available yet", () => {
    renderWithToast(<PetProfile pet={luna} tab="treatments" history={{ events: [] }} {...HANDLERS} />);
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

describe("PetProfile history from the backend", () => {
  it("shows the events it receives", () => {
    renderWithToast(
      <PetProfile
        pet={luna}
        tab="history"
        history={{ events: [{ id: "r1", petId: "luna", type: "visit", title: "Consultation", meta: "Sep 11, 2026", summary: "Sprain.", year: "2026" }] }}
        {...HANDLERS}
      />,
    );
    expect(screen.getByText("Consultation")).toBeInTheDocument();
  });

  it("shows an error instead of an empty timeline when the history could not be loaded", () => {
    renderWithToast(<PetProfile pet={luna} tab="history" history={{ events: [], error: "We could not reach the server." }} {...HANDLERS} />);
    expect(screen.getByText("We could not load the history")).toBeInTheDocument();
    expect(screen.getByText("We could not reach the server.")).toBeInTheDocument();
  });
});

describe("PetProfile without an upcoming appointment", () => {
  it("shows the overview of a pet that has nothing scheduled", () => {
    renderWithToast(<PetProfile pet={CUSTOMER_PETS[1]} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    expect(screen.getByRole("heading", { level: 1, name: CUSTOMER_PETS[1].name })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Upcoming appointment" })).not.toBeInTheDocument();
  });
});

describe("PetProfile pet actions", () => {
  beforeEach(() => {
    push.mockClear();
    HANDLERS.onSave.mockReset().mockResolvedValue({ ok: true, data: undefined });
    HANDLERS.onArchive.mockReset().mockResolvedValue({ ok: true, data: undefined });
  });

  it("offers no edit or archive buttons for a pet the backend does not own", () => {
    renderWithToast(<PetProfile pet={luna} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    expect(screen.queryByRole("button", { name: "Edit pet" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Archive pet" })).not.toBeInTheDocument();
  });

  it("opens the edit form with the current values of the pet", async () => {
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Edit pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit Luna" });
    expect(within(dialog).getByLabelText("Name")).toHaveValue("Luna");
    expect(within(dialog).getByLabelText("Color")).toHaveValue("Black");
    expect(within(dialog).getByLabelText("Date of birth")).toHaveValue("06 / 15 / 2022");
  });

  it("saves the changes through onSave, closes the form and confirms it", async () => {
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Edit pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit Luna" });
    await userEvent.clear(within(dialog).getByLabelText("Name"));
    await userEvent.type(within(dialog).getByLabelText("Name"), "Lunita");
    await userEvent.click(within(dialog).getByRole("button", { name: "Save changes" }));
    expect(HANDLERS.onSave).toHaveBeenCalledWith("luna", expect.objectContaining({ name: "Lunita", species: "dog" }));
    expect(await screen.findByText("Changes to Lunita were saved.")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the form and the typed values when the backend fails", async () => {
    HANDLERS.onSave.mockResolvedValue({ ok: false, kind: "server", message: "Something went wrong on our side." });
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Edit pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit Luna" });
    await userEvent.type(within(dialog).getByLabelText("Color"), " spots");
    await userEvent.click(within(dialog).getByRole("button", { name: "Save changes" }));
    expect(await within(dialog).findByText("We could not save your changes")).toBeInTheDocument();
    expect(within(dialog).getByText("Something went wrong on our side.")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Color")).toHaveValue("Black spots");
    expect(screen.queryByText(/were saved/)).not.toBeInTheDocument();
  });

  it("shows the field error the backend reports on the date of birth", async () => {
    HANDLERS.onSave.mockResolvedValue({ ok: false, kind: "validation", message: "Invalid", fieldErrors: { dateOfBirth: "dateOfBirth must be a date" } });
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Edit pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit Luna" });
    await userEvent.click(within(dialog).getByRole("button", { name: "Save changes" }));
    expect(await within(dialog).findByText("Enter a valid date of birth.")).toBeInTheDocument();
    expect(HANDLERS.onSave).toHaveBeenCalledTimes(1);
  });

  it("does not save an invalid form", async () => {
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Edit pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit Luna" });
    await userEvent.clear(within(dialog).getByLabelText("Name"));
    await userEvent.click(within(dialog).getByRole("button", { name: "Save changes" }));
    expect(within(dialog).getByText("Enter your pet's name.")).toBeInTheDocument();
    expect(HANDLERS.onSave).not.toHaveBeenCalled();
  });

  it("gives the focus back to the edit button when the form is cancelled", async () => {
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Edit pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Edit Luna" });
    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }));
    expect(HANDLERS.onSave).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Edit pet" })).toHaveFocus();
  });

  it("asks before archiving and keeps the pet when the customer chooses to keep it", async () => {
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Archive pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Archive Luna?" });
    expect(within(dialog).getByText(/will no longer appear in your pets/)).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole("button", { name: "Keep pet" }));
    expect(HANDLERS.onArchive).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archive pet" })).toHaveFocus();
  });

  it("archives the pet after the confirmation and sends the customer to their pets", async () => {
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Archive pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Archive Luna?" });
    await userEvent.click(within(dialog).getByRole("button", { name: "Archive pet" }));
    expect(HANDLERS.onArchive).toHaveBeenCalledWith("luna");
    expect(await screen.findByText("Luna was archived.")).toBeInTheDocument();
    expect(push).toHaveBeenCalledWith("/app/pets");
  });

  it("keeps the confirmation open with the reason when the backend refuses to archive", async () => {
    HANDLERS.onArchive.mockResolvedValue({ ok: false, kind: "not-found", message: "We could not find what you were looking for." });
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Archive pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Archive Luna?" });
    await userEvent.click(within(dialog).getByRole("button", { name: "Archive pet" }));
    expect(await within(dialog).findByText("We could not archive this pet")).toBeInTheDocument();
    expect(within(dialog).getByText("We could not find what you were looking for.")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
    expect(screen.queryByText(/was archived/)).not.toBeInTheDocument();
  });

  it("never reports an archive that did not happen when the call throws", async () => {
    HANDLERS.onArchive.mockRejectedValue(new Error("network down"));
    renderWithToast(<PetProfile pet={BACKEND_LUNA} tab="overview" history={{ events: [] }} {...HANDLERS} />);
    await userEvent.click(screen.getByRole("button", { name: "Archive pet" }));
    const dialog = await screen.findByRole("dialog", { name: "Archive Luna?" });
    await userEvent.click(within(dialog).getByRole("button", { name: "Archive pet" }));
    expect(await within(dialog).findByText(UNEXPECTED_ERROR)).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
    expect(screen.queryByText(/was archived/)).not.toBeInTheDocument();
  });
});
