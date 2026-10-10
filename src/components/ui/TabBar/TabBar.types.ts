import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps, ComponentPropsWithRef } from "react";

export type TabBarProps = ComponentPropsWithRef<"nav">;

export type TabBarItemProps = Omit<ComponentProps<typeof Link>, "children"> & {
  icon: LucideIcon;
  label: string;
  active?: boolean;
};
