import { Alert } from "@/components/ui/Alert";
import { WHATSAPP_HREF } from "@/lib/site/site.constants";

import { INFO_ACTION, INFO_TEXT, INFO_TITLE } from "../PetProfile.constants";

/**
 * Info alert that explains what the history contains and where to ask for a copy of the full records.
 *
 * @returns The rendered element.
 */
export function HistoryInfo() {
  return (
    <Alert tone="info" title={INFO_TITLE} action={{ label: INFO_ACTION, href: WHATSAPP_HREF }}>
      {INFO_TEXT}
    </Alert>
  );
}
