import type { AvatarSubject } from "@/components/ui/Avatar";
import { parseDate } from "@/components/ui/MaskedInput";
import type { NewPetValues } from "@/components/sections/MyPets/MyPets.types";
import type { PetItem } from "@/lib/customer/customer.types";

import { SEX_TO_DTO, SPECIES_TO_DTO } from "./pets.contract";
import type { CreatePetDto, PetDto, UpdatePetDto } from "./pets.contract";

const MONTHS_PER_YEAR = 12;

const SPECIES_SUBJECTS: Record<string, AvatarSubject> = { dog: "dog", cat: "cat", bird: "bird" };

const SEX_LABELS: Record<string, string> = { female: "Female", male: "Male", unknown: "Sex unknown" };

/**
 * Capitalizes the first letter of a word that the backend sends in any casing.
 *
 * @param word Word to format, e.g. `DOG`.
 * @returns The word as a label, e.g. `Dog`.
 */
function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Age as text, e.g. "4 yrs 3 mos".
 *
 * @param birthDate Date of birth in ISO format.
 * @param today Day the age is counted until.
 * @returns The age, or `undefined` when the date is missing, invalid or in the future.
 */
export function ageLabel(birthDate: string | undefined, today: Date): string | undefined {
  const born = birthDate ? new Date(birthDate) : undefined;
  if (!born || Number.isNaN(born.getTime()) || born > today) return undefined;
  const months = (today.getFullYear() - born.getFullYear()) * MONTHS_PER_YEAR + today.getMonth() - born.getMonth() - (today.getDate() < born.getDate() ? 1 : 0);
  return `${Math.floor(months / MONTHS_PER_YEAR)} yrs ${months % MONTHS_PER_YEAR} mos`;
}

/**
 * Turns a pet from the backend into the pet the UI shows. Vaccine status is left out: it comes from the medical records.
 *
 * @param pet Pet as the backend sends it.
 * @param today Day used to work out the age.
 * @returns The pet for the cards and the profile.
 */
export function toPetItem(pet: PetDto, today: Date = new Date()): PetItem {
  const species = titleCase(pet.species);
  const age = ageLabel(pet.dateOfBirth, today);
  const sex = pet.sex ? SEX_LABELS[pet.sex.toLowerCase()] : undefined;
  const summary = [species, pet.breed, pet.color, age].filter(Boolean).join(" · ");

  return {
    id: pet.idPet,
    name: pet.name,
    subject: SPECIES_SUBJECTS[pet.species.toLowerCase()] ?? "dog",
    summary,
    profileLine: [summary, sex].filter(Boolean).join(" · "),
    microchip: "—",
    weight: "—",
    weightDate: "",
    vet: "",
    form: toPetFormValues(pet),
  };
}

/**
 * Converts the "MM / DD / YYYY" date of the form to ISO `YYYY-MM-DD`.
 *
 * @param birthDate Date typed in the form.
 * @returns The ISO date, or `undefined` when the field is empty or incomplete.
 */
export function isoFromFormDate(birthDate: string): string | undefined {
  const date = parseDate(birthDate);
  if (!date) return undefined;
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Builds the body of `POST /pets` from the form, leaving out the fields the customer did not fill in.
 *
 * @param values Values of the "Add a pet" form.
 * @returns The DTO to send.
 */
export function toCreatePetDto(values: NewPetValues): CreatePetDto {
  const dto: CreatePetDto = {
    name: values.name.trim(),
    species: SPECIES_TO_DTO[values.species] ?? "OTHER",
    sex: SEX_TO_DTO[values.sex] ?? "UNKNOWN",
  };
  if (values.breed.trim()) dto.breed = values.breed.trim();
  if (values.color.trim()) dto.color = values.color.trim();
  const dateOfBirth = isoFromFormDate(values.birthDate);
  if (dateOfBirth) dto.dateOfBirth = dateOfBirth;
  return dto;
}

/**
 * Converts an ISO date to the "MM / DD / YYYY" format of the date field, reading only the calendar day.
 *
 * @param iso Date in ISO format, e.g. `2022-06-15T00:00:00.000Z`.
 * @returns The date for the form, or an empty string when it is missing or invalid.
 */
export function formDateFromIso(iso: string | undefined): string {
  const match = iso ? /^(\d{4})-(\d{2})-(\d{2})/.exec(iso) : null;
  return match ? `${match[2]} / ${match[3]} / ${match[1]}` : "";
}

/**
 * Values of the edit form for a pet from the backend.
 *
 * @param pet Pet as the backend sends it.
 * @returns The values of the form.
 */
export function toPetFormValues(pet: PetDto): NewPetValues {
  return {
    name: pet.name,
    species: pet.species.toLowerCase(),
    breed: pet.breed ?? "",
    color: pet.color ?? "",
    sex: (pet.sex?.toLowerCase() ?? "unknown") as NewPetValues["sex"],
    birthDate: formDateFromIso(pet.dateOfBirth),
  };
}

/**
 * Body of `PATCH /pets/:id` from the edit form. Every field is sent so the backend stores what the customer sees:
 * an emptied breed or color is sent as `""` and an emptied date of birth as `null`, which clears them.
 *
 * @param values Values of the edit form.
 * @returns The DTO to send.
 */
export function toUpdatePetDto(values: NewPetValues): UpdatePetDto {
  const { dateOfBirth, breed, color, ...rest } = toCreatePetDto(values);
  return { ...rest, breed: breed ?? "", color: color ?? "", dateOfBirth: dateOfBirth ?? null };
}
