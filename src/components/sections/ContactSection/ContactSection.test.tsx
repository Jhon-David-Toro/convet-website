import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactSection } from "./ContactSection";
import { validateContact } from "./ContactSection.utils";

/**
 * Fills the form with valid data, leaving the consent unchecked.
 */
async function fillForm() {
  await userEvent.type(screen.getByRole("textbox", { name: /Your name/ }), "Anna Lee");
  await userEvent.type(screen.getByRole("textbox", { name: /Email/ }), "anna@example.com");
  await userEvent.click(screen.getByRole("combobox", { name: /Topic/ }));
  await userEvent.click(screen.getByRole("option", { name: "Product availability" }));
  await userEvent.type(screen.getByRole("textbox", { name: /Message/ }), "Is it in stock?");
}

describe("ContactSection", () => {
  it("shows the form, the quick contact and the opening hours", () => {
    render(<ContactSection />);
    expect(screen.getByRole("heading", { level: 1, name: "Talk to us" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Send a message" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "WhatsApp" })).toBeInTheDocument();
    expect(screen.getByText("Monday – Friday")).toBeInTheDocument();
  });

  it("asks for the missing fields when submitting an empty form", async () => {
    const onSubmit = vi.fn();
    render(<ContactSection onSubmit={onSubmit} />);
    await userEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Enter an email like name@example.com.")).toBeInTheDocument();
    expect(screen.getByText("Please agree so we can reply to you.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("validates the email when the field loses focus", async () => {
    render(<ContactSection />);
    await userEvent.type(screen.getByRole("textbox", { name: /Email/ }), "anna@example");
    await userEvent.tab();
    expect(screen.getByText("Enter an email like name@example.com.")).toBeInTheDocument();
  });

  it("submits a valid form and confirms it", async () => {
    const onSubmit = vi.fn();
    render(<ContactSection onSubmit={onSubmit} />);
    await fillForm();
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(screen.getByRole("button", { name: "Send message" }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: "Anna Lee", topic: "product", consent: true }));
    expect(screen.getByText("Message sent")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Send another message" }));
    expect(screen.getByRole("heading", { name: "Send a message" })).toBeInTheDocument();
  });
});

describe("contact validation", () => {
  it("returns no error for a complete form", () => {
    const values = { name: "Anna", phone: "", email: "a@b.co", topic: "general", message: "Hi", consent: true };
    expect(validateContact(values)).toEqual({});
  });
});

describe("ContactSection phone", () => {
  it("takes an optional phone number", async () => {
    render(<ContactSection />);
    const phone = screen.getByRole("textbox", { name: /Phone/ });
    await userEvent.type(phone, "+297 560 1234");
    expect(phone).toHaveValue("+297 560 1234");
  });
});
