import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export type ServiceCardProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  icon: LucideIcon;
  title: string;
  description: string;
  duration?: string;
  species?: string;
  detailsHref: string;
  bookHref: string;
  detailsLabel?: string;
  bookLabel?: string;
};

export type ServiceMetaProps = Pick<ServiceCardProps, "duration" | "species">;

export type ServiceActionsProps = Pick<ServiceCardProps, "detailsHref" | "bookHref" | "detailsLabel" | "bookLabel">;
