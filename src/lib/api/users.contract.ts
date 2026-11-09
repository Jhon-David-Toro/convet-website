import { z } from "zod";

/** User as `GET /users/:idUser` and `PATCH /users/:idUser` send it (`passwordHash` is never included). */
export const userSchema = z.object({
  idUser: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  mobileNumber: z.string(),
  role: z.enum(["CUSTOMER", "STAFF", "ADMIN"]),
  whatsappReminders: z.boolean().optional(),
});

export type UserDto = z.infer<typeof userSchema>;

/** Body of `POST /users` (`CreateUserDto`). */
export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  acceptedTermsAndPrivacyPolicy: true;
  whatsappReminders?: boolean;
};

/** Body of `PATCH /users/:idUser` (`UpdateProfileDto`): at least one field. */
export type UpdateProfileDto = Partial<Pick<CreateUserDto, "firstName" | "lastName" | "mobileNumber" | "whatsappReminders">>;

/** Body of `PATCH /users/:idUser/password` (`ChangePasswordDto`). */
export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};

export const USER_ENDPOINTS = {
  create: "/users",
  detail: (idUser: string) => `/users/${encodeURIComponent(idUser)}`,
  email: (idUser: string) => `/users/${encodeURIComponent(idUser)}/email`,
  password: (idUser: string) => `/users/${encodeURIComponent(idUser)}/password`,
} as const;
