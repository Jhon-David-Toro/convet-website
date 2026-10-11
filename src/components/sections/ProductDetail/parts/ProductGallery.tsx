"use client";

import { useState } from "react";

import { Icon, Pill } from "@/components/ui/Icon";
import { MediaImage } from "@/components/ui/MediaImage";
import { cx } from "@/lib/shared/cx";

import { GALLERY_CAPTIONS, THUMBNAIL_ICON_SIZE, THUMBNAILS_LABEL } from "../ProductDetail.constants";
import styles from "../ProductDetail.module.scss";
import type { ProductGalleryProps } from "../ProductDetail.types";

/**
 * Gallery: the selected image large and a row of thumbnails below. Shows illustrations until real photos exist.
 *
 * @param props Props of the component, see {@link ProductGalleryProps}.
 * @param props.name Name of the product, used in the accessible names of the thumbnails.
 * @returns The rendered element.
 */
export function ProductGallery({ name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.gallery}>
      <MediaImage subject="product" caption={GALLERY_CAPTIONS[active]} className={styles.mainImage} />
      <div role="group" aria-label={THUMBNAILS_LABEL} className={styles.thumbnails}>
        {GALLERY_CAPTIONS.map((caption, index) => (
          <button
            key={caption}
            type="button"
            aria-label={`${name}: ${caption}`}
            aria-pressed={index === active}
            className={cx(styles.thumbnail, index === active && styles.thumbnailActive)}
            onClick={() => setActive(index)}
          >
            <Icon icon={Pill} size={THUMBNAIL_ICON_SIZE} tone="brand" />
          </button>
        ))}
      </div>
    </div>
  );
}
