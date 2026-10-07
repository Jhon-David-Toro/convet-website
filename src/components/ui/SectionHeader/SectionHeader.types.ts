import type { ComponentPropsWithRef } from "react";

/** Props of the `SectionHeader` component. */
export type SectionHeaderProps = Omit<ComponentPropsWithRef<"header">, "title"> & {
  /** Title text. */
  title: string;
  /** Small text above the title. */
  eyebrow?: string;
  /** Description text under the title. */
  description?: string;
  /** Orange stroke below the title. */
  underline?: boolean;
  /** Horizontal alignment of the column. */
  align?: "left" | "center";
  /** Heading level of the title (defaults to h2). */
  titleAs?: "h1" | "h2" | "h3";
};
