import { Alert } from "@/components/ui/Alert";
import { WHATSAPP_HREF } from "@/lib/site.constants";

import { HELP_ACTION_LABEL, HELP_TEXT, HELP_TITLE } from "../ServiceList.constants";

/**
 * Info alert that sends visitors who cannot pick a service to a consultation or to WhatsApp.
 *
 * @returns The rendered element.
 */
export function ServiceHelp() {
  return (
    <Alert tone="info" title={HELP_TITLE} action={{ label: HELP_ACTION_LABEL, href: WHATSAPP_HREF }}>
      {HELP_TEXT}
    </Alert>
  );
}
