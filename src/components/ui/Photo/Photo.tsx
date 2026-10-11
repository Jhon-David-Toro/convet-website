import Image from "next/image";

import { Icon, User } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { PHOTO_PLACEHOLDER_ICON_SIZE } from "./Photo.constants";
import type { PhotoProps } from "./Photo.types";
import styles from "./Photo.module.scss";

/**
 * Media/Photo: 4:5 portrait (team, patients) with LG radius. A placeholder is shown without a photo.
 *
 * @param props Props of the component, see {@link PhotoProps}.
 * @param props.src Image source URL.
 * @param props.alt Photo description (required with `src`).
 * @param props.ratio CSS aspect ratio (defaults to Media/Photo: 320×400).
 * @param props.className Extra class name for the root element.
 * @param props.style Inline style, used to position the floating panel.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Photo({ src, alt = "", ratio = "4 / 5", className, style, ...rest }: PhotoProps) {
  return (
    <div {...rest} className={cx(styles.photo, className)} style={{ aspectRatio: ratio, ...style }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 48rem) 20rem, 100vw" className={styles.image} />
      ) : (
        <Icon icon={User} size={PHOTO_PLACEHOLDER_ICON_SIZE} tone="brand" />
      )}
    </div>
  );
}
