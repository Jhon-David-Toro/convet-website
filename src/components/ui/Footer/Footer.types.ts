import type { ComponentPropsWithRef } from "react";

/** A link of a footer column; without `href` it is plain text. */
export type FooterLink = {
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Link destination. */
  href?: string;
  /** Highlights the link in orange (e.g. the emergency line). */
  highlight?: boolean;
};

/** A titled column of footer links. */
export type FooterColumn = {
  /** Heading. */
  heading: string;
  /** Items to render. */
  items: FooterLink[];
};

/** Props of the `Footer` component. */
export type FooterProps = Omit<ComponentPropsWithRef<"footer">, "children"> & {
  /** Short description of the clinic. */
  about: string;
  /** Brand motto: regular text plus a highlighted phrase. */
  motto?: { text: string; highlight: string };
  /** Number of columns, or the link columns to render. */
  columns: FooterColumn[];
  /** Copyright line. */
  copyright: string;
  /** Legal links (privacy, terms) shown next to the copyright. */
  legalLinks?: { label: string; href: string }[];
  /** Link of the logo; defaults to `/`. */
  homeHref?: string;
};

/** Props of the brand block (logo, about text and motto). */
export type FooterBrandProps = Pick<FooterProps, "homeHref" | "about" | "motto">;

/** Props of the motto line. */
export type FooterMottoProps = NonNullable<FooterProps["motto"]>;

/** Props of one link column. */
export type FooterColumnProps = {
  /** Column of links with its heading. */
  column: FooterColumn;
};

/** Props of the legal line (copyright and legal links). */
export type FooterLegalProps = Pick<FooterProps, "copyright" | "legalLinks">;

/** Props of the legal links list. */
export type FooterLegalLinksProps = {
  /** Links to render. */
  links: NonNullable<FooterProps["legalLinks"]>;
};
