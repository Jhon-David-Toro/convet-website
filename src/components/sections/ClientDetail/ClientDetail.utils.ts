import { Calendar, Mail, Phone } from "@/components/ui/Icon";
import type { StaffClient } from "@/lib/staff.types";

import type { ContactLine } from "./ClientDetail.types";

/**
 * Phone, email and client-since date of a client as list items.
 *
 * @param client Client of the page.
 * @returns The icon and text of each line.
 */
export function contactLines(client: StaffClient): ContactLine[] {
  return [
    { icon: Phone, text: client.phone },
    { icon: Mail, text: client.email },
    { icon: Calendar, text: client.since },
  ];
}
