import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CUSTOMER_PROFILE, NOTIFICATION_SETTINGS } from "@/lib/customer/customer.constants";

import { ProfileSettings } from "./ProfileSettings";
import { validateProfile } from "./ProfileSettings.utils";

describe("ProfileSettings", () => {
  it("shows the personal information of the customer", () => {
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} />);
    expect(screen.getByRole("heading", { level: 1, name: "Profile & settings" })).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toHaveValue("Anna");
    expect(screen.getByLabelText("Email")).toHaveValue("anna@example.com");
    expect(screen.getByText("Used to sign in")).toBeInTheDocument();
  });

  it("saves valid changes and confirms them", async () => {
    const onSave = vi.fn().mockResolvedValue({ ok: true, data: undefined });
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} onSave={onSave} />);
    await userEvent.clear(screen.getByLabelText("First name"));
    await userEvent.type(screen.getByLabelText("First name"), "Anne");
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ firstName: "Anne" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Changes saved");
  });

  it("does not save an empty name or a wrong email", async () => {
    const onSave = vi.fn();
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} onSave={onSave} />);
    await userEvent.clear(screen.getByLabelText("First name"));
    await userEvent.clear(screen.getByLabelText("Email"));
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(screen.getByText("Enter your first name.")).toBeInTheDocument();
    expect(screen.getByText("Enter an email like name@example.com.")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("switches notifications on and off but not the ones that are not available", async () => {
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} />);
    const reminder = screen.getByRole("switch", { name: /Reminder 24 hours before/ });
    expect(reminder).toBeChecked();
    await userEvent.click(reminder);
    expect(reminder).not.toBeChecked();
    expect(screen.getByRole("switch", { name: /WhatsApp messages/ })).toBeDisabled();
  });

  it("offers the security actions but not deleting the account, which belongs to Settings", () => {
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} />);
    expect(screen.getByRole("link", { name: "Change" })).toHaveAttribute("href", "/app/settings");
    expect(screen.queryByRole("button", { name: "Delete account" })).not.toBeInTheDocument();
  });
});

describe("ProfileSettings saving through the backend", () => {
  it("keeps the data and shows the banner when the backend fails", async () => {
    const onSave = vi.fn().mockResolvedValue({ ok: false, kind: "server", message: "Something went wrong on our side." });
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} onSave={onSave} />);
    await userEvent.clear(screen.getByLabelText("First name"));
    await userEvent.type(screen.getByLabelText("First name"), "Anne");
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(await screen.findByText("We could not save your changes")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toHaveValue("Anne");
  });

  it("shows a taken email on its field", async () => {
    const onSave = vi.fn().mockResolvedValue({ ok: false, kind: "conflict", message: "taken" });
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} onSave={onSave} />);
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(await screen.findByText("This email is already registered.")).toBeInTheDocument();
  });

  it("shows an error instead of the form when the profile could not be loaded", () => {
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} loadError="We could not reach the server." />);
    expect(screen.getByText("We could not load your profile")).toBeInTheDocument();
    expect(screen.queryByLabelText("First name")).not.toBeInTheDocument();
  });
});

describe("profile utils", () => {
  it("accepts a complete profile", () => {
    expect(validateProfile({ firstName: "A", lastName: "B", email: "a@b.co", phone: "+297 560 1234", address: "" })).toEqual({});
  });

  it("asks for the country code in the phone", () => {
    expect(validateProfile({ firstName: "A", lastName: "B", email: "a@b.co", phone: "5601234", address: "" }).phone).toBeDefined();
  });
});

describe("ProfileSettings fields", () => {
  it("edits the last name and the phone", async () => {
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} />);
    const lastName = screen.getByLabelText("Last name");
    await userEvent.clear(lastName);
    await userEvent.type(lastName, "Smith");
    expect(lastName).toHaveValue("Smith");
    const phone = screen.getByLabelText(/Mobile/);
    await userEvent.clear(phone);
    await userEvent.type(phone, "+297 111 2222");
    expect(phone).toHaveValue("+297 111 2222");
    expect(screen.queryByLabelText(/Address/)).not.toBeInTheDocument();
  });
});
