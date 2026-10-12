import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/Button";
import { useFormModal } from "@/lib/shared/useFormModal";

import { FormModal } from "./FormModal";

type Values = { name: string };

/**
 * Small form that needs a name, to try the dialog with.
 *
 * @param props Props of the harness.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function Harness({ onClose }: { onClose: () => void }) {
  const form = useFormModal<Values>({ initial: { name: "" }, validate: (values) => (values.name ? {} : { name: "Name is required" }) });

  return (
    <FormModal
      title="New thing"
      description="Describe it."
      status={form.status}
      errorTitle={`Fix ${form.errorCount} field to create it`}
      submitLabel="Create"
      savingLabel="Creating…"
      onClose={onClose}
      onSubmit={form.submit}
      done={{ title: "Thing created", actions: <Button onClick={onClose}>Done</Button> }}
    >
      <label>
        Name
        <input value={form.values.name} onChange={(event) => form.setValue("name", event.target.value)} />
      </label>
      {form.errors.name && <p>{form.errors.name}</p>}
    </FormModal>
  );
}

describe("FormModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("shows the title, the description and the buttons", () => {
    render(<Harness onClose={() => {}} />);
    expect(screen.getByRole("dialog", { name: "New thing" })).toBeInTheDocument();
    expect(screen.getByText("Describe it.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("explains an invalid form with a banner and keeps the form", async () => {
    render(<Harness onClose={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: "Create" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix 1 field to create it");
    expect(screen.getByText("Nothing was saved yet.")).toBeInTheDocument();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("saves a valid form and then shows the confirmation", async () => {
    render(<Harness onClose={() => {}} />);
    await userEvent.type(screen.getByLabelText("Name"), "Rocky");
    await userEvent.click(screen.getByRole("button", { name: "Create" }));
    expect(screen.getByRole("button", { name: /Creating/ })).toBeDisabled();
    act(() => void vi.advanceTimersByTime(900));
    expect(screen.getByRole("dialog", { name: "Thing created" })).toBeInTheDocument();
  });

  it("closes from the cancel button", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
