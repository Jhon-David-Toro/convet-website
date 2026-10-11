import { Alert } from "@/components/ui/Alert";
import { WHATSAPP_HREF } from "@/lib/site.constants";

import { CHANGE_ACTION, CHANGE_TEXT, CHANGE_TITLE } from "../CustomerAppointments.constants";

/**
 * Info alert for changes within 24 hours, which the clinic handles on WhatsApp.
 *
 * @returns The rendered element.
 */
export function ChangeAlert() {
  return (
    <Alert tone="info" title={CHANGE_TITLE} action={{ label: CHANGE_ACTION, href: WHATSAPP_HREF }}>
      {CHANGE_TEXT}
    </Alert>
  );
}
