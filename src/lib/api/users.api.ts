import "server-only";

import { cache } from "react";

import type { SignUpValues } from "@/components/sections/SignUpForm/SignUpForm.types";
import type { CustomerProfile } from "@/lib/customer/customer.types";

import { apiRequest } from "./api.client";
import { USER_ENDPOINTS, userSchema } from "./users.contract";
import type { ChangePasswordDto, UpdateProfileDto } from "./users.contract";
import { toCreateUserDto, toCustomerProfile } from "./users.mappers";

/**
 * Creates a customer account. The endpoint is public, so no token is sent.
 *
 * @param values Values of the sign-up form.
 * @throws {ApiError} `conflict` when the email is taken, `validation` when the backend rejects the data.
 */
export async function createUser(values: SignUpValues): Promise<void> {
  await apiRequest(USER_ENDPOINTS.create, { method: "POST", body: toCreateUserDto(values), auth: false });
}

/**
 * Profile of a user, once per request.
 *
 * @param idUser Id of the signed-in user.
 * @returns The profile for the settings page.
 * @throws {ApiError} When the backend fails.
 */
export const getProfile = cache(async (idUser: string): Promise<CustomerProfile> => toCustomerProfile(await apiRequest(USER_ENDPOINTS.detail(idUser), { schema: userSchema })));

/**
 * Updates name, phone or WhatsApp reminders.
 *
 * @param idUser Id of the signed-in user.
 * @param dto Fields to change.
 * @returns The updated profile.
 * @throws {ApiError} When the backend rejects the data or fails.
 */
export async function updateProfile(idUser: string, dto: UpdateProfileDto): Promise<CustomerProfile> {
  return toCustomerProfile(await apiRequest(USER_ENDPOINTS.detail(idUser), { method: "PATCH", body: dto, schema: userSchema }));
}

/**
 * Changes the email of the account.
 *
 * @param idUser Id of the signed-in user.
 * @param email New address.
 * @throws {ApiError} `conflict` when the address is taken.
 */
export async function updateEmail(idUser: string, email: string): Promise<void> {
  await apiRequest(USER_ENDPOINTS.email(idUser), { method: "PATCH", body: { email } });
}

/**
 * Changes the password. The backend signs the other sessions out.
 *
 * @param idUser Id of the signed-in user.
 * @param dto Current and new password.
 * @throws {ApiError} `validation` when the current password is wrong or the new one is weak.
 */
export async function changePassword(idUser: string, dto: ChangePasswordDto): Promise<void> {
  await apiRequest(USER_ENDPOINTS.password(idUser), { method: "PATCH", body: dto });
}
