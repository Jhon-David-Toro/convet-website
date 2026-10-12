import type { SettingsProfile } from "@/lib/customer/customer.types";

import { ADDRESS_ERROR, MIN_ADDRESS_LENGTH, PHONE_ERROR, PHONE_PATTERN } from "./CustomerSettings.constants";
import type { SettingsErrors } from "./CustomerSettings.types";

/**
 * Validates the profile form before it is saved: the mobile number needs the country code and an address, when given, needs street and district.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validateSettings(values: SettingsProfile): SettingsErrors {
  const errors: SettingsErrors = {};
  if (!PHONE_PATTERN.test(values.phone.trim())) errors.phone = PHONE_ERROR;
  const address = values.address.trim();
  if (address && address.length < MIN_ADDRESS_LENGTH) errors.address = ADDRESS_ERROR;
  return errors;
}

/**
 * Text of the banner that says how many fields need attention.
 *
 * @param count Number of invalid fields.
 * @returns For example "2 fields need your attention".
 */
export function attentionTitle(count: number): string {
  return `${count} ${count === 1 ? "field needs" : "fields need"} your attention`;
}

/**
 * Text of the status next to the save button when the form has errors.
 *
 * @param count Number of invalid fields.
 * @returns For example "Not saved — fix 2 fields".
 */
export function notSavedStatus(count: number): string {
  return `Not saved — fix ${count} ${count === 1 ? "field" : "fields"}`;
}
