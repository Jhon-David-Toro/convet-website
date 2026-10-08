import type { LucideIcon } from "lucide-react";

import { MapPin, Paw, Stethoscope, Syringe } from "@/components/ui/Icon";

/** Size in px of the icon at the start of each summary row. */
export const BOOKING_SUMMARY_ICON_SIZE = 20;

/** Icon of each detail row, in display order. */
export const SUMMARY_ROW_ICONS: ReadonlyArray<readonly ["service" | "pet" | "vet" | "location", LucideIcon]> = [
  ["service", Syringe],
  ["pet", Paw],
  ["vet", Stethoscope],
  ["location", MapPin],
];
