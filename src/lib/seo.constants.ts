import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://convet.aw";

export const SITE_NAME = "CONVET";

export const SITE_TITLE = "CONVET · Veterinary clinic in Aruba";

export const SITE_DESCRIPTION = "Contreras Veterinary Services N.V. in Savaneta, Aruba: consultations, vaccinations and treatments for dogs and cats. Always animals first.";

export const SHARE_IMAGE_NAME = "vet-with-patients";

export const SHARE_IMAGE_TRANSFORM = "w_1200,h_630,c_fill";

export const NO_INDEX: Metadata["robots"] = { index: false, follow: false };

export const PRIVATE_PATHS = ["/staff", "/admin", "/app", "/book", "/sign-in", "/sign-up", "/verify-email", "/forgot-password", "/two-step-verification"];

export const CLINIC_TELEPHONE = "+297 593 0404";

export const CLINIC_STREET = "Savaneta 40A";

export const CLINIC_LOCALITY = "Oranjestad";

export const CLINIC_COUNTRY = "AW";

export const CLINIC_OPENING_HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
  { days: ["Saturday"], opens: "09:00", closes: "13:00" },
];
