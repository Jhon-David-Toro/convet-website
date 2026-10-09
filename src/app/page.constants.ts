import { BOOKING_HREF, EMERGENCY_PHONE, EMERGENCY_PHONE_HREF, WHATSAPP_HREF, WHATSAPP_PHONE } from "@/lib/site.constants";

import type { HomeFooterContent, HomeHeaderContent } from "./page.types";

/** Navigation, booking, sign in and WhatsApp links of the header. */
export const HOME_HEADER: HomeHeaderContent = {
  links: [
    { label: "Home", href: "/", active: true },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  bookHref: BOOKING_HREF,
  signInHref: "/sign-in",
  whatsappHref: WHATSAPP_HREF,
};

/** Brand text, link columns and legal line of the footer. */
export const HOME_FOOTER: HomeFooterContent = {
  about: "Care and advanced medicine for many species of animals. Small animals · Large animals · Exotics.",
  motto: { text: "Same heart. Same care.", highlight: "Always animals first." },
  columns: [
    {
      heading: "Clinic",
      items: [
        { label: "Services", href: "/services" },
        { label: "Products", href: "/products" },
        { label: "Book a visit", href: BOOKING_HREF },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Visit us",
      items: [
        { label: "Aruba · address to confirm" },
        { label: "Mon–Fri 8:00 AM – 6:00 PM" },
        { label: "Sat 9:00 AM – 1:00 PM" },
        { label: "Sun closed" },
      ],
    },
    {
      heading: "Contact",
      items: [
        { label: `24/7 Emergency: ${EMERGENCY_PHONE}`, href: EMERGENCY_PHONE_HREF, highlight: true },
        { label: `WhatsApp ${WHATSAPP_PHONE}`, href: WHATSAPP_HREF },
        { label: "Instagram @convetaruba", href: "https://instagram.com/convetaruba" },
      ],
    },
  ],
  copyright: "© 2026 Contreras Veterinary Services N.V. · Aruba",
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};
