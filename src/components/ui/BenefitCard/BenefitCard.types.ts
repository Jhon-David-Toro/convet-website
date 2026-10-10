import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export type BenefitCardProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};
