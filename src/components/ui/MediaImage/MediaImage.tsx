import { cx } from "@/lib/shared/cx";

import styles from "./MediaImage.module.scss";
import { PRODUCT_SUBJECT } from "./MediaImage.constants";
import type { MediaImageProps } from "./MediaImage.types";
import { MediaPhoto } from "./parts/MediaPhoto";
import { MediaPlaceholder } from "./parts/MediaPlaceholder";

/**
 * Media/Image: 4:3 photo with LG radius. While there is no photo, an illustration with the subject icon.
 *
 * @param props Props of the component, see {@link MediaImageProps}.
 * @param props.src Real photo. Without it the subject illustration is shown (soft circles plus icon).
 * @param props.alt Photo description (required with `src`).
 * @param props.subject What the avatar or image represents (dog, cat, person…).
 * @param props.caption Caption over the illustration (placeholder only).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function MediaImage({ src, alt, subject, caption, className, ...rest }: MediaImageProps) {
  return (
    <div {...rest} className={cx(styles.image, subject === PRODUCT_SUBJECT && styles.product, className)}>
      {src ? <MediaPhoto src={src} alt={alt} /> : <MediaPlaceholder subject={subject} caption={caption} />}
    </div>
  );
}
