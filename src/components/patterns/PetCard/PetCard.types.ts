import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { AvatarSubject } from "@/components/ui/Avatar";
import type { BadgeTone } from "@/components/ui/Badge";

/** Pet card layout: `card`, `row`. */
export type PetCardLayout = "card" | "row";

/** A key fact of a pet (label and value), e.g. its microchip. */
export type PetFact = {
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Current value. */
  value: string;
  /** The microchip is shown in the data font (mono). */
  mono?: boolean;
};

/** Props of the `PetCard` component. */
export type PetCardProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  /** Layout of the card: `"card"` or `"row"`. */
  layout?: PetCardLayout;
  /** What the avatar or image represents (dog, cat, person…). */
  subject: AvatarSubject;
  /** Name to show. */
  name: string;
  /** Description line, e.g. "Dog · Mixed breed · 3 yrs". */
  description: string;
  /** Visible medical alert (allergies, medication). */
  alert?: string;
  /** Key facts (only in `card`). */
  facts?: PetFact[];
  /** Vaccination status shown as a badge. */
  vaccineStatus?: { tone: BadgeTone; label: string; icon?: LucideIcon };
  /** Link to the profile: in `row` the whole row is the link. */
  href: string;
  /** Label of the link to the profile. */
  viewLabel?: string;
};

/** Vaccination status shown as a badge. */
export type PetVaccineStatus = NonNullable<PetCardProps["vaccineStatus"]>;

/** Props of a pet card layout (`card` or `row`). */
export type PetCardLayoutProps = Omit<PetCardProps, "layout">;

/** Props of the vaccination badge. */
export type PetVaccineBadgeProps = {
  /** Status that decides the colors, label and actions. */
  status: PetVaccineStatus;
};

/** Props of the facts list. */
export type PetFactsProps = {
  /** Key facts, each with a label and a value. */
  facts: PetFact[];
};

/** Props of the name and description block of the row layout. */
export type PetRowNameProps = Pick<PetCardProps, "name" | "description" | "href">;

/** Props of the medical alert line. */
export type PetAlertProps = {
  /** Text to show. */
  text: string;
};

/** Props of the footer of the full card. */
export type PetCardFooterProps = Pick<PetCardProps, "vaccineStatus" | "href" | "viewLabel">;

/** Props of the avatar with the pet name and description. */
export type PetIdentityProps = Pick<PetCardProps, "subject" | "name" | "description">;
