import { Calendar, Clipboard, Home, Paw, Settings, User } from "@/components/ui/Icon";
import {
  CUSTOMER_APPOINTMENTS_HREF,
  CUSTOMER_HOME_HREF,
  CUSTOMER_PETS_HREF,
  CUSTOMER_PROFILE_HREF,
  CUSTOMER_RECORDS_HREF,
  CUSTOMER_SETTINGS_HREF,
} from "@/lib/customer/customer.paths.constants";

import type { CustomerNavItem } from "./CustomerShell.types";

export const MAIN_NAV: CustomerNavItem[] = [
  { icon: Home, label: "Overview", href: CUSTOMER_HOME_HREF },
  { icon: Paw, label: "My pets", href: CUSTOMER_PETS_HREF },
  { icon: Calendar, label: "Appointments", href: CUSTOMER_APPOINTMENTS_HREF },
  { icon: Clipboard, label: "Health records", href: CUSTOMER_RECORDS_HREF },
];

export const ACCOUNT_NAV: CustomerNavItem[] = [
  { icon: User, label: "Profile", href: CUSTOMER_PROFILE_HREF },
  { icon: Settings, label: "Settings", href: CUSTOMER_SETTINGS_HREF },
];

export const TAB_BAR_NAV: CustomerNavItem[] = [
  { icon: Home, label: "Home", href: CUSTOMER_HOME_HREF },
  { icon: Paw, label: "Pets", href: CUSTOMER_PETS_HREF },
  { icon: Calendar, label: "Visits", href: CUSTOMER_APPOINTMENTS_HREF },
  { icon: User, label: "Profile", href: CUSTOMER_PROFILE_HREF },
];

export const TOP_BAR_TITLES: Record<string, string> = {
  [CUSTOMER_HOME_HREF]: "Hi, Anna",
  [CUSTOMER_PETS_HREF]: "My pets",
  [CUSTOMER_APPOINTMENTS_HREF]: "Appointments",
  [CUSTOMER_PROFILE_HREF]: "Profile",
  [CUSTOMER_RECORDS_HREF]: "Health records",
  [CUSTOMER_SETTINGS_HREF]: "Settings",
};

export const FALLBACK_TITLE = "CONVET";

export const GREETING = "Good morning, Anna";

export const NOTIFICATIONS_LABEL = "Notifications";

export const BOOK_LABEL = "Book a visit";

export const BACK_LABEL = "Back";

export const SIGN_OUT_HREF = "/sign-in";

export const HOME_LABEL = "CONVET home";
