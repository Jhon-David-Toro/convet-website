import { Alert } from "@/components/ui/Alert";
import { ADMIN_NAV_HREFS } from "@/lib/admin/admin.paths.constants";

import { BOOKINGS_ACTION, BOOKINGS_TEXT, BOOKINGS_TITLE } from "../AdminDashboard.constants";

/**
 * Note about the bookings made online since yesterday, with a link to review them.
 *
 * @returns The rendered element.
 */
export function OnlineBookingsNote() {
  return (
    <Alert tone="info" title={BOOKINGS_TITLE} action={{ label: BOOKINGS_ACTION, href: ADMIN_NAV_HREFS.appointments }}>
      {BOOKINGS_TEXT}
    </Alert>
  );
}
