import { describe, expect, it } from "vitest";

import { collection } from "./api.contract";
import { petSchema } from "./pets.contract";
import { ageLabel, formDateFromIso, isoFromFormDate, toCreatePetDto, toPetFormValues, toPetItem, toUpdatePetDto } from "./pets.mappers";

const TODAY = new Date(2026, 9, 7);

describe("petSchema", () => {
  it("accepts nulls and strips fields it does not know", () => {
    const pet = petSchema.parse({ idPet: "p1", name: "Luna", species: "DOG", breed: null, extra: true });
    expect(pet).toMatchObject({ idPet: "p1", breed: undefined });
    expect(pet).not.toHaveProperty("extra");
  });

  it("rejects a pet without id", () => {
    expect(petSchema.safeParse({ name: "Luna", species: "DOG" }).success).toBe(false);
  });
});

describe("collection", () => {
  it("unwraps bare arrays and data/items envelopes", () => {
    const schema = collection(petSchema);
    const pet = { idPet: "p1", name: "Luna", species: "DOG" };
    expect(schema.parse([pet])).toHaveLength(1);
    expect(schema.parse({ data: [pet] })).toHaveLength(1);
    expect(schema.parse({ items: [pet] })).toHaveLength(1);
    expect(schema.safeParse({ pets: [pet] }).success).toBe(false);
  });
});

describe("toPetItem", () => {
  it("builds the labels the UI shows and leaves the vaccine status unknown", () => {
    const item = toPetItem(petSchema.parse({ idPet: "p1", name: "Luna", species: "DOG", breed: "Mixed", color: "Black", sex: "FEMALE", dateOfBirth: "2022-06-15T00:00:00.000Z" }), TODAY);
    expect(item).toMatchObject({ id: "p1", subject: "dog", summary: "Dog · Mixed · Black · 4 yrs 3 mos", profileLine: "Dog · Mixed · Black · 4 yrs 3 mos · Female", weight: "—", microchip: "—" });
    expect(item.vaccineStatus).toBeUndefined();
  });

  it("falls back to a generic avatar for species without one", () => {
    const item = toPetItem(petSchema.parse({ idPet: "p2", name: "Kiwi", species: "RABBIT" }), TODAY);
    expect(item.subject).toBe("dog");
    expect(item.summary).toBe("Rabbit");
  });

  it("rejects a species the backend does not know", () => {
    expect(petSchema.safeParse({ idPet: "p3", name: "Kiwi", species: "REPTILE" }).success).toBe(false);
  });
});

describe("ageLabel", () => {
  it("ignores missing, invalid and future dates", () => {
    expect(ageLabel(undefined, TODAY)).toBeUndefined();
    expect(ageLabel("nope", TODAY)).toBeUndefined();
    expect(ageLabel("2030-01-01", TODAY)).toBeUndefined();
  });
});

describe("create pet DTO", () => {
  it("converts the form date and sends only the whitelisted fields", () => {
    expect(isoFromFormDate("06 / 15 / 2022")).toBe("2022-06-15");
    expect(isoFromFormDate("")).toBeUndefined();
    const dto = toCreatePetDto({ name: " Bruno ", species: "dog", breed: "", color: "Brown", sex: "male", birthDate: "06 / 15 / 2022" });
    expect(dto).toEqual({ name: "Bruno", species: "DOG", sex: "MALE", color: "Brown", dateOfBirth: "2022-06-15" });
  });
});

describe("edit pet form", () => {
  it("reads the calendar day of the backend date and fills the form from the pet", () => {
    expect(formDateFromIso("2022-06-15T00:00:00.000Z")).toBe("06 / 15 / 2022");
    expect(formDateFromIso(undefined)).toBe("");
    expect(formDateFromIso("not a date")).toBe("");
    const values = toPetFormValues(petSchema.parse({ idPet: "p1", name: "Luna", species: "DOG", breed: "Mixed", sex: "FEMALE", dateOfBirth: "2022-06-15T00:00:00.000Z" }));
    expect(values).toEqual({ name: "Luna", species: "dog", breed: "Mixed", color: "", sex: "female", birthDate: "06 / 15 / 2022" });
  });

  it("sends every field and clears the ones the customer emptied", () => {
    const dto = toUpdatePetDto({ name: " Luna ", species: "dog", breed: "", color: "Black", sex: "unknown", birthDate: "" });
    expect(dto).toEqual({ name: "Luna", species: "DOG", sex: "UNKNOWN", breed: "", color: "Black", dateOfBirth: null });
  });

  it("sends the date of birth as ISO when it is filled in", () => {
    const dto = toUpdatePetDto({ name: "Luna", species: "cat", breed: "Siamese", color: "", sex: "male", birthDate: "06 / 15 / 2022" });
    expect(dto).toEqual({ name: "Luna", species: "CAT", sex: "MALE", breed: "Siamese", color: "", dateOfBirth: "2022-06-15" });
  });
});
