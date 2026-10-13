import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithToast } from "@/test/renderWithToast";

import { CustomerSettings } from "./CustomerSettings";
import { attentionTitle, notSavedStatus, validateSettings } from "./CustomerSettings.utils";

describe("CustomerSettings", () => {
  it("shows the cards of the page", () => {
    renderWithToast(<CustomerSettings />);
    expect(screen.getByRole("heading", { level: 1, name: "Settings" })).toBeInTheDocument();
    for (const name of ["Profile & contact", "Sign-in & security", "Communication preferences", "Notifications", "Active sessions", "Privacy & data"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });

  it("saves a valid profile and says so", async () => {
    renderWithToast(<CustomerSettings />);
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(screen.getByRole("status")).toHaveTextContent("Changes saved. Your profile is up to date.");
    expect(screen.getByText("All changes saved")).toBeInTheDocument();
  });

  it("does not save an invalid number or address and explains each field", async () => {
    renderWithToast(<CustomerSettings />);
    const phone = screen.getByRole("textbox", { name: /Mobile/ });
    await userEvent.clear(phone);
    await userEvent.type(phone, "560 12");
    await userEvent.type(screen.getByRole("textbox", { name: /Address/ }), "Main");
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(screen.getByRole("alert")).toHaveTextContent("2 fields need your attention");
    expect(screen.getByText("Enter a full number with country code, e.g. +297 560 1234.")).toBeInTheDocument();
    expect(screen.getByText(/Address is too short/)).toBeInTheDocument();
    expect(screen.getByText("Not saved — fix 2 fields")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Discard" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Mobile/ })).toHaveValue("+297 560 1234");
  });

  it("switches notifications and channels, but not the ones that are fixed", async () => {
    renderWithToast(<CustomerSettings />);
    const switches = screen.getAllByRole("switch");
    expect(switches[0]).toBeDisabled();
    expect(switches[3]).not.toBeChecked();
    await userEvent.click(switches[3]);
    expect(switches[3]).toBeChecked();
    expect(screen.getAllByRole("checkbox", { name: "WhatsApp" })[0]).toBeDisabled();
  });

  it("signs out of the other devices", async () => {
    renderWithToast(<CustomerSettings />);
    expect(screen.getByText("Safari on iPhone")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Sign out of all other devices" }));
    expect(screen.queryByText("Safari on iPhone")).not.toBeInTheDocument();
    expect(screen.getByText("Chrome on Windows")).toBeInTheDocument();
  });

  it("keeps the proposal of email plus WhatsApp from being chosen", () => {
    renderWithToast(<CustomerSettings />);
    expect(screen.getByRole("radio", { name: /Email \+ WhatsApp/ })).toBeDisabled();
    expect(screen.getAllByRole("radio")[0]).toBeChecked();
  });
});

describe("settings utils", () => {
  it("validates the phone and the address", () => {
    expect(validateSettings({ firstName: "A", lastName: "B", phone: "+297 560 1234", address: "" })).toEqual({});
    expect(Object.keys(validateSettings({ firstName: "A", lastName: "B", phone: "560 12", address: "Main" }))).toEqual(["phone", "address"]);
  });

  it("writes the texts of the banner and the status", () => {
    expect(attentionTitle(1)).toBe("1 field needs your attention");
    expect(attentionTitle(2)).toBe("2 fields need your attention");
    expect(notSavedStatus(1)).toBe("Not saved — fix 1 field");
  });
});
