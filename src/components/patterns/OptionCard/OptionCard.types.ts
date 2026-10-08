import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

/** Props of the `OptionCard` component. */
export type OptionCardProps = Omit<ComponentPropsWithRef<"input">, "type" | "children" | "title"> & {
  /** Forces the hover look (for documentation and screenshots). */
  "data-state"?: "hover";
  /** Radio group it belongs to (required). */
  name: string;
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Title text. */
  title: string;
  /** Secondary text under the title. */
  subtitle?: string;
  /** Trailing detail, e.g. "15 min". */
  meta?: string;
};

/** Props of the title / subtitle block. */
export type OptionTextProps = Pick<OptionCardProps, "title" | "subtitle">;
