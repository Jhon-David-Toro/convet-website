import { z } from "zod";

/** Roles of `backend-convetaruba`. */
export const ROLES = ["CUSTOMER", "STAFF", "ADMIN"] as const;

/** Public data of the signed-in user, as `GET /auth/me` and `POST /auth/login` send it. */
export const authUserSchema = z.object({
  idUser: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(ROLES),
});

/** Answer of `POST /auth/login`. */
export const loginResponseSchema = z.object({
  accessToken: z.string().min(1),
  expiresIn: z.union([z.string(), z.number()]).optional(),
  user: authUserSchema,
});

/** Body the sign-in form posts to `/api/auth/login`. The email is lowercased, as sign-up stores it: the backend matches it exactly. */
export const loginRequestSchema = z.object({
  email: z.string().trim().toLowerCase().min(1),
  password: z.string().min(1),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export type LoginRequest = z.infer<typeof loginRequestSchema>;
