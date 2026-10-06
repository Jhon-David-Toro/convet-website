import type { ComponentPropsWithRef } from "react";

/** Media image subject: `dog`, `cat`, `team`, `clinic`, `product`. */
export type MediaImageSubject = "dog" | "cat" | "team" | "clinic" | "product";

/** Props of the `MediaImage` component. */
export type MediaImageProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** Real photo. Without it the subject illustration is shown (soft circles plus icon). */
  src?: string;
  /** Photo description (required with `src`). */
  alt?: string;
  /** What the avatar or image represents (dog, cat, person…). */
  subject: MediaImageSubject;
  /** Caption over the illustration (placeholder only). */
  caption?: string;
};

/** Props of the real photo. */
export type MediaPhotoProps = Pick<MediaImageProps, "src" | "alt">;

/** Props of the illustration shown while there is no photo. */
export type MediaPlaceholderProps = Pick<MediaImageProps, "subject" | "caption">;
