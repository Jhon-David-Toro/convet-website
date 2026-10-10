import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Clock, Paw } from "@/components/ui/Icon";
import { photoUrl } from "@/lib/photos";

import { SERVICE_PHOTO_ALT, SERVICE_PHOTO_NAME, SERVICE_PHOTO_SIZES } from "../ServiceDetail.constants";
import styles from "../ServiceDetail.module.scss";
import type { ServiceIntroProps } from "../ServiceDetail.types";

/**
 * Photo, title and lead of a service; the duration and species badges only show on mobile, where there is no booking card.
 *
 * @param props Props of the component, see {@link ServiceIntroProps}.
 * @param props.service Service to describe.
 * @returns The rendered element.
 */
export function ServiceIntro({ service }: ServiceIntroProps) {
  return (
    <>
      <div className={styles.photo}>
        <Image src={photoUrl(SERVICE_PHOTO_NAME)} alt={SERVICE_PHOTO_ALT} fill priority sizes={SERVICE_PHOTO_SIZES} className={styles.photoImage} />
      </div>
      <div className={styles.intro}>
        <h1 className={styles.title}>{service.title}</h1>
        <div className={styles.meta}>
          <Badge icon={Clock}>{service.duration}</Badge>
          <Badge icon={Paw}>{service.speciesLabel}</Badge>
        </div>
        <p className={styles.lead}>{service.lead}</p>
      </div>
    </>
  );
}
