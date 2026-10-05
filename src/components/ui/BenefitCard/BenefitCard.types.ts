import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

/** Props of the `BenefitCard` component. */
export type BenefitCardProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Title text. */
  title: string;
  /** Description text under the title. */
  description: string;
};
