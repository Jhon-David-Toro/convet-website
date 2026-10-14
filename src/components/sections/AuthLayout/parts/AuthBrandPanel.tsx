import Image from "next/image";
import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { PawPattern } from "@/components/ui/PawPattern";
import { photoUrl } from "@/lib/site/photos";

import { BRAND_PHOTO_ALT, BRAND_PHOTO_NAME, BRAND_PHOTO_SIZES, HOME_LABEL } from "../AuthLayout.constants";
import { AuthBrandMessage } from "./AuthBrandMessage";
import styles from "../AuthLayout.module.scss";

/**
 * Ivory panel at the left of the auth pages (desktop only): logo, the gold framed photo and the brand message.
 *
 * @returns The rendered element.
 */
export function AuthBrandPanel() {
  return (
    <aside className={styles.panel}>
      <PawPattern className={styles.pattern} />
      <Link href="/" aria-label={HOME_LABEL} className={styles.home}>
        <Logo />
      </Link>
      <div className={styles.frame}>
        <Image src={photoUrl(BRAND_PHOTO_NAME)} alt={BRAND_PHOTO_ALT} fill sizes={BRAND_PHOTO_SIZES} className={styles.photo} />
      </div>
      <AuthBrandMessage />
    </aside>
  );
}
