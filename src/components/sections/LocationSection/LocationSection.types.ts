import type { LucideIcon } from "lucide-react";

import type { IconTone } from "@/components/ui/Icon";

export type ContactLineItem = {
  id: string;
  icon: LucideIcon;
  iconTone?: IconTone;
  title: string;
  detail: string;
  detailShort?: string;
  hiddenOnMobile?: boolean;
};

export type ContactLineProps = {
  item: ContactLineItem;
};
