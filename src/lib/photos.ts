import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_FOLDER } from "./photos.constants";

/**
 * URL of a photo by name (e.g. "dr-shirley"). With `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` it comes from Cloudinary
 * (`[<folder>/]<name>`); without it, from `public/photos/<name>.jpg`.
 *
 * @param name Photo file name without extension.
 * @param transform Optional Cloudinary transformation (e.g. `w_256,r_max`); ignored without Cloudinary.
 * @returns The URL of the photo.
 */
export function photoUrl(name: string, transform?: string): string {
  if (!CLOUDINARY_CLOUD_NAME) return `/photos/${name}.jpg`;
  const folder = CLOUDINARY_FOLDER ? `${CLOUDINARY_FOLDER}/` : "";
  const step = transform ? `${transform}/` : "";
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${step}${folder}${name}`;
}
