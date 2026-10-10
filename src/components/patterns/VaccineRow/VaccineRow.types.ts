import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { BadgeTone } from "@/components/ui/Badge";

export type VaccineStatus = "up-to-date" | "due-soon" | "overdue";

export type VaccineRowProps = Omit<ComponentPropsWithRef<"li">, "title"> & {
  status: VaccineStatus;
  vaccine: string;
  dates: string;
  lot?: string;
  statusLabel?: string;
};

export type VaccineStatusView = {
  tone: BadgeTone;
  icon: LucideIcon;
  label: string;
};
