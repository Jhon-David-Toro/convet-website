import { Clock, MapPin, Phone, WhatsApp } from "@/components/ui/Icon";
import { CLINIC_ADDRESS, EMERGENCY_PHONE, WHATSAPP_PHONE } from "@/lib/site.constants";

import type { ContactLineItem } from "./LocationSection.types";

/** Eyebrow of the section header. */
export const LOCATION_EYEBROW = "Find us";

/** Title of the section. */
export const LOCATION_TITLE = "Visit the clinic";

/** Size in px of the icons of the contact lines. */
export const CONTACT_ICON_SIZE = 20;

/** Where and when to find the clinic, in display order. */
export const CONTACT_LINES: ContactLineItem[] = [
  { id: "address", icon: MapPin, iconTone: "brand", title: CLINIC_ADDRESS, detail: "Free parking" },
  { id: "hours", icon: Clock, iconTone: "brand", title: "Mon–Fri 8:00 AM – 6:00 PM", detail: "Sat 9:00 AM – 1:00 PM · Sun closed" },
  { id: "whatsapp", icon: WhatsApp, iconTone: "whatsapp", title: `WhatsApp ${WHATSAPP_PHONE}`, detail: "Questions, booking help and appointment updates", detailShort: "Booking help and updates" },
];

/** Emergency line: the soft red card on desktop, plain text on tablet; hidden on mobile. */
export const EMERGENCY_LINE: ContactLineItem = {
  id: "emergency",
  icon: Phone,
  iconTone: "error",
  title: `24/7 Emergency · ${EMERGENCY_PHONE}`,
  detail: "Call directly — do not book online for emergencies",
  detailShort: "Call directly",
  hiddenOnMobile: true,
};

/** Label of the directions button. */
export const DIRECTIONS_LABEL = "Get directions";

/** Label of the WhatsApp button. */
export const WHATSAPP_LABEL = "WhatsApp";
