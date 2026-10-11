import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MyPets } from "./MyPets";
import { ageFromBirthDate, validateNewPet } from "./MyPets.utils";

const TODAY = new Date(2026, 9, 7);

describe("MyPets", () => {
  it("shows the pet count and a card per pet", () => {
    render(<MyPets />);
    expect(screen.getByRole("heading", { level: 1, name: "My pets" })).toBeInTheDocument();
    expect(screen.getByText("2 pets")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /View profile/ })).toHaveLength(2);
  });

  it("shows an empty state with a button to add the first pet", async () => {
    render(<MyPets pets={[]} />);
    expect(screen.getByText("No pets yet")).toBeInTheDocument();
    await userEvent.click(screen.getAllByRole("button", { name: "Add a pet" })[1]);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("opens the modal from the header and asks for the required fields", async () => {
    render(<MyPets />);
    await userEvent.click(screen.getByRole("button", { name: "Add a pet" }));
    expect(await screen.findByRole("heading", { name: "Add a pet" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Save pet" }));
    expect(screen.getByText("Enter your pet's name.")).toBeInTheDocument();
    expect(screen.getByText("Choose a species.")).toBeInTheDocument();
  });

  it("opens the modal at the start when it is asked to", async () => {
    render(<MyPets initialAddOpen />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("works out the age while the date of birth is typed", async () => {
    render(<MyPets initialAddOpen />);
    await userEvent.type(screen.getByLabelText("Date of birth"), "06152022");
    expect(screen.getByText(/years?, \d+ months?/)).toBeInTheDocument();
  });
});

describe("my pets utils", () => {
  it("works out the age in years and months", () => {
    expect(ageFromBirthDate("06 / 15 / 2022", TODAY)).toBe("4 years, 3 months");
    expect(ageFromBirthDate("10 / 07 / 2025", TODAY)).toBe("1 year, 0 months");
    expect(ageFromBirthDate("", TODAY)).toBe("—");
    expect(ageFromBirthDate("01 / 01 / 2030", TODAY)).toBe("—");
  });

  it("validates the required fields", () => {
    const values = { name: "Nala", species: "cat", breed: "", color: "", sex: "female" as const, birthDate: "" };
    expect(validateNewPet(values, TODAY)).toEqual({});
    expect(validateNewPet({ ...values, name: "" }, TODAY)).toEqual({ name: "Enter your pet's name." });
  });
});
