/** Cloudinary cloud name; when unset, photos are served from `public/photos`. */
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/** Cloudinary folder that holds the photos (optional). */
export const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER ?? "";
