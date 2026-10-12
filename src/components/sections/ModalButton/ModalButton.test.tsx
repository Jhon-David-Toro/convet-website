import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { ModalButton } from "./ModalButton";

describe("ModalButton", () => {
  it("opens the dialog it is made for and closes it again", async () => {
    render(
      <ToastProvider>
        <ModalButton modal="supplier">Add supplier</ModalButton>
      </ToastProvider>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Add supplier" }));
    expect(screen.getByRole("dialog", { name: "Add supplier" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
