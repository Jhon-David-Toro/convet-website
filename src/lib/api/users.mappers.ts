import type { SignUpValues } from "@/components/sections/SignUpForm/SignUpForm.types";
import type { CustomerProfile } from "@/lib/customer/customer.types";

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
