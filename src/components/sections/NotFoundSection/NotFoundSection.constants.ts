import { Calendar, MapPin, Pill, Stethoscope } from "@/components/ui/Icon";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import type { PopularPage } from "./NotFoundSection.types";

export const ERROR_BADGE = "Error 404 · Page not found";

export const TITLE = "This page wandered off";

export const MESSAGE = "The link may be old or mistyped. Nothing is wrong with your account or your pets’ records.";

export const HOME_LABEL = "Back to home";

export const BACK_LABEL = "Go back";

export const TEAM_NOTE = "Team member? Your dashboard is one click away after signing in.";

export const POPULAR_TITLE = "Popular pages";

export const POPULAR_PAGES: PopularPage[] = [
  { href: BOOKING_HREF, icon: Calendar, tone: "primary", title: "Book a visit", description: "Pick a vet, day and time" },
  { href: "/services", icon: Stethoscope, tone: "default", title: "Services", description: "Consults, vaccines, surgery" },
  { href: "/products", icon: Pill, tone: "default", title: "Products", description: "Medications · Supplements · Vet products" },
  { href: "/contact", icon: MapPin, tone: "default", title: "Contact & location", description: "Address, hours, WhatsApp" },
];

export const EMERGENCY_LABEL = "Emergency";
