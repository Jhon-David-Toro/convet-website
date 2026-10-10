import type { ComponentPropsWithRef } from "react";

export type SectionHeaderProps = Omit<ComponentPropsWithRef<"header">, "title"> & {
  title: string;
  eyebrow?: string;
  description?: string;
  underline?: boolean;
  align?: "left" | "center";
  titleAs?: "h1" | "h2" | "h3";
};
