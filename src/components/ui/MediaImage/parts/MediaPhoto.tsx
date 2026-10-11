import Image from "next/image";

import type { MediaPhotoProps } from "../MediaImage.types";
import styles from "../MediaImage.module.scss";

/**
 * The real photo, filling its 4:3 frame.
 *
 * @param props Props of the component, see {@link MediaPhotoProps}.
 * @param props.src Real photo. Without it the subject illustration is shown (soft circles plus icon).
 * @param props.alt Photo description (required with `src`).
 * @returns The rendered element.
 */
export function MediaPhoto({ src, alt = "" }: MediaPhotoProps) {
  return <Image src={src ?? ""} alt={alt} fill sizes="(min-width: 48rem) 20rem, 100vw" className={styles.photo} />;
}
