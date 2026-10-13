import type { RowMenuItem } from "@/components/patterns/RowMenu";
import { Clipboard, Stethoscope, Users } from "@/components/ui/Icon";

import { STAFF_CLIENTS_HREF, STAFF_PATIENTS_HREF, STAFF_VISITS_HREF } from "./staff.paths.constants";

export const STAFF_APPOINTMENT_MENU: RowMenuItem[] = [
  { label: "Open patient record", icon: Clipboard, href: `${STAFF_PATIENTS_HREF}/luna` },
  { label: "Start visit", icon: Stethoscope, href: `${STAFF_VISITS_HREF}/luna-today` },
  { label: "View client", icon: Users, href: `${STAFF_CLIENTS_HREF}/anna-lee` },
];
