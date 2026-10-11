import { Badge } from "@/components/ui/Badge";
import { CheckCircle, WhatsApp } from "@/components/ui/Icon";

import { ONLINE_ACCOUNT_LABEL, PREFERS_WHATSAPP_LABEL } from "../ClientDetail.constants";
import styles from "../ClientDetail.module.scss";

/**
 * Badges of the client: whether they have an online account and whether they prefer WhatsApp.
 *
 * @returns The rendered element.
 */
export function ClientBadges() {
  return (
    <div className={styles.badges}>
      <Badge tone="success" icon={CheckCircle}>
        {ONLINE_ACCOUNT_LABEL}
      </Badge>
      <Badge tone="neutral" icon={WhatsApp}>
        {PREFERS_WHATSAPP_LABEL}
      </Badge>
    </div>
  );
}
