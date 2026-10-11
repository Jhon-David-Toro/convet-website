import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { MobileActionBar } from "@/components/ui/MobileActionBar";
import { serviceActionHref } from "@/lib/catalog/services.utils";
import { whatsappLink } from "@/lib/site/whatsapp";

import { MOBILE_CHAT_LABEL } from "../ServiceDetail.constants";
import type { ServiceMobileBarProps } from "../ServiceDetail.types";
import styles from "../ServiceDetail.module.scss";

/**
 * Fixed bar of the mobile site on a service page: WhatsApp and the main action of the service.
 *
 * @param props Props of the component, see {@link ServiceMobileBarProps}.
 * @param props.service Service to book.
 * @returns The rendered element.
 */
export function ServiceMobileBar({ service }: ServiceMobileBarProps) {
  return (
    <MobileActionBar fixed className={styles.mobileBar}>
      <IconButton variant="outline" icon={WhatsApp} label={MOBILE_CHAT_LABEL} href={whatsappLink(service.whatsappText)} className={styles.chat} />
      <Button variant="accent" href={serviceActionHref(service)}>
        {service.bookLabel}
      </Button>
    </MobileActionBar>
  );
}
