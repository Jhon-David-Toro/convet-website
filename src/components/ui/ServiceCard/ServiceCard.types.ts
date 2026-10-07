import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

/** Props of the `ServiceCard` component. */
export type ServiceCardProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Title text. */
  title: string;
  /** Description text under the title. */
  description: string;
  /** Duration, e.g. "15 min". */
  duration?: string;
  /** Species, e.g. "Dogs · Cats". */
  species?: string;
  /** Link to the details page. */
  detailsHref: string;
  /** Link to the booking page. */
  bookHref: string;
  /** Label of the details link. */
  detailsLabel?: string;
  /** Label of the booking button. */
  bookLabel?: string;
};

/** Props of the duration / species badges. */
export type ServiceMetaProps = Pick<ServiceCardProps, "duration" | "species">;

/** Props of the details / booking buttons. */
export type ServiceActionsProps = Pick<ServiceCardProps, "detailsHref" | "bookHref" | "detailsLabel" | "bookLabel">;
