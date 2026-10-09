import type { LucideIcon } from "lucide-react";

import { File, Pill, Stethoscope, Syringe } from "@/components/ui/Icon";

import type { TimelineType } from "./TimelineItem.types";

/** Size in px of the entry type icon. */
export const TIMELINE_ICON_SIZE = 18;

/** Icon shown on the rail for each kind of clinical history entry. */
export const TIMELINE_ICONS: Record<TimelineType, LucideIcon> = { visit: Stethoscope, vaccine: Syringe, treatment: Pill, document: File };
