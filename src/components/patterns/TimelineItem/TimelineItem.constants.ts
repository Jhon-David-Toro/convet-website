import type { LucideIcon } from "lucide-react";

import { File, Pill, Stethoscope, Syringe } from "@/components/ui/Icon";

import type { TimelineType } from "./TimelineItem.types";

export const TIMELINE_ICON_SIZE = 18;

export const TIMELINE_ICONS: Record<TimelineType, LucideIcon> = { visit: Stethoscope, vaccine: Syringe, treatment: Pill, document: File };
