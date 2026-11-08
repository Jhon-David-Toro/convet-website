import type { SignUpErrors, SignUpValues } from "@/components/sections/SignUpForm/SignUpForm.types";
import type { CustomerProfile } from "@/lib/customer/customer.types";

import type { FieldErrors } from "./api.types";
import type { CreateUserDto, UserDto } from "./users.contract";

/**
 * Builds the body of `POST /users` from the sign-up form. Only called after the terms were accepted.
 *
 * @param values Values of the sign-up form.
 * @returns The DTO to send.
 */
export function toCreateUserDto(values: SignUpValues): CreateUserDto {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    mobileNumber: values.phone.trim(),
    password: values.password,
    acceptedTermsAndPrivacyPolicy: true,
    whatsappReminders: values.whatsappReminders,
  };
}

/**
 * Turns a user of the backend into the profile the settings page shows.
 *
 * @param user User as the backend sends it.
 * @returns The profile; the address stays empty because the backend does not store one.
 */
export function toCustomerProfile(user: UserDto): CustomerProfile {
  return { firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.mobileNumber, address: "" };
}

const SIGN_UP_FIELDS: Record<string, keyof SignUpErrors> = {
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  mobileNumber: "phone",
  password: "password",
  acceptedTermsAndPrivacyPolicy: "acceptTerms",
  whatsappReminders: "whatsappReminders",
};

/**
 * Moves the validation errors of `POST /users` onto the fields of the sign-up form, with the form's own messages: the backend names
 * the DTO properties (`mobileNumber`, `acceptedTermsAndPrivacyPolicy`) and writes technical texts.
 *
 * @param fieldErrors Errors by DTO property, as the backend reported them.
 * @param messages Message of the form for each field.
 * @returns Errors by form field; properties the form does not have are left out.
 */
export function toSignUpErrors(fieldErrors: FieldErrors | undefined, messages: Required<SignUpErrors>): SignUpErrors {
  const errors: SignUpErrors = {};
  for (const property of Object.keys(fieldErrors ?? {})) {
    const field = SIGN_UP_FIELDS[property];
    if (field) errors[field] = messages[field];
  }
  return errors;
}
