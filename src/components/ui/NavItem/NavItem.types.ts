import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps } from "react";

export type NavItemProps = Omit<ComponentProps<typeof Link>, "children"> & {
  icon?: LucideIcon;
  label: string;
  active?: boolean;
  count?: number | string;
};
