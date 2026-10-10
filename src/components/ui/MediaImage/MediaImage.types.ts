import type { ComponentPropsWithRef } from "react";

export type MediaImageSubject = "dog" | "cat" | "team" | "clinic" | "product";

export type MediaImageProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  src?: string;
  alt?: string;
  subject: MediaImageSubject;
  caption?: string;
};

export type MediaPhotoProps = Pick<MediaImageProps, "src" | "alt">;

export type MediaPlaceholderProps = Pick<MediaImageProps, "subject" | "caption">;
