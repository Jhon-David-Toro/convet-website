import { EMERGENCY_PHONE, EMERGENCY_PHONE_HREF } from "@/lib/site.constants";

/** Species the clinic treats, shown in the badge above the headline. */
export const HERO_BADGE_LABEL = "Small animals · Large animals · Exotics";

/** Lines of the headline, each on its own row. */
export const HERO_HEADLINE_LINES = ["Same heart.", "Same care."] as const;

/** Brand phrase drawn in script under the headline. */
export const HERO_ACCENT = "Always animals first.";

/** Short description of the clinic under the accent. */
export const HERO_LEAD =
  "Veterinary clinic in Aruba for small animals, large animals and exotics. Medical, surgical and preventive care — with a 24/7 emergency line.";

/** Shorter description shown on mobile. */
export const HERO_LEAD_SHORT = "Vet clinic in Aruba — small animals, large animals and exotics. 24/7 emergencies.";

/** Name of the hero photo (see `photoUrl`). */
export const HERO_IMAGE_NAME = "vet-with-patients";

/** Accessible description of the hero photo. */
export const HERO_IMAGE_ALT = "A CONVET vet smiling at a golden retriever and a cat";

/** `sizes` hint of the hero photo: full width below desktop, 35rem at desktop. */
export const HERO_IMAGE_SIZES = "(min-width: 75rem) 35rem, 100vw";

/** Label of the booking button. */
export const HERO_BOOK_LABEL = "Book a visit";

/** Label of the WhatsApp button. */
export const HERO_WHATSAPP_LABEL = "Chat on WhatsApp";

/** Content of the emergency card of the hero. */
export const HERO_EMERGENCY = {
  label: "24/7 Emergency · Call now",
  number: EMERGENCY_PHONE,
  note: "Day or night, a vet answers. Do not book online for emergencies.",
  href: EMERGENCY_PHONE_HREF,
  callLabel: `Call ${EMERGENCY_PHONE}`,
};
