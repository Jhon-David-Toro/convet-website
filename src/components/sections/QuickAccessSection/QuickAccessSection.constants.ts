import { MapPin, Paw, Pill, Stethoscope } from "@/components/ui/Icon";
import { CLINIC_LOCATION } from "@/lib/site.constants";

import type { QuickAccessItem } from "./QuickAccessSection.types";

/** Shortcuts of the home page, in display order. */
export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  { id: "services", href: "/services", icon: Stethoscope, title: "Services", description: "Consults, vaccines, surgery, dental" },
  { id: "products", href: "/products", icon: Pill, title: "Products", description: "Medications · Supplements · Vet products" },
  { id: "clinic", href: "#location", icon: MapPin, title: "Find the clinic", description: `${CLINIC_LOCATION.split(",").pop()?.trim()} · open in Google Maps`, hiddenOnMobile: true },
  { id: "pets", href: "/account/pets", icon: Paw, title: "My pets", description: "Vaccines, visits, treatments" },
];
