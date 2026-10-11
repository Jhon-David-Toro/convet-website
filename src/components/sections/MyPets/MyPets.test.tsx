import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CUSTOMER_PETS } from "@/lib/customer.constants";
import { pickOption } from "@/test/pickOption";

import { MyPets } from "./MyPets";
import { ageFromBirthDate, describeFile, validateNewPet } from "./MyPets.utils";

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

describe("MyPets add pet form", () => {
  it("fills the form, saves the pet and closes the modal", async () => {
    render(<MyPets initialAddOpen />);
    await userEvent.type(screen.getByLabelText("Name"), "Bruno");
    await userEvent.type(screen.getByLabelText("Color"), "Brown");
    await pickOption("Species", "Dog");
    await userEvent.type(screen.getByLabelText(/Breed/), "Beagle");
    await userEvent.click(screen.getByRole("radio", { name: "Male" }));
    expect(screen.getByRole("radio", { name: "Male" })).toBeChecked();
    await userEvent.click(screen.getByRole("button", { name: "Save pet" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("describes the photo that was picked and lets the user remove it", async () => {
    const { baseElement } = render(<MyPets initialAddOpen />);
    const input = baseElement.querySelector<HTMLInputElement>("input[type=file]");
    const photo = new File(["x".repeat(2048)], "bruno.png", { type: "image/png" });
    await userEvent.upload(input as HTMLInputElement, photo);
    expect(await screen.findByText("bruno.png")).toBeInTheDocument();
    expect(screen.getByText("PNG · 2 KB")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Remove/ }));
    expect(screen.queryByText("bruno.png")).not.toBeInTheDocument();
  });

  it("counts a single pet in the singular", () => {
    render(<MyPets pets={CUSTOMER_PETS.slice(0, 1)} />);
    expect(screen.getByText("1 pet")).toBeInTheDocument();
  });
});

describe("my pets utils edge cases", () => {
  it("writes singular months and years", () => {
    expect(ageFromBirthDate("09 / 07 / 2025", TODAY)).toBe("1 year, 1 month");
  });

  it("asks for a valid date of birth", () => {
    const values = { name: "Nala", species: "cat", breed: "", color: "", sex: "female" as const, birthDate: "13 / 40 / 2022" };
    expect(validateNewPet(values, TODAY).birthDate).toBeDefined();
  });

  it("describes a small and a big file", () => {
    expect(describeFile(new File(["x"], "a.jpg", { type: "image/jpeg" }))).toBe("JPEG · 1 KB");
    expect(describeFile(new File([new Uint8Array(2 * 1024 * 1024)], "b.png", { type: "image/png" }))).toBe("PNG · 2.0 MB");
    expect(describeFile(new File(["x"], "c", { type: "" }))).toBe("FILE · 1 KB");
  });
});
