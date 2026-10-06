import type { LucideIcon } from "lucide-react";

import { Building, Cat, Dog, Pill, Stethoscope } from "@/components/ui/Icon";

import type { MediaImageSubject } from "./MediaImage.types";

/** Size in px of the placeholder illustration icon. */
export const MEDIA_IMAGE_ICON_SIZE = 72;

/** Placeholder illustration icon for each image subject. */
export const MEDIA_IMAGE_SUBJECT_ICONS: Record<MediaImageSubject, LucideIcon> = {
  dog: Dog,
  cat: Cat,
  team: Stethoscope,
  clinic: Building,
  product: Pill,
};

/** Subject whose illustration is drawn on a tinted background. */
export const PRODUCT_SUBJECT = "product";
