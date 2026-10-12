import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ClientModal } from "./ClientModal";
import { clientName, errorTitle, validateClient } from "./ClientModal.utils";

describe("ClientModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("renders nothing while it is closed", () => {
    render(<ClientModal open={false} mode="new" onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("explains every field that needs fixing and keeps what was typed", async () => {
    render(<ClientModal open mode="new" onClose={() => {}} />);
    await userEvent.type(screen.getByLabelText("First name"), "Carlos");
    await userEvent.type(screen.getByLabelText("Email"), "carlos@");
    await userEvent.click(screen.getByRole("button", { name: "Create client" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix 3 fields to create the client");
    expect(screen.getByText("Enter the last name.")).toBeInTheDocument();
    expect(screen.getByText("Enter an email like name@example.com.")).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toHaveValue("Carlos");
  });

  it("creates a valid client and confirms it with the invitation", async () => {
    render(<ClientModal open mode="new" onClose={() => {}} />);
    await userEvent.type(screen.getByLabelText("First name"), "Carlos");
    await userEvent.type(screen.getByLabelText("Last name"), "Croes");
    await userEvent.type(screen.getByLabelText("Email"), "carlos.croes@example.com");
    await userEvent.clear(screen.getByLabelText("Mobile (WhatsApp)"));
    await userEvent.type(screen.getByLabelText("Mobile (WhatsApp)"), "+297 593 2211");
    await userEvent.click(screen.getByRole("button", { name: "Create client" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(screen.getByRole("dialog", { name: "Client created" })).toBeInTheDocument();
    expect(screen.getByText("Carlos Croes was added to Main clinic.")).toBeInTheDocument();
    expect(screen.getByText(/carlos.croes@example.com will receive a link/)).toBeInTheDocument();
  });

  it("edits a client without the invitation option", () => {
    render(
      <ClientModal
        open
        mode="edit"
        onClose={() => {}}
        initial={{ firstName: "Anna", lastName: "Lee", email: "anna@example.com", phone: "+297 560 1234", address: "", invite: false }}
        clientLabel="Anna Lee"
      />,
    );
    expect(screen.getByRole("dialog", { name: "Edit client" })).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toHaveValue("Anna");
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
  });

  it("confirms an edit as updated, not created", async () => {
    render(
      <ClientModal
        open
        mode="edit"
        onClose={() => {}}
        initial={{ firstName: "Anna", lastName: "Lee", email: "anna@example.com", phone: "+297 560 1234", address: "", invite: false }}
        clientLabel="Anna Lee"
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save changes" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(screen.getByRole("dialog", { name: "Client updated" })).toBeInTheDocument();
    expect(screen.getByText("Anna Lee was updated.")).toBeInTheDocument();
  });
});

describe("client utils", () => {
  it("validates, names and titles", () => {
    const values = { firstName: "A", lastName: "B", email: "a@b.co", phone: "+297 593 2211", address: "", invite: true };
    expect(validateClient(values)).toEqual({});
    expect(Object.keys(validateClient({ ...values, phone: "593 22", email: "x" }))).toEqual(["email", "phone"]);
    expect(clientName(values)).toBe("A B");
    expect(errorTitle(1, "edit")).toBe("Fix 1 field to save the client");
  });
});
