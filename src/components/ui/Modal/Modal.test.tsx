import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "@/components/ui/Icon";

import { Modal } from "./Modal";
import { ModalPanel } from "./ModalPanel";

describe("Modal", () => {
  it("renders nothing visible while closed", () => {
    render(
      <Modal open={false} onClose={() => {}} title="Add a pet">
        Body
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("opens as a dialog named by its title and described by its description", () => {
    render(
      <Modal open onClose={() => {}} title="Cancel Luna's appointment?" description="Cancelling is free until Oct 6.">
        <p>Body</p>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Cancel Luna's appointment?" });
    expect(dialog).toHaveAccessibleDescription("Cancelling is free until Oct 6.");
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("closes with the close button, with Escape and with a click on the backdrop", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Add a pet">
        Body
      </Modal>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    const dialog = screen.getByRole("dialog");
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(onClose).toHaveBeenCalledTimes(2);

    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it("does not close when the click is inside the panel", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Add a pet">
        <p>Body</p>
      </Modal>,
    );
    await userEvent.click(screen.getByText("Body"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("moves the initial focus to the element marked with data-autofocus", () => {
    render(
      <Modal open onClose={() => {}} title="Cancel the visit?" actions={<Button data-autofocus>Keep appointment</Button>}>
        Body
      </Modal>,
    );
    expect(screen.getByRole("button", { name: "Keep appointment" })).toHaveFocus();
  });

  it("shows the footer actions", async () => {
    const onSave = vi.fn();
    render(
      <Modal open onClose={() => {}} title="Add a pet" actions={<Button onClick={onSave}>Save pet</Button>}>
        Body
      </Modal>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save pet" }));
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});

describe("ModalPanel", () => {
  it("shows the tone icon hidden from assistive tech", () => {
    const { container } = render(<ModalPanel title="Cancel Luna's appointment?" icon={AlertTriangle} iconTone="error" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Cancel Luna's appointment?");
  });
});
