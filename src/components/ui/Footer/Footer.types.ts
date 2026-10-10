import type { ComponentPropsWithRef } from "react";

export type FooterLink = {
  label: string;
  href?: string;
  highlight?: boolean;
};

export type FooterColumn = {
  heading: string;
  items: FooterLink[];
};

export type FooterProps = Omit<ComponentPropsWithRef<"footer">, "children"> & {
  about: string;
  motto?: { text: string; highlight: string };
  columns: FooterColumn[];
  copyright: string;
  legalLinks?: { label: string; href: string }[];
  homeHref?: string;
};

export type FooterBrandProps = Pick<FooterProps, "homeHref" | "about" | "motto">;

export type FooterMottoProps = NonNullable<FooterProps["motto"]>;

export type FooterColumnProps = {
  column: FooterColumn;
};

export type FooterLegalProps = Pick<FooterProps, "copyright" | "legalLinks">;

export type FooterLegalLinksProps = {
  links: NonNullable<FooterProps["legalLinks"]>;
};
