import { Icon } from "@/components/ui/Icon";

import { MEDIA_IMAGE_ICON_SIZE, MEDIA_IMAGE_SUBJECT_ICONS } from "../MediaImage.constants";
import type { MediaPlaceholderProps } from "../MediaImage.types";
import styles from "../MediaImage.module.scss";

/**
 * Illustration of the subject: two soft circles, its icon and an optional caption.
 *
 * @param props Props of the component, see {@link MediaPlaceholderProps}.
 * @param props.subject What the avatar or image represents (dog, cat, person…).
 * @param props.caption Caption over the illustration (placeholder only).
 * @returns The rendered element.
 */
export function MediaPlaceholder({ subject, caption }: MediaPlaceholderProps) {
  return (
    <>
      <span className={styles.blob} aria-hidden="true" />
      <span className={styles.blobSmall} aria-hidden="true" />
      <Icon icon={MEDIA_IMAGE_SUBJECT_ICONS[subject]} size={MEDIA_IMAGE_ICON_SIZE} tone="brand" />
      {caption && <span className={styles.caption}>{caption}</span>}
    </>
  );
}
