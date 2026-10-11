import { parseDate } from "@/components/ui/MaskedInput";
import { onlyErrors, requireText } from "@/lib/auth/validation.utils";

import { AGE_EMPTY, ERROR_MESSAGES, FILE_DESCRIPTION_DIGITS, KB, MONTHS_PER_YEAR } from "./MyPets.constants";
import type { NewPetErrors, NewPetValues } from "./MyPets.types";

/**
 * Age of a pet as text, e.g. "4 years, 3 months".
 *
 * @param birthDate Date of birth in the date input format, "MM / DD / YYYY".
 * @param today Day the age is counted until.
 * @returns The age, or a dash when the date is incomplete or in the future.
 */
export function ageFromBirthDate(birthDate: string, today: Date): string {
  const born = parseDate(birthDate);
  if (!born || born > today) return AGE_EMPTY;
  const months = (today.getFullYear() - born.getFullYear()) * MONTHS_PER_YEAR + today.getMonth() - born.getMonth() - (today.getDate() < born.getDate() ? 1 : 0);
  const years = Math.floor(months / MONTHS_PER_YEAR);
  const rest = months % MONTHS_PER_YEAR;
  return `${years} ${years === 1 ? "year" : "years"}, ${rest} ${rest === 1 ? "month" : "months"}`;
}

/**
 * Validates the new pet form before it is saved.
 *
 * @param values Values of the form.
 * @param today Day used to reject births in the future.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validateNewPet(values: NewPetValues, today: Date): NewPetErrors {
  const validBirth = !values.birthDate || ageFromBirthDate(values.birthDate, today) !== AGE_EMPTY;
  return onlyErrors({
    name: requireText(values.name, ERROR_MESSAGES.name),
    species: requireText(values.species, ERROR_MESSAGES.species),
    birthDate: validBirth ? undefined : ERROR_MESSAGES.birthDate,
  });
}

/**
 * Short description of a chosen file, e.g. "PDF · 2.4 MB".
 *
 * @param file File the customer picked.
 * @returns The type and size of the file.
 */
export function describeFile(file: File): string {
  const type = file.type.split("/")[1]?.toUpperCase() ?? "FILE";
  const size = file.size / KB / KB;
  return size >= 1 ? `${type} · ${size.toFixed(FILE_DESCRIPTION_DIGITS)} MB` : `${type} · ${Math.max(Math.round(file.size / KB), 1)} KB`;
}
