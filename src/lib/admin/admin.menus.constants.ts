import type { RowMenuItem } from "@/components/patterns/RowMenu";
import { Box, Calendar, Clipboard, Eye, Truck, Users } from "@/components/ui/Icon";
import { STAFF_CLIENTS_HREF, STAFF_PATIENTS_HREF } from "@/lib/staff/staff.paths.constants";

import { ADMIN_NAV_HREFS, ADMIN_PRODUCT_HREF, ADMIN_RECEIVE_HREF } from "./admin.paths.constants";

export const APPOINTMENT_MENU: RowMenuItem[] = [
  { label: "Open patient record", icon: Clipboard, href: `${STAFF_PATIENTS_HREF}/luna` },
  { label: "View client", icon: Users, href: `${STAFF_CLIENTS_HREF}/anna-lee` },
  { label: "See in schedule", icon: Calendar, href: ADMIN_NAV_HREFS.schedule },
];

export const CLIENT_MENU: RowMenuItem[] = [
  { label: "View client", icon: Eye, href: `${STAFF_CLIENTS_HREF}/anna-lee` },
  { label: "Open patient record", icon: Clipboard, href: `${STAFF_PATIENTS_HREF}/luna` },
];

export const CATALOG_MENU: RowMenuItem[] = [
  { label: "View stock", icon: Box, href: ADMIN_NAV_HREFS.stock },
  { label: "Receive stock", icon: Truck, href: ADMIN_RECEIVE_HREF },
];

export const SUPPLIER_MENU: RowMenuItem[] = [
  { label: "Receive stock", icon: Truck, href: ADMIN_RECEIVE_HREF },
  { label: "View stock", icon: Box, href: ADMIN_NAV_HREFS.stock },
];

export const TEAM_MENU: RowMenuItem[] = [{ label: "View schedule", icon: Calendar, href: ADMIN_NAV_HREFS.schedule }];

export const LOT_MENU: RowMenuItem[] = [
  { label: "Receive stock", icon: Truck, href: ADMIN_RECEIVE_HREF },
  { label: "View stock", icon: Box, href: ADMIN_NAV_HREFS.stock },
];

/**
 * Menu of a stock row: its lots and a new delivery.
 *
 * @param productId Id of the product.
 * @returns The items of the menu.
 */
export function stockMenu(productId: string): RowMenuItem[] {
  return [
    { label: "View lots", icon: Eye, href: `${ADMIN_PRODUCT_HREF}/${productId}` },
    { label: "Receive stock", icon: Truck, href: ADMIN_RECEIVE_HREF },
  ];
}
