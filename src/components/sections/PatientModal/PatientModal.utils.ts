import { parseDate } from "@/components/ui/MaskedInput";
import { requireText } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import {
  BIRTH_ERROR,
  COLOR_ERROR,
  FUTURE_ERROR,
  MICROCHIP_ERROR,
  MICROCHIP_PATTERN,
  NAME_ERROR,
  OWNER_ERROR,
  SEX_ERROR,
  SPECIES_ERROR,
  TODAY,
} from "./PatientModal.constants";
import type { PatientValues } from "./PatientModal.types";

/**
 * Message of the date of birth: it has to be a real date and cannot be in the future.
 *
 * @param birthDate Date typed by the user.
 * @returns The message, or `undefined` when the date is fine.
 */
function birthProblem(birthDate: string): string | undefined {
  const born = parseDate(birthDate);
  if (!born) return BIRTH_ERROR;
  return born > TODAY ? FUTURE_ERROR : undefined;
}

/**
 * Validates the patient form: the owner, the name, species, color, a date of birth that is not in the future, the sex and, when given, a 15-digit microchip.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the patient can be created.
 */
export function validatePatient(values: PatientValues): FormErrors<PatientValues> {
  const microchip = values.microchip.replace(/\s/g, "");
  const messages = {
    owner: requireText(values.owner, OWNER_ERROR),
    name: requireText(values.name, NAME_ERROR),
    species: requireText(values.species, SPECIES_ERROR),
    color: requireText(values.color, COLOR_ERROR),
    birthDate: birthProblem(values.birthDate),
    sex: requireText(values.sex, SEX_ERROR),
    microchip: !microchip || MICROCHIP_PATTERN.test(microchip) ? undefined : MICROCHIP_ERROR,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Age of an animal as the clinic writes it, counted from the date of the design.
 *
 * @param birthDate Date of birth typed by the user.
 * @returns For example "8 yrs 9 mos", or an empty text when the date is not valid or is in the future.
 */
export function ageText(birthDate: string): string {
  const born = parseDate(birthDate);
  if (!born || born > TODAY) return "";
  const months = (TODAY.getFullYear() - born.getFullYear()) * 12 + TODAY.getMonth() - born.getMonth() - (TODAY.getDate() < born.getDate() ? 1 : 0);
  return `${Math.floor(months / 12)} yrs ${months % 12} mos`;
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to create the patient".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to create the patient`;
}
