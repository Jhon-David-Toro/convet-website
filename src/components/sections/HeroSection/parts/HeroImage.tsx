import Image from "next/image";

import { photoUrl } from "@/lib/photos";

import styles from "../HeroSection.module.scss";
import { HERO_IMAGE_ALT, HERO_IMAGE_NAME, HERO_IMAGE_SIZES } from "../HeroSection.constants";

/**
 * Hero photo inside the gold frame of the brand.
 *
 * @returns The rendered element.
 */
export function HeroImage() {
  return (
    <div className={styles.frame}>
      <Image src={photoUrl(HERO_IMAGE_NAME)} alt={HERO_IMAGE_ALT} fill priority sizes={HERO_IMAGE_SIZES} className={styles.photo} />
    </div>
  );
}
