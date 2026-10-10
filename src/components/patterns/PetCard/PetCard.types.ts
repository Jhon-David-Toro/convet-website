import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { AvatarSubject } from "@/components/ui/Avatar";
import type { BadgeTone } from "@/components/ui/Badge";

export type PetCardLayout = "card" | "row";

export type PetFact = {
  label: string;
  value: string;
  mono?: boolean;
};

export type PetCardProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  layout?: PetCardLayout;
  subject: AvatarSubject;
  name: string;
  description: string;
  alert?: string;
  facts?: PetFact[];
  vaccineStatus?: { tone: BadgeTone; label: string; icon?: LucideIcon };
  href: string;
  viewLabel?: string;
};

export type PetVaccineStatus = NonNullable<PetCardProps["vaccineStatus"]>;

export type PetCardLayoutProps = Omit<PetCardProps, "layout">;

export type PetVaccineBadgeProps = {
  status: PetVaccineStatus;
};

export type PetFactsProps = {
  facts: PetFact[];
};

export type PetRowNameProps = Pick<PetCardProps, "name" | "description" | "href">;

export type PetAlertProps = {
  text: string;
};

export type PetCardFooterProps = Pick<PetCardProps, "vaccineStatus" | "href" | "viewLabel">;

export type PetIdentityProps = Pick<PetCardProps, "subject" | "name" | "description">;
