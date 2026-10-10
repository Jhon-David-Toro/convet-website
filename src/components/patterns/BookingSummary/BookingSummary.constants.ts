import type { LucideIcon } from "lucide-react";

import { MapPin, Paw, Stethoscope, Syringe } from "@/components/ui/Icon";

export const BOOKING_SUMMARY_ICON_SIZE = 20;

export const SUMMARY_ROW_ICONS: ReadonlyArray<readonly ["service" | "pet" | "vet" | "location", LucideIcon]> = [
  ["service", Syringe],
  ["pet", Paw],
  ["vet", Stethoscope],
  ["location", MapPin],
];
