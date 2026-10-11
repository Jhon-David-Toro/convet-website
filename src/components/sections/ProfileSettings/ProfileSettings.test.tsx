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
    expect(screen.getByText("Verified")).toBeInTheDocument();
  });

  it("saves valid changes and confirms them", async () => {
    const onSave = vi.fn();
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} onSave={onSave} />);
    await userEvent.clear(screen.getByLabelText("First name"));
    await userEvent.type(screen.getByLabelText("First name"), "Anne");
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ firstName: "Anne" }));
    expect(screen.getByRole("status")).toHaveTextContent("Changes saved");
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

  it("offers the security actions", () => {
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} />);
    expect(screen.getByRole("link", { name: "Change" })).toHaveAttribute("href", "/forgot-password");
    expect(screen.getByRole("button", { name: "Delete account" })).toBeInTheDocument();
  });
});

describe("profile utils", () => {
  it("accepts a complete profile", () => {
    expect(validateProfile({ firstName: "A", lastName: "B", email: "a@b.co", phone: "", address: "" })).toEqual({});
  });
});

describe("ProfileSettings fields", () => {
  it("edits the last name, the phone and the address", async () => {
    render(<ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} />);
    const lastName = screen.getByLabelText("Last name");
    await userEvent.clear(lastName);
    await userEvent.type(lastName, "Smith");
    expect(lastName).toHaveValue("Smith");
    const phone = screen.getByLabelText(/Mobile/);
    await userEvent.clear(phone);
    await userEvent.type(phone, "+297 111 2222");
    expect(phone).toHaveValue("+297 111 2222");
    const address = screen.getByLabelText(/Address/);
    await userEvent.type(address, "Main street 1");
    expect((address as HTMLInputElement).value).toContain("Main street 1");
  });
});
