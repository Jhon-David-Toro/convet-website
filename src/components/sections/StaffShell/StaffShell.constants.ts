import { Box, Building, Calendar, Clipboard, Home, List, Paw, Settings, Stethoscope, Tag, Truck, Users } from "@/components/ui/Icon";
import { ADMIN_HOME_HREF, ADMIN_NAV_HREFS } from "@/lib/admin/admin.paths.constants";
import { STAFF_BRANCH, STAFF_USER } from "@/lib/staff/staff.constants";
import {
  STAFF_CLIENTS_HREF,
  STAFF_HOME_HREF,
  STAFF_INVENTORY_HREF,
  STAFF_PATIENTS_HREF,
  STAFF_SCHEDULE_HREF,
  STAFF_VISITS_HREF,
} from "@/lib/staff/staff.paths.constants";

import type { ShellConfig, ShellVariant } from "./StaffShell.types";

const ADMIN_USER = { name: "Maria Kock", role: "Administrator" };

const LOW_STOCK_COUNT = 2;

export const SHELL_CONFIGS: Record<ShellVariant, ShellConfig> = {
  staff: {
    homeHref: STAFF_HOME_HREF,
    branch: STAFF_BRANCH,
    user: STAFF_USER,
    nav: [
      {
        heading: "Clinic",
        items: [
          { icon: Home, label: "Today", href: STAFF_HOME_HREF, base: STAFF_HOME_HREF },
          { icon: Calendar, label: "Schedule", href: STAFF_SCHEDULE_HREF, base: STAFF_SCHEDULE_HREF },
          { icon: Paw, label: "Patients", href: STAFF_PATIENTS_HREF, base: STAFF_PATIENTS_HREF },
          { icon: Users, label: "Clients", href: `${STAFF_CLIENTS_HREF}/anna-lee`, base: STAFF_CLIENTS_HREF },
        ],
      },
      {
        heading: "Records",
        items: [
          { icon: Clipboard, label: "Visits", href: `${STAFF_VISITS_HREF}/luna-today`, base: STAFF_VISITS_HREF },
          { icon: Box, label: "Inventory", href: STAFF_INVENTORY_HREF, base: STAFF_INVENTORY_HREF },
        ],
      },
    ],
    exactTitles: {
      [STAFF_PATIENTS_HREF]: { title: "Patients", subtitle: "Main clinic · 214" },
    },
    titles: {
      [STAFF_HOME_HREF]: { title: "Today · Thu, Oct 1", subtitle: "Dr. Shirley · 5 appointments" },
      [STAFF_SCHEDULE_HREF]: { title: "Appointments", subtitle: "Main clinic · Thursday, October 1" },
      [STAFF_PATIENTS_HREF]: { title: "Patient record", backHref: STAFF_HOME_HREF },
      [STAFF_CLIENTS_HREF]: { title: "Client", backHref: STAFF_HOME_HREF },
      [STAFF_VISITS_HREF]: { title: "Today · Dr. Andreina", backHref: STAFF_HOME_HREF },
    },
  },
  admin: {
    homeHref: ADMIN_HOME_HREF,
    branch: STAFF_BRANCH,
    user: ADMIN_USER,
    nav: [
      {
        heading: "Operations",
        items: [
          { icon: Home, label: "Dashboard", href: ADMIN_HOME_HREF, base: ADMIN_HOME_HREF },
          { icon: Calendar, label: "Schedule", href: ADMIN_NAV_HREFS.schedule, base: ADMIN_NAV_HREFS.schedule },
          { icon: List, label: "Appointments", href: ADMIN_NAV_HREFS.appointments, base: ADMIN_NAV_HREFS.appointments },
          { icon: Users, label: "Clients & pets", href: ADMIN_NAV_HREFS.clients, base: ADMIN_NAV_HREFS.clients },
        ],
      },
      {
        heading: "Inventory",
        items: [
          { icon: Box, label: "Stock", href: ADMIN_NAV_HREFS.stock, base: ADMIN_NAV_HREFS.stock, count: LOW_STOCK_COUNT },
          { icon: Truck, label: "Suppliers", href: ADMIN_NAV_HREFS.suppliers, base: ADMIN_NAV_HREFS.suppliers },
        ],
      },
      {
        heading: "Setup",
        items: [
          { icon: Stethoscope, label: "Services", href: ADMIN_NAV_HREFS.services, base: ADMIN_NAV_HREFS.services },
          { icon: Tag, label: "Products", href: ADMIN_NAV_HREFS.products, base: ADMIN_NAV_HREFS.products },
          { icon: Users, label: "Team", href: ADMIN_NAV_HREFS.team, base: ADMIN_NAV_HREFS.team },
          { icon: Building, label: "Locations", href: ADMIN_NAV_HREFS.locations, base: ADMIN_NAV_HREFS.locations },
          { icon: Settings, label: "Settings", href: ADMIN_NAV_HREFS.settings, base: ADMIN_NAV_HREFS.settings },
        ],
      },
    ],
    titles: {
      [ADMIN_HOME_HREF]: { title: "Dashboard", subtitle: "Main clinic" },
      [ADMIN_NAV_HREFS.schedule]: { title: "Schedule" },
      [ADMIN_NAV_HREFS.appointments]: { title: "Appointments" },
      [ADMIN_NAV_HREFS.clients]: { title: "Clients & pets" },
      [ADMIN_NAV_HREFS.stock]: { title: "Stock · Main clinic" },
      [`${ADMIN_NAV_HREFS.stock}/products`]: { title: "Stock · Main clinic", backHref: ADMIN_NAV_HREFS.stock },
      [`${ADMIN_NAV_HREFS.stock}/receive`]: { title: "Receive stock", backHref: ADMIN_NAV_HREFS.stock },
      [ADMIN_NAV_HREFS.suppliers]: { title: "Suppliers" },
      [ADMIN_NAV_HREFS.services]: { title: "Services" },
      [ADMIN_NAV_HREFS.products]: { title: "Products" },
      [ADMIN_NAV_HREFS.team]: { title: "Team" },
      [ADMIN_NAV_HREFS.locations]: { title: "Locations" },
      [ADMIN_NAV_HREFS.settings]: { title: "Settings" },
    },
  },
};

export const FALLBACK_TITLE = "CONVET";

export const SEARCH_LABEL = "Search clients, pets, phone or microchip";

export const SEARCH_SHORTCUT = "Ctrl K";

export const NOTIFICATIONS_LABEL = "Notifications";

export const NEW_APPOINTMENT_LABEL = "New appointment";

export const MENU_LABEL = "Menu";

export const BACK_LABEL = "Back";

export const OPEN_SEARCH_LABEL = "Search";
