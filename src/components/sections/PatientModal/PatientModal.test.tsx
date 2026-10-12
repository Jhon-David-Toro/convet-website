import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { pickOption } from "@/test/pickOption";

import { PatientModal } from "./PatientModal";
import { ageText, validatePatient } from "./PatientModal.utils";

describe("PatientModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("explains what is missing", async () => {
    render(
      <ToastProvider>
        <PatientModal open onClose={() => {}} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix 5 fields to create the patient");
    expect(screen.getByText("Color is required to identify the patient.")).toBeInTheDocument();
  });

  it("does not accept a date of birth in the future", async () => {
    render(
      <ToastProvider>
        <PatientModal open onClose={() => {}} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("Date of birth"), "03012027");
    await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
    expect(screen.getByText("Date can’t be in the future.")).toBeInTheDocument();
  });

  it("creates a valid patient and shows its age", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <PatientModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("Pet name"), "Rocky");
    await pickOption("Species", "Dog");
    await userEvent.type(screen.getByLabelText("Color"), "Yellow");
    await userEvent.type(screen.getByLabelText("Date of birth"), "01032018");
    expect(screen.getByText(/age 8 yrs 9 mos/)).toBeInTheDocument();
    await pickOption("Sex", "Male, neutered");
    await userEvent.click(screen.getByRole("button", { name: "Create patient" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Patient created.")).toBeInTheDocument();
  });
});

describe("patient utils", () => {
  it("works out the age and checks the microchip", () => {
    expect(ageText("01 / 03 / 2018")).toBe("8 yrs 9 mos");
    expect(ageText("")).toBe("");
    expect(ageText("03 / 01 / 2027")).toBe("");
    const values = { owner: "A", name: "B", species: "dog", breed: "", color: "Yellow", birthDate: "01 / 03 / 2018", sex: "male", microchip: "12" };
    expect(Object.keys(validatePatient(values))).toEqual(["microchip"]);
    expect(validatePatient({ ...values, microchip: "985 141 000 123 456" })).toEqual({});
  });
});
