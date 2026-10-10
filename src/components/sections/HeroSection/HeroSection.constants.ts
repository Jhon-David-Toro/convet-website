import { EMERGENCY_PHONE, EMERGENCY_PHONE_HREF } from "@/lib/site.constants";

export const HERO_BADGE_LABEL = "Small animals · Large animals · Exotics";

export const HERO_HEADLINE_LINES = ["Same heart.", "Same care."] as const;

export const HERO_ACCENT = "Always animals first.";

export const HERO_LEAD =
  "Veterinary clinic in Aruba for small animals, large animals and exotics. Medical, surgical and preventive care — with a 24/7 emergency line.";

export const HERO_LEAD_SHORT = "Vet clinic in Aruba — small animals, large animals and exotics. 24/7 emergencies.";

export const HERO_IMAGE_NAME = "vet-with-patients";

export const HERO_IMAGE_ALT = "A CONVET vet smiling at a golden retriever and a cat";

export const HERO_IMAGE_SIZES = "(min-width: 75rem) 35rem, 100vw";

export const HERO_BOOK_LABEL = "Book a visit";

export const HERO_WHATSAPP_LABEL = "Chat on WhatsApp";

export const HERO_EMERGENCY = {
  label: "24/7 Emergency · Call now",
  number: EMERGENCY_PHONE,
  note: "Day or night, a vet answers. Do not book online for emergencies.",
  href: EMERGENCY_PHONE_HREF,
  callLabel: `Call ${EMERGENCY_PHONE}`,
};
