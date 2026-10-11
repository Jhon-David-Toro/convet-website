import { SIGN_IN_HREF } from "@/lib/auth/auth.constants";
import { BOOKING_HREF, CLINIC_ADDRESS, EMERGENCY_PHONE, EMERGENCY_PHONE_HREF, WHATSAPP_HREF, WHATSAPP_PHONE } from "@/lib/site/site.constants";

import type { SiteFooterContent, SiteHeaderContent } from "./SiteShell.types";

export const HOME_PATH = "/";

export const SITE_HEADER: SiteHeaderContent = {
  links: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  bookHref: BOOKING_HREF,
  signInHref: SIGN_IN_HREF,
  whatsappHref: WHATSAPP_HREF,
};

export const SITE_FOOTER: SiteFooterContent = {
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
        { label: CLINIC_ADDRESS },
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
