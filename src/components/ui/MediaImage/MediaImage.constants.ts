import type { LucideIcon } from "lucide-react";

import { Building, Cat, Dog, Pill, Stethoscope } from "@/components/ui/Icon";

import type { MediaImageSubject } from "./MediaImage.types";

export const MEDIA_IMAGE_ICON_SIZE = 72;

export const MEDIA_IMAGE_SUBJECT_ICONS: Record<MediaImageSubject, LucideIcon> = {
  dog: Dog,
  cat: Cat,
  team: Stethoscope,
  clinic: Building,
  product: Pill,
};

export const PRODUCT_SUBJECT = "product";
